"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "../components/AuthProvider";

export default function LoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      setError(error);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <Link href="/" className="block mb-12 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/york-state-logo.png" alt="York State University" className="h-16 mx-auto" />
        </Link>

        <h1 className="text-3xl font-black tracking-tight text-center mb-2">Welcome back</h1>
        <p className="text-sm text-white/30 text-center mb-10">Sign in to continue building.</p>

        {error && (
          <div className="mb-6 text-sm text-[#e63946] bg-[#e63946]/10 border border-[#e63946]/20 rounded-xl px-4 py-3 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/20 mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/[0.07] px-4 py-3.5 text-sm text-white placeholder-white/15 focus:outline-none focus:border-[#e63946]/40 transition-colors rounded-xl"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/20 mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/[0.07] px-4 py-3.5 text-sm text-white placeholder-white/15 focus:outline-none focus:border-[#e63946]/40 transition-colors rounded-xl"
              placeholder="Your password"
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#e63946] text-white text-xs font-bold uppercase tracking-widest rounded-full relative overflow-hidden disabled:opacity-60"
            whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(230,57,70,0.4)" }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
            />
            <span className="relative z-10">{loading ? "Signing in..." : "Sign In"}</span>
          </motion.button>
        </form>

        <p className="text-center text-sm text-white/20 mt-8">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#e63946] hover:text-white transition-colors">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
}
