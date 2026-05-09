
import { Profile, Stats } from './types';

// Mock user data for demo purposes
export const mockUsers = [
  {
    id: 'user-1',
    email: 'admin',
    password: 'admin123',
    profile: {
      id: 'profile-1',
      userId: 'user-1',
      name: 'Administrator',
      role: 'admin' as const,
      company: 'Wilfred AI',
      avatar: null,
    },
    stats: {
      totalCampaigns: 12,
      activeContacts: 1289,
      messagesDelivered: 15732,
      responseRate: 56.4,
    }
  },
  {
    id: 'user-2',
    email: 'user',
    password: 'user123',
    profile: {
      id: 'profile-2',
      userId: 'user-2',
      name: 'Regular User',
      role: 'user' as const,
      company: 'Client Company',
      avatar: null,
    },
    stats: {
      totalCampaigns: 4,
      activeContacts: 156,
      messagesDelivered: 982,
      responseRate: 42.7,
    }
  }
];

// In-memory session storage
export let currentSession: { user: User | null } = { user: null };

// Re-export external demo accounts
export { demoAccounts } from '@/data/demoAccounts';

interface User {
  id: string;
  email: string;
  createdAt: string;
}
