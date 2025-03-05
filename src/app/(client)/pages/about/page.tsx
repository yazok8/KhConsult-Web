"use client";

import Container from "@/components/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { getImageSrc } from "@/lib/imageHelper";
import { Spinner } from "@/components/ui/spinner";
import { useAboutServices } from "@/app/hooks/useAboutServices";

export default function AboutPage() {
  const { aboutServices, error, isLoading } = useAboutServices();
  const [isBookOpen, setIsBookOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

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
    return <Spinner />;
  }

  return (
    <div className="max-w-[1152px] mx-auto px-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-12 md:py-20"
      >
        <Card className="border-none bg-transparent">
          <CardHeader className="space-y-4 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <CardTitle className="text-4xl text-white md:text-5xl lg:text-6xl font-bold dark:text-white relative z-10 text-center">
                {aboutServices.title}
              </CardTitle>
              <div className="mt-4 flex justify-center">
                <div className="h-1 w-20 bg-slate-200 dark:bg-slate-700 rounded-full" />
              </div>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-12 w-full pt-20">
            <div className="book-container">
              <div 
                className={`book ${isBookOpen ? "open" : ""}`}
              >
                <div
                  className="book-spine"
                  onClick={() => setIsBookOpen(!isBookOpen)}
                />

                <div className="book-cover">
                  {aboutServices.aboutimage && (
                    <div className="book-cover-image">
                      <Image
                        src={getImageSrc(aboutServices.aboutimage)}
                        alt={aboutServices.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    </div>
                  )}
                  <div className="book-spine-shadow" />
                </div>

                <div className="book-page">
                  <div className="book-content">
                    <div
                      className="space-y-6 text-[rgb(var(--neutral-dark))]"
                      dangerouslySetInnerHTML={{
                        __html: aboutServices.description ?? "",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}