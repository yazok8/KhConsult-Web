"use client";
export const dynamic = "force-dynamic";

import React from "react";
import Image from "next/image";
import Container from "@/app/ui/Container";
import { useServicesSWR } from "../_components/useServiceSWR"; 

export default function GermanSpeaker() {
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

  const thirdService = services[0]; // or whichever index you want

  return (
    <Container id="need-a-german-speaker">
      <div className="flex flex-col lg:flex-row items-center lg:items-start flex-grow w-full">
        <div className="pr-0 lg:pr-16 lg:w-1/2 w-full mb-10 lg:mb-0">
          <h1 className="lg:text-5xl mb-6">{thirdService.title}</h1>
          <div
            className="text-lg space-y-4"
            dangerouslySetInnerHTML={{
              __html: thirdService.description ?? "",
            }}
          />
        </div>

        <div className="lg:w-1/2 w-full">
          {thirdService.imageSrc ? (
            <Image
              src={`https://khconsult.s3.us-east-2.amazonaws.com/${thirdService.imageSrc}`}
              alt={thirdService.title}
              width={2000}
              height={1500}
              className="rounded-lg"
              priority
            />
          ) : (
            <Image
              src="/images/germanSpeaker.jpg"
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
