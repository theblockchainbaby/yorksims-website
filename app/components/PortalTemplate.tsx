'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ItemCard } from '@/app/components/ItemCard';
import { PlayerDashboard } from '@/app/components/PlayerDashboard';
import { AnimatedBackground } from '@/app/components/AnimatedBackground';
import { useGameification } from '@/app/hooks/useGameification';
import { Item } from '@/app/types';

interface PortalTemplateProps {
  title: string;
  subtitle: string;
  /**
   * Kept for backward compatibility — no longer rendered as a gradient
   * since the site palette is single-accent. Pass anything.
   */
  gradient?: string;
  items: Item[];
}

export function PortalTemplate({
  title,
  subtitle,
  items,
}: PortalTemplateProps) {
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
    <main className="relative w-full min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <AnimatedBackground />

      <PlayerDashboard player={player} xpProgress={xpProgress} />

      <div className="relative z-10 w-full min-h-screen px-4 md:px-16 py-12">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto mb-12"
        >
          <Link href="/hub">
            <button className="text-xs font-mono text-white/30 hover:text-white transition-colors mb-6">
              ← Back to Hub
            </button>
          </Link>

          <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight leading-[1.05]">
            <span className="bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl leading-relaxed">{subtitle}</p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {items.map((item, index) => (
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0a0a0a] border border-white/[0.08] rounded-[20px] p-8 max-w-md w-full"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-3">
                {selectedItem.type}
              </p>
              <h2 className="text-2xl font-black tracking-tight text-white mb-3">
                {selectedItem.title}
              </h2>
              <p className="text-white/55 mb-6 leading-relaxed text-sm">
                {selectedItem.description}
              </p>

              <div className="space-y-3 mb-6 text-sm">
                {selectedItem.price && (
                  <div className="flex justify-between">
                    <span className="text-white/40">Price:</span>
                    <span className="text-white font-bold">${selectedItem.price}</span>
                  </div>
                )}
                {selectedItem.xpReward && (
                  <div className="flex justify-between">
                    <span className="text-white/40">XP Reward:</span>
                    <span className="text-[#e63946] font-bold">+{selectedItem.xpReward}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2.5 bg-[#e63946] text-white text-sm font-bold uppercase tracking-widest rounded-full hover:bg-[#ff4d5a] transition-colors">
                  {selectedItem.price ? 'Purchase' : 'Download'}
                </button>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="flex-1 px-4 py-2.5 border border-white/15 text-white/70 text-sm font-bold uppercase tracking-widest rounded-full hover:text-white hover:border-white/40 transition-colors"
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
