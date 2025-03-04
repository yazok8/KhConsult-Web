"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { IoMdAdd } from 'react-icons/io';
import { useEffect } from 'react';
import { useFAQ } from '@/app/hooks/useFaq';
import { motion } from "framer-motion";

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
    <div className="mx-auto flex flex-col max-w-6xl px-5">
      <Card className='card-modern'>
      <CardHeader className="space-y-4 text-center">
            <CardTitle className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white relative z-10">
              Frequently Asked Questions
            </CardTitle>
            <div className="mt-4 flex justify-center">
              <div className="h-1 w-20 bg-slate-200 dark:bg-slate-700 rounded-full" />
            </div>
        </CardHeader>
        <CardContent>
          <div className="py-5 mr-auto">
            <Link href="/admin/faq/add-faq">
              <div className="inline-flex m-0 p-0">
                <IoMdAdd size="20" className="m-0 p-0" />
              </div>
            </Link>
          </div>
          <motion.ul
            className="grid-modern"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {!faqs || faqs.length === 0 ? (
              <p>No FAQs available.</p>
            ) : (
              faqs.map((q) => (
                <motion.article
                  key={q.id}
                   className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <Link href={`/admin/faq/edit-faq/${q.id}`}>
                    <li className="list-none">
                    <h2 className="p-6 bg-[rgb(var(--primary-color))] text-xl font-semibold">
                        {q.question}
                      </h2>
                    </li>
                    <div className="p-6 prose prose-lg max-w-none mb-5">
                      <p>{q.answer}</p>
                    </div>
                  </Link>
                </motion.article>
              ))
            )}
          </motion.ul>
        </CardContent>
      </Card>
    </div>
  );
}