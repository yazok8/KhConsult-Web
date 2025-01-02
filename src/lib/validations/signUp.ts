import { z } from "zod";

export type SignUpValues = z.infer<typeof signUpSchema>;

export const signUpSchema = z.object({
    name: z.string().min(1, "Name is required"),
    username:z.string().min(1, "Username is required"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(8, "Password must have minimum 8 characters"),
  });
  