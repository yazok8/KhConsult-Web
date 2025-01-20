"use client";
import useSWR from "swr";
import Container from "@/app/ui/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AboutOurTeam } from "@prisma/client";
import Image from "next/image";

export default function TeamPage() {
  const fetcher = (url: string) => fetch(url, { cache: "no-store" }).then(r => r.json());

  const { data: team, error } = useSWR<AboutOurTeam[]>("/api/team", fetcher,{
    revalidateOnFocus:true,
    revalidateOnReconnect: true,
    refreshInterval: 30_000,
  });

  if (error) {
    return <p>Failed to load team data: {error.message}</p>;
  }
  if (!team) {
    return <p>Loading team data...</p>;
  }

  return (
    <Container id="team">
      <Card className="border-none shadow-none">
        <CardHeader className='pb-3`'>
          <CardTitle className="pb-2 text-3xl md:text-5xl font-bold text-center">About Our Team</CardTitle>
        </CardHeader>
        <CardContent className="flex p-0">
          <ul>
            {team.map((member) => (
              <div
                key={member.id}
                className="flex justify-between flex-wrap mb-4"
              >
                <div className="md:max-w-[50%] text-xl md:text-2xl">
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
                      className="object-cover rounded w-[500px] md:w-[300px]"
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
