'use client';

import { PortalTemplate } from '@/app/components/PortalTemplate';
import { Item } from '@/app/types';

const AI_AGENTS_ITEMS: Item[] = [
  {
    id: 'otto-ai',
    title: 'Otto AI Platform',
    description: 'Intelligent automation for routine business workflows.',
    category: 'ai-agents',
    type: 'tool',
    price: 0,
    xpReward: 50,
  },
  {
    id: 'agentzero',
    title: 'AgentZero Framework',
    description: 'Build custom AI agents on top of AgentZero primitives.',
    category: 'ai-agents',
    type: 'tool',
    price: 149,
    xpReward: 100,
  },
  {
    id: 'retailflow-ai',
    title: 'RetailFlowAI',
    description: 'AI-powered retail management — orders, inventory, support.',
    category: 'ai-agents',
    type: 'tool',
    price: 199,
    xpReward: 125,
  },
  {
    id: 'ai-employees-guide',
    title: 'AI Employees-as-a-Service Guide',
    description: 'How to deploy AI employees in your organization without breaking things.',
    category: 'ai-agents',
    type: 'ebook',
    price: 39,
    xpReward: 75,
  },
  {
    id: 'agent-development',
    title: 'Agent Development Course',
    description: 'Learn to build and deploy production-grade AI agents.',
    category: 'ai-agents',
    type: 'course',
    price: 99,
    xpReward: 150,
  },
  {
    id: 'ai-integration',
    title: 'AI Integration Blueprint',
    description: 'Technical guide for integrating AI into your existing stack.',
    category: 'ai-agents',
    type: 'blueprint',
    price: 249,
    xpReward: 200,
  },
];

export default function AIAgentsPortal() {
  return (
    <PortalTemplate
      title="AI AGENTS"
      subtitle="Frameworks, products, courses, and blueprints for building agents that ship. Start with Otto and the Agent Development course."
      items={AI_AGENTS_ITEMS}
    />
  );
}
