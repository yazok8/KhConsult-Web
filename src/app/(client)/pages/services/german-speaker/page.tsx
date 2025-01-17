// src/components/GermanSpeaker.tsx

"use client";

import React from "react";
import Image from "next/image";
import Container from "@/app/ui/Container";
import useSWR from "swr";
import { Service } from '@prisma/client';


// Define the fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function GermanSpeaker() {
  // Use SWR to fetch data
  const { data: services, error } = useSWR<Service[]>("/api/services", fetcher);

  if (error) {
    return <p>Failed to load services.</p>;
  }

  if (!services) {
    return <p>Loading services...</p>;
  }

  if (services.length < 3) {
    return <p>Not enough services to display the third one.</p>;
  }

  

  // Correctly access the third service
  const thirdService = services[0];

  return (
    <Container id="need-a-german-speaker">
      <div className="flex flex-col lg:flex-row items-center lg:items-start flex-grow w-full">
        {/* Text Section */}
        <div className="pr-0 lg:pr-16 lg:w-1/2 w-full mb-10 lg:mb-0">
          <h1 className="lg:text-5xl mb-6">{thirdService.title}</h1>
          <div
            className="text-lg space-y-4"
            dangerouslySetInnerHTML={{ __html: thirdService.description ?? "" }}
          />
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 w-full">
          {thirdService.imageSrc ? (
            <Image
              src={`https://khconsult.s3.us-east-2.amazonaws.com/${thirdService.imageSrc}`} 
              alt={thirdService.title}
              width={2000}
              height={1500}
              className="rounded-lg"
              priority // Optional: prioritize loading for above-the-fold images
            />
          ) : (
            <Image
              src="/images/germanSpeaker.jpg" // Ensure this path is correct
              alt="immigration"
              width={2000}
              height={1500}
              className="rounded-lg"
            />
          )}
        </div>
      </div>
    </Container>
  );
}
