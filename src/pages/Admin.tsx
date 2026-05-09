
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminCampaigns from '@/components/admin/AdminCampaigns';
import AdminSettings from '@/components/admin/AdminSettings';
import { ShieldCheck } from 'lucide-react';
import { useAuth, useProfile, auth } from '@/utils/auth';
import { useToast } from "@/components/ui/use-toast";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  
  // Check if user is authenticated and is an admin
  useEffect(() => {
    const checkUser = async () => {
      try {
        setIsLoading(true);
        
        if (!user) {
          setIsAuthenticated(false);
          return;
        }
        
        if (profile) {
          if (profile.role === 'admin') {
            setIsAuthenticated(true);
          } else {
            toast({
              variant: "destructive",
              title: "Access denied",
              description: "You don't have admin privileges.",
            });
            setIsAuthenticated(false);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (!profileLoading) {
      checkUser();
    }
  }, [user, profile, profileLoading]);
  
  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoginLoading(true);
      
      // Sign in
      const { user } = await auth.signIn(email, password);
      
      // Once signed in, we'll be redirected automatically if the user is an admin
      // due to the useEffect hook above
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message,
      });
      setIsAuthenticated(false);
    } finally {
      setLoginLoading(false);
    }
  };
  
  if (isLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wilfred-accent"></div>
      </div>
    );
  }
  
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="flex items-center gap-3 mb-8">
            <ShieldCheck className="h-8 w-8 text-wilfred-accent" />
            <h1 className="text-4xl font-bold">Admin Backend</h1>
          </div>
          
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto bg-card border border-border rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-wilfred hover:bg-wilfred-accent" disabled={loginLoading}>
                  {loginLoading ? 'Logging in...' : 'Login'}
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  Note: Only users with admin privileges can access this area.
                </p>
              </form>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-lg shadow-sm">
              <Tabs defaultValue="dashboard">
                <div className="border-b border-border p-4">
                  <TabsList className="grid grid-cols-4 gap-4">
                    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                </div>
                
                <div className="p-6">
                  <TabsContent value="dashboard">
                    <AdminDashboard />
                  </TabsContent>
                  <TabsContent value="users">
                    <AdminUsers />
                  </TabsContent>
                  <TabsContent value="campaigns">
                    <AdminCampaigns />
                  </TabsContent>
                  <TabsContent value="settings">
                    <AdminSettings />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </main>
  );
};

export default Admin;
