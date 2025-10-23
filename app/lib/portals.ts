import { Portal } from '@/app/types';

export const PORTALS: Portal[] = [
  {
    id: 'dualpay',
    name: 'DualPay Ecosystem',
    description: 'App, POS, blockchain, DPX Token, DPUSD',
    icon: '⚡',
    color: 'from-cyan-500 to-blue-600',
    glowColor: 'glow-cyan',
    route: '/portals/dualpay',
  },
  {
    id: 'ai-agents',
    name: 'AI Agents & Companies',
    description: 'Otto AI, AgentZero, RetailFlowAI, AI Employees-as-a-Service',
    icon: '🤖',
    color: 'from-purple-500 to-pink-600',
    glowColor: 'glow-purple',
    route: '/portals/ai-agents',
  },
  {
    id: 'books',
    name: 'Books & PDFs',
    description: 'Written books, manuals, debt plans, whitepapers',
    icon: '📖',
    color: 'from-green-500 to-emerald-600',
    glowColor: 'glow-green',
    route: '/portals/books',
  },
  {
    id: 'dualacademy',
    name: 'DualAcademy',
    description: 'Courses: crypto, hustle, mental toughness, coding',
    icon: '🎓',
    color: 'from-yellow-500 to-orange-600',
    glowColor: 'glow-green',
    route: '/portals/dualacademy',
  },
  {
    id: '90straight',
    name: '90Straight / Fitness',
    description: 'Mental toughness gamified challenge',
    icon: '⏱️',
    color: 'from-red-500 to-rose-600',
    glowColor: 'glow-purple',
    route: '/portals/90straight',
  },
  {
    id: 'crypto',
    name: 'Crypto Wallets & Trusts',
    description: 'Bitcoin Legacy Trust, XRPL escrow projects',
    icon: '🔐',
    color: 'from-indigo-500 to-purple-600',
    glowColor: 'glow-cyan',
    route: '/portals/crypto',
  },
  {
    id: 'elite-eighth',
    name: 'Elite Eighth / Cannabis',
    description: 'Branding, past projects, future launches',
    icon: '👑',
    color: 'from-lime-500 to-green-600',
    glowColor: 'glow-green',
    route: '/portals/elite-eighth',
  },
  {
    id: 'marketplace',
    name: 'Marketplace Store',
    description: 'Merch, digital bundles, exclusive access',
    icon: '🛍️',
    color: 'from-pink-500 to-rose-600',
    glowColor: 'glow-purple',
    route: '/portals/marketplace',
  },
];

export const getPortalById = (id: string): Portal | undefined => {
  return PORTALS.find((portal) => portal.id === id);
};

