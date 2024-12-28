// src/app/admin/(dashboard)/about-services/_components/AboutServicesForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { getImageSrc } from "@/lib/imageHelper";
import { Prisma } from "@prisma/client";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

type AboutOurServices = Prisma.AboutOurServicesGetPayload<object>;

interface AboutServiceFormProps {
  aboutServices?: AboutOurServices | null;
}

export default function AboutOurServicesForm({
  aboutServices,
}: AboutServiceFormProps) {
  const router = useRouter();

  const [currentImageSrc, setCurrentImageSrc] = useState<File | string>(
    aboutServices?.aboutimage || ""
  );

  const [title, setTitle] = useState(aboutServices?.title || "");
  const [description, setDescription] = useState(
    aboutServices?.description || ""
  );

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (aboutServices?.aboutimage) {
      const imageSrc = getImageSrc(aboutServices.aboutimage);
      setCurrentImageSrc(imageSrc);
    }
  }, [aboutServices]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCurrentImageSrc(e.target.files[0]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);

    if (
      typeof currentImageSrc === "object" &&
      currentImageSrc instanceof File
    ) {
      formData.append("image", currentImageSrc);
    } else if (aboutServices && typeof currentImageSrc === "string") {
      if (aboutServices.aboutimage !== null) {
        formData.append("imageSrc", aboutServices.aboutimage);
      } else {
        formData.append("imageSrc", "");
      }
    }

    const apiEndpoint = aboutServices
      ? `/api/aboutServices/edit/${aboutServices.id}`
      : "/api/aboutServices/add";

    const res = await fetch(apiEndpoint, {
      method: aboutServices ? "PUT" : "POST",
      body: formData,
    });

    if (res.ok) {
      router.push("/admin/about-services");
    } else {
      const errorData = await res.json();
      console.error("Failed to save service:", errorData.error);
      setError(errorData.error || "Failed to save service.");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {aboutServices ? "Edit Service" : "Create A New Service"}
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
            />
          </div>

          {/* Description */}
          <div className="py-5 space-y-2 flex flex-col">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-solid border-5"
              required
            />
          </div>

          {/* File Input */}
          <div className="space-y-2">
            <Label htmlFor="image">Image (Optional)</Label>
            <Input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {/* Existing Image Preview (only if editing and image exists) */}
          {aboutServices &&
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
                  onError={() => {
                    if (!aboutServices.aboutimage) return;
                    const sanitizedImagePath =
                      aboutServices.aboutimage.startsWith("/")
                        ? aboutServices.aboutimage.slice(1)
                        : aboutServices.aboutimage;
                    const localImageUrl = `/aboutServices/${sanitizedImagePath}`;
                    setCurrentImageSrc(localImageUrl);
                  }}
                />
              </div>
            )}

          {/* Display Error Message */}
          {error && <p className="text-red-500">{error}</p>}

          <Button type="submit">Save</Button>
        </form>
      </CardContent>
    </Card>
  );
}
