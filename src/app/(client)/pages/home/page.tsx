"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Typography from "@/components/Typography";
import { Button } from "@/components/ui/button";

export default function Homepage() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-white to-[rgb(var(--neutral-light))]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container-modern"
      >
        <div className="flex flex-wrap flex-col lg:flex-row justify-center items-center gap-8 lg:gap-16">
          <motion.div 
            className="relative w-44 h-44 md:w-56 md:h-56 lg:w-72 lg:h-72"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/images/khlogo.png"
              alt="KH Consultation Logo"
              fill
              sizes="(max-width: 768px) 128px, (max-width: 1024px) 224px, 288px"
              className="object-contain"
              priority
            />
          </motion.div>

          <motion.div 
            className="text-center lg:text-left flex-1 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Typography variant="h1" className="text-gradient mb-6 text-black">
              Relocation Services
            </Typography>
            <Typography variant="p" className="text-xl mb-6 text-[rgb(var(--neutral-dark))]">
              If we did it! So can you!
            </Typography>
            <Typography variant="p" className="mb-8 text-[rgb(var(--neutral-dark))] opacity-90">
              KH Consultation is your partner for comprehensive relocation solutions, 
              dedicated to helping professionals, students, and businesses smoothly 
              transition and thrive in Berlin.
            </Typography>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                className="button-modern bg-[rgb(var(--primary-color))] text-white hover:bg-[rgb(var(--secondary-color))]"
                asChild
              >
                <a 
                  href="https://callmi.co/expert/abdallahkhirfan" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book An Appointment
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}