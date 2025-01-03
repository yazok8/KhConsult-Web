import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const faqs = await prisma.faq.findMany();
        return NextResponse.json(faqs);
    }catch(err){
        console.log(err);
        return NextResponse.json({err:"failed to fetch faq questions"}, {status:500});
    }
}