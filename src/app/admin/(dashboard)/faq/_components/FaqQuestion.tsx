"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import  { useEffect, useState } from 'react'
import { IoMdAdd } from 'react-icons/io';

interface Faq {
    id: string;
    question: string;
    answer: string;
  }
  

export default function FaqQuestion() {
    const [question, setQuestion ]= useState<Faq[]>([]);

     useEffect(() => {
          (async () => {
            const res = await fetch("/api/faq");
            const data = await res.json();
            setQuestion(data);
          })();
        }, []);

  return (
    <div className="mx-auto flex flex-col">
    <Card>
      <CardHeader>
        <CardTitle>Faq Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="py-5 mr-auto">
          <Link href="/admin/faq/add-faq">
          <div className="inline-flex m-0 p-0">
          <IoMdAdd size='20' className="m-0 p-0" />
         </div>
          </Link>
        </div>
        <ul>
          {question &&
            question.map((q, index) => (
              <div key={index} className="flex justify-around flex-wrap">
                <div className="max-w-1/4">
                <li>
                  <span>{q.question}</span>
                  {" | "}
                  <Link href={`/admin/faq/edit-faq/${q.id}`}>
                    Edit
                  </Link>
                </li>
                </div>
                <div className="my-5">
                  <p>{q.answer}</p>
                </div>
              </div>
            ))}
        </ul>
      </CardContent>
    </Card>
  </div>
  )
}
