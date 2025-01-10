import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

/**
 * Type guard to check if an error is a PrismaClientKnownRequestError
 *
 * @param {unknown} error - The error to check.
 * @returns {error is Prisma.PrismaClientKnownRequestError} - True if the error is a PrismaClientKnownRequestError.
 */
function isPrismaKnownRequestError(
  error: unknown
): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError;
}

/**
 * DELETE Handler to delete a single "About Our Services" entry by ID.
 *
 * @param {Request} _req - The incoming request object.
 * @param {Object} context - The context object containing route parameters.
 * @param {Object} context.params - The route parameters.
 * @param {string} context.params.id - The ID of the service to delete.
 * @returns {Promise<Response>} - The response object.
 */
export async function DELETE(
  _req: Request,
  context: { params: { id: string } }
): Promise<Response> {
  try {
    const { id } = await context.params;

    // Validate the ID (optional but recommended)
    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: { message: "Invalid or missing 'id' parameter." } },
        { status: 400 }
      );
    }

    // Attempt to delete the service
    const deletedService = await prisma.service.delete({
      where: {
        id,
      },
    });

    // Respond with the deleted service data
    return NextResponse.json(deletedService, { status: 200 });
  } catch (err: unknown) {
    console.error("Error deleting service:", err);

    if (isPrismaKnownRequestError(err)) {
      if (err.code === "P2025") {
        // Record not found
        return NextResponse.json(
          { error: { message: "About service not found." } },
          { status: 404 }
        );
      }

      // Handle other Prisma known errors if necessary
      return NextResponse.json(
        { error: { message: "Database error occurred." } },
        { status: 500 }
      );
    }

    // Handle all other unexpected errors
    return NextResponse.json(
      { error: { message: "Failed to delete service." } },
      { status: 500 }
    );
  }
}
