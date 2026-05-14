'use client';

import { PortalTemplate } from '@/app/components/PortalTemplate';
import { Item } from '@/app/types';

const BOOKS_ITEMS: Item[] = [
  {
    id: 'debt-elimination-plan',
    title: 'The Debt Elimination Plan',
    description: 'A complete plan for eliminating debt and building wealth.',
    category: 'books',
    type: 'ebook',
    price: 29,
    xpReward: 75,
  },
  {
    id: 'blockchain-manual',
    title: 'Blockchain Manual',
    description: 'Technical manual for blockchain development end to end.',
    category: 'books',
    type: 'blueprint',
    price: 49,
    xpReward: 100,
  },
  {
    id: 'crypto-whitepaper',
    title: 'Crypto Whitepaper Collection',
    description: 'The whitepapers every crypto builder should read, with context.',
    category: 'books',
    type: 'blueprint',
    price: 39,
    xpReward: 85,
  },
  {
    id: 'business-playbook',
    title: 'The Business Playbook',
    description: 'Strategies for building and scaling a real business.',
    category: 'books',
    type: 'ebook',
    price: 39,
    xpReward: 90,
  },
  {
    id: 'fintech-guide',
    title: 'FinTech Innovation Guide',
    description: 'How to build fintech products that scale past the demo.',
    category: 'books',
    type: 'ebook',
    price: 49,
    xpReward: 110,
  },
  {
    id: 'xrpl-developer-guide',
    title: 'XRPL Developer Guide',
    description: 'Complete guide to developing on the XRP Ledger.',
    category: 'books',
    type: 'blueprint',
    price: 59,
    xpReward: 150,
  },
];

export default function BooksPortal() {
  return (
    <PortalTemplate
      title="BOOKS"
      subtitle="Ebooks and blueprints across debt, blockchain, business, and fintech. Pick the one closest to what you&rsquo;re building this quarter."
      items={BOOKS_ITEMS}
    />
  );
}
