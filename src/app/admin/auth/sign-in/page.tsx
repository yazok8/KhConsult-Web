"use client";

import { useState } from "react";
import { SignInFormValues, signInSchema } from "@/lib/validations/signIn";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export default function AdminSignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
      isAdmin: "false",
    },
  });

  async function onSubmit(values: SignInFormValues) {
    setIsLoading(true);
    try {
      const callbackUrl = "/admin";
      const signinCreds = await signIn("credentials", {
        identifier: values.identifier,
        password: values.password,
        redirect: false,
        callbackUrl,  
        isAdmin: values.isAdmin,
      });

      if (signinCreds?.error) {
        switch (signinCreds.error) {
          case "UserNotFound":
            toast.error("User does not exist.");
            break;
          case "InvalidPassword":
            toast.error("Incorrect password.");
            break;
          case "NotAdmin":
            toast.error("You do not have admin access.");
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
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Sign-in error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center overflow-hidden p-5">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <Card className="border-none shadow-none">
          <CardHeader className="pl-0">
            <CardTitle className="flex justify-center">Kh Consult - Admin Sign In</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="sign-in-form">
            <div className="max-w-sm mb-4">
              <Label htmlFor="identifier">Email or Username</Label>
              <Input
                id="identifier"
                type="text"
                {...register("identifier")}
                placeholder="Enter your admin email or username"
                className={errors.identifier ? "border-red-500" : ""}
                disabled={isLoading}
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
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>
            <p className="text-xs">
              If you don&apos;t have an account, click{" "}
              <a
                className="text-blue-600 hover:cursor-pointer hover:underline"
                href="/admin/auth/sign-up"
              >
                here
              </a>{" "}
              to Sign Up
            </p>

            {/* Hidden field to indicate admin sign-in */}
            <input type="hidden" value="true" {...register("isAdmin")} />

            <div className="mt-4 relative">
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Spinner className="mr-2" /> Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
