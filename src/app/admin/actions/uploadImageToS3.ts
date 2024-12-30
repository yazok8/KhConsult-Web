// src/app/admin/actions/uploadImageToS3.ts

import { awsConfig } from "@/config/aws";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { v4 as uuidv4 } from "uuid";

/**
 * Enumeration of allowed folders in S3.
 */
export enum S3Folder {
  TEAM = "team",
  SERVICES = "services",
}

/**
 * Initializes the S3 client with AWS SDK v3.
 */
const s3Client = new S3Client({
  region: awsConfig.region,
  credentials: {
    accessKeyId: awsConfig.accessKeyId,
    secretAccessKey: awsConfig.secretAccessKey,
  },
});

/**
 * Uploads an image file to S3 under the specified folder.
 * @param file The image file to upload.
 * @param folder The target folder in S3 ('team' or 'services').
 * @returns The key of the uploaded image in S3.
 */
export async function uploadImageToS3(
  file: File,
  folder: S3Folder
): Promise<string> {
  if (!file) {
    throw new Error("No file provided for upload.");
  }

  const fileExtension = file.name.split(".").pop();
  if (!fileExtension) {
    throw new Error("File must have an extension.");
  }

  // Generate a unique filename
  const fileName = `${uuidv4()}.${fileExtension}`;
  const key = `${folder}/${fileName}`;

  console.log("Uploading to Bucket:", process.env.AWS_S3_BUCKET_NAME);
  console.log("Object Key:", key);

  if (!process.env.AWS_S3_BUCKET_NAME) {
    throw new Error("AWS_S3_BUCKET_NAME environment variable is not set.");
  }

  try {
    // Convert File-like object to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Create Upload object for multipart upload
    const parallelUploads3 = new Upload({
      client: s3Client,
      params: {
        Bucket: process.env.AWS_S3_BUCKET_NAME as string,
        Key: key, // Dynamic folder
        Body: buffer,
        ContentType: file.type,
        // Removed ACL since bucket does not allow ACLs
      },
    });

    // Start the upload
    await parallelUploads3.done();
    console.log("Upload successful:", key);
    return key;
  } catch (error: unknown) {

    // Type Guard to check if error is an instance of Error
    if (error instanceof Error) {
      console.error("Error uploading to S3:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
    } else {
      // Handle non-Error exceptions
      console.error("Unknown error uploading to S3:", error);
    }
    throw new Error("Could not upload image to S3. Please try again later.");
  }
}
