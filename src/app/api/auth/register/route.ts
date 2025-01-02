
import resgiserUser from "@/app/admin/actions/auth";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
      // Just pass the entire `req` to your function
      const result = await resgiserUser(req);
      return NextResponse.json(result, { status: 201 });
    } catch (err) {
      console.error("Error creating service:", err);
      return NextResponse.json(
        { error: err instanceof Error ? err.message : "Failed to create service" },
        { status: 500 }
      );
    }
  }