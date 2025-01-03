"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Prisma } from "@prisma/client";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast"; // Import toast
import DeleteButton from "@/app/admin/components/DeleteButton";

type Faq = Prisma.faqGetPayload<object>;

interface FaqFormProps {
  faq?: Faq | null;
}

export default function FaqForm({ faq }: FaqFormProps) {
  const router = useRouter();

  const [question, setQuestion] = useState(faq?.question || "");
  const [answer, setAnswer] = useState(faq?.answer || "");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("question", question);
    formData.append("answer", answer);

    const apiEndpoint = faq
      ? `/api/faq/editFaq/${faq.id}`
      : "/api/faq/addFaq";

    try {
      const res = await fetch(apiEndpoint, {
        method: faq ? "PUT" : "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("FAQ saved successfully!");
        // Optionally, redirect after a short delay
        setTimeout(() => {
          router.push("/admin/faq");
        }, 2000); // Redirect after 2 seconds
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to save FAQ.");
      }
    } catch (error) {
      console.error("Failed to save FAQ:", error);
      toast.error("Failed to save FAQ.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
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
              disabled={isSubmitting || isDeleting}
            />
          </div>

          {/* Answer */}
          <div className="py-5 space-y-2 flex flex-col">
            <Label htmlFor="answer">Answer</Label>
            <Textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
              disabled={isSubmitting || isDeleting}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button type="submit" disabled={isSubmitting || isDeleting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
            {faq && (
              <DeleteButton
              apiEndpoint={`/api/faq/deleteFaq/${faq.id}`}
              itemId={faq.id}
              confirmMessage="Are you sure you want to delete this FAQ?"
              successMessage="FAQ deleted successfully!"
              errorMessage="Failed to delete FAQ."
              onSuccess={() => {
                // Additional actions after successful deletion (optional)
                // The hook already handles redirection or refresh
              }}
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
