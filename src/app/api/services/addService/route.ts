

import { NextResponse } from "next/server";
import { addService } from '@/app/admin/actions/services';

export async function POST(req: Request) {
    try {
      const formData = await req.formData();
      const service = await addService(formData);
      return NextResponse.json(service, { status: 201 });
    } catch (err) {
      console.error("Error creating service:", err);
      return NextResponse.json(
        { error: err instanceof Error ? err.message : "Failed to create service" },
        { status: 500 }
      );
    }
  }