
import { User, Profile } from './types';
import { mockUsers, currentSession } from './mockData';

// Auth handler class
export class Auth {
  // Sign up with email and password
  async signUp(email: string, password: string) {
    // Since we only want admin user, prevent new sign ups
    throw new Error('Sign up is disabled. Please use the administrator account.');
  }
  
  // Sign in with email and password
  async signIn(email: string, password: string) {
    console.log("Attempting login with:", email, password);
    const user = mockUsers.find(user => 
      user.email === email && user.password === password
    );
    
    if (!user) {
      console.error("Login failed: User not found");
      throw new Error('Invalid login credentials');
    }
    
    // Set session
    currentSession.user = {
      id: user.id,
      email: user.email,
      createdAt: new Date().toISOString(),
    };
    
    console.log("Login successful:", currentSession.user);
    return { user: currentSession.user };
  }
  
  // Sign out
  async signOut() {
    console.log("Signing out");
    currentSession.user = null;
    return { success: true, error: null };
  }
  
  // Get current session
  getSession() {
    console.log("Getting session:", currentSession);
    return Promise.resolve({
      data: {
        session: currentSession.user ? { user: currentSession.user } : null
      },
      error: null
    });
  }
  
  // Get user
  getUser() {
    return currentSession.user;
  }
  
  // Get profile by user ID
  async getProfile(userId: string) {
    console.log("Getting profile for:", userId);
    const user = mockUsers.find(user => user.id === userId);
    return user ? user.profile : null;
  }
  
  // Get stats by user ID
  async getStats(userId: string) {
    console.log("Getting stats for:", userId);
    const user = mockUsers.find(user => user.id === userId);
    return user ? user.stats : null;
  }
  
  // Update profile
  async updateProfile(userId: string, profile: Partial<Profile>) {
    const userIndex = mockUsers.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    // Create a new profile object with the correct type
    const updatedProfile = {
      ...mockUsers[userIndex].profile,
      ...profile,
    };
    
    // Assign it back
    mockUsers[userIndex].profile = updatedProfile;
    
    return mockUsers[userIndex].profile;
  }
}

// Create singleton instance of Auth
export const auth = new Auth();
