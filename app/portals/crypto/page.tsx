'use client';

import { PortalTemplate } from '@/app/components/PortalTemplate';
import { Item } from '@/app/types';

const CRYPTO_ITEMS: Item[] = [
  {
    id: 'bitcoin-legacy-trust',
    title: 'Bitcoin Legacy Trust Setup',
    description: 'How to set up a Bitcoin legacy trust',
    category: 'crypto',
    type: 'blueprint',
    price: 99,
    xpReward: 150,
  },
  {
    id: 'xrpl-escrow-guide',
    title: 'XRPL Escrow Projects Guide',
    description: 'Complete guide to XRPL escrow implementation',
    category: 'crypto',
    type: 'blueprint',
    price: 79,
    xpReward: 125,
  },
  {
    id: 'cold-wallet-setup',
    title: 'Cold Wallet Security Guide',
    description: 'Secure your crypto with cold storage',
    category: 'crypto',
    type: 'ebook',
    price: 29,
    xpReward: 75,
  },
  {
    id: 'crypto-tax-guide',
    title: 'Crypto Tax Planning Guide',
    description: 'Optimize your crypto taxes legally',
    category: 'crypto',
    type: 'ebook',
    price: 49,
    xpReward: 100,
  },
  {
    id: 'defi-strategies',
    title: 'DeFi Strategies Masterclass',
    description: 'Advanced DeFi yield farming strategies',
    category: 'crypto',
    type: 'course',
    price: 149,
    xpReward: 200,
  },
  {
    id: 'wallet-integration',
    title: 'Wallet Integration Blueprint',
    description: 'Technical guide for wallet integration',
    category: 'crypto',
    type: 'blueprint',
    price: 199,
    xpReward: 250,
  },
];

export default function CryptoPortal() {
  return (
    <PortalTemplate
      title="CRYPTO WALLETS & TRUSTS"
      subtitle="Bitcoin Legacy Trust, XRPL escrow projects. Secure your digital assets."
      gradient="from-indigo-500 to-purple-600"
      items={CRYPTO_ITEMS}
    />
  );
}

