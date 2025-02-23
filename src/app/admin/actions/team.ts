// src/app/admin/actions/team.ts

import { addSchema } from "@/lib/validations/team";
import { S3Folder, uploadImageToS3 } from "./uploadImageToS3";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { AboutOurTeam } from "@prisma/client";
import { NextRequest } from "next/server";

/**
 * Adds a new team member to the database after uploading the image to S3.
 * @param formData The form data containing team details and image file.
 * @returns The created team member.
 */
export async function addToTeam(formData: FormData): Promise<AboutOurTeam> {
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
      // Upload image to S3 under the 'team' folder
      const imgKey = data.image
        ? await uploadImageToS3(data.image as File, S3Folder.TEAM)
        : "";
  
      // Create the team member in the database
      const newTeamProfile = await prisma.aboutOurTeam.create({
        data: {
          name: data.name,
          title: data.title,
          description: data.description,
          profileImage: imgKey, // Ensure this matches your Prisma schema
        },
      });
  
      // Revalidate relevant paths to update caches
      revalidatePath("/");
      revalidatePath("/manage-team"); // Ensure this path is correct
  
      return newTeamProfile; // Return the created team member
    } catch (err) {
      console.error("Error adding this member profile:", err);
      throw new Error("An error occurred while adding the member profile.");
    }
  }


// Helper function to convert Blob to Buffer
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
   * Edits an existing team member's profile in the database after handling image updates.
   * @param req The Next.js request object.
   * @param params The route parameters containing the team member ID.
   * @returns The updated team member.
   */
  export async function editTeam(
    req: NextRequest,
    { params }: { params: { id: string } }
  ): Promise<AboutOurTeam> {
    const { id } = await params; // Safe destructuring
  
    try {
      const formData = await req.formData();
      const name = formData.get("name") as string | null;
      const title = formData.get("title") as string | null;
      const description = formData.get("description") as string | null;
      const imageFile = formData.get("image") as File | null;
      const existingProfileImgSrc = formData.get("imageSrc") as string | null;
  
      // Validate required fields
      if (!description || !name) {
        throw new Error("Name, Title, and description are required.");
      }
  
      let profileImage = existingProfileImgSrc; // Default to existing image
  
      if (imageFile) {
        // Validate image size before uploading
        const imageBuffer = await blobToBuffer(imageFile);
        const maxImageSize = 10 * 1024 * 1024; // 10 MB
  
        if (imageBuffer.length > maxImageSize) {
          throw new Error("Image size should not exceed 10 MB.");
        }
  
        // Upload image to S3 under the 'team' folder
        const imgKey = await uploadImageToS3(imageFile, S3Folder.TEAM);
        profileImage = imgKey;
  
        // Optionally, delete the old image from S3 if necessary
        // await deleteImageFromS3(existingProfileImgSrc);
      }
  
      // Update the team member in the database
      const updatedTeamProfile = await prisma.aboutOurTeam.update({
        where: { id },
        data: {
          name,
          title,
          description,
          profileImage:profileImage|| undefined, // Update the 'profileimage' field
        },
      });
  
      // Revalidate relevant paths to update caches
      revalidatePath("/");
      revalidatePath("/manage-team");
  
      return updatedTeamProfile;
    } catch (err: unknown) {
      console.error("Error updating member profile:", err);
      throw err; // Let the API route handle the error response
    }
  }