import { AddService } from "@/app/admin/actions/services";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const services = await prisma.service.findMany();
        return NextResponse.json(services);
    }catch(err){
        console.log(err);
        return NextResponse.json({err:"failed to fetch services"}, {status:500});
    }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const service = await AddService(formData);
    return NextResponse.json(service, { status: 201 });
  } catch (err) {
    console.error("Error creating service:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create service" },
      { status: 500 }
    );
  }
}