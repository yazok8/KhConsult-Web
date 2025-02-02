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
 * Helper function to convert a Blob to a Buffer.
 * @param blob The Blob object.
 * @returns A Promise that resolves to a Buffer.
 */
export async function blobToBuffer(blob: Blob): Promise<Buffer> {
  const arrayBuffer = await blob.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * Edits an existing "About Service" after handling image updates.
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
    const imageFile = formData.get("image"); // type: FormDataEntryValue (string | File)
    const existingAboutImage = formData.get("imageSrc") as string | null;

    if (!title || title.trim() === "") {
      throw new Error("Title is required and must be a non-empty string.");
    }
    if (!description || description.trim() === "") {
      throw new Error("Description is required and must be a non-empty string.");
    }

    let aboutImage = existingAboutImage || null;

    // Narrow the type: if imageFile is not a string, it must be a Blob/File.
    if (imageFile && typeof imageFile !== "string" && typeof imageFile.arrayBuffer === "function") {
      // Optionally, validate file size
      const imageBuffer = await blobToBuffer(imageFile);
      const maxImageSize = 10 * 1024 * 1024; // 10 MB
      if (imageBuffer.length > maxImageSize) {
        throw new Error("Image size should not exceed 10 MB.");
      }

      // Call uploadImageToS3. Because its parameter is now (Blob | File),
      // you can pass imageFile (a Blob) without error.
      const imgKey = await uploadImageToS3(imageFile, S3Folder.SERVICES);
      aboutImage = imgKey;
    }

    const updatedService = await prisma.aboutOurServices.update({
      where: { id },
      data: {
        title,
        description,
        aboutimage: aboutImage || undefined,
      },
    });

    revalidatePath("/");
    revalidatePath("/about-services");

    return updatedService;
  } catch (err: unknown) {
    console.error("Error updating service:", err);
    throw err;
  }
}
