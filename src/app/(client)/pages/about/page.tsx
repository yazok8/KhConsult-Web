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
    <Container id="about-my-services">
      <Card className='border-none'>
        <CardHeader>
          <CardTitle className="pb-8 text-6xl">{aboutService.title}</CardTitle>
        </CardHeader>
        <CardContent className="text-xl">
          {/* Display service details */}
          <div
            className="text-lg space-y-4"
            dangerouslySetInnerHTML={{ __html: aboutService.description ?? "" }}
          />
          {aboutService.aboutimage && (
            <div className="mt-4">
              <Image
                src={aboutService.aboutimage}
                alt={aboutService.title}
                width={400}
                height={400}
                className="object-cover"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
