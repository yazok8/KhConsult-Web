"use client";
export const dynamic = "force-dynamic";

import React from "react";
import Container from "@/components/Container";
import { useServicesSWR } from "../_components/useServiceSWR";
import { Inter } from "next/font/google"; // Add font import
import ServiceCard from "@/components/ServiceCard";
import { LoadingCard } from "@/components/LoadingCard";

// Configure the font
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Ensures text remains visible during font load
  preload: true,
  fallback: ["system-ui", "arial"], // Fallback fonts
});

export default function ForBusinesses() {
  const { services, isLoading, error } = useServicesSWR();

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
    return <LoadingCard />;
  }

  const forBusinessService = services[1];

  return (
    <ServiceCard
    title={forBusinessService.title}
    description={forBusinessService.description}
    imageSrc={`https://khconsult.s3.us-east-2.amazonaws.com/${forBusinessService.imageSrc}`}
    imageAlt={forBusinessService.title}
    isReversed={false}
  />  
  
  );
}
