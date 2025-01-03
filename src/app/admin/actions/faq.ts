import prisma from "@/lib/prisma";
import { addSchema } from "@/lib/validations/faq";
import { faq, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

/**
 * Adds a new "FAQ" to the database after uploading the image to S3.
 * @param formData The form data containing service details and image file.
 * @returns The created "FAQ."
 */
export default async function addFaqQuestion(formData: FormData): Promise<faq> {
  const formEntries = Object.fromEntries(formData.entries());
  try {
  const result = addSchema.safeParse({
    ...formEntries,
  });

  if (!result.success) {
    throw new Error(
      "Validation failed: " +
        JSON.stringify(result.error.formErrors.fieldErrors)
    );
  }

  const data = result.data;


    const newFaq = await prisma.faq.create({
      data: {
        question: data.question,
        answer: data.answer,
      },
    });

    revalidatePath("/");
    revalidatePath("/faq");

    return newFaq;
  } catch (error) {
    console.error("Error adding question:", error);
    throw new Error(`Failed to add FAQ: ${error}`);
  }
}

/**
 * Edits an existing "FAQ" in the database after handling image updates.
 * @param req The Next.js request object.
 * @param params The route parameters containing the "FAQ" ID.
 * @returns The updated "FAQ."
 */

export async function editFaqQuestion(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<Prisma.faqGetPayload<object>> {
  const { id } = params;
  try {
    const formData = await req.formData();

    const question = formData.get("question") as string | null;
    const answer = formData.get("answer") as string | null;

    // Validate required fields
    if (!question || typeof question !== "string" || question.trim() === "") {
      throw new Error("Title is required and must be a non-empty string.");
    }

    if (!answer || typeof answer !== "string" || answer.trim() === "") {
      throw new Error(
        "Description is required and must be a non-empty string."
      );
    }

    // Update the "FAQ" in the database
    const updatedFaq = await prisma.faq.update({
      where: { id },
      data: {
        question: question,
        answer: answer, // Store as is
      },
    });

    // Revalidate relevant paths to update caches
    revalidatePath("/");
    revalidatePath("/faq");

    return updatedFaq;
  } catch (error) {
    console.error("Error updating question:", error);
    throw new Error(`Failed to update FAQ: ${error}`);
  }
}
