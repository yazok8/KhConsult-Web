import { editFaqQuestion } from "@/app/admin/actions/faq";
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
    // Extract the faq ID from the route parameters
    const { id } = context.params;

    // Pass the request and parameters to the editFaqQuestion function
    const updatedFaqQuestion = await editFaqQuestion(req, { params: { id } });

    // Return the updated service as a JSON response
    return NextResponse.json(updatedFaqQuestion, { status: 200 });
  } catch (err: unknown) {
    // Handle validation errors using Zod
    if (err instanceof z.ZodError) {
      console.error("Validation Error:", err.flatten().fieldErrors);
      return NextResponse.json(
        { errors: err.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Handle other server errors
    console.error("Error updating faqQuestion:", err);
    return NextResponse.json(
      { error: "Failed to update faqQuestion." },
      { status: 500 }
    );
  }
}
