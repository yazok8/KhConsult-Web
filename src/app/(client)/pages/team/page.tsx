"use client";

import { Suspense } from "react";
import useSWR from "swr";
import Container from "@/components/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AboutOurTeam } from '@/types/team';
import { motion } from "framer-motion";
import { TeamMemberCard } from "./components/TeamMemberCard";
import { TeamSkeleton } from "./components/TeamSkeleton";

const fetcher = (url: string) => 
  fetch(url, { 
    next: { 
      revalidate: 30 // Revalidate every 30 seconds
    } 
  }).then(r => {
    if (!r.ok) throw new Error('Failed to fetch team data');
    return r.json();
  });

export default function TeamPage() {
  const { data: team, error, isLoading } = useSWR<AboutOurTeam[]>(
    "/api/team",
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  if (error) {
    return (
      <Container>
        <div className="min-h-[50vh] flex items-center justify-center">
          <Card className="w-full max-w-lg">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <h2 className="text-xl font-semibold text-destructive">Error Loading Team</h2>
                <p className="text-muted-foreground">{error.message}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    );
  }

  return (
    <Container id="team">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-12 md:py-20"
      >
        <Card className="border-none bg-gradient-to-b from-background to-muted/50">
          <CardHeader className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CardTitle className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Meet Our Team
              </CardTitle>
            </motion.div>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<TeamSkeleton />}>
              {isLoading ? (
                <TeamSkeleton />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {team?.map((member, index) => (
                    <TeamMemberCard
                      key={member.id}
                      member={member}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </Suspense>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
}