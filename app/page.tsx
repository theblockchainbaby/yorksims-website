'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { AnimatedBackground } from '@/app/components/AnimatedBackground';
import { useGameification } from '@/app/hooks/useGameification';

export default function Home() {
  const { player } = useGameification();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const glitchVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-dark-bg">
      <AnimatedBackground />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Title */}
          <motion.div variants={glitchVariants} className="mb-8">
            <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter">
              <span className="bg-gradient-to-r from-neon-green via-neon-cyan to-xrpl-green bg-clip-text text-transparent">
                YORKVERSE
              </span>
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-neon-green to-neon-cyan rounded-full" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-2xl text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed"
          >
            Where fintech, blockchain, fitness, AI, and legacy collide.
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-sm md:text-base text-gray-400 mb-12 max-w-xl mx-auto"
          >
            This is not a portfolio. This is a digital empire in motion.
            <br />
            Pick your portal. Earn XP. Unlock badges. Join the revolution.
          </motion.p>

          {/* Player Info */}
          {player && (
            <motion.div
              variants={itemVariants}
              className="mb-12 glass px-6 py-4 rounded-lg inline-block"
            >
              <p className="text-neon-green font-mono text-sm">
                Welcome, {player.username}
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Level {player.level} • {player.xp} XP
              </p>
            </motion.div>
          )}

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <Link href="/hub">
              <button className="group relative px-8 py-4 text-lg font-bold text-dark-bg bg-gradient-to-r from-neon-green to-xrpl-green rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-neon-green/50">
                <span className="relative z-10 flex items-center gap-2">
                  ENTER HUB
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-green opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-neon-green text-2xl"
            >
              ↓
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
