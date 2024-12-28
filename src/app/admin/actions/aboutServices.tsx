// src/app/admin/actions/services.tsx

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { AboutOurServices, Prisma } from "@prisma/client";
import { uploadImageToS3 } from "./uploadImageToS3";
import { addSchema } from "@/lib/validations/aboutServices";
import { NextRequest } from "next/server";

/**
 * Adds a new service to the database after uploading the image to S3.
 * @param formData The form data containing service details and image file.
 * @returns The created service.
 */
export async function addAboutServices(
  formData: FormData
): Promise<AboutOurServices> {
  const formEntries = Object.fromEntries(formData.entries());

  // Retrieve the image file from formData
  const imageFile = formData.get("image");

  // Validate the form data
  const result = addSchema.safeParse({
    ...formEntries,
    image: imageFile,
  });

  if (!result.success) {
    throw new Error(
      "Validation failed: " +
        JSON.stringify(result.error.formErrors.fieldErrors)
    );
  }

  const data = result.data;

  try {
    // No sanitization steps

    let imgKey: string | null = null;

    if (data.image && data.image instanceof File) {
      // Upload image to S3
      imgKey = await uploadImageToS3(data.image);
    }

    // Create the service in the database
    const newService = await prisma.aboutOurServices.create({
      data: {
        title: data.title,
        description: data.description, // Store as is
        aboutimage: imgKey, // This can be null if no image is uploaded
      },
    });

    // Revalidate relevant paths to update caches
    revalidatePath("/");
    revalidatePath("/about-services"); // Fixed typo from "/servies" to "/about-services"

    return newService; // Return the created service
  } catch (err) {
    console.error("Error adding service:", err);
    throw new Error("An error occurred while adding the service.");
  }
}

/**
 * Edits an existing service in the database after handling image updates.
 * @param req The Next.js request object.
 * @param params The route parameters containing the service ID.
 * @returns The updated service.
 */
export async function editAboutServices(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<Prisma.AboutOurServicesGetPayload<object>> {
  const { id } = params;

  try {
    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const image = formData.get("image") as File | null;
    const existingAboutImage = formData.get("imageSrc") as string | null;

    // Validate required fields
    if (!title || typeof title !== "string" || title.trim() === "") {
      throw new Error("Title is required and must be a non-empty string.");
    }

    if (!description || typeof description !== "string" || description.trim() === "") {
      throw new Error("Description is required and must be a non-empty string.");
    }

    // No sanitization steps

    let aboutImage = existingAboutImage || null;

    if (image && image instanceof File) {
      // Validate image size before uploading
      const maxImageSize = 10 * 1024 * 1024; // 10 MB

      if (image.size > maxImageSize) {
        throw new Error("Image size should not exceed 10 MB.");
      }

      // Upload image to S3 or your preferred storage
      const imgKey = await uploadImageToS3(image);
      aboutImage = imgKey;

      // Optionally, delete the old image from S3 if necessary
      // await deleteImageFromS3(existingAboutImage);
    }

    // Update the service in the database using the correct model
    const updatedService = await prisma.aboutOurServices.update({
      where: { id },
      data: {
        title: title,
        description: description, // Store as is
        aboutimage: aboutImage,
      },
    });

    // Revalidate relevant paths to update caches (if using ISR)
    // revalidatePath("/admin/about-services"); // Uncomment if needed

    return updatedService;
  } catch (err: unknown) {
    console.error("Error updating service:", err);
    throw err; // Let the API route handle the error response
  }
}

/**
 * Helper function to convert Blob to Buffer
 * @param blob The Blob object to convert.
 * @returns A Promise that resolves to a Buffer.
 */
export async function blobToBuffer(blob: Blob): Promise<Buffer> {
  const arrayBuffer = await blob.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
