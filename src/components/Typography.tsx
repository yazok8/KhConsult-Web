// src/components/Typography.tsx
import React from "react";
import clsx from "clsx";
import { Inter, Playfair_Display } from 'next/font/google';

type Variant = "h1" | "h2" | "h3" | "p" | "span" | "div";

interface TypographyProps {
  variant: Variant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  h1: "text-fluid-5xl font-bold",
  h2: "text-fluid-2xl font-semibold",
  h3: "text-2xl font-medium",
  p: "text-base md:text-lg",
  span: "text-base",
  div: "text-base",
};

const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '700'] });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['700'] });

// Apply fonts conditionally based on variant
const Typography: React.FC<TypographyProps> = ({ variant, children, className }) => {
  const Component = variant as keyof JSX.IntrinsicElements;
  const fontClass = variant.startsWith('h') ? playfair.className : inter.className;
  return (
    <Component className={clsx(variantClasses[variant], className, fontClass)}>
      {children}
    </Component>
  );
};
export default Typography;
