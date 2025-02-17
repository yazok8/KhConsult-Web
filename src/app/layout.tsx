import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
import Provider from "@/components/Provider";

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
        <Provider>
          <main className="bg-black text-white">{children} </main>
          <Toaster
            position="top-right" // Position can be adjusted as needed
            toastOptions={{
              success: {
                style: {
                  background: "#4CAF50",
                  color: "#fff",
                },
              },
              error: {
                style: {
                  background: "#f44336",
                  color: "#fff",
                },
              },
            }}
          />
        </Provider>
      </body>
    </html>
  );
}
