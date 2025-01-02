"use client";

import { SignInFormValues, signInSchema } from "@/lib/validations/signIn";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";


// Define the AdminSignIn component
export default function AdminSignIn() {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    register,
    setError, // Destructure setError to manually set form errors
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
      isAdmin: "false", // Set default value to "true"
    },
  });

  async function onSubmit(values: SignInFormValues) {
    const callbackUrl = "/admin";
    const signinCreds = await signIn("credentials", {
      identifier: values.identifier,
      password: values.password,
      redirect: false,
      callbackUrl,  
      isAdmin: values.isAdmin, // Pass 'isAdmin' as part of the credentials
    });

    if (signinCreds?.error) {
      switch (signinCreds.error) {
        case "UserNotFound":
          setError("identifier", {
            type: "manual",
            message: "User does not exist.",
          });
          break;
        case "InvalidPassword":
          setError("password", {
            type: "manual",
            message: "Incorrect password.",
          });
          break;
        case "NotAdmin":
          setError("identifier", {
            type: "manual",
            message: "You do not have admin access.",
          });
          break;
        case "MissingCredentials":
          toast.error("Please provide both email/username and password.");
          break;
        case "NoPasswordSet":
          toast.error("No password is set for this user.");
          break;
        default:
          toast.error("Invalid credentials or you do not have admin access.");
      }
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[85vh] overflow-hidden p-5">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="sign-in-form">
          <div className="max-w-sm mb-4">
            <Label htmlFor="identifier">Email or Username</Label>
            <Input
              id="identifier"
              type="text"
              {...register("identifier")}
              placeholder="Enter your admin email or username"
              className={errors.identifier ? "border-red-500" : ""}
            />
            {errors.identifier && (
              <p className="text-red-500 mt-1">{errors.identifier.message}</p>
            )}
          </div>

          <div className="max-w-sm mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <p className="text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>
          <p className="text-xs">if you don&apos;t have an account click <a className="text-blue-600 hover:cursor-pointer hover:underline" href="/admin/auth/sign-up">here</a> to Sign Up</p>

          {/* Hidden field to indicate admin sign-in */}
          <input type="hidden" value="true" {...register("isAdmin")} />
          

          <div className="mt-4">
            <Button type="submit">Admin Sign in</Button>
          </div>
        </form>
      </div>
    </div>
  );
}