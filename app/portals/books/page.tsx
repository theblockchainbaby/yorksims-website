'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ItemCard } from '@/app/components/ItemCard';
import { PlayerDashboard } from '@/app/components/PlayerDashboard';
import { AnimatedBackground } from '@/app/components/AnimatedBackground';
import { useGameification } from '@/app/hooks/useGameification';
import { Item } from '@/app/types';

const BOOKS_ITEMS: Item[] = [
  {
    id: 'debt-elimination-plan',
    title: 'The Debt Elimination Plan',
    description: 'Complete guide to eliminating debt and building wealth',
    category: 'books',
    type: 'ebook',
    price: 29,
    xpReward: 75,
  },
  {
    id: 'blockchain-manual',
    title: 'Blockchain Manual',
    description: 'Technical manual for blockchain development',
    category: 'books',
    type: 'blueprint',
    price: 49,
    xpReward: 100,
  },
  {
    id: 'crypto-whitepaper',
    title: 'Crypto Whitepaper Collection',
    description: 'Collection of important crypto whitepapers',
    category: 'books',
    type: 'blueprint',
    price: 39,
    xpReward: 85,
  },
  {
    id: 'business-playbook',
    title: 'The Business Playbook',
    description: 'Strategies for building and scaling businesses',
    category: 'books',
    type: 'ebook',
    price: 39,
    xpReward: 90,
  },
  {
    id: 'fintech-guide',
    title: 'FinTech Innovation Guide',
    description: 'How to build fintech products that scale',
    category: 'books',
    type: 'ebook',
    price: 49,
    xpReward: 110,
  },
  {
    id: 'xrpl-developer-guide',
    title: 'XRPL Developer Guide',
    description: 'Complete guide to developing on XRPL',
    category: 'books',
    type: 'blueprint',
    price: 59,
    xpReward: 150,
  },
];

export default function BooksPortal() {
  const { player, addXP, getXPProgress } = useGameification();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const xpProgress = getXPProgress();

  const handleItemSelect = (item: Item) => {
    setSelectedItem(item);
    if (item.xpReward) {
      addXP({
        type: 'item_download',
        xpAmount: item.xpReward,
        description: `Downloaded ${item.title}`,
      });
    }
  };

  return (
    <main className="relative w-full min-h-screen bg-dark-bg overflow-hidden">
      <AnimatedBackground />

      <PlayerDashboard player={player} xpProgress={xpProgress} />

      <div className="relative z-10 w-full min-h-screen px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto mb-12"
        >
          <Link href="/hub">
            <button className="text-neon-green hover:text-neon-cyan transition-colors mb-6 text-sm">
              ← Back to Hub
            </button>
          </Link>

          <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter">
            <span className="bg-gradient-to-r from-neon-green to-emerald-500 bg-clip-text text-transparent">
              BOOKS & PDFS
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Written books, manuals, debt plans, whitepapers. Knowledge is power.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {BOOKS_ITEMS.map((item, index) => (
              <ItemCard
                key={item.id}
                item={item}
                index={index}
                onSelect={handleItemSelect}
              />
            ))}
          </motion.div>
        </div>

        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-lg p-8 max-w-md w-full"
            >
              <h2 className="text-2xl font-bold text-neon-green mb-4">
                {selectedItem.title}
              </h2>
              <p className="text-gray-400 mb-6">{selectedItem.description}</p>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Type:</span>
                  <span className="text-neon-cyan font-mono">{selectedItem.type}</span>
                </div>
                {selectedItem.price && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price:</span>
                    <span className="text-neon-green font-bold">${selectedItem.price}</span>
                  </div>
                )}
                {selectedItem.xpReward && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">XP Reward:</span>
                    <span className="text-yellow-400 font-bold">+{selectedItem.xpReward}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-neon-green to-xrpl-green text-dark-bg font-bold rounded hover:shadow-lg hover:shadow-neon-green/50 transition-all">
                  {selectedItem.price ? 'Purchase' : 'Download'}
                </button>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="flex-1 px-4 py-2 glass rounded hover:border-neon-green transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  );
}

