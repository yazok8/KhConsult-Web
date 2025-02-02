"use client";

import Container from '@/components/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useSWR from "swr";
import Image from 'next/image';
import React from 'react';
import { AboutOurServices } from '@prisma/client';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const fetcher = (url: string) => fetch(url, { cache: "no-store" }).then(r => r.json());

  const { data: aboutServices, error } = useSWR<AboutOurServices>("/api/aboutServices", fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshInterval: 30_000,
  });

  if (error) {
    return (
      <p className="text-red-500 text-center py-8">
        Failed to load About page data: {error.message}
      </p>
    );
  }

  if (!aboutServices) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 bg-primary rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <Container id="about">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="card-modern border-none">
          <CardHeader className="space-y-4">
            <CardTitle className="text-gradient text-4xl md:text-5xl font-bold">
              {aboutServices.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 flex flex-col-reverse">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: aboutServices.description ?? "" }}
            />
            {aboutServices.aboutimage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="relative h-[400px] md:h-[600px] rounded-xl overflow-hidden"
              >
                <Image
                  src={`https://khconsult.s3.us-east-2.amazonaws.com/${aboutServices.aboutimage}`}
                  alt={aboutServices.title}
                  fill
                  className="hover:scale-105 transition-transform duration-500 object-contain pb-6"
                />
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
}