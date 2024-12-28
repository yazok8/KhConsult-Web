import { Prisma } from '@prisma/client';
import React from 'react'
import ServiceForm from './_components/ServiceForm';
import prisma from '@/lib/prisma';

type Service = Prisma.ServiceGetPayload<object>;

export default async function AddService({params}:{params:{id:string}}) {
  
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
  )
}
