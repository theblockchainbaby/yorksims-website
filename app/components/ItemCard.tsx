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
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onClick={() => onSelect?.(item)}
      className="group cursor-pointer"
    >
      <div className="glass rounded-lg overflow-hidden h-full flex flex-col">
        {/* Image placeholder */}
        <div className="w-full h-40 bg-gradient-to-br from-neon-green/20 to-neon-cyan/20 flex items-center justify-center relative overflow-hidden">
          <div className="text-4xl opacity-50">📦</div>
          <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-sm font-bold text-white group-hover:text-neon-green transition-colors mb-2 line-clamp-2">
            {item.title}
          </h3>
          <p className="text-xs text-gray-400 mb-3 line-clamp-2 flex-1">
            {item.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-neon-green/10">
            <span className="text-xs text-neon-green font-mono">
              {item.type}
            </span>
            {item.price && (
              <span className="text-xs text-neon-cyan font-bold">
                ${item.price}
              </span>
            )}
            {item.xpReward && (
              <span className="text-xs text-yellow-400 font-bold">
                +{item.xpReward} XP
              </span>
            )}
          </div>
        </div>

        {/* Hover border */}
        <motion.div
          className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-neon-green pointer-events-none"
          animate={{
            borderColor: ['rgba(0, 255, 136, 0)', 'rgba(0, 255, 136, 0.5)', 'rgba(0, 255, 136, 0)'],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}

