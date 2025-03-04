"use client";

import { useTeam } from "@/app/hooks/useTeam";
import { Card, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { TeamSkeleton } from "@/app/(client)/pages/team/components/TeamSkeleton";
import { TeamMemberCard } from "@/app/(client)/pages/team/components/TeamMemberCard";

function TeamTable() {
  const { team, error, isLoading, mutate } = useTeam();

  // Refresh data when component mounts and periodically
  useEffect(() => {
    mutate();

    const interval = setInterval(() => {
      mutate();
    }, 5000);

    return () => clearInterval(interval);
  }, [mutate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading team members...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">
          Error loading team members: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex flex-col max-w-6xl px-5">
      <Card>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative py-20 md:pt-6 md:pb-9 space-y-16"
        >
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CardTitle className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white relative z-10">
                My Story
              </CardTitle>
              <div className="mt-4 flex justify-center">
                <div className="h-1 w-20 bg-slate-200 dark:bg-slate-700 rounded-full" />
              </div>
            </motion.div>
            <Suspense fallback={<TeamSkeleton />}>
              {isLoading ? (
                <TeamSkeleton />
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className={`
                          ${
                            team?.length === 1
                              ? "max-w-4xl mx-auto w-full"
                              : team?.length === 2
                              ? "grid grid-cols-1 md:grid-cols-2 max-[1005px]:grid-cols-none max-[1005px]:flex max-[1005px]:flex-col max-w-5xl mx-auto gap-8"
                              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-[1005px]:grid-cols-none max-[1005px]:flex max-[1005px]:flex-col max-w-7xl mx-auto gap-8"
                          }
                        `}
                >
                  {team?.map((member, index) => (
                    <Link href={`/admin/manage-team/edit-team/${member.id}`}>
                      <TeamMemberCard
                        key={member.id}
                        member={member}
                        index={index}
                        isAlone={team.length === 1}
                      />
                    </Link>
                  ))}
                </motion.div>
              )}
            </Suspense>
          </div>
        </motion.div>
      </Card>
    </div>
  );
}

export default TeamTable;
