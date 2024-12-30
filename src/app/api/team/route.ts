//src/app/api/services/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const services = await prisma.aboutOurTeam.findMany();
        return NextResponse.json(services);
    }catch(err){
        console.log(err);
        return NextResponse.json({err:"failed to fetch services"}, {status:500});
    }
}

