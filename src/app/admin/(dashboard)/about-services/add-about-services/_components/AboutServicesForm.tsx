// src/app/admin/(dashboard)/about-services/_components/AboutServicesForm.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { getImageSrc } from "@/lib/imageHelper";
import { Prisma } from "@prisma/client";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import DeleteButton from "@/app/admin/components/DeleteButton";
import { ContentState, convertFromHTML, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import RichTextEditor from "@/components/RichTextEditor";

type AboutOurServices = Prisma.AboutOurServicesGetPayload<object>;

interface AboutServiceFormProps {
  aboutServices?: AboutOurServices | null;
}

export default function AboutOurServicesForm({
  aboutServices,
}: AboutServiceFormProps) {
  const router = useRouter();

  // Ref to track if the component is mounted
  const isMounted = useRef(true);

  const [currentImageSrc, setCurrentImageSrc] = useState<File | string>(
    aboutServices?.aboutimage || ""
  );

  const [title, setTitle] = useState(aboutServices?.title || "");
  // Draft.js rich text editor state
  const [descriptionEditorState, setDescriptionEditorState] =
    useState<EditorState>(EditorState.createEmpty());

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Mark as mounted
    isMounted.current = true;

    if (aboutServices?.aboutimage) {
      const imageSrc = getImageSrc(aboutServices.aboutimage);
      setCurrentImageSrc(imageSrc);
    }
     // If we have an HTML description, convert to DraftJS EditorState
     if (aboutServices?.description) {
      const blocksFromHTML = convertFromHTML(aboutServices.description);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      setDescriptionEditorState(EditorState.createWithContent(contentState));
    }
    return () => {
      isMounted.current = false;
    };
  }, [aboutServices]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCurrentImageSrc(e.target.files[0]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Convert Draft.js state to HTML
    let descriptionHTML = "";
    if (descriptionEditorState) {
      const raw = convertToRaw(descriptionEditorState.getCurrentContent());
      descriptionHTML = draftToHtml(raw);
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", descriptionHTML);

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
    try {
      const res = await fetch(apiEndpoint, {
        method: aboutServices ? "PUT" : "POST",
        body: formData,
      });

      if (res.ok) {
        if (isMounted.current) {
          router.push("/admin/about-services");
        }
      } else {
        const errorData = await res.json();
        console.error("Failed to save about services:", errorData.error);
        if (isMounted.current) {
          setError(errorData.error || "Failed to save about services.");
        }
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err);
      if (isMounted.current) {
        setError("An unexpected error occurred.");
      }
    } finally {
      if (isMounted.current) {
        setIsSubmitting(false);
      }
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
                      <RichTextEditor
                          editorState={descriptionEditorState}
                          onEditorStateChange={setDescriptionEditorState}
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

          <div className="flex items-center gap-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
            {aboutServices && (
              <DeleteButton
                apiEndpoint={`/api/aboutServices/delete/${aboutServices.id}`}
                itemId={aboutServices.id}
                confirmMessage="Are you sure you want to delete this About Our Services?"
                successMessage="About Our Services deleted successfully!"
                errorMessage="Failed to delete this About Our Services."
                redirectPath="/admin/about-services" // Dynamic redirect path
                variant="destructive"
                buttonText="Delete"
              />
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
