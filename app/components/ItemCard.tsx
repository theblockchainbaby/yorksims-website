'use client';

import { motion } from 'framer-motion';
import { Item } from '@/app/types';

interface ItemCardProps {
  item: Item;
  index: number;
  onSelect?: (item: Item) => void;
}

export function ItemCard({ item, index, onSelect }: ItemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      onClick={() => onSelect?.(item)}
      className="group cursor-pointer"
    >
      <div className="relative rounded-[16px] overflow-hidden h-full flex flex-col border border-white/[0.06] bg-white/[0.02] hover:border-white/20 transition-colors">
        {/* Image placeholder */}
        <div className="w-full h-40 flex items-center justify-center relative overflow-hidden border-b border-white/[0.06] bg-[#0a0a0a]">
          <div className="text-4xl opacity-30">📦</div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-sm font-bold text-white group-hover:text-[#e63946] transition-colors mb-2 line-clamp-2">
            {item.title}
          </h3>
          <p className="text-xs text-white/40 mb-4 line-clamp-2 flex-1 leading-relaxed">
            {item.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] gap-3">
            <span className="text-[10px] text-white/50 font-mono uppercase tracking-widest">
              {item.type}
            </span>
            {item.price && (
              <span className="text-xs text-white font-bold">
                ${item.price}
              </span>
            )}
            {item.xpReward && (
              <span className="text-xs text-[#e63946] font-bold">
                +{item.xpReward} XP
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
