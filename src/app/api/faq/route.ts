import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'; 

export async function GET(){
    try{
        const faqs = await prisma.faq.findMany();
        return NextResponse.json(faqs, {
            status: 200,
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            },
        });
    }catch(err){
        console.log(err);
        return NextResponse.json({err:"failed to fetch faq questions"}, {status:500});
    }
}