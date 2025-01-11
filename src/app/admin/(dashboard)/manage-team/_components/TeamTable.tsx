"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AboutOurTeam } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IoMdAdd } from "react-icons/io";


export default function TeamTable() {
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
      <div className="mx-auto flex flex-col mt-36">
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
                <div key={teamMember.id} className=" mb-4">
                   <Link href={`/admin/manage-team/edit-team/${teamMember.id}`} className="flex flex-col md:flex-row space-x-12">
                  <div className="max-w-1/4">
                      
                    <li>
                      <span className="font-semibold">Name:</span> {teamMember.name}
                    </li>
                    <li>
                      <span className="font-semibold">Title:</span> {teamMember.title}
                    </li>
                    <li>
                    <span className="font-semibold">Description:</span> {teamMember.description}
                    </li>
                  </div>
                  <div className="contents">
                    {teamMember.profileImage ? (
                      <Image
                        src={`https://khconsult.s3.us-east-2.amazonaws.com/${teamMember.profileImage}`}
                        alt={teamMember.title}
                        width={400}
                        height={400}
                        className="object-cover rounded mx-auto"
                      />
                      
                    ) : (
                      <div className="w-50 h-50 bg-gray-200 flex items-center justify-center">
                        <span>No Image</span>
                      </div>
                    )}
                    
                  </div>
                  </Link>
                </div>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    )
}
