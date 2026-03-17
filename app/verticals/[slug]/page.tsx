"use client";

import Link from "next/link";
import { use } from "react";
import Nav from "../../components/Nav";
import { VERTICALS } from "../../lib/portals";

export default function VerticalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const vertical = VERTICALS.find((v) => v.id === slug);

  if (!vertical) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#555] mb-4 text-sm">Vertical not found</p>
          <Link href="/hub" className="text-xs text-[#e63946] hover:text-white transition-colors">
            ← Back to Platform
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Nav />

      <div className="pt-28 pb-16 px-6 max-w-6xl mx-auto">
        <Link href="/hub" className="text-xs text-[#444] hover:text-white transition-colors mb-8 inline-block">
          ← Back to Platform
        </Link>

        <div className="max-w-2xl">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#e63946] mb-4">
            Vertical {vertical.num}
          </p>
          <h1 className="text-4xl font-black tracking-tight mb-4">{vertical.title}</h1>
          <p className="text-[#666] text-sm leading-relaxed mb-6">{vertical.desc}</p>
          <div className="flex flex-wrap gap-2 mb-12">
            {vertical.tags.map((t) => (
              <span key={t} className="text-[10px] font-mono px-2 py-1 border border-[#1e1e1e] text-[#444] rounded">
                {t}
              </span>
            ))}
          </div>

          <div className="border border-[#e63946]/20 bg-[#e63946]/5 rounded p-8 text-center">
            <p className="text-sm font-semibold mb-2">Course content coming soon.</p>
            <p className="text-xs text-[#555] mb-6">
              Join Pro to get notified when this vertical launches — plus access to all existing content now.
            </p>
            <Link
              href="/#pricing"
              className="inline-block px-6 py-2.5 bg-[#e63946] text-white text-xs font-semibold uppercase tracking-widest rounded hover:bg-[#ff4d5a] transition-colors"
            >
              Join Pro — $29/mo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
