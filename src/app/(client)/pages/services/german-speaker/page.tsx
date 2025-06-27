"use client";

// Force the page to always run as dynamic
export const dynamic = "force-dynamic";

import React from "react";
import { useServicesSWR } from "../_components/useServiceSWR";
import ServiceCard from "@/components/ServiceCard";
import { Spinner } from "@/components/ui/spinner";
import { getImageSrc } from '@/lib/imageHelper';



export default function GermanSpeaker() {
  const { services, isLoading, error } = useServicesSWR();
 
   if (error) {
     return <p>Failed to load services: {error.message}</p>;
   }
   
   if (isLoading || !services) {
     return <Spinner />;
   }

  // Based on your code, the "firstService" was actually services[1].
  const germanSpeakerService = services[3];

  return (
    <ServiceCard
    id="german-speaker"
    title={germanSpeakerService.title}
    description={germanSpeakerService.description}
    imageSrc={getImageSrc(germanSpeakerService.imageSrc)}
    imageAlt={germanSpeakerService.title}
    isReversed={false}
  />  
  );
}
