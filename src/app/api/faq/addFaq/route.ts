import addFaqQuestion from "@/app/admin/actions/faq";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      const formData = await req.formData();
      const faqQuestion = await addFaqQuestion(formData);
      return NextResponse.json(faqQuestion, { status: 201 });
    } catch (err) {
      console.error("Error creating faq question:", err);
      return NextResponse.json(
        { error: err instanceof Error ? err.message : "Failed to create faq question" },
        { status: 500 }
      );
    }
  }