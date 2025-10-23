'use client';

import { PortalTemplate } from '@/app/components/PortalTemplate';
import { Item } from '@/app/types';

const MARKETPLACE_ITEMS: Item[] = [
  {
    id: 'dualpay-card',
    title: 'DualPay Card',
    description: 'Premium physical DualPay card',
    category: 'marketplace',
    type: 'merch',
    price: 29,
    xpReward: 50,
  },
  {
    id: 'yorkverse-hoodie',
    title: 'YorkVerse Hoodie',
    description: 'Limited edition YorkVerse merchandise',
    category: 'marketplace',
    type: 'merch',
    price: 49,
    xpReward: 75,
  },
  {
    id: 'yorkverse-hat',
    title: 'YorkVerse Hat',
    description: 'Premium YorkVerse branded hat',
    category: 'marketplace',
    type: 'merch',
    price: 29,
    xpReward: 50,
  },
  {
    id: 'digital-bundle',
    title: 'Digital Bundle Pack',
    description: 'All digital products at a discount',
    category: 'marketplace',
    type: 'tool',
    price: 299,
    xpReward: 300,
  },
  {
    id: 'vip-membership',
    title: 'VIP Membership (1 Year)',
    description: 'Exclusive access to all premium content',
    category: 'marketplace',
    type: 'tool',
    price: 199,
    xpReward: 250,
  },
  {
    id: 'founder-pass',
    title: 'Founder Pass (Lifetime)',
    description: 'Lifetime access to all current and future content',
    category: 'marketplace',
    type: 'tool',
    price: 999,
    xpReward: 500,
  },
];

export default function MarketplacePortal() {
  return (
    <PortalTemplate
      title="MARKETPLACE STORE"
      subtitle="Merch, digital bundles, exclusive access. Own your piece of the empire."
      gradient="from-pink-500 to-rose-600"
      items={MARKETPLACE_ITEMS}
    />
  );
}

