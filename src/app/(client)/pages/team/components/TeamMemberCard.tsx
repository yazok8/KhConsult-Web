"use client";

import { AboutOurTeam } from "@/types/team";
import Image from "next/image";
import { motion } from "framer-motion";
import { getImageSrc } from '@/lib/imageHelper';

interface TeamMemberCardProps {
  member: AboutOurTeam;
  index: number;
  isAlone?: boolean;
}

export function TeamMemberCard({ member, index, isAlone }: TeamMemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      viewport={{ once: true }}
      className={`
        group relative overflow-hidden
        ${isAlone 
          ? 'grid md:grid-cols-2 gap-0 bg-white dark:bg-slate-900 rounded-2xl border border-accent/10 shadow-xl hover:shadow-2xl transition-all duration-300'
          : 'flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-accent/10 shadow-lg hover:shadow-xl transition-all duration-300'
        }
      `}
    >
      {/* Image Container */}
      <div className={`
        relative overflow-hidden
        ${isAlone ? 'h-[400px] md:h-full' : 'h-[300px]'}
      `}>
        {member.profileImage ? (
          <>
            <Image
              src={getImageSrc(member.profileImage)}
              alt={member.name}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              sizes={isAlone 
                ? "(max-width: 768px) 100vw, 50vw"
                : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              }
              priority={index < 2}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
            <span className="text-slate-600 dark:text-slate-400 text-xl">No Image</span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className={`
        relative z-10 p-6 md:p-8 space-y-4
        ${isAlone ? 'flex flex-col justify-center' : ''}
      `}>
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            {member.name}
          </h3>
          <p className="text-lg md:text-xl font-medium text-slate-700 dark:text-slate-300 mt-2">
            {member.title}
          </p>
        </div>
        
        {member.description && (
          <div
            className="prose prose-slate dark:prose-invert text-slate-600 dark:text-slate-400"
            dangerouslySetInnerHTML={{
              __html: member.description,
            }}
          />
        )}
      </div>
    </motion.div>
  );
}