"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/app/ui/Container";
import { Service } from "@prisma/client";

export default function GermanSpeaker() {
  // 1. Make `services` an array, since `/api/services` usually returns an array.
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/services");
        if (res.ok) {
          const data = await res.json();
          // 2. Store the array of services
          setServices(data);
        } else {
          console.error("Failed to fetch services data.");
        }
      } catch (error) {
        console.error("Error fetching services data:", error);
      }
    })();
  }, []);

  // 3. If there aren’t enough services yet, handle it gracefully
  if (services.length < 3) {
    return <p>Loading or not enough services to display the third one...</p>;
  }

  // 4. Grab the third service in the array (index 2)
  const thirdService = services[0];

  console.log(services)

  return (
    <Container id="need-a-german-speaker">
      <div className="flex flex-col lg:flex-row items-center lg:items-start flex-grow w-full">
        {/* Text Section */}
        <div className="pr-0 lg:pr-16 lg:w-1/2 w-full mb-10 lg:mb-0">
          <h1 className="lg:text-5xl mb-6">{thirdService.title}</h1>
          {/* If your service.description is HTML, you can render it safely via `dangerouslySetInnerHTML`, 
              or parse it for a more secure approach. */}
          <div
            className="text-lg space-y-4"
            dangerouslySetInnerHTML={{ __html: thirdService.description ?? "" }}
          />
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 w-full">
          {/* If thirdService.imageSrc is a valid path, you can display it.
              Otherwise, fall back to your local germanSpeaker image. */}
          {thirdService.imageSrc ? (
            <Image
              src={`https://khconsult.s3.us-east-2.amazonaws.com/${thirdService.imageSrc}`} 
              alt={thirdService.title}
              width={2000}
              height={1500}
              className="rounded-lg"
            />
          ) : (
            // Fallback image if no imageSrc in the DB
            <Image
              src="/images/germanSpeaker.jpg" // adapt to your file path
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
