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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1e1e1e] bg-[#0a0a0a]/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-sm font-bold tracking-widest text-white uppercase">
            York<span className="text-[#e63946]">Sims</span>
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-xs font-medium tracking-wide uppercase transition-colors ${
                pathname === l.href
                  ? "text-white"
                  : "text-[#666666] hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/#pricing"
          className="text-xs font-semibold uppercase tracking-widest px-4 py-2 bg-[#e63946] text-white rounded hover:bg-[#ff4d5a] transition-colors"
        >
          Join
        </Link>
      </div>
    </nav>
  );
}
