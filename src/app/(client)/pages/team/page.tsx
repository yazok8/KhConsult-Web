"use client";

import Container from '@/app/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AboutOurTeam } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";

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
    <Container id="team">
      <Card className="border-none">
        <CardHeader>
          <CardTitle className="text-6xl">About Our Team</CardTitle>
        </CardHeader>
        <CardContent className="flex">
          <div className="py-5 mr-auto"></div>
          <ul>
            {team.map((teamMember) => (
              <div
                key={teamMember.id}
                className="flex justify-between flex-wrap mb-4"
              >
                <div className="md:max-w-[50%] text-2xl">
                  <li className="font-bold">{teamMember.name}</li>
                  <li className="font-bold">{teamMember.title}</li>
                  <li
                            dangerouslySetInnerHTML={{ __html: teamMember.description ?? "" }}
                  ></li>
                </div>
                <div>
                  {teamMember.profileImage ? (
                    <Image
                      src={`https://khconsult.s3.us-east-2.amazonaws.com/${teamMember.profileImage}`}
                      alt={teamMember.title}
                      width={300}
                      height={300}
                      className="object-cover rounded"
                    />
                  ) : (
                    <div className="w-full md:w-50 h-50 bg-gray-200 flex items-center justify-center">
                      <span>No Image</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </ul>
        </CardContent>
      </Card>
    </Container>
  );
}
