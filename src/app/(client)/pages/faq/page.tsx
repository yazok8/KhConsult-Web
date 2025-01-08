"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Faq {
  id: string;
  question: string;
  answer: string;
}

export default function FaqQuestion() {
  const [questions, setQuestions] = useState<Faq[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/faq");
        if (!res.ok) {
          throw new Error("Failed to fetch FAQs.");
        }
        const data: Faq[] = await res.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    })();
  }, []);

  return (
    <div className="mt-20 flex flex-col text-black text-start min-h-screen lg:h-[75vh] md:h-[120vh] pt-20 px-5 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-6xl mb-12 text-start">FAQ</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Use CSS Grid for layout */}
          <ul className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {questions.length > 0 ? (
              questions.map((q) => (
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
            ) : (
              <p>No FAQs available.</p>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
