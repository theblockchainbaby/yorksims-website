import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YorkVerse - The Digital Empire",
  description: "Enter the YorkVerse: A dark-themed, gamified digital hub where fintech, blockchain, fitness, AI, and legacy collide. Explore portals, earn XP, unlock badges, and join the digital empire.",
  keywords: ["YorkSims", "DualPay", "AI Agents", "Blockchain", "Crypto", "DualAcademy", "Fitness", "Gamification"],
  authors: [{ name: "York Sims Jr." }],
  openGraph: {
    title: "YorkVerse - The Digital Empire",
    description: "Enter the YorkVerse: A dark-themed, gamified digital hub",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-dark-bg text-white`}
      >
        {children}
      </body>
    </html>
  );
}
