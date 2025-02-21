import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ContainerProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export default function Container({ children, id, className }: ContainerProps) {
  return (
    <section
      id={id}
      className={twMerge(
        // Removed flex, justify-center, items-center, and min-h-screen
        'lg:max-w-6xl mx-auto px-5',
        className
      )}
    >
      {children}
    </section>
  );
}
