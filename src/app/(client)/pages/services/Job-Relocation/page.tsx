"use client";
export const dynamic = "force-dynamic";

import React from "react";
import Image from "next/image";
import Container from "@/components/Container";
import { useServicesSWR } from "../_components/useServiceSWR"; 
import Typography from "@/components/Typography";

export default function JobRelocation() {
  // Use our custom SWR hook to fetch data
  const { services, isLoading, error } = useServicesSWR();

  if (error) {
    return <p>Failed to load services: {error.message}</p>;
  }

  if (!services) {
    return;
  }

  const firstService = services[2];

  return (
    <Container id="job-relocation" className="pt-14 md:pt-20 md:items-start">
      <div className="flex flex-col lg:flex-row items-center lg:items-start flex-grow w-full">

        {isLoading || !services ?<p>Loading services...</p> : <>
        
          <div className="pr-0 lg:pr-16 lg:w-1/2 w-full mb-10 lg:mb-0">
        <Typography variant="h2" className="font-bold mb-4 md:mb-8">
          {firstService.title}
        </Typography>
        <div
          className="text-lg space-y-4 leading-8"
          dangerouslySetInnerHTML={{
            __html: firstService.description ?? "",
          }}
        />
      </div>


        <div className="lg:w-1/2 w-full">
          {firstService.imageSrc ? (
            <Image
              src={`https://khconsult.s3.us-east-2.amazonaws.com/${firstService.imageSrc}`}
              alt={firstService.title}
              width={2000}
              height={1500}
              className="rounded-lg"
              priority
            />
          ) : (
            <Image
              src="/images/coaching.jpg"
              alt={firstService.title}
              width={1000}
              height={800}
              className="rounded-lg"
            />
          )}
        </div>
        
        
        </>}

 
      </div>
    </Container>
  );
}
