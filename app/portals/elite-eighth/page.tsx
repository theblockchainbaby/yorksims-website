'use client';

import { PortalTemplate } from '@/app/components/PortalTemplate';
import { Item } from '@/app/types';

const ELITE_EIGHTH_ITEMS: Item[] = [
  {
    id: 'elite-eighth-brand',
    title: 'Elite Eighth Brand Guide',
    description: 'Complete branding and positioning guide',
    category: 'elite-eighth',
    type: 'blueprint',
    price: 79,
    xpReward: 100,
  },
  {
    id: 'past-projects-archive',
    title: 'Past Projects Archive',
    description: 'Case studies and learnings from previous ventures',
    category: 'elite-eighth',
    type: 'ebook',
    price: 49,
    xpReward: 85,
  },
  {
    id: 'market-analysis',
    title: 'Market Analysis Report',
    description: 'Industry trends and opportunities',
    category: 'elite-eighth',
    type: 'blueprint',
    price: 99,
    xpReward: 125,
  },
  {
    id: 'launch-playbook',
    title: 'Product Launch Playbook',
    description: 'Step-by-step guide to launching new products',
    category: 'elite-eighth',
    type: 'ebook',
    price: 59,
    xpReward: 110,
  },
  {
    id: 'investor-deck',
    title: 'Investor Pitch Deck Template',
    description: 'Professional pitch deck for fundraising',
    category: 'elite-eighth',
    type: 'blueprint',
    price: 149,
    xpReward: 175,
  },
  {
    id: 'future-roadmap',
    title: 'Future Roadmap & Vision',
    description: 'Exclusive look at upcoming launches',
    category: 'elite-eighth',
    type: 'ebook',
    price: 199,
    xpReward: 250,
  },
];

export default function EliteEighthPortal() {
  return (
    <PortalTemplate
      title="ELITE EIGHTH / CANNABIS"
      subtitle="Branding, past projects, future launches. The premium experience."
      gradient="from-lime-500 to-green-600"
      items={ELITE_EIGHTH_ITEMS}
    />
  );
}

