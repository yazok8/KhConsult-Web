"use client";
export const dynamic = "force-dynamic";

import React from "react";
import Image from "next/image";
import Container from "@/app/ui/Container";
import { useServicesSWR } from "../_components/useServiceSWR"; 
import Typography from "@/components/Typography";

export default function StudyingInGermany() {
  const { services, isLoading, error } = useServicesSWR();

  if (error) {
    return <p>Failed to load services: {error.message}</p>;
  }
  if (!services) {
    return;
  }

  const thirdService = services[0]; // or whichever index you want

  return (
    <Container id="studying-in-germany">
      <div className="flex flex-col lg:flex-row items-center lg:items-start flex-grow w-full">
        { isLoading || !services ?  <p>Loading services...</p> : <>
          <div className="pr-0 lg:pr-16 lg:w-1/2 w-full mb-10 lg:mb-0">
        <Typography variant="h2" className="font-bold mb-4 md:mb-8 whitespace-nowrap">
          {thirdService.title}
        </Typography>
        <div
          className="text-lg space-y-4 leading-8"
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
        </>}

      </div>
    </Container>
  );
}
