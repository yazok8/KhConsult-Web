"use client";
export const dynamic = "force-dynamic";

import ServiceCard from "@/components/ServiceCard";
import { Spinner } from "@/components/ui/spinner";
import { getImageSrc } from '@/lib/imageHelper';
import { useServices } from "@/app/hooks/useServices";

export default function StudyingInGermany() {
  const { services, isLoading, error } = useServices();

  if (error) {
    return <p>Failed to load services: {error.message}</p>;
  }
  if (!services) {
    return;
  }

   if (isLoading || !services) {
       return <Spinner />;
     }

  const studyingInGermanyService = services[0]; // or whichever index you want

  return (
    <ServiceCard
      title={studyingInGermanyService.title}
      description={studyingInGermanyService.description}
      imageSrc={getImageSrc(studyingInGermanyService.imageSrc)}
      imageAlt={studyingInGermanyService.title}
      isReversed={false}
    />  
  );
}
