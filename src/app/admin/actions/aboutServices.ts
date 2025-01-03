// src/app/admin/actions/services.tsx

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {  AboutOurServices, Prisma } from "@prisma/client";
import { S3Folder, uploadImageToS3 } from "./uploadImageToS3";
import { NextRequest } from "next/server";
import { addSchema } from "@/lib/validations/aboutServices";



/**
 * Adds a new "About Service" to the database after uploading the image to S3.
 * @param formData The form data containing service details and image file.
 * @returns The created "About Service."
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
    let imgKey: string | null = null;

    if (data.image && data.image instanceof File) {
      // Upload image to S3 under the 'services' folder
      imgKey = await uploadImageToS3(data.image, S3Folder.SERVICES);
    }

    // Create the "About Service" in the database
    const newService = await prisma.aboutOurServices.create({
      data: {
        title: data.title,
        description: data.description,
        aboutimage: imgKey, 
      },
    });

    // Revalidate relevant paths to update caches
    revalidatePath("/");
    revalidatePath("/about-services"); // Fixed typo from "/servies" to "/about-services"

    return newService; // Return the created "About Service"
  } catch (err) {
    console.error("Error adding service:", err);
    throw new Error("An error occurred while adding the service.");
  }
}



/**
 * Edits an existing "About Service" in the database after handling image updates.
 * @param req The Next.js request object.
 * @param params The route parameters containing the "About Service" ID.
 * @returns The updated "About Service."
 */
export async function editAboutServices(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<Prisma.AboutOurServicesGetPayload<object>> {
  const { id } = params;

  try {
    const formData = await req.formData();

    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;
    const imageFile = formData.get("image") as File | null;
    const existingAboutImage = formData.get("imageSrc") as string | null;

    // Validate required fields
    if (!title || typeof title !== "string" || title.trim() === "") {
      throw new Error("Title is required and must be a non-empty string.");
    }

    if (!description || typeof description !== "string" || description.trim() === "") {
      throw new Error("Description is required and must be a non-empty string.");
    }

    let aboutImage = existingAboutImage || null;

    if (imageFile && imageFile instanceof File) {
      // Validate image size before uploading
       const imageBuffer = await blobToBuffer(imageFile);
      const maxImageSize = 10 * 1024 * 1024; // 10 MB

      if (imageBuffer.length > maxImageSize) {
        throw new Error("Image size should not exceed 10 MB.");
      }

      // Upload image to S3 under the 'services' folder
      const imgKey = await uploadImageToS3(imageFile, S3Folder.SERVICES);
      aboutImage = imgKey;

      // Optionally, delete the old image from S3 if necessary
      // await deleteImageFromS3(existingAboutImage);
    }

    // Update the "About Service" in the database
    const updatedService = await prisma.aboutOurServices.update({
      where: { id },
      data: {
        title: title,
        description: description, // Store as is
        aboutimage: aboutImage || undefined, // Update if new image is uploaded
      },
    });

    // Revalidate relevant paths to update caches
    revalidatePath("/");
    revalidatePath("/about-services");

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
