import prisma from "@/lib/prisma";
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

