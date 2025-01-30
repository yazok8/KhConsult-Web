// src/app/admin/services/editService/[id]/page.tsx

import React from 'react';
import prisma from '@/lib/prisma';
import ServiceForm from '../../add-services/new/_components/ServiceForm';

interface EditServiceProps {
  params: Promise<{ id: string }>; // Adjusted type to Promise
}

export default async function EditService({ params }: EditServiceProps) {  
  // Await the params before destructuring
  const resolvedParams = await params;
  const { id } = resolvedParams;
  
  const service = await prisma.service.findUnique({ where: { id } });

  if (!service) {
    // Handle service not found, possibly redirect or show a message
    return <div>Service not found.</div>;
  }

  return (<div className='pl-12'>
        <ServiceForm service={service} />
  </div>

  )
}
