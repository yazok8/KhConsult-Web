"use client";

// Force the page to always run as dynamic
export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Container from "@/app/ui/Container";
import { Service } from "@prisma/client";
import { fetchServices } from "../_components/FetchService";


export default function JobRelocation() {
  const [services, setServices] = useState<Service[] | null>(null);
  const [error, setError] = useState<string>("");

  // Fetch latest services on mount
  useEffect(() => {
    fetchServices()
      .then((data) => setServices(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <p>Failed to load services: {error}</p>;
  }

  if (!services) {
    return <p>Loading services...</p>;
  }

  if (services.length < 3) {
    return <p>Not enough services to display the third one.</p>;
  }

  // Based on your code, the "firstService" was actually services[1].
  const firstService = services[1];

  return (
    <Container id="job-relocation">
      <div className="flex flex-col lg:flex-row items-center lg:items-start flex-grow w-full">
        {/* Text Section */}
        <div className="pr-0 lg:pr-16 lg:w-1/2 w-full mb-10 lg:mb-0">
          <h1 className=" lg:text-5xl mb-5">{firstService.title}</h1>
          <div
            className="text-lg space-y-4"
            dangerouslySetInnerHTML={{
              __html: firstService.description ?? "",
            }}
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
      </div>
    </Container>
  );
}
