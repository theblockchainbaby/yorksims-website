'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Item } from '@/app/types';

interface CheckoutButtonProps {
  item: Item;
  onSuccess?: () => void;
}

export function CheckoutButton({ item, onSuccess }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  const handleCheckout = async (method: 'stripe' | 'crypto') => {
    setIsLoading(true);
    try {
      // TODO: Implement actual Stripe checkout
      // For now, simulate a successful purchase
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message
      alert(`Purchase successful! You've acquired: ${item.title}`);
      onSuccess?.();
      setShowPaymentOptions(false);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!item.price) {
    return (
      <button className="flex-1 px-4 py-2 bg-gradient-to-r from-neon-green to-xrpl-green text-dark-bg font-bold rounded hover:shadow-lg hover:shadow-neon-green/50 transition-all">
        Download
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowPaymentOptions(!showPaymentOptions)}
        className="flex-1 px-4 py-2 bg-gradient-to-r from-neon-green to-xrpl-green text-dark-bg font-bold rounded hover:shadow-lg hover:shadow-neon-green/50 transition-all"
      >
        Purchase ${item.price}
      </button>

      {showPaymentOptions && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-2 left-0 right-0 glass rounded-lg p-3 space-y-2 z-50"
        >
          <button
            onClick={() => handleCheckout('stripe')}
            disabled={isLoading}
            className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Pay with Card'}
          </button>
          <button
            onClick={() => handleCheckout('crypto')}
            disabled={isLoading}
            className="w-full px-3 py-2 bg-neon-cyan/20 hover:bg-neon-cyan/30 text-neon-cyan text-sm rounded transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Pay with Crypto'}
          </button>
        </motion.div>
      )}
    </div>
  );
}

