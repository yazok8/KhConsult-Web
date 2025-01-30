// /app/admin/edit-about-services/page.tsx

import React from 'react';
import AboutOurServicesForm from '../../add-about-services/_components/AboutServicesForm';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

interface EditAboutServicesProps {
  params: Promise<{ id: string }>;
}

export default async function EditAboutServices({ params }: EditAboutServicesProps) {

  const {id} = await params;

  const aboutService = await prisma.aboutOurServices.findUnique({ where: { id } });

  if(!aboutService) {
    return notFound();
  }
  return <div className="pl-12">
  <AboutOurServicesForm aboutServices={aboutService} />
  </div>
}
