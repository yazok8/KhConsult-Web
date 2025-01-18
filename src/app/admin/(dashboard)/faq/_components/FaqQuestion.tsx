"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { IoMdAdd } from 'react-icons/io';
import { useEffect } from 'react';
import { useFAQ } from '@/app/hooks/useFaq';

export default function FaqQuestion() {
  const { faqs, error, isLoading, mutate } = useFAQ();

  // Refresh data when component mounts and periodically
  useEffect(() => {
    mutate();
    const interval = setInterval(() => {
      mutate();
    }, 5000);

    return () => clearInterval(interval);
  }, [mutate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading FAQs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error loading FAQs: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="mt-20 flex flex-col text-black text-start min-h-screen lg:h-[75vh] md:h-[120vh] pt-20 px-5 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-6xl mb-12 text-start">FAQ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-5 mr-auto">
            <Link href="/admin/faq/add-faq">
              <div className="inline-flex m-0 p-0">
                <IoMdAdd size="20" className="m-0 p-0" />
              </div>
            </Link>
          </div>
          <ul className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {!faqs || faqs.length === 0 ? (
              <p>No FAQs available.</p>
            ) : (
              faqs.map((q) => (
                <article
                  key={q.id}
                  className="flex flex-col bg-slate-300 text-black rounded-lg shadow-lg"
                >
                  <Link href={`/admin/faq/edit-faq/${q.id}`}>
                    <li className="list-none">
                      <h2 className="p-6 bg-slate-500 rounded-t-lg text-2xl font-semibold">
                        {q.question}
                      </h2>
                    </li>
                    <div className="p-6 flex-grow">
                      <p>{q.answer}</p>
                    </div>
                  </Link>
                </article>
              ))
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}