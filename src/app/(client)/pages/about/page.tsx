// src/app/admin/about-our-services/page.tsx

export const dynamic = "force-dynamic";

import Container from '@/app/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import prisma from '@/lib/prisma';
import Image from 'next/image';
import React from 'react';

export default async function AboutPage() {
  // Fetch the single service. Adjust the query if you have specific criteria.
  const aboutService = await prisma.aboutOurServices.findFirst();

  if (!aboutService) {
    // Handle the case where the service is not found
    return;
  }

  return (
    <Container id="about">
      <Card className='border-none shadow-none'>
        <CardHeader className='pl-0'>
          <CardTitle className="pb-2 text-2xl md:text-5xl font-bold text-start">{aboutService.title}</CardTitle>
        </CardHeader>
        <CardContent className="text-xl p-0">
          {/* Display service details */}
          <div
            className="text-xl space-y-4"
            dangerouslySetInnerHTML={{ __html: aboutService.description ?? "" }}
          />
          {aboutService.aboutimage && (
            <div className="mt-4">
              <Image
                src={aboutService.aboutimage}
                alt={aboutService.title}
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
