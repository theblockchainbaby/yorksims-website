'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { AnimatedBackground } from '@/app/components/AnimatedBackground';
import { PlayerDashboard } from '@/app/components/PlayerDashboard';
import { useGameification } from '@/app/hooks/useGameification';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  xpReward: number;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'dualpay-launch',
    title: 'DualPay Ecosystem Launch Announcement',
    excerpt: 'We are excited to announce the official launch of the DualPay ecosystem. This marks a new era in fintech innovation.',
    date: '2025-10-20',
    category: 'Announcement',
    xpReward: 25,
  },
  {
    id: 'yorkverse-beta',
    title: 'YorkVerse Beta Now Live',
    excerpt: 'The YorkVerse digital hub is now in beta. Explore portals, earn XP, and unlock exclusive content.',
    date: '2025-10-18',
    category: 'Update',
    xpReward: 30,
  },
  {
    id: 'ai-agents-release',
    title: 'AI Agents Framework v1.0 Released',
    excerpt: 'AgentZero and Otto AI are now available for developers. Build intelligent automation today.',
    date: '2025-10-15',
    category: 'Release',
    xpReward: 35,
  },
  {
    id: 'xrpl-integration',
    title: 'XRPL Integration Complete',
    excerpt: 'Full XRPL blockchain integration is now live. Secure your assets with our escrow system.',
    date: '2025-10-12',
    category: 'Technical',
    xpReward: 40,
  },
  {
    id: 'dualacademy-courses',
    title: 'New DualAcademy Courses Available',
    excerpt: 'Learn crypto, hustle mindset, mental toughness, and coding from industry experts.',
    date: '2025-10-10',
    category: 'Education',
    xpReward: 25,
  },
  {
    id: 'marketplace-launch',
    title: 'Marketplace Store Now Open',
    excerpt: 'Shop exclusive YorkVerse merchandise and digital bundles. Limited edition items available.',
    date: '2025-10-08',
    category: 'Commerce',
    xpReward: 20,
  },
];

export default function BlogPage() {
  const { player, addXP, getXPProgress } = useGameification();
  const xpProgress = getXPProgress();

  const handleReadPost = (post: BlogPost) => {
    addXP({
      type: 'portal_visit',
      xpAmount: post.xpReward,
      description: `Read: ${post.title}`,
    });
  };

  return (
    <main className="relative w-full min-h-screen bg-dark-bg overflow-hidden">
      <AnimatedBackground />

      <PlayerDashboard player={player} xpProgress={xpProgress} />

      <div className="relative z-10 w-full min-h-screen px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <Link href="/hub">
            <button className="text-neon-green hover:text-neon-cyan transition-colors mb-6 text-sm">
              ← Back to Hub
            </button>
          </Link>

          <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter">
            <span className="bg-gradient-to-r from-neon-green via-neon-cyan to-xrpl-green bg-clip-text text-transparent">
              MISSION BRIEFINGS
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Latest updates, announcements, and lore from the YorkVerse
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {BLOG_POSTS.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleReadPost(post)}
              className="glass rounded-lg p-6 cursor-pointer group hover:border-neon-green transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs px-3 py-1 bg-neon-green/20 text-neon-green rounded-full font-mono">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white group-hover:text-neon-green transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 text-sm">{post.excerpt}</p>
                </div>
                <div className="ml-4 text-right">
                  <span className="text-xs text-yellow-400 font-bold">
                    +{post.xpReward} XP
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neon-green/10">
                <span className="text-xs text-neon-cyan">Read more →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}

