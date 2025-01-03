"use client";

import { useState} from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Prisma } from "@prisma/client";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";

type Faq = Prisma.faqGetPayload<object>;

interface FaqFormProps {
  faq?: Faq | null;
}

export default function FaqForm({
  faq,
}: FaqFormProps) {
  const router = useRouter();

  const [question, setQuestion] = useState(faq?.question || "");
  const [answer, setDescription] = useState(
    faq?.answer || ""
  );

  const [error, setError] = useState<string | null>(null);


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("question", question);
    formData.append("answer", answer);

    const apiEndpoint = faq
      ? `/api/faq/editFaq/${faq.id}`
      : "/api/faq/addFaq";

    const res = await fetch(apiEndpoint, {
      method: faq ? "PUT" : "POST",
      body: formData,
    });

    if (res.ok) {
      router.push("/admin/faq");
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
          {faq ? "Edit Faq" : "Create A New Question"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="py-5 space-y-2">
            <Label htmlFor="question">Question</Label>
            <Input
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="py-5 space-y-2 flex flex-col">
            <Label htmlFor="answer">Answer</Label>
            <Textarea
              id="answer"
              value={answer}
              onChange={(e) => setDescription(e.target.value)}
              className="border-solid border-5"
              required
            />
          </div>

          {/* Display Error Message */}
          {error && <p className="text-red-500">{error}</p>}

          <Button type="submit">Save</Button>
        </form>
      </CardContent>
    </Card>
  );
}
