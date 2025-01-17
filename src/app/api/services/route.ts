import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const services = await prisma.service.findMany();
        return NextResponse.json(services, {
            status: 200,
            headers: {
              "Cache-Control": "no-store, max-age=0",
            },
          });
    }catch(err){
        console.log(err);
        return NextResponse.json({err:"failed to fetch services"}, {status:500});
    }
}

