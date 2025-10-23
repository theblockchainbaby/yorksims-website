# YorkVerse - The Digital Empire

A dark-themed, futuristic, gamified digital hub and marketplace that centralizes all of York Sims Jr.'s projects, apps, books, crypto wallets, PDF blueprints, AI agents, DualPay ecosystem, DualAcademy, fitness apps, SaaS ventures, and future IP.

## 🎮 Features

### Gamification System
- **XP Tracking**: Earn XP by exploring portals, downloading content, and completing actions
- **Badge System**: Unlock achievements as you progress through the YorkVerse
- **Level Progression**: Advance through levels (1000 XP per level)
- **Player Dashboard**: Track your progress in real-time

### 8 Interactive Portals
1. **DualPay Ecosystem** - Fintech products and services
2. **AI Agents & Companies** - AI-powered tools and frameworks
3. **Books & PDFs** - Written content, manuals, and whitepapers
4. **DualAcademy** - Courses and educational content
5. **90Straight / Fitness** - Mental toughness and fitness challenges
6. **Crypto Wallets & Trusts** - Blockchain and crypto resources
7. **Elite Eighth / Cannabis** - Premium brand content
8. **Marketplace Store** - Merchandise and digital bundles

### Web3 Integration
- **Wallet Connection**: Connect XRPL, EVM, or Solana wallets
- **Crypto Payments**: Support for cryptocurrency transactions
- **Blockchain Integration**: XRPL escrow and smart contracts

### Content Management
- **Mission Briefings**: Blog/updates section with XP rewards
- **Recruitment Portal**: Contact form for collaborations
- **Item Cards**: Netflix-style card grid with hover effects
- **Modal Checkout**: In-app purchase system

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.0 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **State Management**: Zustand (via custom hooks)
- **Web3**: WalletConnect, Ethers.js
- **Payments**: Stripe integration ready
- **Hosting**: Vercel

## 🎨 Design System

### Color Palette
- **Dark Background**: `#0a0a0a`
- **Neon Green**: `#00ff88`
- **Neon Cyan**: `#00d9ff`
- **XRPL Green**: `#23f0c6`
- **Neon Purple**: `#b000ff`
- **Neon Pink**: `#ff006e`

### Visual Style
- OLED dark theme with glassmorphic panels
- Neon glow effects and gradient text
- Parallax animations and smooth transitions
- Canvas-based particle system background
- Radial portal navigation layout

## 📁 Project Structure

```
app/
├── components/          # Reusable React components
│   ├── AnimatedBackground.tsx
│   ├── ItemCard.tsx
│   ├── PlayerDashboard.tsx
│   ├── PortalCard.tsx
│   ├── PortalTemplate.tsx
│   ├── WalletConnect.tsx
│   └── CheckoutButton.tsx
├── hooks/              # Custom React hooks
│   └── useGameification.ts
├── lib/                # Utility functions
│   └── portals.ts
├── types/              # TypeScript interfaces
│   └── index.ts
├── portals/            # Portal pages
│   ├── dualpay/
│   ├── ai-agents/
│   ├── books/
│   ├── dualacademy/
│   ├── 90straight/
│   ├── crypto/
│   ├── elite-eighth/
│   └── marketplace/
├── blog/               # Blog/briefings page
├── contact/            # Contact/recruitment page
├── hub/                # Main hub page
├── page.tsx            # Landing page
├── layout.tsx          # Root layout
└── globals.css         # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to see the application.

## 🎯 Key Features Explained

### Gamification Hook
The `useGameification` hook manages:
- Player XP and level progression
- Badge unlocking system
- Wallet connection
- LocalStorage persistence

### Portal System
Each portal is a dedicated page with:
- Portal-specific items (6+ items per portal)
- Item selection modal
- XP rewards on interaction
- Unique gradient colors and themes

### Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🔐 Security Considerations

- Wallet connections are simulated (integrate with real providers in production)
- Payment processing requires Stripe API keys
- Form submissions need backend validation
- Environment variables for sensitive data

## 📦 Dependencies

- `next`: 16.0.0
- `react`: 19.2.0
- `framer-motion`: Latest
- `tailwindcss`: 4.x
- `zustand`: Latest
- `@stripe/react-stripe-js`: Latest
- `@web3modal/ethers`: Latest
- `ethers`: Latest

## 🚢 Deployment

### Vercel Deployment

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy

```bash
# Environment variables needed
NEXT_PUBLIC_STRIPE_KEY=your_stripe_key
NEXT_PUBLIC_WALLETCONNECT_ID=your_walletconnect_id
```

## 📝 Future Enhancements

- [ ] Real Stripe payment integration
- [ ] Actual wallet connection (WalletConnect, Xumm)
- [ ] Backend API for user data
- [ ] Database integration (Supabase/Firebase)
- [ ] Email notifications
- [ ] Social sharing features
- [ ] Leaderboard system
- [ ] Advanced analytics

## 📄 License

All rights reserved. York Sims Jr.

## 👤 Author

York Sims Jr.
- Website: yorksims.com
- Twitter: @yorksims
- Email: contact@yorksims.com
