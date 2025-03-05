"use client";

import { AboutOurTeam } from "@/types/team";
import Image from "next/image";
import { motion } from "framer-motion";
import { getImageSrc } from '@/lib/imageHelper';

interface TeamMemberCardProps {
  member: AboutOurTeam & { title: string | null };
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
        group relative overflow-hidden px-6 lg:px-6 md:pr-6 lg:pl-0 gap-8
        ${isAlone 
          ? 'grid lg:grid-cols-2 max-lg:flex max-lg:flex-col gap-0 bg-white dark:bg-slate-900 rounded-2xl border border-accent/10 lg:shadow-xl lg:hover:shadow-2xl transition-all duration-300'
          : 'flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-accent/10 lg:shadow-lg lg:hover:shadow-xl transition-all duration-300'
        }
      `}
    >
      {/* Image Container */}
      <div className={`
        relative overflow-hidden
        ${isAlone 
          ? 'h-[636px] max-lg:h-[700px] max-md:h-[450px] aspect-auto' 
          : 'h-[300px]'
        }
      `}>
        {member.profileImage ? (
          <div className="w-full h-full relative">
            <Image
              src={getImageSrc(member.profileImage)}
              alt={member.name}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              sizes={isAlone 
                ? "(max-width: 600px) 100vw, (max-width: 1005px) 100vw, 50vw"
                : "(max-width: 600px) 100vw, (max-width: 1005px) 50vw, 33vw"
              }
              priority={index < 2}
            />
          </div>
        ) : (
          <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
            <span className="text-slate-600 dark:text-slate-400 text-xl">No Image</span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className={`
        relative z-10
        ${isAlone ? 'flex flex-col' : ''}
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
            className="prose prose-lg dark:prose-invert"
            dangerouslySetInnerHTML={{
              __html: member.description,
            }}
          />
        )}
      </div>
    </motion.div>
  );
}