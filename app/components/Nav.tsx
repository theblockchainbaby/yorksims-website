"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Platform",   href: "/hub" },
  { label: "Verticals",  href: "/verticals" },
  { label: "Pricing",    href: "/#pricing" },
  { label: "Blog",       href: "/blog" },
  { label: "Contact",    href: "/contact" },
];

export default function Nav() {
  const pathname = usePathname();

  // Only show navbar on homepage
  if (pathname !== "/") return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[70px] flex items-center px-8 border-b border-[#1e1e1e] bg-[#0a0a0a]/90 backdrop-blur-sm">

      {/* Logo */}
      <Link href="/" className="flex items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/york-state-logo.png" alt="York State University" style={{ height: "60px", width: "auto", maxHeight: "none", marginLeft: "32px" }} />
      </Link>

      {/* Links — centered */}
      <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`text-sm font-semibold tracking-widest uppercase transition-colors ${
              pathname === l.href
                ? "text-white"
                : "text-[#666666] hover:text-white"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>

      {/* CTA — positioned from right */}
      <Link
        href="/#pricing"
        className="absolute text-lg font-bold uppercase tracking-widest px-20 py-6 min-w-[200px] text-center bg-[#e63946] text-white rounded-xl hover:bg-[#ff4d5a] transition-all hover:scale-105 shadow-[0_0_20px_rgba(230,57,70,0.4)] hover:shadow-[0_0_30px_rgba(230,57,70,0.6)]"
        style={{ right: "32px" }}
      >
        Join Now
      </Link>

    </nav>
  );
}
