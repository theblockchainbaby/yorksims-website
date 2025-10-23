'use client';

import { PortalTemplate } from '@/app/components/PortalTemplate';
import { Item } from '@/app/types';

const DUALACADEMY_ITEMS: Item[] = [
  {
    id: 'crypto-101',
    title: 'Crypto 101 Course',
    description: 'Introduction to cryptocurrency and blockchain',
    category: 'dualacademy',
    type: 'course',
    price: 49,
    xpReward: 100,
  },
  {
    id: 'hustle-mindset',
    title: 'Hustle Mindset Masterclass',
    description: 'Develop the mindset of a successful entrepreneur',
    category: 'dualacademy',
    type: 'course',
    price: 79,
    xpReward: 150,
  },
  {
    id: 'mental-toughness',
    title: 'Mental Toughness Training',
    description: 'Build unbreakable mental resilience',
    category: 'dualacademy',
    type: 'course',
    price: 69,
    xpReward: 125,
  },
  {
    id: 'coding-bootcamp',
    title: 'Full-Stack Coding Bootcamp',
    description: 'Learn to build modern web applications',
    category: 'dualacademy',
    type: 'course',
    price: 199,
    xpReward: 250,
  },
  {
    id: 'business-fundamentals',
    title: 'Business Fundamentals',
    description: 'Core principles of building a business',
    category: 'dualacademy',
    type: 'course',
    price: 89,
    xpReward: 140,
  },
  {
    id: 'advanced-trading',
    title: 'Advanced Trading Strategies',
    description: 'Master crypto and traditional trading',
    category: 'dualacademy',
    type: 'course',
    price: 149,
    xpReward: 200,
  },
];

export default function DualAcademyPortal() {
  return (
    <PortalTemplate
      title="DUALACADEMY"
      subtitle="Courses: crypto, hustle, mental toughness, coding. Level up your skills."
      gradient="from-yellow-500 to-orange-600"
      items={DUALACADEMY_ITEMS}
    />
  );
}

