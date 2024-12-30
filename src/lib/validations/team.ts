// src/lib/validations/team.ts

import { z } from "zod";

export const fileSchema = z
  .any()
  .optional() // Make the entire file optional
  .refine(
    (file) =>
      !file || // If no file is provided, skip this validation
      (typeof file === "object" &&
        "size" in file &&
        "type" in file &&
        typeof file.size === "number" &&
        typeof file.type === "string"),
    { message: "Invalid file format." }
  )
  .refine(
    (file) =>
      !file || // If no file is provided, skip this validation
      (file.size > 0 && file.type.startsWith("image/")),
    { message: "Valid image is required." }
  );

// Zod schema for adding a service
export const addSchema = z.object({
  name:z.string().min(1, { message: "Name is required." }),
  title: z.string().min(1, { message: "Title is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  image: fileSchema, // This field is now optional
});
