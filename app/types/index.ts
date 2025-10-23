// Portal types
export type PortalId = 'dualpay' | 'ai-agents' | 'books' | 'dualacademy' | '90straight' | 'crypto' | 'elite-eighth' | 'marketplace';

export interface Portal {
  id: PortalId;
  name: string;
  description: string;
  icon: string;
  color: string;
  glowColor: string;
  route: string;
}

// Player/User types
export interface Player {
  id: string;
  username: string;
  xp: number;
  level: number;
  badges: Badge[];
  walletAddress?: string;
  walletType?: 'xrpl' | 'evm' | 'solana';
  createdAt: Date;
  lastActive: Date;
}

// Badge types
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpRequired: number;
  unlockedAt?: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

// Item types (for portals)
export interface Item {
  id: string;
  title: string;
  description: string;
  image?: string;
  category: PortalId;
  price?: number;
  currency?: 'usd' | 'dux' | 'xrp';
  type: 'ebook' | 'course' | 'tool' | 'merch' | 'token' | 'blueprint';
  xpReward?: number;
  unlocked?: boolean;
}

// Gamification types
export interface XPEvent {
  type: 'portal_visit' | 'item_download' | 'course_enroll' | 'badge_unlock' | 'wallet_connect' | 'purchase';
  xpAmount: number;
  description: string;
}

export interface Leaderboard {
  rank: number;
  player: Player;
  xp: number;
  badges: number;
}

// Marketplace types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: 'usd' | 'dux' | 'xrp';
  image?: string;
  category: string;
  tier: 'free' | 'builder' | 'hustler' | 'founder';
}

export interface Subscription {
  id: string;
  tier: 'free' | 'builder' | 'hustler' | 'founder';
  name: string;
  price: number;
  features: string[];
  description: string;
}

