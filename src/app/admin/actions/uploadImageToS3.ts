import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { v4 as uuidv4 } from "uuid";

// Initialize S3 client with AWS SDK v3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

/**
 * Uploads an image file to S3.
 * @param file The image file to upload.
 * @returns The key of the uploaded image in S3.
 */
export async function uploadImageToS3(file: any): Promise<string> {
  const fileExtension = file.name.split(".").pop();
  const key = `services/${uuidv4()}.${fileExtension}`;

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
        Key: key,
        Body: buffer,
        ContentType: file.type,
        // Removed ACL since the bucket doesn't allow it
      },
      // Optional: set part size and queue size for multipart uploads
      // partSize: 5 * 1024 * 1024, // 5 MB
      // queueSize: 4, // Concurrent parts
    });

    // Start the upload
    await parallelUploads3.done();
    console.log("Upload successful:", key);
    return key;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw new Error("Could not upload image to S3. Please try again later.");
  }
}