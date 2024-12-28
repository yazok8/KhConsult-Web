// src/app/admin/actions/services.tsx

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Service, ServiceCategory } from "@prisma/client";
import { addSchema } from "@/lib/validations/service";
import { uploadImageToS3 } from "./uploadImageToS3";
import { NextRequest } from "next/server";


/**
 * Adds a new service to the database after uploading the image to S3.
 * @param formData The form data containing service details and image file.
 * @returns The created service.
 */
export async function AddService(formData: FormData): Promise<Service> {
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
      "Validation failed: " + JSON.stringify(result.error.formErrors.fieldErrors)
    );
  }

  const data = result.data;

  try {
    // Upload image to S3
    const imgKey = await uploadImageToS3(data.image);

    // Create the service in the database
    const newService = await prisma.service.create({
      data: {
        title: data.title,
        description: data.description,
        imageSrc: imgKey,
        category: data.category,
      },
    });

    // Revalidate relevant paths to update caches
    revalidatePath("/");
    revalidatePath("/services"); // Fixed typo from "/servies" to "/services"

    return newService; // Return the created service
  } catch (err) {
    console.error("Error adding service:", err);
    throw new Error("An error occurred while adding the service.");
  }
}

// Helper function to convert Blob to Buffer
export async function blobToBuffer(blob: Blob): Promise<Buffer> {
  const arrayBuffer = await blob.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// src/app/admin/actions/services.tsx

export async function editService(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<Service> {
  const { id } = params; // Now safe to destructure

  try {
    const formData = await req.formData();

    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;
    const category = formData.get("category") as string | null;
    const imageFile = formData.get("image") as File | null;
    const existingImageSrc = formData.get("imageSrc") as string | null;

    // Validate required fields
    if (!title || !description || !category) {
      throw new Error("Title, description, and category are required.");
    }

    // Validate category
    if (!["INDIVIDUAL", "BUSINESS"].includes(category)) {
      throw new Error("Invalid category provided.");
    }

    let imageSrc = existingImageSrc;

    if (imageFile) {
      // Validate image size before uploading
      const imageBuffer = await blobToBuffer(imageFile as Blob);
      const maxImageSize = 10 * 1024 * 1024; // 10 MB

      if (imageBuffer.length > maxImageSize) {
        throw new Error("Image size should not exceed 10 MB.");
      }

      // Upload image to S3
      const imgKey = await uploadImageToS3(imageFile);
      imageSrc = imgKey;

      // Optionally, delete the old image from S3 if necessary
      // await deleteImageFromS3(existingImageSrc);
    }

    // Update the service in the database
    const updatedService = await prisma.service.update({
      where: { id },
      data: {
        title,
        description,
        ...(imageSrc && { imageSrc }),
        category: category as ServiceCategory,
      },
    });

    // Revalidate relevant paths to update caches
    revalidatePath("/");
    revalidatePath("/services");

    return updatedService;
  } catch (err: any) {
    console.error("Error updating service:", err);
    throw err; // Let the API route handle the error response
  }
}
