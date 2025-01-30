// Container.tsx
import React from 'react';
import { twMerge } from 'tailwind-merge'; // Add this if you want to handle class conflicts

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
        'flex justify-center md:items-center md:pt-0 min-h-screen lg:max-w-6xl flex-wrap mx-auto px-5 pt-14',
        className
      )}
    >
      {children}
    </section>
  );
}