"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { faq } from "@/types/faq";
import sanitizeHtml from "sanitize-html";
import useSWR from "swr";
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

export default function FaqQuestion() {
  const fetcher = (url: string) =>
    fetch(url, { cache: "no-store" }).then((r) => r.json());

  const { data: faq, error } = useSWR<faq[]>("/api/faq", fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshInterval: 30_000,
  });

  // State to manage which FAQ is selected and if the dialog is open.
  const [selectedFaq, setSelectedFaq] = useState<faq | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  if (error) {
    return (
      <p className="text-red-500">
        Failed to load FAQ data: {error.message}
      </p>
    );
  }

  if (!faq) {
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
            <CardTitle className="text-4xl md:text-6xl font-bold text-primary relative z-10">
              Frequently Asked Questions
            </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.ul
            className="grid-modern"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {faq.length > 0 ? (
              faq.map((q, index) => (
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
