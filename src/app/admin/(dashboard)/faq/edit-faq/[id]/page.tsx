import prisma from '@/lib/prisma';
import React from 'react'
import FaqForm from '../../_components/FaqForm';


interface EditFaqProps {
  params: Promise<{ id: string }>;
}

export default async function editFaqQuestion({ params }: EditFaqProps) {

    const {id} = await params;

    const faq = await prisma.faq.findUnique({ where: { id } });

    if(!faq) {
        return <div>not found</div>;
    }

  return (<div className='pl-12'>
        <FaqForm faq={faq}/>
  </div>

  )
}
