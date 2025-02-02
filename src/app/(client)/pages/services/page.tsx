"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Container from "@/components/Container";
import ForBusinesses from "./ForBusinesses/page";
import StudyingInGermany from "./studying-in-germany/page";
import GermanSpeaker from "./german-speaker/page";
import JobRelocation from "./Job-Relocation/page";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function Services() {
  return (
    <Container id="services">
      <Card className="w-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-xl rounded-2xl overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-24 p-6 md:p-12"
        >
          <motion.div variants={sectionVariants} className="mb-16">
            <JobRelocation />
          </motion.div>
          <motion.div variants={sectionVariants} className="mb-16">
            <GermanSpeaker />
          </motion.div>
          <motion.div variants={sectionVariants} className="mb-16">
            <StudyingInGermany />
          </motion.div>
          <motion.div variants={sectionVariants}>
            <ForBusinesses />
          </motion.div>
        </motion.div>
      </Card>
    </Container>
  );
}
