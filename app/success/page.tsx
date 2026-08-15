'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

interface OrderInfo {
  paid: boolean;
  bookId: string | null;
  title: string | null;
  fileReady: boolean;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [order, setOrder] = useState<OrderInfo | null>(null);
  const [checking, setChecking] = useState(Boolean(sessionId));

  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;
    fetch(`/api/download?session_id=${encodeURIComponent(sessionId)}&check=1`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled) setOrder(data);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setChecking(false);
      });
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const isBookOrder = Boolean(order?.paid && order?.bookId);

  return (
    <div className="min-h-screen bg-[#0c0a0a] flex items-center justify-center px-6">
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

        {checking ? (
          <>
            <h1 className="text-4xl font-display font-extrabold tracking-tight text-white mb-4">
              Payment received.
            </h1>
            <p className="text-white/40 text-sm leading-relaxed mb-10">
              Confirming your order…
            </p>
          </>
        ) : isBookOrder ? (
          <>
            <h1 className="text-4xl font-display font-extrabold tracking-tight text-white mb-4">
              Your book is ready.
            </h1>
            <p className="text-white/40 text-sm leading-relaxed mb-10">
              Thanks for the purchase{order?.title ? ` of ${order.title}` : ''}.
              {order?.fileReady
                ? ' Hit the button below to download your PDF. Save this page’s link — it keeps working if you need the file again.'
                : ' The download link is being finalized — email contact@yorksims.com with your receipt and you’ll get the PDF directly.'}
            </p>
            {order?.fileReady ? (
              <a
                href={`/api/download?session_id=${encodeURIComponent(sessionId ?? '')}`}
                className="inline-block text-sm font-bold uppercase tracking-widest px-10 py-4 bg-[#e63946] text-white rounded-full hover:bg-[#ff4d5a] transition-all"
              >
                Download the PDF
              </a>
            ) : (
              <a
                href="mailto:contact@yorksims.com"
                className="inline-block text-sm font-bold uppercase tracking-widest px-10 py-4 bg-[#e63946] text-white rounded-full hover:bg-[#ff4d5a] transition-all"
              >
                Email for your PDF
              </a>
            )}
            <div className="mt-6">
              <Link
                href="/books"
                className="text-xs text-white/30 hover:text-white transition-colors"
              >
                ← Back to books
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-display font-extrabold tracking-tight text-white mb-4">
              You&apos;re in.
            </h1>
            <p className="text-white/40 text-sm leading-relaxed mb-10">
              Payment confirmed. If you were expecting a download and don&apos;t
              see it, email contact@yorksims.com with your receipt.
            </p>
            <Link
              href="/hub"
              className="inline-block text-sm font-bold uppercase tracking-widest px-10 py-4 bg-[#e63946] text-white rounded-full hover:bg-[#ff4d5a] transition-all"
            >
              Go to Hub
            </Link>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0c0a0a]" />}>
      <SuccessContent />
    </Suspense>
  );
}
