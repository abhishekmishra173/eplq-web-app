import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import KeyboardShortcuts from "@/components/KeyboardShortcuts"; // <-- 1. IMPORT ADDED

const inter = Inter({ subsets: ["latin"] });

// Added basic metadata back in for SEO and browser tab titles
export const metadata: Metadata = {
  title: "EPLQ | Secure Node",
  description: "Efficient Privacy-Preserving Location-Based Query",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      {/* min-h-screen + flex-col is the secret to a perfect sticky footer */}
      <body className={`${inter.className} min-h-full flex flex-col bg-[#0B0F14] text-white antialiased`}>
        
        {/* 2. GLOBAL LISTENER INJECTED HERE */}
        <KeyboardShortcuts />

        <Navbar />
        
        {/* flex-grow pushes the footer to the bottom if content is short */}
        <main className="flex-grow w-full relative">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
} 