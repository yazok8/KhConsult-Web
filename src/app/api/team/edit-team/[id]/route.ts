// src/app/api/teams/editService/[id]/route.ts

import { editTeam } from "@/app/admin/actions/team";
import { NextRequest, NextResponse } from "next/server";
/**
 * Handles PUT requests to edit an existing team member.
 * @param req The incoming request containing form data.
 * @param params The route parameters containing the team member ID.
 * @returns A JSON response with the updated team member or an error message.
 */
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const updatedTeam = await editTeam(req, { params });
      return NextResponse.json(updatedTeam, { status: 200 });
    } catch (err) {
      console.error("Error updating team member:", err);
      return NextResponse.json(
        { error: err instanceof Error ? err.message : "Failed to update team member" },
        { status: 500 }
      );
    }
  }
