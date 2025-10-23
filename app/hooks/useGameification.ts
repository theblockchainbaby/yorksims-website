'use client';

import { useState, useEffect, useCallback } from 'react';
import { Player, Badge, XPEvent } from '@/app/types';

const STORAGE_KEY = 'yorkverse_player';
const XP_PER_LEVEL = 1000;

const BADGES: Badge[] = [
  {
    id: 'builder-badge',
    name: 'Builder Badge',
    description: 'Downloaded your first blueprint',
    icon: '⚙️',
    xpRequired: 100,
    rarity: 'common',
  },
  {
    id: 'hustler-mode',
    name: 'Hustler Mode Activated',
    description: 'Earned 500 XP',
    icon: '🚀',
    xpRequired: 500,
    rarity: 'rare',
  },
  {
    id: 'dualchain-pioneer',
    name: 'DualChain Pioneer',
    description: 'Connected your crypto wallet',
    icon: '⛓️',
    xpRequired: 250,
    rarity: 'rare',
  },
  {
    id: '90straight-challenger',
    name: '90Straight Challenger',
    description: 'Joined the 90Straight challenge',
    icon: '💪',
    xpRequired: 150,
    rarity: 'common',
  },
  {
    id: 'early-investor',
    name: 'Early Investor',
    description: 'Made your first purchase',
    icon: '💎',
    xpRequired: 300,
    rarity: 'epic',
  },
];

export function useGameification() {
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize player from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setPlayer(JSON.parse(stored));
    } else {
      const newPlayer: Player = {
        id: `player-${Math.random().toString(36).substr(2, 9)}`,
        username: `Player-${Math.floor(Math.random() * 10000)}`,
        xp: 0,
        level: 1,
        badges: [],
        createdAt: new Date(),
        lastActive: new Date(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPlayer));
      setPlayer(newPlayer);
    }
    setLoading(false);
  }, []);

  // Add XP and check for badge unlocks
  const addXP = useCallback((event: XPEvent) => {
    setPlayer((prev) => {
      if (!prev) return prev;

      const newXP = prev.xp + event.xpAmount;
      const newLevel = Math.floor(newXP / XP_PER_LEVEL) + 1;
      let newBadges = [...prev.badges];

      // Check for new badge unlocks
      BADGES.forEach((badge) => {
        if (
          newXP >= badge.xpRequired &&
          !newBadges.find((b) => b.id === badge.id)
        ) {
          newBadges.push({
            ...badge,
            unlockedAt: new Date(),
          });
        }
      });

      const updated: Player = {
        ...prev,
        xp: newXP,
        level: newLevel,
        badges: newBadges,
        lastActive: new Date(),
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Get XP progress to next level
  const getXPProgress = useCallback(() => {
    if (!player) return { current: 0, required: XP_PER_LEVEL, percentage: 0 };
    const levelXP = player.xp % XP_PER_LEVEL;
    return {
      current: levelXP,
      required: XP_PER_LEVEL,
      percentage: (levelXP / XP_PER_LEVEL) * 100,
    };
  }, [player]);

  // Connect wallet
  const connectWallet = useCallback((address: string, type: 'xrpl' | 'evm' | 'solana') => {
    setPlayer((prev) => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        walletAddress: address,
        walletType: type,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    addXP({
      type: 'wallet_connect',
      xpAmount: 50,
      description: 'Connected wallet',
    });
  }, [addXP]);

  return {
    player,
    loading,
    addXP,
    getXPProgress,
    connectWallet,
    badges: BADGES,
  };
}

