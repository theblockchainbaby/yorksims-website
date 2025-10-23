'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameification } from '@/app/hooks/useGameification';

export function WalletConnect() {
  const { player, connectWallet } = useGameification();
  const [isOpen, setIsOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async (walletType: 'xrpl' | 'evm' | 'solana') => {
    setIsConnecting(true);
    try {
      // Simulate wallet connection
      // In production, integrate with actual wallet providers
      const mockAddress = `0x${Math.random().toString(16).slice(2, 42)}`;
      
      connectWallet(mockAddress, walletType);
      setIsOpen(false);
      
      // Show success message
      alert(`Connected ${walletType.toUpperCase()} wallet!`);
    } catch (error) {
      console.error('Wallet connection error:', error);
      alert('Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  if (player?.walletAddress) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-4 left-4 z-50 glass px-4 py-2 rounded text-xs text-neon-cyan font-mono"
      >
        Wallet: {player.walletAddress.slice(0, 6)}...{player.walletAddress.slice(-4)}
      </motion.div>
    );
  }

  return (
    <div className="fixed top-4 left-4 z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="glass px-4 py-2 rounded text-sm text-neon-green hover:text-neon-cyan transition-colors"
      >
        Connect Wallet
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-2 left-0 glass rounded-lg p-4 space-y-2 min-w-max"
        >
          <button
            onClick={() => handleConnect('xrpl')}
            disabled={isConnecting}
            className="w-full px-4 py-2 bg-neon-green/20 hover:bg-neon-green/30 text-neon-green text-sm rounded transition-colors disabled:opacity-50 text-left"
          >
            {isConnecting ? 'Connecting...' : 'XRPL Wallet'}
          </button>
          <button
            onClick={() => handleConnect('evm')}
            disabled={isConnecting}
            className="w-full px-4 py-2 bg-neon-cyan/20 hover:bg-neon-cyan/30 text-neon-cyan text-sm rounded transition-colors disabled:opacity-50 text-left"
          >
            {isConnecting ? 'Connecting...' : 'EVM Wallet'}
          </button>
          <button
            onClick={() => handleConnect('solana')}
            disabled={isConnecting}
            className="w-full px-4 py-2 bg-neon-purple/20 hover:bg-neon-purple/30 text-neon-purple text-sm rounded transition-colors disabled:opacity-50 text-left"
          >
            {isConnecting ? 'Connecting...' : 'Solana Wallet'}
          </button>
        </motion.div>
      )}
    </div>
  );
}

