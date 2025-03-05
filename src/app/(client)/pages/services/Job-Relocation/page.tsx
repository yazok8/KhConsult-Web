"use client";

import React from "react";
import ServiceCard from "@/components/ServiceCard";
import { Spinner } from "@/components/ui/spinner";
import { getImageSrc } from '@/lib/imageHelper';
import { useServices } from "@/app/hooks/useServices";

export default function JobRelocation() {
  const { services, isLoading, error } = useServices();

  if (error) {
    return (
      <div className="p-4 text-destructive bg-destructive/10 rounded-lg">
        Failed to load services: {error.message}
      </div>
    );
  }

  if (isLoading || !services) {
    return <Spinner />;
  }

  const jobRelocationService = services[2]; // Adjust index based on your data

  return (
    <ServiceCard
      title={jobRelocationService.title}
      description={jobRelocationService.description}
      imageSrc={getImageSrc(jobRelocationService.imageSrc)}
      imageAlt={jobRelocationService.title}
      isReversed={false}
    />    
  );
}