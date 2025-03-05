"use client";
export const dynamic = "force-dynamic";

import React from "react";
import Container from "@/components/Container";
import { Inter } from "next/font/google"; // Add font import
import ServiceCard from "@/components/ServiceCard";
import { Spinner } from "@/components/ui/spinner";
import { getImageSrc } from '@/lib/imageHelper';
import { useServices } from "@/app/hooks/useServices";


// Configure the font
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Ensures text remains visible during font load
  preload: true,
  fallback: ["system-ui", "arial"], // Fallback fonts
});

export default function ForBusinesses() {
  const { services, isLoading, error } = useServices();

  if (error) {
    return (
      <Container>
        <p className={`text-red-500 ${inter.className}`}>
          Failed to load services: {error.message}
        </p>
      </Container>
    );
  }

  if (isLoading || !services) {
    return <Spinner />;
  }

  const forBusinessService = services[1];

  return (
    <ServiceCard
    title={forBusinessService.title}
    description={forBusinessService.description}
    imageSrc={getImageSrc(forBusinessService.imageSrc)}
    imageAlt={forBusinessService.title}
    isReversed={false}
  />  
  
  );
}
