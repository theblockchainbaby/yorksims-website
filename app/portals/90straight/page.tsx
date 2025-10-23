'use client';

import { PortalTemplate } from '@/app/components/PortalTemplate';
import { Item } from '@/app/types';

const NINETY_STRAIGHT_ITEMS: Item[] = [
  {
    id: '90straight-app',
    title: '90Straight Mobile App',
    description: 'Track your 90-day fitness and mental challenge',
    category: '90straight',
    type: 'tool',
    price: 0,
    xpReward: 50,
  },
  {
    id: 'fitness-guide',
    title: '90-Day Fitness Guide',
    description: 'Complete workout and nutrition plan',
    category: '90straight',
    type: 'ebook',
    price: 29,
    xpReward: 75,
  },
  {
    id: 'mental-toughness-guide',
    title: 'Mental Toughness Playbook',
    description: 'Build unbreakable mental resilience in 90 days',
    category: '90straight',
    type: 'ebook',
    price: 39,
    xpReward: 100,
  },
  {
    id: 'nutrition-plan',
    title: 'Advanced Nutrition Plan',
    description: 'Personalized nutrition for peak performance',
    category: '90straight',
    type: 'blueprint',
    price: 49,
    xpReward: 85,
  },
  {
    id: 'training-program',
    title: 'Elite Training Program',
    description: 'Advanced workout routines for athletes',
    category: '90straight',
    type: 'course',
    price: 99,
    xpReward: 150,
  },
  {
    id: 'community-access',
    title: 'Community Access Pass',
    description: 'Join the 90Straight community and leaderboard',
    category: '90straight',
    type: 'tool',
    price: 19,
    xpReward: 60,
  },
];

export default function NinetyStraightPortal() {
  return (
    <PortalTemplate
      title="90STRAIGHT / FITNESS"
      subtitle="Mental toughness gamified challenge. Transform yourself in 90 days."
      gradient="from-red-500 to-rose-600"
      items={NINETY_STRAIGHT_ITEMS}
    />
  );
}

