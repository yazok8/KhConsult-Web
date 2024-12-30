// src/app/admin/actions/services.tsx

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Service, ServiceCategory } from "@prisma/client";
import { addSchema } from "@/lib/validations/service";
import { S3Folder, uploadImageToS3 } from "./uploadImageToS3";
import { NextRequest } from "next/server";


/**
 * Adds a new service to the database after uploading the image to S3.
 * @param formData The form data containing service details and image file.
 * @returns The created service.
 */
export async function addService(formData: FormData): Promise<Service> {
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
    // Upload image to S3 under the 'services' folder
    const imgKey = data.image
      ? await uploadImageToS3(data.image as File, S3Folder.SERVICES)
      : "";

    // Create the service in the database
    const newService = await prisma.service.create({
      data: {
        title: data.title,
        description: data.description,
        imageSrc: imgKey, // Ensure this matches your Prisma schema
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

/**
 * Helper function to convert Blob to Buffer
 * @param blob The Blob object to convert.
 * @returns A Promise that resolves to a Buffer.
 */
export async function blobToBuffer(blob: Blob): Promise<Buffer> {
  const arrayBuffer = await blob.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * Edits an existing service in the database after handling image updates.
 * @param req The Next.js request object.
 * @param params The route parameters containing the service ID.
 * @returns The updated service.
 */
export async function editService(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<Service> {
  const { id } = params; // Safe destructuring

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

    let imageSrc = existingImageSrc; // Default to existing image

    if (imageFile) {
      // Validate image size before uploading
      const imageBuffer = await blobToBuffer(imageFile);
      const maxImageSize = 10 * 1024 * 1024; // 10 MB

      if (imageBuffer.length > maxImageSize) {
        throw new Error("Image size should not exceed 10 MB.");
      }

      // Upload image to S3 under the 'services' folder
      const imgKey = await uploadImageToS3(imageFile, S3Folder.SERVICES);
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
        imageSrc: imageSrc || undefined, // Update if new image is uploaded
        category: category as ServiceCategory,
      },
    });

    // Revalidate relevant paths to update caches
    revalidatePath("/");
    revalidatePath("/services");

    return updatedService;
  } catch (err: unknown) {
    console.error("Error updating service:", err);
    throw err; // Let the API route handle the error response
  }
}