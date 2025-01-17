// src/app/api/services/editService/[id]/route.ts

import { editService } from "@/app/admin/actions/services";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

interface IParams {
  params: { id: string };
}


const allowedOrigins = [
  "http://localhost:3000",
  "https://kh-consult-web.vercel.app",
];

function getCORSHeaders(origin: string | null) {
  if (origin && allowedOrigins.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "PUT, POST, DELETE, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
  }
  // Fallback if you want to deny or allow all
  return {
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Methods": "PUT, POST, DELETE, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  return NextResponse.json(null, { headers: getCORSHeaders(origin) });
}


/**
 * Handler for updating a single service via PUT request.
 * @param req The Next.js request object.
 * @param context The route context containing parameters.
 * @returns The updated service or an error response.
 */
export async function PUT(req: NextRequest, context: IParams) {
  const origin = req.headers.get("origin");
  try {
    // Await the params if they are a Promise
    const resolvedParams = await context.params; // Awaiting params

    // Pass the resolved params to editService
    const updatedService = await editService(req, { params: resolvedParams });

    return NextResponse.json(updatedService, {
      status: 200,
      headers: getCORSHeaders(origin),
    });
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
