import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


interface IParams{
    params:{
        id:string
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