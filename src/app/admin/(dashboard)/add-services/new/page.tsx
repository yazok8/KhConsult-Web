// src/app/admin/actions/team.ts

import { Prisma } from '@prisma/client';
import React from 'react';
import ServiceForm from './_components/ServiceForm';
import prisma from '@/lib/prisma';

type Service = Prisma.ServiceGetPayload<object>;

interface AddServiceProps {
  params: Promise<{ id: string }>;
}

export default async function AddService({ params}: AddServiceProps) {
  const {id} = await params;
  
  let service: Service | null = null;

  if(id){
    service = await prisma.service.findUnique({
      where: {
        id: id
      }
    });
  }

  return (
    <ServiceForm service={service} />
  );
}
