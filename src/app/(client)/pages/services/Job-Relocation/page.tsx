"use client";

import React from "react";
import { useServicesSWR } from "../_components/useServiceSWR";
import { LoadingCard } from "@/components/LoadingCard";
import ServiceCard from "@/components/ServiceCard";

export default function JobRelocation() {
  const { services, error } = useServicesSWR();

  if (error) {
    return (
      <div className="p-4 text-destructive bg-destructive/10 rounded-lg">
        Failed to load services: {error.message}
      </div>
    );
  }

  if (isLoading || !services) {
    return <LoadingCard />;
  }

  const jobRelocationService = services[2]; // Adjust index based on your data

  return (
    <ServiceCard
      title={jobRelocationService.title}
      description={jobRelocationService.description}
      imageSrc={`https://khconsult.s3.us-east-2.amazonaws.com/${jobRelocationService.imageSrc}`}
      imageAlt={jobRelocationService.title}
      isReversed={false}
    />    
  );
}