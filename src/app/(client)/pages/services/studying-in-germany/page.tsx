"use client";
export const dynamic = "force-dynamic";

import React from "react";
import { useServicesSWR } from "../_components/useServiceSWR"; 
import ServiceCard from "@/components/ServiceCard";

export default function StudyingInGermany() {
  const { services, error } = useServicesSWR();

  if (error) {
    return <p>Failed to load services: {error.message}</p>;
  }
  if (!services) {
    return;
  }

  const studyingInGermanyService = services[0]; // or whichever index you want

  return (
    <ServiceCard
      title={studyingInGermanyService.title}
      description={studyingInGermanyService.description}
      imageSrc={`https://khconsult.s3.us-east-2.amazonaws.com/${studyingInGermanyService.imageSrc}`}
      imageAlt={studyingInGermanyService.title}
      isReversed={false}
    />  
  );
}
