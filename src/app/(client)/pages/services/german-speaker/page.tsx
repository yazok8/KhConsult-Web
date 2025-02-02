"use client";

// Force the page to always run as dynamic
export const dynamic = "force-dynamic";

import React from "react";
import { useServicesSWR } from "../_components/useServiceSWR";
import ServiceCard from "@/components/ServiceCard";
import { LoadingCard } from "@/components/LoadingCard";




export default function GermanSpeaker() {
  const { services, isLoading, error } = useServicesSWR();
 
   if (error) {
     return <p>Failed to load services: {error.message}</p>;
   }
   
   if (isLoading || !services) {
     return <LoadingCard />;
   }

  // Based on your code, the "firstService" was actually services[1].
  const germanSpeakerService = services[3];

  return (
    <ServiceCard
    title={germanSpeakerService.title}
    description={germanSpeakerService.description}
    imageSrc={`https://khconsult.s3.us-east-2.amazonaws.com/${germanSpeakerService.imageSrc}`}
    imageAlt={germanSpeakerService.title}
    isReversed={false}
  />  
  );
}
