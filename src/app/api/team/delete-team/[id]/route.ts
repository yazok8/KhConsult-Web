import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


interface IParams{
    params:{
        id:string
    }
}

//Delete a single team
export async function DELETE(_req:Request,{ params}:IParams){
    try{
        const {id} = params;
        const deletedTeamMember = await prisma.aboutOurTeam.delete({
            where:{
                id
            }
        });
        return NextResponse.json(deletedTeamMember, {status:200});
    }catch(err){
        console.log(err);
        return NextResponse.json({err:"failed to delete team member"}, {status:500});
    }
}