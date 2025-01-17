// src/components/JobRelocation.tsx

"use client";

import React from "react";
import studyngInGermany from "../../../../../../public/images/studying-in-germany.webp";
import Image from "next/image";
import Container from "@/app/ui/Container";
import { Service } from "@prisma/client";
import useSWR from "swr"; // Corrected import

// Define the fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function StudyingInGermany() {
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

  const secondService = services[3];

  return (
    <Container id="studying-in-germany">
      <div className="flex flex-col lg:flex-row items-center lg:items-start flex-grow w-full">
        {/* Text Section */}
        <div className="pr-0 lg:pr-16 lg:w-1/2 w-full mb-10 lg:mb-0">
          <h1 className=" lg:text-5xl mb-5">{secondService.title}</h1>
          <div
            className="text-lg space-y-4"
            dangerouslySetInnerHTML={{ __html: secondService.description ?? "" }}
          />
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 w-full">
          {secondService.imageSrc ? (
            <Image
              src={`https://khconsult.s3.us-east-2.amazonaws.com/${secondService.imageSrc}`}
              alt={secondService.title}
              width={2000}
              height={1500}
              className="rounded-lg"
              priority // Optional: prioritize loading for above-the-fold images
            />
          ) : (
            <Image
              src={studyngInGermany}
              alt={secondService.title}
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
