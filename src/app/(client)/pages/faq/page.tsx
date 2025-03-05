"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { faq } from "@/types/faq";
import sanitizeHtml from "sanitize-html";
import { motion } from "framer-motion";
import Container from "@/components/Container";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useFAQ } from "@/app/hooks/useFaq";
import { Loader } from "lucide-react";

export default function FaqQuestion() {
  const { faqs, error, isLoading, mutate } = useFAQ();

  // State to manage which FAQ is selected and if the dialog is open.
  const [selectedFaq, setSelectedFaq] = useState<faq | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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
        <Loader />
      </div>
    );
  }


  if (error) {
    return (
      <p className="text-red-500">
        Failed to load FAQ data: {error.message}
      </p>
    );
  }

  if (!faqs) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 bg-primary rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <Container className="mt-20 section-modern" id="faq">
      <Card className="card-modern">
        <CardHeader className="space-y-4 text-center">
            <CardTitle className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white relative z-10">
              Frequently Asked Questions
            </CardTitle>
            <div className="mt-4 flex justify-center">
              <div className="h-1 w-20 bg-slate-200 dark:bg-slate-700 rounded-full" />
            </div>
        </CardHeader>
        <CardContent>
          <motion.ul
            className="grid-modern"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {faqs.length > 0 ? (
              faqs.map((q, index) => (
                <motion.article
                  key={q.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <h2 className="p-6 bg-[rgb(var(--primary-color))] text-xl font-semibold">
                    {q.question}
                  </h2>
                  <div
                    className="p-6 prose prose-lg max-w-none line-clamp-6 mb-5"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(q.answer),
                    }}
                  />
                  <button
                    className="float-right p-5 text-primary underline"
                    onClick={() => {
                      setSelectedFaq(q);
                      setDialogOpen(true);
                    }}
                  >
                    See more
                  </button>
                </motion.article>
              ))
            ) : (
              <p className="text-center text-gray-500">No FAQs available.</p>
            )}
          </motion.ul>
        </CardContent>
      </Card>

      {/* Shadcn Dialog Popup */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setSelectedFaq(null);
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="leading-6 text-xl">{selectedFaq?.question}</DialogTitle>
          </DialogHeader>
          <div
            className="prose prose-lg"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(selectedFaq?.answer ?? ""),
            }}
          />
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
