import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import PasscodeGate from "./components/PasscodeGate";
import { AuthProvider } from "./components/AuthProvider";
import {
  JsonLd,
  organizationSchema,
  websiteSchema,
  personSchema,
} from "./components/JsonLd";
import { SITE, pageMetadata } from "./lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: SITE.defaults.themeColor,
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  ...pageMetadata({
    title: `${SITE.name} — ${SITE.hero}`,
    description: SITE.description,
    path: "/",
  }),
  applicationName: SITE.name,
  referrer: "origin-when-cross-origin",
  keywords: [
    "YorkSims",
    "builder education",
    "SaaS",
    "AI agents",
    "hardware engineering",
    "blockchain",
    "business building",
    "execution",
    "Next.js",
    "Claude Code",
    "indie hacker",
    "LLC",
    "XRPL",
    "SystemVerilog",
  ],
  authors: [{ name: SITE.author.name, url: SITE.author.url }],
  creator: SITE.author.name,
  publisher: SITE.legalName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-icon.png",
  },
  verification: {
    google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_CODE",
  },
  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-white`}>
        <JsonLd data={[organizationSchema(), websiteSchema(), personSchema()]} />
        <AuthProvider>
          <PasscodeGate>
            <SmoothScroll>{children}</SmoothScroll>
          </PasscodeGate>
        </AuthProvider>
      </body>
    </html>
  );
}
