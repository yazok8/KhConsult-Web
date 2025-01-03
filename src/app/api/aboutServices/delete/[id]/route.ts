import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


interface IParams{
    params:{
        id:string
    }
}

//Delete a single about service
export async function DELETE(_req:Request,{ params}:IParams){
    try{
        const {id} = params;
        const deletedAboutService = await prisma.aboutOurServices.delete({
            where:{
                id
            }
        });
        return NextResponse.json(deletedAboutService);
    }catch(err){
        console.log(err);
        return NextResponse.json({err:"failed to delete about service"}, {status:500});
    }
}