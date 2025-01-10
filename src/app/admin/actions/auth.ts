import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";



export default async function resgiserUser(req:Request){
    try {
        const { name, username, email, password } = await req.json();
    
        // Validate input
        if (!email || !password || !name) {
          return NextResponse.json(
            { error: "MissingCredentials" },
            { status: 400 }
          );
        }
    
        // Check if the user already exists
        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [{ email: email.toLowerCase() }, { username: username }],
          },
        });
    
        if (existingUser) {
          if (
            existingUser.email === email.toLowerCase() &&
            existingUser.username === username
          ) {
            return NextResponse.json(
              {
                error: {
                  email: "Email already in use",
                  username: "Username already in use",
                },
              },
              { status: 400 }
            );
          } else if (existingUser.email === email.toLowerCase()) {
            return NextResponse.json(
              { error: { email: "Email already in use" } },
              { status: 400 }
            );
          } else {
            return NextResponse.json(
              { error: { username: "Username already in use" } },
              { status: 400 }
            );
          }
        }
    
        // Hash the password with bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
    
        // Create a new user
        const user = await prisma.user.create({
          data: {
            name,
            username,
            email: email.toLowerCase(),
            hashedPassword,
            role: "VIEW_ONLY", // Default role
          },
        });
    
        return NextResponse.json(
          {
            message: "User created successfully",
            user: { id: user.id, email: user.email, name: user.name },
          },
          { status: 201 }
        );
      } catch (error: unknown) {
        console.error("Error registering user:", error);

        // Handle Prisma unique constraint errors
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2002"
        ) {
          return NextResponse.json(
            { error: "InternalServerError" },
            { status: 500 }
          );
        }
    
        // Handle other errors
        return NextResponse.json({ error: "InternalServerError" }, { status: 500 });
      }
}