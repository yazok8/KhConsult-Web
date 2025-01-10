// src/app/api/aboutServices/delete/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { z } from "zod";

// Zod schema for validating 'id'
const deleteServiceSchema = z.object({
  id: z.string().uuid(),
});

/**
 * Type guard for PrismaClientKnownRequestError.
 */
function isPrismaKnownRequestError(
  error: unknown
): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError;
}

/**
 * Extract the "[id]" parameter from the request URL pathname.
 * Example URL: /api/aboutServices/delete/1234
 * @param request NextRequest
 * @returns string (the dynamic [id])
 */
function getIdFromURL(request: NextRequest): string {
  // Convert to a URL object so we can inspect pathname
  const url = new URL(request.url);
  // pathname might look like: /api/aboutServices/delete/someId
  const parts = url.pathname.split("/"); 
  // The last segment should be "[id]"
  // (Or adjust logic if you have a different route structure)
  const id = parts[parts.length - 1];
  return id;
}

export async function DELETE(request: NextRequest): Promise<Response> {
  try {
    // 1. Extract 'id' from the URL
    const id = getIdFromURL(request);

    // 2. Validate 'id' using Zod
    const parsed = deleteServiceSchema.safeParse({ id });
    if (!parsed.success) {
      return NextResponse.json(
        { error: { message: "Invalid 'id' parameter." } },
        { status: 400 }
      );
    }

    // 3. Attempt to delete the record in Prisma
    const deleted = await prisma.aboutOurServices.delete({
      where: { id: parsed.data.id },
    });

    // 4. Return a success response
    return NextResponse.json(deleted, { status: 200 });
  } catch (error: unknown) {
    console.error("Error deleting about service:", error);

    if (isPrismaKnownRequestError(error)) {
      // Prisma error: "Record not found"
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: { message: "About service not found." } },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: { message: "Database error occurred." } },
        { status: 500 }
      );
    }

    // Handle any other unknown errors
    return NextResponse.json(
      { error: { message: "Failed to delete about service." } },
      { status: 500 }
    );
  }
}
