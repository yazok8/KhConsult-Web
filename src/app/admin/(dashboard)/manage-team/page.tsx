// src/app/admin/(dashboard)/teams/page.tsx
"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AboutOurTeam } from "@prisma/client";
import { IoMdAdd } from "react-icons/io";

export default function TeamPage() {
  const [team, setTeam] = useState<AboutOurTeam[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/team");
      if (res.ok) {
        const data = await res.json();
        setTeam(data);
      } else {
        console.error("Failed to fetch team data.");
      }
    })();
  }, []);

  return (
    <div className="mx-auto flex flex-col">
      <Card>
        <CardHeader>
          <CardTitle>Our Team</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-5 mr-auto">
            <Link href="/admin/manage-team/add-team">
            <IoMdAdd size='20' />
            </Link>
          </div>
          <ul>
            {team.map((teamMember) => (
              <div key={teamMember.id} className="flex justify-around flex-wrap mb-4">
                <div className="max-w-1/4">
                  <Link href={`/admin/manage-team/edit-team/${teamMember.id}`} className="text-blue-500 underline">
                    Edit
                  </Link>
                  <li>
                    <span className="font-semibold">Name:</span> {teamMember.name}
                  </li>
                  <li>
                    <span className="font-semibold">Title:</span> {teamMember.title}
                  </li>
                </div>
                <div className="my-5">
                  {teamMember.profileImage ? (
                    <Image
                      src={`https://khconsult.s3.us-east-2.amazonaws.com/${teamMember.profileImage}`}
                      alt={teamMember.title}
                      width={200}
                      height={200}
                      className="object-cover rounded"
                    />
                  ) : (
                    <div className="w-50 h-50 bg-gray-200 flex items-center justify-center">
                      <span>No Image</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
