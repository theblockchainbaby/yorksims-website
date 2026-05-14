'use client';

import { motion } from 'framer-motion';
import { Player } from '@/app/types';

interface PlayerDashboardProps {
  player: Player | null;
  xpProgress: { current: number; required: number; percentage: number };
}

export function PlayerDashboard({ player, xpProgress }: PlayerDashboardProps) {
  if (!player) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 z-50 border border-white/[0.08] bg-[#0a0a0a]/85 backdrop-blur-sm px-5 py-4 rounded-[14px] max-w-sm"
    >
      {/* Player Header */}
      <div className="flex items-center justify-between mb-4 gap-6">
        <div>
          <h3 className="text-white font-bold text-sm">{player.username}</h3>
          <p className="text-white/40 text-xs">Level {player.level}</p>
        </div>
        <div className="text-right">
          <p className="text-[#e63946] font-mono text-sm font-bold">{player.xp} XP</p>
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] text-white/40 uppercase tracking-widest">
            To Level {player.level + 1}
          </span>
          <span className="text-[10px] text-white/55 font-mono">
            {xpProgress.current}/{xpProgress.required}
          </span>
        </div>
        <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#e63946]"
            initial={{ width: 0 }}
            animate={{ width: `${xpProgress.percentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Badges */}
      {player.badges.length > 0 && (
        <div className="mb-3">
          <p className="text-[10px] text-white/40 mb-2 uppercase tracking-widest">
            Badges ({player.badges.length})
          </p>
          <div className="flex gap-2 flex-wrap">
            {player.badges.slice(0, 3).map((badge) => (
              <motion.div
                key={badge.id}
                whileHover={{ scale: 1.1 }}
                className="w-8 h-8 rounded-full border border-[#e63946]/40 bg-[#e63946]/10 flex items-center justify-center text-xs cursor-help"
                title={badge.name}
              >
                {badge.icon}
              </motion.div>
            ))}
            {player.badges.length > 3 && (
              <div className="w-8 h-8 rounded-full border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-[10px] text-white/55 font-mono">
                +{player.badges.length - 3}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Wallet Status */}
      {player.walletAddress ? (
        <div className="text-[10px] text-white/55 font-mono">
          <span className="text-white/40">Wallet: </span>
          {player.walletAddress.slice(0, 6)}...{player.walletAddress.slice(-4)}
        </div>
      ) : (
        <div className="text-[10px] text-white/40">
          → Connect wallet to unlock features
        </div>
      )}
    </motion.div>
  );
}
