import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      {/* min-h-screen + flex-col is the secret to a perfect sticky footer */}
      <body className={`${inter.className} min-h-full flex flex-col bg-white text-slate-900 antialiased`}>
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