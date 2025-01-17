import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'; // Disable static optimization

export async function GET() {
    try {
        const services = await prisma.service.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        
        return NextResponse.json(services, {
            status: 200,
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            },
        });
    } catch (err) {
        console.error("Error fetching services:", err);
        return NextResponse.json(
            { error: "Failed to fetch services" }, 
            { status: 500 }
        );
    }
}