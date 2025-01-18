import { editAboutServices } from "@/app/admin/actions/aboutServices";
import { getCORSHeaders } from "@/app/utils/apiConfig";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

interface IParams {
  params: { id: string };
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  return NextResponse.json(null, { headers: getCORSHeaders(origin) });
}

export async function PUT(req: NextRequest, context: IParams) {
  const origin = req.headers.get("origin");
  try {
    const { id } = context.params;
    const updatedAboutServices = await editAboutServices(req, { params: { id } });
    return NextResponse.json(updatedAboutServices, { 
      status: 200,
      headers: getCORSHeaders(origin)
    });
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      console.error("Validation Error:", err.flatten().fieldErrors);
      return NextResponse.json(
        { errors: err.flatten().fieldErrors },
        { 
          status: 400,
          headers: getCORSHeaders(origin)
        }
      );
    }
    console.error("Error updating service:", err);
    return NextResponse.json(
      { error: "Failed to update service." },
      { 
        status: 500,
        headers: getCORSHeaders(origin)
      }
    );
  }
}
