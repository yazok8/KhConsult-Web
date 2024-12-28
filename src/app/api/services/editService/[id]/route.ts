// src/app/api/services/editService/[id]/route.ts

import { editService } from "@/app/admin/actions/services";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

interface IParams {
  params: { id: string };
}

/**
 * Handler for updating a single service via PUT request.
 * @param req The Next.js request object.
 * @param context The route context containing parameters.
 * @returns The updated service or an error response.
 */
export async function PUT(req: NextRequest, context: IParams) {
  try {
    // Await the params if they are a Promise
    const resolvedParams = await context.params; // Awaiting params

    // Pass the resolved params to editService
    const updatedService = await editService(req, { params: resolvedParams });

    return NextResponse.json(updatedService, { status: 200 });
  } catch (err: unknown) {
    // Handle validation errors
    if (err instanceof z.ZodError) {
      console.error("Validation Error:", err.flatten().fieldErrors);
      return NextResponse.json(
        { errors: err.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Handle other errors
    console.error("Error updating service:", err);
    return NextResponse.json(
      { error: "Failed to update service." },
      { status: 500 }
    );
  }
}
