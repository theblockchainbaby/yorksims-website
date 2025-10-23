'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { AnimatedBackground } from '@/app/components/AnimatedBackground';
import { PlayerDashboard } from '@/app/components/PlayerDashboard';
import { useGameification } from '@/app/hooks/useGameification';

export default function ContactPage() {
  const { player, addXP, getXPProgress } = useGameification();
  const xpProgress = getXPProgress();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement actual form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      addXP({
        type: 'portal_visit',
        xpAmount: 50,
        description: 'Submitted collaboration request',
      });

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
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
          className="max-w-2xl mx-auto mb-12"
        >
          <Link href="/hub">
            <button className="text-neon-green hover:text-neon-cyan transition-colors mb-6 text-sm">
              ← Back to Hub
            </button>
          </Link>

          <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter">
            <span className="bg-gradient-to-r from-neon-green via-neon-cyan to-xrpl-green bg-clip-text text-transparent">
              RECRUIT YORK
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Have a mission for York? Let's collaborate and build something extraordinary.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto glass rounded-lg p-8"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="text-5xl mb-4">✓</div>
              <h2 className="text-2xl font-bold text-neon-green mb-2">
                Message Received!
              </h2>
              <p className="text-gray-400">
                Thanks for reaching out. We'll get back to you soon.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-neon-green mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-dark-card border border-neon-green/20 rounded text-white placeholder-gray-500 focus:border-neon-green focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-neon-green mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-dark-card border border-neon-green/20 rounded text-white placeholder-gray-500 focus:border-neon-green focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-neon-green mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-dark-card border border-neon-green/20 rounded text-white placeholder-gray-500 focus:border-neon-green focus:outline-none transition-colors"
                  placeholder="What's your mission?"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-neon-green mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 bg-dark-card border border-neon-green/20 rounded text-white placeholder-gray-500 focus:border-neon-green focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-neon-green to-xrpl-green text-dark-bg font-bold rounded hover:shadow-lg hover:shadow-neon-green/50 transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Mission Brief'}
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="glass rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">📧</div>
            <h3 className="text-neon-green font-bold mb-2">Email</h3>
            <p className="text-gray-400 text-sm">contact@yorksims.com</p>
          </div>

          <div className="glass rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">🐦</div>
            <h3 className="text-neon-green font-bold mb-2">Twitter</h3>
            <p className="text-gray-400 text-sm">@yorksims</p>
          </div>

          <div className="glass rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">💼</div>
            <h3 className="text-neon-green font-bold mb-2">LinkedIn</h3>
            <p className="text-gray-400 text-sm">York Sims Jr.</p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

