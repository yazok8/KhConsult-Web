// components/FaqForm.tsx

"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { toast } from "react-hot-toast"; // Import toast
import DeleteButton from "@/app/admin/components/DeleteButton";
import { faq } from "@prisma/client"; // Directly import Faq type
import RichTextEditor from "@/components/RichTextEditor";

interface FaqFormProps {
  faq?: faq | null;
}

export default function FaqForm({ faq }: FaqFormProps) {
  const router = useRouter();

  // Ref to track if the component is mounted
  const isMounted = useRef<boolean>(false);

  // State variables
  const [question, setQuestion] = useState<string>(faq?.question || "");
  const [answer, setAnswer] = useState<string>(
    faq?.answer || ""
  );
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  /**
   * Effect to handle component mount and unmount
   */
  useEffect(() => {
    isMounted.current = true;

    // If editing and we have an answer, load it into the editor
    if (faq?.answer) {
     setAnswer(faq.answer)
    }
    // Cleanup function to mark as unmounted
    return () => {
      isMounted.current = false;
    };
  }, [faq]);

  /**
   * Handle form submission
   */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Prepare form data
    const formData = new FormData();
    formData.append("question", question);
    formData.append("answer", answer);

    // Determine API endpoint and method
    const apiEndpoint = faq
      ? `/api/faq/editFaq/${faq.id}`
      : "/api/faq/addFaq";
    const method = faq ? "PUT" : "POST";

    try {
      const res = await fetch(apiEndpoint, {
        method: method,
        body: formData,
      });

      if (res.ok) {
        toast.success("FAQ saved successfully!");
        // Redirect after a short delay
        setTimeout(() => {
          if (isMounted.current) {
            router.push("/admin/faq");
          }
        }, 2000); // 2 seconds delay
      } else {
        const errorData = await res.json();
        console.error("Failed to save FAQ:", errorData.error);
        if (isMounted.current) {
          setError(errorData.error || "Failed to save FAQ.");
        }
        toast.error(errorData.error || "Failed to save FAQ.");
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err);
      if (isMounted.current) {
        setError("An unexpected error occurred.");
      }
      toast.error("Failed to save FAQ.");
    } finally {
      if (isMounted.current) {
        setIsSubmitting(false);
      }
    }
  }

  return (
    <Card className="mt-20 border-none">
      <CardHeader>
        <CardTitle>{faq ? "Edit FAQ" : "Create A New FAQ"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {/* Question */}
          <div className="py-5 space-y-2">
            <Label htmlFor="question">Question</Label>
            <Input
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Answer */}
          <div className="py-5 space-y-2 flex flex-col">
            <Label htmlFor="answer">Answer</Label>
            <RichTextEditor
                                content={answer}
                                onChange={setAnswer}
                        />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
            {faq && (
              <DeleteButton
                apiEndpoint={`/api/faq/deleteFaq/${faq.id}`}
                itemId={faq.id}
                confirmMessage="Are you sure you want to delete this FAQ?"
                successMessage="FAQ deleted successfully!"
                errorMessage="Failed to delete FAQ."
                redirectPath="/admin/faq" // Dynamic redirect path
                variant="destructive"
                buttonText="Delete"
              />
            )}
          </div>

          {/* Display Error Message */}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </CardContent>
    </Card>
  );
}
