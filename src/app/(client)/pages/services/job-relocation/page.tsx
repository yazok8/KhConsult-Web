"use client";
export const dynamic = "force-dynamic";

import React from "react";
import Image from "next/image";
import Container from "@/app/ui/Container";
import { useServicesSWR } from "../_components/useServiceSWR"; 

export default function JobRelocation() {
  const { services, isLoading, error } = useServicesSWR();

  if (error) {
    return <p>Failed to load services: {error.message}</p>;
  }
  if (isLoading || !services) {
    return <p>Loading services...</p>;
  }
  if (services.length < 3) {
    return <p>Not enough services to display the third one.</p>;
  }

  const firstService = services[1];

  return (
    <Container id="job-relocation">
      <div className="flex flex-col lg:flex-row items-center lg:items-start flex-grow w-full">
        <div className="pr-0 lg:pr-16 lg:w-1/2 w-full mb-10 lg:mb-0">
          <h1 className=" lg:text-5xl mb-5">{firstService.title}</h1>
          <div
            className="text-lg space-y-4"
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
      </div>
    </Container>
  );
}
