import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YorkSims.com — Stop Learning. Start Building.",
  description: "A premium education and execution platform built by a builder who ships across 10 industries. Real code, real contracts, real results — not theory.",
  keywords: ["YorkSims", "builder education", "SaaS", "AI agents", "hardware engineering", "blockchain", "business building", "execution"],
  authors: [{ name: "York Sims" }],
  openGraph: {
    title: "YorkSims.com — Stop Learning. Start Building.",
    description: "Teaching Execution, Not Theory — Built by a Builder, for Builders",
    type: "website",
    url: "https://yorksims.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "YorkSims.com — Stop Learning. Start Building.",
    description: "Teaching Execution, Not Theory — Built by a Builder, for Builders",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-dark-bg text-white`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
