"use client";
import useSWR from "swr";
import Container from "@/app/ui/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AboutOurTeam } from "@prisma/client";
import Image from "next/image";

export default function TeamPage() {
  const fetcher = (url: string) => fetch(url, { cache: "no-store" }).then(r => r.json());

  const { data: team, error } = useSWR<AboutOurTeam[]>("/api/team", fetcher);

  if (error) {
    return <p>Failed to load team data: {error.message}</p>;
  }
  if (!team) {
    return <p>Loading team data...</p>;
  }

  return (
    <Container id="team">
      <Card className="border-none">
        <CardHeader>
          <CardTitle className="text-6xl">About Our Team</CardTitle>
        </CardHeader>
        <CardContent className="flex">
          <div className="py-5 mr-auto"></div>
          <ul>
            {team.map((member) => (
              <div
                key={member.id}
                className="flex justify-between flex-wrap mb-4"
              >
                <div className="md:max-w-[50%] text-2xl">
                  <li className="font-bold">{member.name}</li>
                  <li className="font-bold">{member.title}</li>
                  <li
                    dangerouslySetInnerHTML={{
                      __html: member.description ?? "",
                    }}
                  />
                </div>
                <div>
                  {member.profileImage ? (
                    <Image
                      src={`https://khconsult.s3.us-east-2.amazonaws.com/${member.profileImage}`}
                      alt={member.title}
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
