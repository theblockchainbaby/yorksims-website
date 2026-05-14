"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";

const links = [
  { label: "Platform",   href: "/hub",       anchor: null },
  { label: "Tools",      href: "/tools",     anchor: null },
  { label: "Verticals",  href: "/verticals", anchor: null },
  { label: "Pricing",    href: "/pricing",   anchor: null },
  { label: "Blog",       href: "/blog",      anchor: null },
  { label: "Contact",    href: "/contact",   anchor: null },
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
      <nav className="fixed top-0 left-0 right-0 z-50 h-[70px] flex items-center px-4 md:px-8 border-b border-[#1e1e1e] bg-[#0a0a0a]/90 backdrop-blur-sm">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/york-state-logo.png" alt="York State University" style={{ height: "60px", width: "auto", maxHeight: "none", marginLeft: "32px" }} />
        </Link>

        {/* Links — centered (desktop) */}
        <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={(e) => handleAnchorClick(e, l.anchor)}
              className={`text-sm font-semibold tracking-widest uppercase transition-colors ${
                pathname === l.href
                  ? "text-white"
                  : "text-white/40 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA — positioned from right (desktop) */}
        {user ? (
          <Link
            href="/dashboard"
            className="hidden md:block absolute text-xs font-bold uppercase tracking-widest px-5 py-2.5 text-center border border-white/10 text-white rounded-full hover:border-white/25 hover:bg-white/[0.04] transition-all"
            style={{ right: "32px" }}
          >
            Dashboard
          </Link>
        ) : (
          <div className="hidden md:flex items-center gap-5 absolute" style={{ right: "32px" }}>
            <Link
              href="/login"
              className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/pricing"
              className="text-xs font-bold uppercase tracking-widest px-5 py-2.5 text-center bg-[#e63946] text-white rounded-full hover:bg-[#ff4d5a] transition-all hover:scale-105 shadow-[0_0_20px_rgba(230,57,70,0.35)] hover:shadow-[0_0_28px_rgba(230,57,70,0.55)]"
            >
              Join Now
            </Link>
          </div>
        )}

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
        <div className="fixed inset-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md pt-[70px] md:hidden">
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
                  className="mt-2 text-base font-bold uppercase tracking-widest px-8 py-3 bg-[#e63946] text-white rounded-full hover:bg-[#ff4d5a] transition-all shadow-[0_0_20px_rgba(230,57,70,0.35)]"
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
