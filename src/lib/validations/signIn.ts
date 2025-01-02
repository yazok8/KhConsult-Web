import { z } from "zod";


export type SignInFormValues = z.infer<typeof signInSchema>;

export const signInSchema = z.object({
    identifier: z.string().min(1, "Email or Username is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have minimum 8 characters"),
    isAdmin: z.literal("false"), // Ensure isAdmin is always "true" for admin sign-in
  });