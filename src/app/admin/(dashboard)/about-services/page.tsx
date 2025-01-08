// src/app/admin/about-our-services/page.tsx

import Container from '@/app/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default async function AdminAboutOurServices() {
  // Fetch the single service. Adjust the query if you have specific criteria.
  const aboutService = await prisma.aboutOurServices.findFirst();

  if (!aboutService) {
    // Handle the case where the service is not found
    return (
      <Container id="about-my-services">
        <Card>
          <CardHeader>
            <CardTitle className="pb-8 text-6xl">Service Not Found</CardTitle>
          </CardHeader>
          <CardContent className="text-xl">
            <div className="py-5 mr-auto">
              <Link href="/admin/about-services/add-about-services" className="text-blue-500 underline">
                Create A New Service
              </Link>
            </div>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container id="about-my-services">
      <Card>
      <div className="flex justify-end p-5">
            <Link href={`/admin/about-services/edit-about-services/${aboutService.id}`} className="text-blue-500 underline">
              Edit Service
            </Link>
          </div>
        <CardHeader>
          <CardTitle className="pb-8 text-6xl">{aboutService.title}</CardTitle>
        </CardHeader>
        <CardContent className="text-xl">
          {/* Display service details */}
          <ul><li>{aboutService.description}</li></ul>
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
