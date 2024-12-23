import prisma from "@/lib/prisma";
import { ServiceCategory } from "@prisma/client";
import { NextResponse } from "next/server";


interface IParams{
    params:{
        id:string
    }
}
//Get a single service
export async function GET(_req:Request,{ params}:IParams){
    try{
        const {id} = await params;

        const service = await prisma.service.findUnique({
            where:{
                id
            }
        });
        if(!service){
            return NextResponse.json({err:"Service not found"}, {status:404});
        }   
        return NextResponse.json(service);
    }catch(err){
        console.log(err);
        return NextResponse.json({err:"failed to fetch service"}, {status:500});
    }
}

//Update a single service
export async function PUT(req:Request, {params}:IParams){
    try{
        const {id} = await params;
        const body = await req.json();
        const {title, description, imageSrc, category}=body;

        if(!title || !description ){
            return NextResponse.json({err:"Title and description are required"}, {status:400});
        }
        const updatedService = await prisma.service.update({
            where:{
                id
            },
            data:{
                title,
                description,
                imageSrc,
                category: category as ServiceCategory
            }
        });
        return NextResponse.json(updatedService);
    }catch(err){
        console.log(err);
        return NextResponse.json({err:"failed to update service"}, {status:500});
    }
}

//Delete a single service
export async function DELETE(_req:Request,{ params}:IParams){
    try{
        const {id} = params;
        const deletedService = await prisma.service.delete({
            where:{
                id
            }
        });
        return NextResponse.json(deletedService);
    }catch(err){
        console.log(err);
        return NextResponse.json({err:"failed to delete service"}, {status:500});
    }
}