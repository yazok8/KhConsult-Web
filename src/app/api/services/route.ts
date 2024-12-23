import prisma from "@/lib/prisma";
import { ServiceCategory } from "@prisma/client";
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

export async function POST(req:Request){
    try{
        const body = await req.json();
        const {title, description, imageSrc, category}=body;

        if(!title || !description ){
            return NextResponse.json({err:"Title and description are required"}, {status:400});
        }
        const newServce = await prisma.service.create({
            data:{
                title,
                description,
                imageSrc,
                category: category as ServiceCategory || "INDIVIDUAL"
            }
        });
        return NextResponse.json(newServce);
    }catch(err){
        console.log(err);
        return NextResponse.json({err:"failed to create service"}, {status:500});
    }
}