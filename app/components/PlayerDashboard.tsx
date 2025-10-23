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
      className="fixed top-4 right-4 z-50 glass px-6 py-4 rounded-lg max-w-sm"
    >
      {/* Player Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-neon-green font-bold text-sm">{player.username}</h3>
          <p className="text-gray-400 text-xs">Level {player.level}</p>
        </div>
        <div className="text-right">
          <p className="text-neon-cyan font-mono text-sm">{player.xp} XP</p>
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-400">Progress to Level {player.level + 1}</span>
          <span className="text-xs text-neon-green font-mono">
            {xpProgress.current}/{xpProgress.required}
          </span>
        </div>
        <div className="w-full h-2 bg-dark-card rounded-full overflow-hidden border border-neon-green/20">
          <motion.div
            className="h-full bg-gradient-to-r from-neon-green to-xrpl-green"
            initial={{ width: 0 }}
            animate={{ width: `${xpProgress.percentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Badges */}
      {player.badges.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-400 mb-2">Badges ({player.badges.length})</p>
          <div className="flex gap-2 flex-wrap">
            {player.badges.slice(0, 3).map((badge) => (
              <motion.div
                key={badge.id}
                whileHover={{ scale: 1.1 }}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-green to-xrpl-green flex items-center justify-center text-xs cursor-help"
                title={badge.name}
              >
                {badge.icon}
              </motion.div>
            ))}
            {player.badges.length > 3 && (
              <div className="w-8 h-8 rounded-full glass flex items-center justify-center text-xs text-neon-green">
                +{player.badges.length - 3}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Wallet Status */}
      {player.walletAddress ? (
        <div className="text-xs text-neon-cyan font-mono">
          <span className="text-gray-400">Wallet: </span>
          {player.walletAddress.slice(0, 6)}...{player.walletAddress.slice(-4)}
        </div>
      ) : (
        <div className="text-xs text-gray-400">
          <span className="text-neon-purple">→ Connect wallet to unlock features</span>
        </div>
      )}
    </motion.div>
  );
}

