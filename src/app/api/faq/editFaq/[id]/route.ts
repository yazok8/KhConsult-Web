import { editFaqQuestion } from "@/app/admin/actions/faq";
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

/**
 * Handler for updating a single service via PUT request.
 * @param req The Next.js request object.
 * @param context The route context containing parameters.
 * @returns The updated service or an error response.
 */
export async function PUT(req: NextRequest, context: IParams) {
  const origin = req.headers.get("origin");

  try {
    const { id } = context.params;
    const updatedFaqQuestion = await editFaqQuestion(req, { params: { id } });
    return NextResponse.json(updatedFaqQuestion, { 
      status: 200,
      headers: getCORSHeaders(origin)
    });
  }  catch (err: unknown) {
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
    console.error("Error updating faqQuestion:", err);
    return NextResponse.json(
      { error: "Failed to update faqQuestion." },
      { 
        status: 500,
        headers: getCORSHeaders(origin)
      }
    );
  }
}
