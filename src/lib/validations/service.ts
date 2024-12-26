import { z } from "zod";
import { ServiceCategory } from "@prisma/client";


// Define a schema to validate the image file without relying on the File class
export const fileSchema = z
  .any()
  .refine(
    (file) =>
      file &&
      typeof file === "object" &&
      "size" in file &&
      "type" in file &&
      typeof file.size === "number" &&
      typeof file.type === "string",
    { message: "File is required." }
  )
  .refine(
    (file) => file.size > 0 && file.type.startsWith("image/"),
    { message: "Valid image is required." }
  );

// Zod schema for adding a service
export const addSchema = z.object({
  title: z.string().min(1, { message: "Name is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  image: fileSchema,
  category: z
    .enum(["INDIVIDUAL", "BUSINESS"])
    .transform((val) => val as ServiceCategory),
});
