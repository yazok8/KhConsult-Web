// src/config/aws.ts

if (!process.env.AWS_REGION) {
    throw new Error("Missing AWS_REGION environment variable.");
  }
  
  if (!process.env.AWS_ACCESS_KEY_ID) {
    throw new Error("Missing AWS_ACCESS_KEY_ID environment variable.");
  }
  
  if (!process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error("Missing AWS_SECRET_ACCESS_KEY environment variable.");
  }
  
  if (!process.env.AWS_S3_BUCKET_NAME) {
    throw new Error("Missing AWS_S3_BUCKET_NAME environment variable.");
  }
  
  export const awsConfig = {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucketName: process.env.AWS_S3_BUCKET_NAME,
  };
  