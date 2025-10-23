'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PortalCard } from '@/app/components/PortalCard';
import { PlayerDashboard } from '@/app/components/PlayerDashboard';
import { AnimatedBackground } from '@/app/components/AnimatedBackground';
import { WalletConnect } from '@/app/components/WalletConnect';
import { useGameification } from '@/app/hooks/useGameification';
import { PORTALS } from '@/app/lib/portals';

export default function HubPage() {
  const { player, addXP, getXPProgress } = useGameification();
  const [hoveredPortal, setHoveredPortal] = useState<string | null>(null);
  const xpProgress = getXPProgress();

  // Add XP for visiting hub
  if (player && !player.walletAddress) {
    // Only add XP once per session
    const hasVisitedHub = sessionStorage.getItem('hub_visited');
    if (!hasVisitedHub) {
      addXP({
        type: 'portal_visit',
        xpAmount: 25,
        description: 'Visited the hub',
      });
      sessionStorage.setItem('hub_visited', 'true');
    }
  }

  return (
    <main className="relative w-full min-h-screen bg-dark-bg overflow-hidden">
      <AnimatedBackground />

      {/* Wallet Connect */}
      <WalletConnect />

      {/* Player Dashboard */}
      <PlayerDashboard player={player} xpProgress={xpProgress} />

      {/* Hub Content */}
      <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter">
            <span className="bg-gradient-to-r from-neon-green via-neon-cyan to-xrpl-green bg-clip-text text-transparent">
              MISSION CONSOLE
            </span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Select a portal to begin your journey
          </p>
        </motion.div>

        {/* Radial Portal Navigation */}
        <div className="relative w-full h-screen flex items-center justify-center overflow-visible">
          {/* Center circle */}
          <motion.div
            animate={{
              boxShadow: [
                '0 0 20px rgba(0, 255, 136, 0.3)',
                '0 0 40px rgba(0, 255, 136, 0.6)',
                '0 0 20px rgba(0, 255, 136, 0.3)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute w-20 h-20 rounded-full glass border-2 border-neon-green flex items-center justify-center"
          >
            <div className="text-2xl">⚡</div>
          </motion.div>

          {/* Portal Cards in radial layout */}
          {PORTALS.map((portal, index) => (
            <PortalCard
              key={portal.id}
              portal={portal}
              index={index}
              onHover={setHoveredPortal}
            />
          ))}

          {/* Connecting lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {PORTALS.map((_, index) => {
              const angle = (index / PORTALS.length) * Math.PI * 2;
              const radius = 200;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              return (
                <motion.line
                  key={`line-${index}`}
                  x1="50%"
                  y1="50%"
                  x2={`calc(50% + ${x}px)`}
                  y2={`calc(50% + ${y}px)`}
                  stroke="rgba(0, 255, 136, 0.1)"
                  strokeWidth="1"
                  animate={{
                    stroke: hoveredPortal === PORTALS[index].id
                      ? 'rgba(0, 255, 136, 0.5)'
                      : 'rgba(0, 255, 136, 0.1)',
                  }}
                  transition={{ duration: 0.3 }}
                />
              );
            })}
          </svg>
        </div>

        {/* Portal Info */}
        {hoveredPortal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 glass px-6 py-4 rounded-lg max-w-md text-center"
          >
            <p className="text-neon-green font-bold mb-2">
              {PORTALS.find((p) => p.id === hoveredPortal)?.name}
            </p>
            <p className="text-gray-400 text-sm">
              {PORTALS.find((p) => p.id === hoveredPortal)?.description}
            </p>
          </motion.div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-4 left-4 z-50 flex gap-2">
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass px-4 py-2 rounded text-sm text-neon-green hover:text-neon-cyan transition-colors"
          >
            ← Home
          </motion.button>
        </Link>
      </div>

      {/* Secondary Navigation */}
      <div className="fixed bottom-4 right-4 z-50 flex gap-2">
        <Link href="/blog">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass px-4 py-2 rounded text-sm text-neon-cyan hover:text-neon-green transition-colors"
          >
            Briefings
          </motion.button>
        </Link>
        <Link href="/contact">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass px-4 py-2 rounded text-sm text-neon-cyan hover:text-neon-green transition-colors"
          >
            Recruit
          </motion.button>
        </Link>
      </div>
    </main>
  );
}

