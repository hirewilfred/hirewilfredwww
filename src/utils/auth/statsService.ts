
import { auth } from './authService';

// Create stats service
export const statsService = {
  async getByUserId(userId: string) {
    try {
      const statsData = await auth.getStats(userId);
      return { data: statsData, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
};
