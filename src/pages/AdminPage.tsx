
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useProfile, auth } from '@/utils/auth';
import { useToast } from "@/components/ui/use-toast";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminDashboardStats from '@/components/admin/AdminDashboardStats';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminCampaigns from '@/components/admin/AdminCampaigns';
import AdminSettings from '@/components/admin/AdminSettings';
import { ShieldCheck } from 'lucide-react';

const AdminPage = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { profile } = useProfile();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        
        if (!user) {
          navigate('/auth');
          return;
        }
        
        // If user is not an admin, redirect to user dashboard
        if (profile && profile.role !== 'admin') {
          toast({
            variant: "destructive",
            title: "Access denied",
            description: "You don't have access to the admin dashboard.",
          });
          navigate('/dashboard');
        }
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate, user, profile]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/auth');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message,
      });
    }
  };

  if (loading) {
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
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-wilfred-accent" />
              <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            </div>
            
            <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
          </div>
          
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
                  <AdminDashboardStats />
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
        </div>
      </section>
      
      <Footer />
    </main>
  );
};

export default AdminPage;
