import type { Metadata } from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "./components/Header";
import Footer from "./components/footer/Footer";


const inter = Inter({subsets:["latin"], variable:"--font-sans"})

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
        className={cn("bg-background font-sans antialiased",inter.variable)}
      >
         <Header />
         <main className="flex-grow">{children}</main>
         <Footer />
      </body>
    </html>
  );
}
