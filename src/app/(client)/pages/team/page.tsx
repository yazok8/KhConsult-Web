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
          <Card className="w-full max-w-lg border border-destructive/20">
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
    <Container id="team" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-white dark:bg-slate-900" />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative py-16 md:py-24 space-y-16"
      >
        {/* Header Section */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white">
              Meet Our Team
            </h1>
            <div className="mt-4 flex justify-center">
              <div className="h-1 w-20 bg-slate-200 dark:bg-slate-700 rounded-full" />
            </div>
          </motion.div>
        </div>

        {/* Team Content */}
        <Suspense fallback={<TeamSkeleton />}>
          {isLoading ? (
            <TeamSkeleton />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`
                ${team?.length === 1 
                  ? 'max-w-4xl mx-auto w-full' 
                  : team?.length === 2 
                  ? 'grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-8'
                  : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-8'
                }
              `}
            >
              {team?.map((member, index) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  index={index}
                  isAlone={team.length === 1}
                />
              ))}
            </motion.div>
          )}
        </Suspense>
      </motion.div>
    </Container>
  );
}