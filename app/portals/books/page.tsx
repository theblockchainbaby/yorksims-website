'use client';

import { PortalTemplate } from '@/app/components/PortalTemplate';
import { Item } from '@/app/types';
import { BOOKS } from '@/app/lib/books';

// The three purchasable books come from the shared catalog (app/lib/books.ts)
// so the portal, the public /books page, and the checkout API stay in sync.
const XP_BY_BOOK: Record<string, number> = {
  'york-built-in-silence': 65,
  'built-for-more': 50,
  'figure-it-out': 50,
};

const PURCHASABLE_BOOKS: Item[] = BOOKS.map((b) => ({
  id: b.id,
  title: b.title,
  description: b.description,
  image: b.cover,
  category: 'books',
  type: 'ebook',
  price: Math.round(b.priceCents / 100),
  xpReward: XP_BY_BOOK[b.id] ?? 50,
}));

// Free reading list — guides and collections, no charge.
const FREE_ITEMS: Item[] = [
  {
    id: 'debt-elimination-plan',
    title: 'The Debt Elimination Plan',
    description: 'A complete plan for eliminating debt and building wealth.',
    category: 'books',
    type: 'ebook',
    xpReward: 75,
  },
  {
    id: 'blockchain-manual',
    title: 'Blockchain Manual',
    description: 'Technical manual for blockchain development end to end.',
    category: 'books',
    type: 'blueprint',
    xpReward: 100,
  },
  {
    id: 'crypto-whitepaper',
    title: 'Crypto Whitepaper Collection',
    description: 'The whitepapers every crypto builder should read, with context.',
    category: 'books',
    type: 'blueprint',
    xpReward: 85,
  },
  {
    id: 'business-playbook',
    title: 'The Business Playbook',
    description: 'Strategies for building and scaling a real business.',
    category: 'books',
    type: 'ebook',
    xpReward: 90,
  },
  {
    id: 'fintech-guide',
    title: 'FinTech Innovation Guide',
    description: 'How to build fintech products that scale past the demo.',
    category: 'books',
    type: 'ebook',
    xpReward: 110,
  },
  {
    id: 'xrpl-developer-guide',
    title: 'XRPL Developer Guide',
    description: 'Complete guide to developing on the XRP Ledger.',
    category: 'books',
    type: 'blueprint',
    xpReward: 150,
  },
];

const BOOKS_ITEMS: Item[] = [...PURCHASABLE_BOOKS, ...FREE_ITEMS];

export default function BooksPortal() {
  return (
    <PortalTemplate
      title="BOOKS"
      subtitle="Books and blueprints across mindset, debt, blockchain, business, and fintech. Start with the story, then build what&rsquo;s next."
      items={BOOKS_ITEMS}
    />
  );
}
