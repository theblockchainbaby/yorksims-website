"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Nav from "../components/Nav";
import { BOOKS, formatBookPrice } from "../lib/books";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function BooksPage() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const buy = async (bookId: string) => {
    setLoadingId(bookId);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Checkout failed");
      window.location.href = data.url;
    } catch {
      setError(
        "Couldn't start checkout. Try again in a minute, or email contact@yorksims.com and I'll sort it out."
      );
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0a0a] text-white">
      <Nav />

      {/* Hero */}
      <section
        className="relative px-6 md:px-16 overflow-hidden"
        style={{ paddingTop: "150px", paddingBottom: "40px" }}
      >
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.p
            className="text-[11px] uppercase tracking-[0.28em] text-[#e63946] font-semibold mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            Books
          </motion.p>
          <motion.h1
            className="text-5xl md:text-7xl font-display font-extrabold tracking-tight leading-[0.95] mb-7"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
          >
            Three books.{" "}
            <span className="text-white/25">The story behind the builds.</span>
          </motion.h1>
          <motion.p
            className="text-lg text-white/45 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.16 }}
          >
            Instant PDF download. Pay with card via Stripe, get the file on the
            next screen. No account needed.
          </motion.p>
        </div>
      </section>

      {/* Book cards */}
      <section
        className="px-6 md:px-16"
        style={{ paddingTop: "60px", paddingBottom: "80px" }}
      >
        <div className="max-w-6xl mx-auto">
          {error && (
            <div className="mb-8 border border-[#e63946]/40 bg-[#e63946]/10 rounded-[16px] px-6 py-4 text-sm text-white/80">
              {error}
            </div>
          )}
          <div className="grid md:grid-cols-3 gap-6">
            {BOOKS.map((book, i) => (
              <FadeIn key={book.id} delay={i * 0.08}>
                <div className="border border-white/[0.08] rounded-[28px] overflow-hidden h-full flex flex-col bg-white/[0.015] hover:border-white/20 transition-colors">
                  <div className="w-full aspect-[3/4] bg-black/40 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={book.cover}
                      alt={`${book.title} — book cover`}
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-7 flex-1 flex flex-col">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-3">
                      {book.tagline}
                    </p>
                    <h2 className="text-xl font-display font-extrabold tracking-tight mb-3 leading-tight">
                      {book.title}
                    </h2>
                    <p className="text-sm text-white/45 leading-relaxed mb-6 flex-1">
                      {book.description}
                    </p>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-3xl font-display font-extrabold tracking-tight">
                        {formatBookPrice(book.priceCents)}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-white/30 font-mono">
                        PDF
                      </span>
                    </div>
                    <button
                      onClick={() => buy(book.id)}
                      disabled={loadingId !== null}
                      className="w-full text-center text-sm font-bold uppercase tracking-widest px-8 py-4 bg-[#e63946] text-white rounded-full hover:bg-[#ff4d5a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loadingId === book.id ? "Redirecting…" : "Buy the PDF"}
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <p className="text-center text-xs text-white/30 mt-10 leading-relaxed">
              Secure checkout by Stripe. Something wrong with an order? Email{" "}
              <a
                href="mailto:contact@yorksims.com"
                className="text-white/50 hover:text-[#e63946] transition-colors"
              >
                contact@yorksims.com
              </a>{" "}
              and I&rsquo;ll fix it.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 md:px-16"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "48px",
          paddingBottom: "48px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="w-full max-w-[1000px] flex flex-col md:flex-row justify-between items-center gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/york-state-logo.png"
            alt="York State University"
            style={{ height: "60px", width: "auto" }}
          />
          <p className="text-xs text-white/20 font-mono">
            Teaching Execution, Not Theory
          </p>
          <div className="flex gap-6 md:gap-8 flex-wrap justify-center">
            {[
              { label: "Home", href: "/" },
              { label: "Verticals", href: "/verticals" },
              { label: "Tools", href: "/tools" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-xs text-white/30 hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
