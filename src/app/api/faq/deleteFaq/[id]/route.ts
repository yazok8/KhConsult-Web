import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


interface IParams{
    params:{
        id:string
    }
}

//Delete a single faq
export async function DELETE(_req:Request,{ params}:IParams){
    try{
        const {id} = params;
        const deletedFaq = await prisma.faq.delete({
            where:{
                id
            }
        });
        return NextResponse.json(deletedFaq);
    }catch(err){
        console.log(err);
        return NextResponse.json({err:"failed to delete faq"}, {status:500});
    }
}