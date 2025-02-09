"use client";

import { AboutOurTeam } from "@/types/team";
import Image from "next/image";
import { motion } from "framer-motion";
import { Twitter, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getImageSrc } from '@/lib/imageHelper';


interface TeamMemberCardProps {
  member: AboutOurTeam;
  index: number;
}

export function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  const socialIcons = {
    twitter: Twitter,
    linkedin: Linkedin,
    github: Github,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      viewport={{ once: true }}
      className="group flex flex-col items-center gap-8 bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="w-full">
        <AspectRatio ratio={4/5} className="overflow-hidden rounded-xl bg-muted">
          <motion.div 
            className="relative w-full h-full"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {member.profileImage ? (
              <Image
                src={getImageSrc(member.profileImage)}
                alt={member.name}
                fill
                className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index < 2}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground text-xl">No Image</span>
              </div>
            )}
          </motion.div>
        </AspectRatio>
      </div>

      <div className="space-y-4 text-center">
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
        
        {member.socialLinks && (
          <div className="flex justify-center gap-4 pt-4">
            {(Object.keys(member.socialLinks) as Array<keyof typeof socialIcons>).map(
              (platform) => {
                const Icon = socialIcons[platform];
                const link = member.socialLinks?.[platform];
                if (!link) return null;

                return (
                  <Button
                    key={platform}
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "hover:text-primary transition-colors duration-200",
                      "hover:bg-primary/10"
                    )}
                    asChild
                  >
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name}'s ${platform}`}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </Button>
                );
              }
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}