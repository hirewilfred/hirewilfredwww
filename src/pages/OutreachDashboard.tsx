import React, { useState, useEffect } from 'react';
import { useAuth, useProfile } from '@/utils/auth';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Briefcase } from 'lucide-react';

// Import refactored components
import DashboardHeader from '@/components/outreach/DashboardHeader';
import IndustryFilters from '@/components/outreach/IndustryFilters';
import StatsCards from '@/components/outreach/StatsCards';
import EmailPerformanceChart from '@/components/outreach/EmailPerformanceChart';
import LinkedInPerformanceChart from '@/components/outreach/LinkedInPerformanceChart';
import GoogleMapsLeadMatcher from '@/components/outreach/GoogleMapsLeadMatcher';
import ActivityFeed from '@/components/outreach/ActivityFeed';
import JobScraperDashboard from '@/components/outreach/JobScraperDashboard';

// Import constants and mock data
import { INDUSTRY_OPTIONS, emailData, linkedInData, mockLeads } from '@/components/outreach/constants';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
const OutreachDashboard = () => {
  const {
    user
  } = useAuth();
  const {
    profile
  } = useProfile();
  const {
    toast
  } = useToast();
  const navigate = useNavigate();

  // State for industry filters
  const [targetIndustry1, setTargetIndustry1] = useState<string>('');
  const [targetIndustry2, setTargetIndustry2] = useState<string>('');
  const [targetIndustry3, setTargetIndustry3] = useState<string>('');

  // State for time period filters
  const [timePeriod, setTimePeriod] = useState<'day' | 'week' | 'month'>('week');

  // State to track data refresh
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  // State to track outreach metrics
  const [outreachStats, setOutreachStats] = useState({
    jobsFound: 0,
    emailsSent: 0,
    iceBreakersSent: 0,
    appointmentsBooked: 0
  });

  // Effect to simulate real-time data refresh
  useEffect(() => {
    const timer = setTimeout(() => {
      setLastRefreshed(new Date());
      toast({
        title: "Data refreshed",
        description: "Your dashboard data has been updated.",
        duration: 3000
      });
    }, 60000); // Refresh every 60 seconds

    return () => clearTimeout(timer);
  }, [lastRefreshed, toast]);

  // Summary metrics
  const emailMetrics = {
    sent: emailData.reduce((sum, day) => sum + day.sent, 0),
    opened: emailData.reduce((sum, day) => sum + day.opened, 0),
    clicked: emailData.reduce((sum, day) => sum + day.clicked, 0),
    replied: emailData.reduce((sum, day) => sum + day.replied, 0),
    bounced: emailData.reduce((sum, day) => sum + (day.bounced || 0), 0)
  };
  const linkedInMetrics = {
    sent: linkedInData.reduce((sum, day) => sum + day.sent, 0),
    accepted: linkedInData.reduce((sum, day) => sum + day.accepted, 0),
    replied: linkedInData.reduce((sum, day) => sum + day.replied, 0),
    viewed: linkedInData.reduce((sum, day) => sum + (day.viewed || 0), 0)
  };
  const calculateRate = (part: number, total: number) => {
    return total > 0 ? Math.round(part / total * 100) : 0;
  };

  // Update outreach statistics
  const updateOutreachStats = (newStats: Partial<typeof outreachStats>) => {
    setOutreachStats(prev => ({
      ...prev,
      ...newStats
    }));
  };
  const handleNavigateToScraper = () => {
    navigate('/scraper');
  };
  return <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <DashboardHeader title="Outreach Automation Dashboard" />
          
          <div className="flex justify-end mb-4">
            <Button variant="outline" onClick={handleNavigateToScraper} className="flex items-center gap-2 hover:text-white bg-wilfred-navy">
              <Briefcase className="h-4 w-4" />
              Go to Job Scraper Dashboard
            </Button>
          </div>
          
          <IndustryFilters industryOptions={INDUSTRY_OPTIONS} targetIndustry1={targetIndustry1} targetIndustry2={targetIndustry2} targetIndustry3={targetIndustry3} setTargetIndustry1={setTargetIndustry1} setTargetIndustry2={setTargetIndustry2} setTargetIndustry3={setTargetIndustry3} />
          
          <StatsCards emailMetrics={emailMetrics} linkedInMetrics={linkedInMetrics} calculateRate={calculateRate} outreachStats={outreachStats} />
          
          <Tabs defaultValue="dashboard" className="mt-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="dashboard">Performance Dashboard</TabsTrigger>
              <TabsTrigger value="jobscraper">Job Scrapers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <EmailPerformanceChart emailData={emailData} emailMetrics={emailMetrics} timePeriod={timePeriod} setTimePeriod={setTimePeriod} />
                
                <LinkedInPerformanceChart linkedInData={linkedInData} linkedInMetrics={linkedInMetrics} />
                
                <GoogleMapsLeadMatcher industryOptions={INDUSTRY_OPTIONS} mockLeads={mockLeads} />
                
                <ActivityFeed />
              </div>
            </TabsContent>
            
            <TabsContent value="jobscraper" className="mt-4">
              <JobScraperDashboard updateOutreachStats={updateOutreachStats} />
            </TabsContent>
          </Tabs>
          
        </div>
      </section>
      
      <Footer />
    </main>;
};
export default OutreachDashboard;