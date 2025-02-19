// tests/registerUser.test.ts
import resgiserUser from "@/app/admin/actions/auth"; // Adjust path if necessary
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

// Mock Prisma’s user model functions
jest.mock("@/lib/prisma", () => ({
  user: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
}));

// Mock bcrypt
jest.mock("bcrypt", () => ({
  hash: jest.fn(),
}));

describe("resgiserUser API endpoint", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if missing credentials", async () => {
    // Simulate a request with missing email, password, or name
    const req = {
      json: async () => ({ email: "", password: "", name: "", username: "" }),
    } as Request;

    const response = await resgiserUser(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toEqual("MissingCredentials");
  });

  it("should return error if the user already exists with both email and username", async () => {
    // Simulate an existing user with the same email and username
    (prisma.user.findFirst as jest.Mock).mockResolvedValue({
      email: "test@example.com",
      username: "testuser",
    });

    const req = {
      json: async () => ({
        email: "test@example.com",
        password: "secret",
        name: "Test User",
        username: "testuser",
      }),
    } as Request;

    const response = await resgiserUser(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error.email).toEqual("Email already in use");
    expect(data.error.username).toEqual("Username already in use");
  });

  it("should successfully create a new user", async () => {
    // Ensure no user is found
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);
    // Simulate successful password hashing
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashedpassword");
    // Simulate successful user creation
    (prisma.user.create as jest.Mock).mockResolvedValue({
      id: "user-id",
      email: "test@example.com",
      name: "Test User",
    });

    const req = {
      json: async () => ({
        email: "test@example.com",
        password: "secret",
        name: "Test User",
        username: "testuser",
      }),
    } as Request;

    const response = await resgiserUser(req);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.message).toEqual("User created successfully");
    expect(data.user).toEqual({
      id: "user-id",
      email: "test@example.com",
      name: "Test User",
    });
  });

  it("should handle Prisma unique constraint errors", async () => {
    // Create an error similar to Prisma's unique constraint error
    const prismaError = new Error("Unique constraint failed");
    (prismaError as any).code = "P2002";

    (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashedpassword");
    (prisma.user.create as jest.Mock).mockRejectedValue(prismaError);

    const req = {
      json: async () => ({
        email: "test@example.com",
        password: "secret",
        name: "Test User",
        username: "testuser",
      }),
    } as Request;

    const response = await resgiserUser(req);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toEqual("InternalServerError");
  });
});
