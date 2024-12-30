// src/app/admin/actions/team.ts

import { Prisma } from '@prisma/client';
import React from 'react';
import ServiceForm from './_components/ServiceForm';
import prisma from '@/lib/prisma';

type Service = Prisma.ServiceGetPayload<object>;

interface AddServiceProps {
  params: {
    id: string;
  };
  // searchParams?: {
  //   [key: string]: string | string[] | undefined;
  // };
}

export default async function AddService({ params}: AddServiceProps) {
  
  let service: Service | null = null;

  if(params.id){
    service = await prisma.service.findUnique({
      where: {
        id: params.id
      }
    });
  }

  return (
    <ServiceForm service={service} />
  );
}
