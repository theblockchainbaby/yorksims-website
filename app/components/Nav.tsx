"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";

// The destinations that matter. Blog + Contact live in the footer — a nav
// that lists everything is a sitemap, not a nav.
const links = [
  { label: "Platform",   href: "/hub",       anchor: null },
  { label: "Verticals",  href: "/verticals", anchor: null },
  { label: "Tools",      href: "/tools",     anchor: null },
  { label: "Books",      href: "/books",     anchor: null },
  { label: "Pricing",    href: "/pricing",   anchor: null },
];

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();

  function handleAnchorClick(e: React.MouseEvent, anchor: string | null) {
    if (!anchor) return;
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(anchor);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* Edge-aligned: wordmark left, everything else right-grouped. No
          centre cluster, no hairline box around the top. */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center justify-between px-5 md:px-10 bg-[#0c0a0a]/80 backdrop-blur-md">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/york-state-logo.png" alt="York State University" style={{ height: "54px", width: "auto", maxHeight: "none" }} />
        </Link>

        {/* Links + CTA — one right-grouped cluster (desktop) */}
        <div className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={(e) => handleAnchorClick(e, l.anchor)}
              className={`relative text-[13px] font-semibold tracking-wide transition-colors ${
                pathname === l.href
                  ? "text-white"
                  : "text-white/45 hover:text-white"
              }`}
            >
              {l.label}
              {pathname === l.href && (
                <span className="absolute -bottom-1.5 left-0 w-full h-px bg-[#e63946]" />
              )}
            </Link>
          ))}

          <span className="w-px h-5 bg-white/10" />

          {user ? (
            <Link
              href="/dashboard"
              className="text-[13px] font-semibold px-4 py-2 border border-white/12 text-white rounded-lg hover:border-white/30 hover:bg-white/[0.04] transition-colors"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-[13px] font-semibold text-white/45 hover:text-white transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/pricing"
                className="text-[13px] font-semibold px-4 py-2 bg-[#e63946] text-white rounded-lg hover:bg-[#ff4d5a] transition-colors"
              >
                Join
              </Link>
            </>
          )}
        </div>

        {/* Hamburger button (mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden ml-auto mr-4 md:mr-8 flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[5px]" : ""}`} />
          <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[5px]" : ""}`} />
        </button>

      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0c0a0a]/95 backdrop-blur-md pt-[70px] md:hidden">
          <div className="flex flex-col items-center justify-center gap-8 pt-16">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  handleAnchorClick(e, l.anchor);
                  setMenuOpen(false);
                }}
                className="text-2xl font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
            {user ? (
              <Link
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="mt-4 text-base font-bold uppercase tracking-widest px-8 py-3 border border-white/10 text-white rounded-full hover:border-white/25 transition-all"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/pricing"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 text-base font-bold uppercase tracking-widest px-8 py-3 bg-[#e63946] text-white rounded-full hover:bg-[#ff4d5a] transition-all"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
