// components/ServiceForm.tsx

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { Service } from "@prisma/client";
import { getImageSrc } from "@/lib/imageHelper";

import { useIsMounted } from "@/app/hooks/useIsMounted";
import DeleteButton from "@/app/admin/components/DeleteButton";

type ServiceType = Service;

interface ServiceFormProps {
  service?: ServiceType | null;
}

// Dynamically import RichTextEditor with SSR disabled
const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const ServiceForm: React.FC<ServiceFormProps> = ({ service }) => {
  type Category = "INDIVIDUAL" | "BUSINESS";

  const router = useRouter();

  // Use custom hook to track if the component is mounted
  const isMounted = useIsMounted();

  // Image state (File | string for existing image path)
  const [currentImageSrc, setCurrentImageSrc] = useState<File | string>("");

  // Other text inputs
  const [title, setTitle] = useState<string>(service?.title || "");
  const [category, setCategory] = useState<Category>(
    service?.category || "INDIVIDUAL"
  );

  // Description state (HTML string)
  const [description, setDescription] = useState<string>(
    service?.description || ""
  );

  // Error and submission status
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  /**
   * Effect to handle component mount and unmount
   */
  useEffect(() => {
    if (service?.imageSrc) {
      setCurrentImageSrc(getImageSrc(service.imageSrc));
    }

    if (service?.description) {
      setDescription(service.description);
    }

    // No additional setup required for TipTap
  }, [service]);

  /**
   * Handle file input change
   */
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCurrentImageSrc(e.target.files[0]);
    }
  }

  /**
   * On submit, send the form data to the API
   */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Create an AbortController instance for this fetch
    const controller = new AbortController();
    const signal = controller.signal;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    // Handle file or existing image path
    if (typeof currentImageSrc === "object" && currentImageSrc instanceof File) {
      formData.append("image", currentImageSrc);
    } else if (service && typeof currentImageSrc === "string") {
      // If editing and not changing the image, send existing imageSrc
      formData.append("imageSrc", service.imageSrc);
    }

    const baseUrl = process.env.NEXT_PUBLIC_PROD_URL ?? "http://localhost:3000"; 

    const apiEndpoint = service
    ? `${baseUrl}/api/services/editService/${service.id}`
    : `${baseUrl}/api/services/addService`;

    try {
      const res = await fetch(apiEndpoint, {
        method: service ? "PUT" : "POST",
        body: formData,
        signal: signal, // Attach the signal here
      });

      if (!isMounted.current) return; // Prevent further actions if unmounted

      if (res.ok) {
        if (isMounted.current) {
          router.push("/admin/manage-services");
        }
      } else {
        const errorData = await res.json();
        console.error("Failed to save service:", errorData.error);
        if (isMounted.current) {
          setError(errorData.error || "Failed to save service.");
        }
      }
    } catch (err: unknown) {
      if(err instanceof Error){
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("An unexpected error occurred:", err);
          if (isMounted.current) {
            setError("An unexpected error occurred.");
          }
        }
      }
 
    } finally {
      if (isMounted.current) {
        setIsSubmitting(false);
      }
    }

    // Optionally, abort the fetch if needed
    // return () => controller.abort();
  }

  /**
   * Handle Image onError to fallback to a default image
   */
  function handleImageError() {
    if (isMounted.current && service?.imageSrc) {
      const sanitizedImagePath = service.imageSrc.startsWith("/")
        ? service.imageSrc.slice(1)
        : service.imageSrc;
      const localImageUrl = `/services/${sanitizedImagePath}`;
      setCurrentImageSrc(localImageUrl);
    }
  }

  return (
    <div className="mt-20">
    <Card className="border-none">
      <CardHeader>
        <CardTitle>
          {service ? "Edit Service" : "Create A New Service"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="py-5 space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Description (Rich Text) */}
          <div className="py-5 space-y-2 flex flex-col">
            <Label htmlFor="description">Description</Label>
            {isMounted.current && (
              <RichTextEditor
                content={description}
                onChange={setDescription}
              />
            )}
          </div>

          {/* File Input */}
          <div className="space-y-2">
            <Label htmlFor="image">Image (File)</Label>
            <Input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              required={!service}
              onChange={handleFileChange}
              disabled={isSubmitting}
            />
          </div>

          {/* Existing Image Preview (only if editing and image is a string) */}
          {service != null &&
            typeof currentImageSrc === "string" &&
            currentImageSrc !== "" && (
              <div className="my-4">
                <Image
                  src={
                    currentImageSrc.startsWith("http")
                      ? currentImageSrc
                      : `${currentImageSrc}`
                  }
                  height={400}
                  width={400}
                  alt="Service Image"
                  className="rounded-lg"
                  onError={handleImageError}
                />
              </div>
            )}

          {/* Category */}
          <div className="py-5 space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="block w-full p-2 border border-gray-300 rounded"
              disabled={isSubmitting}
            >
              <option value="INDIVIDUAL">Individual</option>
              <option value="BUSINESS">Business</option>
            </select>
          </div>

          {/* Display Error Message */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Submit & Delete Buttons */}
          <div className="flex items-center gap-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
            {isMounted.current && service && (
              <DeleteButton
                apiEndpoint={`/api/services/deleteService/${service.id}`}
                itemId={service.id}
                confirmMessage="Are you sure you want to delete this Service?"
                successMessage="Service deleted successfully!"
                errorMessage="Failed to delete this Service."
                redirectPath="/admin/manage-services"
                variant="destructive"
                buttonText="Delete"
              />
            )}
          </div>
        </form>
      </CardContent>
    </Card>
    </div>
  );
};

export default ServiceForm;
