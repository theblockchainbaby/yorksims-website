'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Portal } from '@/app/types';

interface PortalCardProps {
  portal: Portal;
  index: number;
  onHover?: (id: string | null) => void;
}

export function PortalCard({ portal, index, onHover }: PortalCardProps) {
  const angle = (index / 8) * Math.PI * 2;
  const radius = 200;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
      animate={{ opacity: 1, scale: 1, x: x, y: y }}
      transition={{ delay: index * 0.1, duration: 0.5, type: 'spring', stiffness: 100 }}
      onHoverStart={() => onHover?.(portal.id)}
      onHoverEnd={() => onHover?.(null)}
      className="absolute"
      style={{
        left: '50%',
        top: '50%',
        marginLeft: '-80px',
        marginTop: '-80px',
      }}
    >
      <Link href={portal.route}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`w-40 h-40 rounded-lg flex flex-col items-center justify-center cursor-pointer group overflow-hidden relative`}
          style={{
            backdropFilter: 'blur(10px)',
            backgroundColor: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Background gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${portal.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
          />

          {/* Glow effect */}
          <div
            className={`absolute inset-0 ${portal.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          />

          {/* Content */}
          <div className="relative z-10 w-full h-full">
            {portal.iconType === 'image' ? (
              <div className="w-full h-full relative">
                <Image
                  src={portal.icon}
                  alt={portal.name}
                  fill
                  className="object-cover rounded-lg"
                  sizes="128px"
                  priority
                />
              </div>
            ) : (
              <div className="text-center flex flex-col items-center justify-center h-full">
                <div className="text-4xl mb-2">{portal.icon}</div>
                <h3 className="text-xs font-bold text-white group-hover:text-[#e63946] transition-colors">
                  {portal.name.split(' ')[0]}
                </h3>
              </div>
            )}
          </div>

          {/* Border animation */}
          <motion.div
            className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-[#e63946]"
            animate={{
              borderColor: ['rgba(230, 57, 70, 0)', 'rgba(230, 57, 70, 0.5)', 'rgba(230, 57, 70, 0)'],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </Link>

      {/* Portal name tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
      >
        <div className="px-3 py-2 rounded text-xs text-white/70 font-mono border border-white/[0.08] bg-[#0a0a0a]/80 backdrop-blur-sm">
          {portal.name}
        </div>
      </motion.div>
    </motion.div>
  );
}

