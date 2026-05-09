
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useToast } from '@/components/ui/use-toast';
import ContentCalendar from '@/components/content/ContentCalendar';
import PostLibrary from '@/components/content/PostLibrary';
import ContentFeed from '@/components/content/ContentFeed';
import CampaignManager from '@/components/content/CampaignManager';
import PerformanceMetrics from '@/components/content/PerformanceMetrics';

const ContentDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("calendar");
  
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">B2B Content Management</h1>
            <p className="text-muted-foreground">Manage your content strategy, campaigns, and social media posts in one place.</p>
          </div>
          
          <Tabs defaultValue="calendar" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 w-full mb-8">
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="library">Post Library</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="content-feed">Content Feed</TabsTrigger>
              <TabsTrigger value="metrics">Performance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="calendar" className="space-y-4">
              <ContentCalendar />
            </TabsContent>
            
            <TabsContent value="library" className="space-y-4">
              <PostLibrary />
            </TabsContent>
            
            <TabsContent value="campaigns" className="space-y-4">
              <CampaignManager />
            </TabsContent>
            
            <TabsContent value="content-feed" className="space-y-4">
              <ContentFeed />
            </TabsContent>
            
            <TabsContent value="metrics" className="space-y-4">
              <PerformanceMetrics />
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      <Footer />
    </main>
  );
};

export default ContentDashboard;
