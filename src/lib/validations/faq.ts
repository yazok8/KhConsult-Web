// src/lib/validations/aboutServices.ts

import { z } from "zod";

// Zod schema for adding an faq
export const addSchema = z.object({
  question: z.string().min(1, { message: "Question is required." }),
  answer: z.string().min(1, { message: "Answer is required." }),
});
