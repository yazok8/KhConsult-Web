import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
import Provider from "@/components/Provider";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Kh Consultation",
  description: "Relocation Services",
  openGraph: {
    title: "Kh Consultation",
    description: "Relocation Services",
    url: "https://www.khconsultation.com",
    siteName: "Kh Consultation",
    images: [
      {
        url: "https://www.khconsultation.com/images/khlogo.png",
        width: 800,
        height: 600,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kh Consultation",
    description: "Relocation Services",
    images: ["https://www.khconsultation.com/images/khlogo.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={cn("bg-background font-sans antialiased", inter.variable)}>
        <Provider>
          {/* Include Google Analytics tracker */}
          <Suspense fallback={<div>Loading...</div>}>
          <GoogleAnalytics />
          </Suspense>
          <main className="bg-black text-white overflow-hidden min-h-screen">{children}</main>
          <Toaster
            position="top-right"
            toastOptions={{
              success: { style: { background: "#4CAF50", color: "#fff" } },
              error: { style: { background: "#f44336", color: "#fff" } },
            }}
          />
        </Provider>
      </body>
    </html>
  );
}
