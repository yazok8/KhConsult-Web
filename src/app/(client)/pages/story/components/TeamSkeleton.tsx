"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export function TeamSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardContent className="p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="space-y-4"
            >
              <div className="w-full aspect-square bg-muted animate-pulse rounded-t-lg" />
              <div className="p-6 space-y-4">
                <div className="h-8 bg-muted rounded animate-pulse w-2/3 mx-auto" />
                <div className="h-6 bg-muted rounded animate-pulse w-1/2 mx-auto" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
                  <div className="h-4 bg-muted rounded animate-pulse w-4/6" />
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}