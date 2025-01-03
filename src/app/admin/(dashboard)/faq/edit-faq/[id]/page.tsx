import prisma from '@/lib/prisma';
import React from 'react'
import FaqForm from '../../_components/FaqForm';


interface EditFaqProps {
    params:{id:string};
}

export default async function editFaqQuestion({ params }: EditFaqProps) {

    const {id} = params;

    const faq = await prisma.faq.findUnique({ where: { id } });

    if(!faq) {
        return <div>not found</div>;
    }

  return (
    <FaqForm faq={faq}/>
  )
}
