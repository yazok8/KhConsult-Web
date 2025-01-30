// src/app/admin/about-our-services/page.tsx
"use client"

export const dynamic = "force-dynamic";

import Container from '@/app/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useSWR from "swr";
import Image from 'next/image';
import React from 'react';
import { AboutOurServices } from '@prisma/client';

export default function AboutPage() {
  // Fetch the single service. Adjust the query if you have specific criteria.
  const fetcher = (url: string) => fetch(url, { cache: "no-store" }).then(r => r.json());

  const { data: aboutServices, error } = useSWR<AboutOurServices>("/api/aboutServices", fetcher,{
    revalidateOnFocus:true,
    revalidateOnReconnect: true,
    refreshInterval: 30_000,
  });

  if (error) {
    return <p>Failed to load About page data: {error.message}</p>;
  }

  if(!aboutServices){
    return;
  }

  return (
    <Container id="about">
      <Card className='border-none shadow-none'>
        <CardHeader className='pl-0'>
          <CardTitle className="pb-2 text-2xl md:text-5xl font-bold text-start">{aboutServices.title}</CardTitle>
        </CardHeader>
        <CardContent className="text-xl p-0">
          {/* Display service details */}
          <div
            className="text-xl space-y-4"
            dangerouslySetInnerHTML={{ __html: aboutServices.description ?? "" }}
          />
          {aboutServices.aboutimage && (
            <div className="mt-4">
              <Image
                src={aboutServices.aboutimage}
                alt={aboutServices.title}
                fill
                className="object-cover"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
