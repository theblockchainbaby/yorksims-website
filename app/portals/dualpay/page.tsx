'use client';

import { PortalTemplate } from '@/app/components/PortalTemplate';
import { Item } from '@/app/types';

const DUALPAY_ITEMS: Item[] = [
  {
    id: 'dualpay-app',
    title: 'DualPay Mobile App',
    description: 'Send, receive, and manage payments with DualPay.',
    category: 'dualpay',
    type: 'tool',
    xpReward: 50,
  },
  {
    id: 'dualpay-pos',
    title: 'DualPay POS System',
    description: 'Point-of-sale system for merchants accepting DualPay.',
    category: 'dualpay',
    type: 'tool',
    xpReward: 100,
  },
  {
    id: 'dpx-token',
    title: 'DPX Token Guide',
    description: 'Complete guide to DPX tokenomics, distribution, and utility.',
    category: 'dualpay',
    type: 'ebook',
    xpReward: 75,
  },
  {
    id: 'dpusd-whitepaper',
    title: 'DPUSD Whitepaper',
    description: 'Technical documentation for the DPUSD stablecoin.',
    category: 'dualpay',
    type: 'blueprint',
    xpReward: 150,
  },
  {
    id: 'blockchain-integration',
    title: 'Blockchain Integration Guide',
    description: 'How to integrate DualPay with your blockchain rails.',
    category: 'dualpay',
    type: 'blueprint',
    xpReward: 200,
  },
  {
    id: 'merchant-onboarding',
    title: 'Merchant Onboarding Course',
    description: 'Onboard merchants to DualPay end-to-end.',
    category: 'dualpay',
    type: 'course',
    xpReward: 125,
  },
];

export default function DualPayPortal() {
  return (
    <PortalTemplate
      title="DUALPAY"
      subtitle="Payments, point of sale, and the tokens that move underneath. Builder kits and the official DPX / DPUSD docs."
      items={DUALPAY_ITEMS}
    />
  );
}
