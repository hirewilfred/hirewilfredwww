
// Type definitions for authentication and user data

export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface Profile {
  id: string;
  userId: string;
  name: string;
  role: 'user' | 'admin';
  company: string;
  avatar: string | null;
}

export interface Stats {
  totalCampaigns: number;
  activeContacts: number;
  messagesDelivered: number;
  responseRate: number;
}
