"use client";

import { useAboutServices } from '@/app/hooks/useAboutServices';
import Container from '@/components/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


export default function AdminAboutOurServices() {
  const { aboutServices, error, isLoading, mutate } = useAboutServices();

  // Refresh data when component mounts and periodically
  React.useEffect(() => {
    mutate();
    
    const interval = setInterval(() => {
      mutate();
    }, 5000);

    return () => clearInterval(interval);
  }, [mutate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading about services...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error loading about services: {error.message}</p>
      </div>
    );
  }

  if (!aboutServices) {
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
          <Link href={`/admin/about-services/edit-about-services/${aboutServices.id}`} className="text-blue-500 underline">
            Edit Service
          </Link>
        </div>
        <CardHeader>
          <CardTitle className="pb-8 text-6xl">{aboutServices.title}</CardTitle>
        </CardHeader>
        <CardContent className="text-xl">
          <ul><li>{aboutServices.description}</li></ul>
          {aboutServices.aboutimage && (
            <div className="mt-4">
              <Image
                src={aboutServices.aboutimage}
                alt={aboutServices.title}
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