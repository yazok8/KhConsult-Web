// src/components/JobRelocation.tsx

"use client";

import React from "react";
import coaching from "../../../../../../public/images/coaching.jpg";
import Image from "next/image";
import Container from "@/app/ui/Container";
import { Service } from "@prisma/client";
import useSWR from "swr"; // Corrected import

// Define the fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function JobRelocation() {
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

  const firstService = services[1];

  return (
    <Container id="job-relocation">
      <div className="flex flex-col lg:flex-row items-center lg:items-start flex-grow w-full">
        {/* Text Section */}
        <div className="pr-0 lg:pr-16 lg:w-1/2 w-full mb-10 lg:mb-0">
          <h1 className=" lg:text-5xl mb-5">{firstService.title}</h1>
          <div
            className="text-lg space-y-4"
            dangerouslySetInnerHTML={{ __html: firstService.description ?? "" }}
          />
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 w-full">
          {firstService.imageSrc ? (
            <Image
              src={`https://khconsult.s3.us-east-2.amazonaws.com/${firstService.imageSrc}`}
              alt={firstService.title}
              width={2000}
              height={1500}
              className="rounded-lg"
              priority // Optional: prioritize loading for above-the-fold images
            />
          ) : (
            <Image
              src={coaching}
              alt={firstService.title}
              width={1000}
              height={800}
              className="rounded-lg"
            />
          )}
        </div>
      </div>
    </Container>
  );
}
