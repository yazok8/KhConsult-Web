import React from 'react';  
import type { Metadata } from "next";  
import { Inter } from "next/font/google";  
import "./globals.css";  
import { cn } from "@/lib/utils";  
  
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });  
  
export const metadata: Metadata = {  
  title: "Kh Consultation",  
  description: "Relocation Services",  
};  
  
export default function RootLayout({  
  children,  
}: Readonly<{  
  children: React.ReactNode;  
}>) {  
  return (  
   <html lang="en">  
    <body  
      className={cn("bg-background font-sans antialiased", inter.variable)}  
    >  
     <main> {children} </main> 
    </body>  
   </html>  
  );  
}
