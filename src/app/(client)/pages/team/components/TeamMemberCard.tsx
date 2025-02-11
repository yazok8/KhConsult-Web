"use client";

import { AboutOurTeam } from "@/types/team";
import Image from "next/image";
import { motion } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getImageSrc } from '@/lib/imageHelper';

interface TeamMemberCardProps {
  member: AboutOurTeam;
  index: number;
}

export function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      viewport={{ once: true }}
      className="group flex flex-col items-center gap-8 bg-card rounded-xl lg:p-6 transition-all duration-300 shadow-lg hover:shadow-xl w-full"
    >
      <div className="w-full">
        <div className="max-h-[500px] w-full overflow-hidden rounded-xl bg-muted">
          {member.profileImage ? (
            <div className="w-full h-full">
              <Image
                src={getImageSrc(member.profileImage)}
                alt={member.name}
                width={800}
                height={400}
                className="object-cover object-center transition-transform duration-300 group-hover:scale-105 w-full h-[440px]"
                sizes="(max-width: 480px) 100vw, (max-width: 768px) 739px,(max-width: 1200px) 50vw, 800px"
                priority={index < 2}
              />
            </div>
          ) : (
            <div className="w-full h-[400px] bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <span className="text-primary-foreground text-xl">No Image</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4 text-start p-6">
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          {member.name}
        </h3>
        <p className="text-xl font-semibold text-primary/80">
          {member.title}
        </p>
        {member.description && (
          <div
            className="prose prose-lg max-w-none text-muted-foreground"
            dangerouslySetInnerHTML={{
              __html: member.description,
            }}
          />
        )}
      </div>
    </motion.div>
  );
}