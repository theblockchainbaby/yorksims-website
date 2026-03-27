"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "../components/AuthProvider";
import { supabase } from "../lib/supabase";

type Vertical = {
  id: string;
  title: string;
  slug: string;
  total_modules: number;
  sort_order: number;
};

type Module = {
  id: string;
  vertical_id: string;
  title: string;
  slug: string;
  sort_order: number;
  is_free: boolean;
};

type Progress = {
  module_id: string;
  completed: boolean;
};

type Certificate = {
  id: string;
  vertical_id: string;
  certificate_number: string;
  issued_at: string;
};

export default function DashboardPage() {
  const { user, profile, loading, signOut } = useAuth();
  const router = useRouter();
  const [verticals, setVerticals] = useState<Vertical[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [activeVertical, setActiveVertical] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    async function load() {
      const [vRes, mRes, pRes, cRes] = await Promise.all([
        supabase.from("verticals").select("*").order("sort_order"),
        supabase.from("modules").select("*").order("sort_order"),
        supabase.from("user_progress").select("module_id, completed").eq("user_id", user!.id),
        supabase.from("certificates").select("*").eq("user_id", user!.id),
      ]);
      if (vRes.data) setVerticals(vRes.data);
      if (mRes.data) setModules(mRes.data);
      if (pRes.data) setProgress(pRes.data);
      if (cRes.data) setCertificates(cRes.data);
      if (vRes.data?.length) setActiveVertical(vRes.data[0].id);
    }
    load();
  }, [user]);

  async function toggleModule(moduleId: string) {
    if (!user) return;
    setUpdating(moduleId);
    const existing = progress.find((p) => p.module_id === moduleId);
    if (existing) {
      const newVal = !existing.completed;
      await supabase
        .from("user_progress")
        .update({ completed: newVal, completed_at: newVal ? new Date().toISOString() : null })
        .eq("user_id", user.id)
        .eq("module_id", moduleId);
      setProgress((prev) => prev.map((p) => p.module_id === moduleId ? { ...p, completed: newVal } : p));
    } else {
      await supabase
        .from("user_progress")
        .insert({ user_id: user.id, module_id: moduleId, completed: true, completed_at: new Date().toISOString() });
      setProgress((prev) => [...prev, { module_id: moduleId, completed: true }]);
    }
    // Refresh certificates
    const { data } = await supabase.from("certificates").select("*").eq("user_id", user.id);
    if (data) setCertificates(data);
    setUpdating(null);
  }

  function getVerticalProgress(verticalId: string) {
    const vModules = modules.filter((m) => m.vertical_id === verticalId);
    const completed = vModules.filter((m) => progress.find((p) => p.module_id === m.id && p.completed));
    return { total: vModules.length, done: completed.length };
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#e63946] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const activeModules = modules.filter((m) => m.vertical_id === activeVertical);
  const totalCompleted = progress.filter((p) => p.completed).length;
  const totalModules = modules.length;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Top bar */}
      <div className="border-b border-white/[0.06] px-6 md:px-12 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/york-state-logo.png" alt="York State University" className="h-10" />
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/community" className="text-xs font-semibold uppercase tracking-widest text-white/30 hover:text-white transition-colors">
            Community
          </Link>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs font-semibold text-white">{profile?.full_name || "Builder"}</p>
              <p className="text-[10px] text-white/20 uppercase tracking-wider">{profile?.tier || "free"} tier</p>
            </div>
            <button
              onClick={signOut}
              className="text-[10px] uppercase tracking-widest text-white/20 hover:text-[#e63946] transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 py-12 max-w-7xl mx-auto">
        {/* Header stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <h1 className="text-4xl font-black tracking-tight mb-2">Your Dashboard</h1>
          <p className="text-sm text-white/30">Track your progress across all 10 verticals.</p>

          <div className="grid grid-cols-3 gap-4 mt-8 max-w-lg">
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 text-center">
              <p className="text-3xl font-black text-[#e63946]">{totalCompleted}</p>
              <p className="text-[10px] uppercase tracking-widest text-white/20 mt-1">Completed</p>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 text-center">
              <p className="text-3xl font-black">{totalModules}</p>
              <p className="text-[10px] uppercase tracking-widest text-white/20 mt-1">Total Modules</p>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 text-center">
              <p className="text-3xl font-black text-[#e63946]">{certificates.length}</p>
              <p className="text-[10px] uppercase tracking-widest text-white/20 mt-1">Certificates</p>
            </div>
          </div>
        </motion.div>

        {/* Certificates earned */}
        {certificates.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="text-xs uppercase tracking-[0.2em] text-white/20 font-semibold mb-4">Certificates Earned</h2>
            <div className="flex flex-wrap gap-3">
              {certificates.map((cert) => {
                const v = verticals.find((v) => v.id === cert.vertical_id);
                return (
                  <Link
                    key={cert.id}
                    href={`/certificate/${cert.certificate_number}`}
                    className="group flex items-center gap-3 bg-[#e63946]/[0.06] border border-[#e63946]/20 rounded-xl px-5 py-3 hover:border-[#e63946]/40 transition-all"
                  >
                    <span className="text-[#e63946] text-sm">✓</span>
                    <div>
                      <p className="text-sm font-semibold text-white">{v?.title}</p>
                      <p className="text-[10px] text-white/20 font-mono">{cert.certificate_number}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Vertical tabs + modules */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* Sidebar: vertical list */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0"
          >
            {verticals.map((v) => {
              const { total, done } = getVerticalProgress(v.id);
              const pct = total > 0 ? Math.round((done / total) * 100) : 0;
              const hasCert = certificates.some((c) => c.vertical_id === v.id);
              return (
                <button
                  key={v.id}
                  onClick={() => setActiveVertical(v.id)}
                  className={`text-left shrink-0 rounded-xl px-5 py-4 transition-all border ${
                    activeVertical === v.id
                      ? "bg-white/[0.04] border-white/[0.12]"
                      : "border-transparent hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-white whitespace-nowrap">{v.title}</p>
                    {hasCert && <span className="text-[#e63946] text-xs ml-2">✓</span>}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#e63946] rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-white/20 shrink-0">{done}/{total}</span>
                  </div>
                </button>
              );
            })}
          </motion.div>

          {/* Main: module list */}
          <motion.div
            key={activeVertical}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col gap-2">
              {activeModules.map((m, i) => {
                const isCompleted = progress.find((p) => p.module_id === m.id)?.completed;
                const isUpdating = updating === m.id;
                const canAccess = m.is_free || profile?.tier !== "free";
                return (
                  <div
                    key={m.id}
                    className={`flex items-center gap-4 rounded-xl px-6 py-5 border transition-all ${
                      isCompleted
                        ? "bg-[#e63946]/[0.04] border-[#e63946]/15"
                        : "bg-white/[0.01] border-white/[0.06] hover:border-white/[0.1]"
                    }`}
                  >
                    <button
                      onClick={() => canAccess && toggleModule(m.id)}
                      disabled={!canAccess || isUpdating}
                      className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                        isCompleted
                          ? "bg-[#e63946] border-[#e63946]"
                          : canAccess
                            ? "border-white/20 hover:border-[#e63946]"
                            : "border-white/10 opacity-30 cursor-not-allowed"
                      }`}
                    >
                      {isUpdating ? (
                        <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                      ) : isCompleted ? (
                        <span className="text-white text-xs">✓</span>
                      ) : null}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-white/15">{String(i + 1).padStart(2, "0")}</span>
                        <p className={`text-sm font-semibold ${isCompleted ? "text-white/40 line-through" : "text-white"}`}>
                          {m.title}
                        </p>
                      </div>
                    </div>

                    {m.is_free ? (
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-white/[0.06] text-white/30">Free</span>
                    ) : profile?.tier === "free" ? (
                      <Link href="/#pricing" className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-[#e63946]/10 text-[#e63946]">
                        Pro
                      </Link>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
