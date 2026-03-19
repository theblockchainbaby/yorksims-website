'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
          className="w-16 h-16 rounded-full bg-[#e63946]/10 border border-[#e63946]/20 flex items-center justify-center mx-auto mb-8"
        >
          <span className="text-[#e63946] text-2xl">✓</span>
        </motion.div>
        <h1 className="text-4xl font-black tracking-tight text-white mb-4">You&apos;re in.</h1>
        <p className="text-white/40 text-sm leading-relaxed mb-10">
          Welcome to the York Sims platform. Check your email for access details and next steps.
        </p>
        <Link
          href="/hub"
          className="inline-block text-sm font-bold uppercase tracking-widest px-10 py-4 bg-[#e63946] text-white rounded-full hover:bg-[#ff4d5a] transition-all"
        >
          Go to Hub
        </Link>
      </motion.div>
    </div>
  );
}
