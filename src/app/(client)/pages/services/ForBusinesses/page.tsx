"use client";
export const dynamic = "force-dynamic";

import React from "react";
import Image from "next/image";
import Container from "@/app/ui/Container";
import { useServicesSWR } from "../_components/useServiceSWR";
import Typography from "@/components/Typography";
import { Inter } from 'next/font/google'; // Add font import

// Configure the font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Ensures text remains visible during font load
  preload: true,
  fallback: ['system-ui', 'arial'], // Fallback fonts
});

export default function ForBusinesses() {
  const { services, isLoading, error } = useServicesSWR();

  if (error) {
    return (
      <Container>
        <p className={`text-red-500 ${inter.className}`}>Failed to load services: {error.message}</p>
      </Container>
    );
  }

  if (isLoading || !services) {
    return (
      <Container>
        <p className={`text-gray-500 ${inter.className}`}>Loading services...</p>
      </Container>
    );
  }

  if (services.length < 3) {
    return (
      <Container>
        <p className={`text-yellow-500 ${inter.className}`}>Not enough services to display the third one.</p>
      </Container>
    );
  }

  const lastService = services[1];

  return (
    <Container id="for-businesses" className="min-h-0 pt-14">
      <div className={`flex flex-col lg:flex-row items-center lg:items-start flex-grow w-full ${inter.className}`}>
        {/* Text Section */}
        <div className="pr-0 lg:pr-16 lg:w-1/2 w-full mb-10 lg:mb-0">
          <Typography variant="h2" className="font-bold mb-4 md:mb-8">
            {lastService.title}
          </Typography>
          <div
            className="text-lg space-y-4 leading-8"
            dangerouslySetInnerHTML={{
              __html: lastService.description ?? "",
            }}
          />
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 w-full">
          {lastService.imageSrc ? (
            <Image
              src={`https://khconsult.s3.us-east-2.amazonaws.com/${lastService.imageSrc}`}
              alt={lastService.title}
              width={2000}
              height={1500}
              className="rounded-lg w-full h-auto"
              priority
            />
          ) : (
            <Image
              src="/images/coaching.jpg"
              alt={lastService.title}
              width={1000}
              height={800}
              className="rounded-lg w-full h-auto"
            />
          )}
        </div>
      </div>
    </Container>
  );
}