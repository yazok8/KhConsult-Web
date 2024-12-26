// src/app/admin/actions/services.tsx

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Service } from "@prisma/client";
import { addSchema } from "@/lib/validations/service";
import { uploadImageToS3 } from "./uploadImageToS3";




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
