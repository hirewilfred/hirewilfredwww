
import { useState, useEffect } from 'react';
import { User, Profile, Stats } from './types';
import { auth } from './authService';

// React hook for authentication state
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      const { data } = await auth.getSession();
      console.log("useAuth hook session data:", data);
      setUser(data.session?.user || null);
      setLoading(false);
    };
    
    checkUser();
  }, []);
  
  return { user, loading };
};

// React hook for profile
export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        console.log("Fetching profile for user:", user.id);
        const userProfile = await auth.getProfile(user.id);
        setProfile(userProfile);
      } else {
        setProfile(null);
      }
      setLoading(false);
    };
    
    fetchProfile();
  }, [user]);
  
  return { profile, loading };
};

// React hook for stats
export const useStats = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchStats = async () => {
      if (user) {
        console.log("Fetching stats for user:", user.id);
        const userStats = await auth.getStats(user.id);
        setStats(userStats);
      } else {
        setStats(null);
      }
      setLoading(false);
    };
    
    fetchStats();
  }, [user]);
  
  return { stats, loading };
};
