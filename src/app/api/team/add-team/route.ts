// src/app/api/team/add-team/route.ts

import { addToTeam } from "@/app/admin/actions/team";
import { NextResponse } from "next/server";

/**
 * Handles POST requests to add a new team member.
 * @param req The incoming request containing form data.
 * @returns A JSON response with the created team member or an error message.
 */
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const team = await addToTeam(formData);
    return NextResponse.json(team, { status: 201 });
  } catch (err) {
    console.error("Error creating team:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create team" },
      { status: 500 }
    );
  }
}
