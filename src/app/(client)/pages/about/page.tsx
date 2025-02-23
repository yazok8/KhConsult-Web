"use client";

import Container from '@/components/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useSWR from "swr";
import Image from 'next/image';
import React from 'react';
import { AboutOurServices } from '@/types/aboutServices'; // Updated import from the shared type file
import { motion } from 'framer-motion';
import { getImageSrc } from '@/lib/imageHelper';
import { Spinner } from "@/components/ui/spinner";

export default function AboutPage() {
  // A simple fetcher that disables cache
  const fetcher = (url: string) =>
    fetch(url, { cache: "no-store" }).then((res) => res.json());

  // Use SWR with our shared type
  const { data: aboutServices, error } = useSWR<AboutOurServices>(
    "/api/aboutServices",
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: 30_000,
    }
  );

  if (error) {
    return (
      <Container>
        <p className="text-red-500 text-center py-8">
          Failed to load About page data: {error.message}
        </p>
      </Container>
    );
  }

  if (!aboutServices) {
    return (
      <Spinner />
    );
  }

  return (
    <Container id="about">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-12 md:py-20"
      >
        <Card className="card-modern border-none bg-gradient-to-b from-white to-[rgb(var(--neutral-light))]">
          <CardHeader className="space-y-4 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
            <CardTitle className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white text-primary relative z-10 text-center">
              {aboutServices.title}
            </CardTitle>
            <div className="mt-4 flex justify-center">
              <div className="h-1 w-20 bg-slate-200 dark:bg-slate-700 rounded-full" />
            </div>
            </motion.div>
          </CardHeader>
          <CardContent className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {aboutServices.aboutimage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="relative aspect-[4/3] lg:sticky lg:top-8"
                >
                  <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={getImageSrc(aboutServices.aboutimage)}
                      alt={aboutServices.title}
                      fill
                      className="object-cover hover:scale-105 transition-all duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl" />
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="prose prose-lg dark:prose-invert pt-0"
              >
                <div
                  className="space-y-6 text-[rgb(var(--neutral-dark))]"
                  dangerouslySetInnerHTML={{
                    __html: aboutServices.description ?? "",
                  }}
                />
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
}
