"use client";

import useSWR from "swr";
import Container from "@/components/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AboutOurTeam } from "@prisma/client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function TeamPage() {
  const fetcher = (url: string) => fetch(url, { cache: "no-store" }).then(r => r.json());

  const { data: team, error } = useSWR<AboutOurTeam[]>("/api/team", fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshInterval: 30_000,
  });

  if (error) {
    return (
      <Container>
        <p className="text-red-500 text-center py-8">
          Failed to load team data: {error.message}
        </p>
      </Container>
    );
  }

  if (!team) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 bg-[rgb(var(--primary-color))] rounded-full animate-pulse" />
      </div>
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
        <Card className="card-modern border-none bg-gradient-to-b from-white to-[rgb(var(--neutral-light))]">
          <CardHeader className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CardTitle className="text-gradient text-4xl md:text-6xl font-bold">
                About Our Team
              </CardTitle>
            </motion.div>
          </CardHeader>
          <CardContent className="space-y-16">
            {!team ? (
              <div className="w-full h-64 bg-gray-100 rounded-xl animate-pulse" />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 gap-12"
              >
                {team.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-xl p-8 duration-300"
                  >
                                <motion.div 
                      className="relative w-full md:w-1/3 min-h-[500px] md:min-h-[400px] overflow-hidden rounded-xl"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      {member.profileImage ? (
                        <Image
                          src={`https://khconsult.s3.us-east-2.amazonaws.com/${member.profileImage}`}
                          alt={member.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover object-center rounded-xl"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[rgb(var(--primary-color))] to-[rgb(var(--secondary-color))] rounded-xl flex items-center justify-center">
                          <span className="text-white text-xl">No Image</span>
                        </div>
                      )}
                    </motion.div>

                    <div className="md:w-2/3 space-y-4 mb-auto">
                      <h3 className="text-2xl font-bold text-gradient">{member.name}</h3>
                      <h4 className="text-xl font-semibold text-[rgb(var(--primary-color))]">
                        {member.title}
                      </h4>
                      <div
                        className="prose prose-lg max-w-none text-[rgb(var(--neutral-dark))]"
                        dangerouslySetInnerHTML={{
                          __html: member.description ?? "",
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
}