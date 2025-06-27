import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Typography from '@/components/Typography';

interface ServiceCardProps {
  id:string
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  isReversed?: boolean;
}

export default function ServiceCard({
  id,
  title,
  description,
  imageSrc,
  imageAlt,
  isReversed = false,
}: ServiceCardProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col-reverse ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-start`}
    >
      <div className="lg:w-1/2 text">
        <motion.div
          initial={{ opacity: 0, x: isReversed ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Typography variant="h2" className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
            {title}
          </Typography>
          <div
            className="prose prose-lg dark:prose-invert min-w-full md:min-w-[500px]"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </motion.div>
      </div>
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative aspect-w-16 aspect-h-12 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1000}
            height={600}
            className="object-cover"
            priority
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
