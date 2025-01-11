// TeamTable.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";

interface TeamMember {
  id: string;
  name: string;
  title: string;
  description: string;
  profileImage: string | null;
}

function TeamTable() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch("/api/team");
        if (!res.ok) {
          throw new Error("Failed to fetch team members.");
        }
        const data: TeamMember[] = await res.json();
        setTeam(data);
      } catch (err) {
        console.error("Error fetching team members:", err);
        setError("Unable to load team members at this time.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading team members...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex flex-col max-w-6xl mt-20 px-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Our Team</CardTitle>
        </CardHeader>
        <CardContent className="px-2 lg:p-6">
          <div className="flex justify-end mb-5">
            <Link href="/admin/manage-team/add-team">
              <div className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
                <IoMdAdd size={24} />
                <span>Add Team Member</span>
              </div>
            </Link>
          </div>

          {error ? (
            <p className="text-red-500">{error}</p>
          ) : team.length === 0 ? (
            <p className="text-gray-500">No team members available.</p>
          ) : (
            <ul className="space-y-4">
              {team.map((member) => (
                <li
                  key={member.id}
                  className="bg-white rounded-lg p-0 lg:p-4 hover:bg-gray-50 transition"
                >
                  <Link href={`/admin/manage-team/edit-team/${member.id}`}>
                    <div className="flex flex-col-reverse lg:flex-row items-center space-x-4">
                      {/* Team Member Details */}
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold text-gray-800">
                          {member.name}
                        </h2>
                        <p className="text-gray-600 mt-2">{member.title}</p>
                        <p className="text-gray-600 mt-1">
                          {member.description}
                        </p>
                      </div>

                      {/* Team Member Image */}
                      <div className="flex-shrink-0 my-4">
                        {member.profileImage ? (
                          <Image
                            src={`https://khconsult.s3.us-east-2.amazonaws.com/${member.profileImage}`}
                            alt={member.name}
                            width={200}
                            height={200}
                            className="object-cover rounded-full"
                          />
                        ) : (
                          <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded-full">
                            <span className="text-gray-500">No Image</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default TeamTable;
