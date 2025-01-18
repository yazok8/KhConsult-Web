import { editTeam } from "@/app/admin/actions/team";
import { NextRequest, NextResponse } from "next/server";
import { getCORSHeaders } from "@/app/utils/apiConfig"; 

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  return NextResponse.json(null, { headers: getCORSHeaders(origin) });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const origin = req.headers.get("origin");
  try {
    const updatedTeam = await editTeam(req, { params });
    return NextResponse.json(updatedTeam, { 
      status: 200,
      headers: getCORSHeaders(origin)
    });
  } catch (err) {
    console.error("Error updating team member:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update team member" },
      { 
        status: 500,
        headers: getCORSHeaders(origin)
      }
    );
  }
}
