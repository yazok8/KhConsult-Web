"use client";

import { useAboutServices } from "@/app/hooks/useAboutServices";
import Container from "@/components/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { getImageSrc } from "@/lib/imageHelper";

export default function AdminAboutOurServices() {
  const { aboutServices, error, isLoading, mutate } = useAboutServices();

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
        <p className="text-gray-500">Loading about services...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">
          Error loading about services: {error.message}
        </p>
      </div>
    );
  }

  if (!aboutServices) {
    return (
      <Container id="about-my-services">
        <Card>
          <CardHeader>
            <CardTitle className="pb-8 text-6xl">Service Not Found</CardTitle>
          </CardHeader>
          <CardContent className="text-xl">
            <div className="py-5 mr-auto">
              <Link
                href="/admin/about-services/add-about-services"
                className="text-blue-500 underline"
              >
                Create A New Service
              </Link>
            </div>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container id="about-my-services">
      <Card>
        <div className="flex justify-end p-5">
          <Link
            href={`/admin/about-services/edit-about-services/${aboutServices.id}`}
            className="text-blue-500 underline"
          >
            Edit Service
          </Link>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-12 md:py-0"
        >
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
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative aspect-[4/3] lg:sticky lg:top-8"
              >
                {aboutServices.aboutimage && (
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
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="prose prose-lg dark:prose-invert pt-0"
              >
                <div className="space-y-6 text-[rgb(var(--neutral-dark))]">
                  {aboutServices.description}
                </div>
              </motion.div>
            </div>
          </CardContent>
        </motion.div>
      </Card>
    </Container>
  );
}
