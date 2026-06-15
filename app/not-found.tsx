import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "./lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Page Not Found — YorkSims.com",
    description:
      "This page doesn't exist. Head back to the build blog, the verticals, or the platform hub.",
    path: "/404",
    noIndex: true,
  }),
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0c0a0a] text-white flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-6">
          404 — Not Found
        </p>
        <h1 className="text-5xl md:text-6xl font-display font-extrabold tracking-tight leading-[0.95] mb-6">
          Wrong turn.
        </h1>
        <p className="text-sm text-white/30 mb-10 leading-relaxed">
          The page you&rsquo;re looking for doesn&rsquo;t exist. Maybe a typo, maybe
          it moved. Either way, let&rsquo;s get you back on track.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="inline-block text-sm font-bold uppercase tracking-widest px-8 py-4 bg-[#e63946] text-white rounded-full hover:bg-[#ff4d5a] transition-all"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="inline-block text-sm font-bold uppercase tracking-widest px-8 py-4 border border-white/10 text-white/70 rounded-full hover:border-white/30 hover:text-white transition-all"
          >
            Build Blog
          </Link>
          <Link
            href="/verticals"
            className="inline-block text-sm font-bold uppercase tracking-widest px-8 py-4 border border-white/10 text-white/70 rounded-full hover:border-white/30 hover:text-white transition-all"
          >
            Verticals
          </Link>
        </div>
      </div>
    </div>
  );
}
