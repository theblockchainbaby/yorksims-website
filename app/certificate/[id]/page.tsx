"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabase";

type CertData = {
  certificate_number: string;
  issued_at: string;
  profiles: { full_name: string | null };
  verticals: { title: string };
};

export default function CertificatePage() {
  const params = useParams();
  const [cert, setCert] = useState<CertData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("certificates")
        .select("certificate_number, issued_at, profiles(full_name), verticals(title)")
        .eq("certificate_number", params.id)
        .single();
      setCert(data as unknown as CertData);
      setLoading(false);
    }
    load();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#e63946] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!cert) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-black mb-2">Certificate not found</h1>
          <p className="text-sm text-white/30 mb-6">This certificate does not exist or has been revoked.</p>
          <Link href="/" className="text-sm text-[#e63946] hover:text-white transition-colors">Go home</Link>
        </div>
      </div>
    );
  }

  const date = new Date(cert.issued_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl"
      >
        {/* Certificate card */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: "32px",
            padding: "64px 48px",
            background: "linear-gradient(135deg, rgba(230,57,70,0.06) 0%, rgba(255,255,255,0.02) 50%, rgba(230,57,70,0.04) 100%)",
            border: "1px solid rgba(230,57,70,0.2)",
          }}
        >
          {/* Corner accents */}
          <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#e63946]/30 rounded-tl-lg" />
          <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[#e63946]/30 rounded-tr-lg" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-[#e63946]/30 rounded-bl-lg" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#e63946]/30 rounded-br-lg" />

          {/* Subtle glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(230,57,70,0.08) 0%, transparent 70%)" }}
          />

          <div className="relative text-center">
            {/* Logo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/york-state-logo.png" alt="York State University" className="h-16 mx-auto mb-8" />

            <p className="text-[10px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-6">Certificate of Completion</p>

            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
              {cert.verticals.title}
            </h1>

            <div className="w-16 h-px bg-[#e63946]/30 mx-auto my-8" />

            <p className="text-sm text-white/30 mb-1">Awarded to</p>
            <p className="text-2xl font-bold text-white mb-8">{cert.profiles.full_name || "Builder"}</p>

            <p className="text-xs text-white/20 mb-1">For completing all modules in this vertical</p>
            <p className="text-xs text-white/20">on the YorkSims.com platform.</p>

            <div className="mt-10 flex items-center justify-between">
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-widest text-white/15 mb-1">Date</p>
                <p className="text-xs text-white/40 font-mono">{date}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest text-white/15 mb-1">Certificate ID</p>
                <p className="text-xs text-white/40 font-mono">{cert.certificate_number}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4 mt-8">
          <Link
            href="/dashboard"
            className="text-xs font-bold uppercase tracking-widest px-8 py-3 border border-white/10 text-white/40 rounded-full hover:text-white hover:border-white/25 transition-colors"
          >
            Dashboard
          </Link>
          <button
            onClick={() => {
              const url = window.location.href;
              navigator.clipboard.writeText(url);
            }}
            className="text-xs font-bold uppercase tracking-widest px-8 py-3 bg-[#e63946] text-white rounded-full hover:bg-[#ff4d5a] transition-all"
          >
            Share Link
          </button>
        </div>
      </motion.div>
    </div>
  );
}
