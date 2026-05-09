import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useProfile, auth, statsService } from '@/utils/auth';
import { useToast } from "@/components/ui/use-toast";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, LineChart, BarChart, Activity, Search, Mail, Briefcase } from 'lucide-react';

// Import from outreach components
import DashboardHeader from '@/components/outreach/DashboardHeader';
import IndustryFilters from '@/components/outreach/IndustryFilters';
import StatsCards from '@/components/outreach/StatsCards';
import EmailPerformanceChart from '@/components/outreach/EmailPerformanceChart';
import LinkedInPerformanceChart from '@/components/outreach/LinkedInPerformanceChart';
import GoogleMapsLeadMatcher from '@/components/outreach/GoogleMapsLeadMatcher';
import ActivityFeed from '@/components/outreach/ActivityFeed';
import { INDUSTRY_OPTIONS, emailData, linkedInData, mockLeads } from '@/components/outreach/constants';
import JobScraperDashboard from '@/components/outreach/JobScraperDashboard';

// Import from scraper components
import ScraperSearchSection from '@/components/scraper/ScraperSearchSection';
import ScraperResultsTable from '@/components/scraper/ScraperResultsTable';
import ScraperActivityTracker from '@/components/scraper/ScraperActivityTracker';
import IndeedJobScraper from '@/components/scraper/IndeedJobScraper';

// Import OutreachSettings
import OutreachSettings from '@/components/dashboard/OutreachSettings';

export type ContactRecord = {
  id: string;
  name: string;
  company: string;
  source: 'LinkedIn' | 'CSV' | 'Maps';
  emailStatus: 'Not Sent' | 'Sent' | 'Opened' | 'Responded';
  linkedinStatus: 'Not Sent' | 'Sent' | 'Viewed' | 'Responded';
  appointmentConflict: boolean;
  notes: string;
  tags: string[];
  dateAdded: string;
};

const Dashboard = () => {
  const [statsData, setStatsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<ContactRecord[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { profile } = useProfile();

  // State for outreach dashboard
  const [targetIndustry1, setTargetIndustry1] = useState<string>('');
  const [targetIndustry2, setTargetIndustry2] = useState<string>('');
  const [targetIndustry3, setTargetIndustry3] = useState<string>('');
  const [timePeriod, setTimePeriod] = useState<'day' | 'week' | 'month'>('week');
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  // State for scraper dashboard
  const [dateFilter, setDateFilter] = useState<{from: Date | undefined, to: Date | undefined}>({
    from: undefined,
    to: undefined
  });
  const [nicheFilter, setNicheFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  // New state for job scraper stats
  const [jobScraperStats, setJobScraperStats] = useState({
    jobsFound: 0,
    emailsSent: 0,
    iceBreakersSent: 0,
    appointmentsBooked: 0,
  });

  // Function to update job scraper stats
  const updateJobScraperStats = (stats: {
    jobsFound?: number;
    emailsSent?: number;
    iceBreakersSent?: number;
    appointmentsBooked?: number;
  }) => {
    setJobScraperStats(prevStats => ({
      ...prevStats,
      ...stats
    }));
  };

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    } else {
      fetchStats(user.id);
    }
  }, [user, navigate]);

  // Effect to simulate real-time data refresh
  useEffect(() => {
    const timer = setTimeout(() => {
      setLastRefreshed(new Date());
      toast({
        title: "Data refreshed",
        description: "Your dashboard data has been updated.",
        duration: 3000,
      });
    }, 60000); // Refresh every 60 seconds
    
    return () => clearTimeout(timer);
  }, [lastRefreshed, toast]);

  const fetchStats = async (userId: string) => {
    try {
      const { data, error } = await statsService.getByUserId(userId);
      
      if (error) throw error;
      
      setStatsData(data || []);
    } catch (error: any) {
      console.error('Error fetching stats:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const { success } = await auth.signOut();
      if (success) {
        navigate('/auth');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message,
      });
    }
  };

  const getPlaceholderStats = () => {
    return [
      { title: 'Activity Score', icon: <Activity className="h-8 w-8 text-wilfred-accent" />, value: '85', change: '+12%' },
      { title: 'Campaigns', icon: <BarChart className="h-8 w-8 text-wilfred-accent" />, value: '4', change: '+1 new' },
      { title: 'Engagement', icon: <LineChart className="h-8 w-8 text-wilfred-accent" />, value: '230', change: '+18%' },
      { title: 'Profile Views', icon: <User className="h-8 w-8 text-wilfred-accent" />, value: '43', change: '+7 new' }
    ];
  };

  const displayStats = statsData.length > 0 ? statsData : getPlaceholderStats();

  // LinkedIn Scraper functions
  const handleSearch = (niche: string, location: string, appointmentsOnly: boolean) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockData: ContactRecord[] = [
        {
          id: `li-${Date.now()}-1`,
          name: 'Alex Johnson',
          company: 'TechSolutions Inc.',
          source: 'LinkedIn',
          emailStatus: 'Not Sent',
          linkedinStatus: 'Not Sent',
          appointmentConflict: false,
          notes: '',
          tags: ['New Lead'],
          dateAdded: new Date().toISOString(),
        },
        {
          id: `li-${Date.now()}-2`,
          name: 'Samantha Lee',
          company: 'Growth Partners LLC',
          source: 'LinkedIn',
          emailStatus: 'Not Sent',
          linkedinStatus: 'Not Sent',
          appointmentConflict: appointmentsOnly,
          notes: '',
          tags: ['New Lead'],
          dateAdded: new Date().toISOString(),
        },
      ];
      
      setContacts(prev => [...prev, ...mockData]);
      setLoading(false);
      
      toast({
        title: "Search completed",
        description: `Found ${mockData.length} contacts matching your criteria.`,
      });
    }, 1500);
  };

  const handleFileUpload = (file: File) => {
    setLoading(true);
    
    // Simulate API call to process CSV
    setTimeout(() => {
      const mockData: ContactRecord[] = [
        {
          id: `csv-${Date.now()}-1`,
          name: 'Maria Garcia',
          company: 'Insight Marketing Group',
          source: 'CSV',
          emailStatus: 'Not Sent',
          linkedinStatus: 'Not Sent',
          appointmentConflict: false,
          notes: 'Imported from CSV',
          tags: ['Imported'],
          dateAdded: new Date().toISOString(),
        },
        {
          id: `csv-${Date.now()}-2`,
          name: 'David Wilson',
          company: 'Elite Services Co.',
          source: 'CSV',
          emailStatus: 'Not Sent',
          linkedinStatus: 'Not Sent',
          appointmentConflict: true,
          notes: 'Imported from CSV',
          tags: ['Imported', 'High Priority'],
          dateAdded: new Date().toISOString(),
        },
      ];
      
      setContacts(prev => [...prev, ...mockData]);
      setLoading(false);
      
      toast({
        title: "CSV Import completed",
        description: `Imported ${mockData.length} contacts from file.`,
      });
    }, 1500);
  };

  const handleMapsSearch = (businessType: string, area: string, checkAppointments: boolean) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockData: ContactRecord[] = [
        {
          id: `maps-${Date.now()}-1`,
          name: 'Robert Brown',
          company: 'City Fitness Studio',
          source: 'Maps',
          emailStatus: 'Not Sent',
          linkedinStatus: 'Not Sent',
          appointmentConflict: checkAppointments,
          notes: 'Found via Google Maps',
          tags: ['Gym Owner'],
          dateAdded: new Date().toISOString(),
        },
      ];
      
      setContacts(prev => [...prev, ...mockData]);
      setLoading(false);
      
      toast({
        title: "Maps search completed",
        description: `Found ${mockData.length} businesses matching your criteria.`,
      });
    }, 1500);
  };

  const handleExportCSV = () => {
    // In a real implementation, this would generate and download a CSV file
    toast({
      title: "Export initiated",
      description: "Your data is being prepared for export.",
    });
    
    setTimeout(() => {
      toast({
        title: "Export complete",
        description: "Your data has been exported to CSV.",
      });
    }, 1000);
  };

  // Update contact (for status changes, notes, tags)
  const updateContact = (id: string, updates: Partial<ContactRecord>) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, ...updates } : contact
    ));
  };

  // Filter contacts based on current filters
  const filteredContacts = contacts.filter(contact => {
    // Date filter
    if (dateFilter.from && new Date(contact.dateAdded) < dateFilter.from) return false;
    if (dateFilter.to && new Date(contact.dateAdded) > dateFilter.to) return false;
    
    // Niche filter (simulating by company name)
    if (nicheFilter && !contact.company.toLowerCase().includes(nicheFilter.toLowerCase())) return false;
    
    // Status filter
    if (statusFilter === 'emailSent' && contact.emailStatus === 'Not Sent') return false;
    if (statusFilter === 'linkedinSent' && contact.linkedinStatus === 'Not Sent') return false;
    if (statusFilter === 'conflict' && !contact.appointmentConflict) return false;
    
    return true;
  });

  // Outreach metrics calculations
  const emailMetrics = {
    sent: emailData.reduce((sum, day) => sum + day.sent, 0),
    opened: emailData.reduce((sum, day) => sum + day.opened, 0),
    clicked: emailData.reduce((sum, day) => sum + day.clicked, 0),
    replied: emailData.reduce((sum, day) => sum + day.replied, 0),
    bounced: emailData.reduce((sum, day) => sum + (day.bounced || 0), 0),
  };
  
  const linkedInMetrics = {
    sent: linkedInData.reduce((sum, day) => sum + day.sent, 0),
    accepted: linkedInData.reduce((sum, day) => sum + day.accepted, 0),
    replied: linkedInData.reduce((sum, day) => sum + day.replied, 0),
    viewed: linkedInData.reduce((sum, day) => sum + (day.viewed || 0), 0),
  };
  
  const calculateRate = (part: number, total: number) => {
    return total > 0 ? Math.round((part / total) * 100) : 0;
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
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome{profile?.name ? `, ${profile.name}` : ''}!</h1>
            <p className="text-muted-foreground">Manage your outreach, view analytics, and find new leads all in one place.</p>
          </div>

          <Tabs defaultValue="analytics" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="outreach">Outreach</TabsTrigger>
              <TabsTrigger value="scraper">LinkedIn Scraper</TabsTrigger>
              <TabsTrigger value="jobs">Job Scraper</TabsTrigger>
              <TabsTrigger value="job-replacement">Role Replacement</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {displayStats.map((stat, index) => (
                  <Card key={index} className="border border-border">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.title || stat.stat_type}
                      </CardTitle>
                      {stat.icon || <Activity className="h-8 w-8 text-wilfred-accent" />}
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {stat.value || (stat.stat_value ? stat.stat_value.value : '0')}
                      </div>
                      <p className="text-xs text-green-500 mt-1">
                        {stat.change || (stat.stat_value ? stat.stat_value.change : 'No change')}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                    <CardDescription>Your recent interactions and engagements</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <div className="text-muted-foreground">
                      <LineChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Activity data would appear here</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Your Campaigns</CardTitle>
                    <CardDescription>Performance overview of your active campaigns</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <div className="text-muted-foreground">
                      <BarChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Campaign data would appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Outreach Tab */}
            <TabsContent value="outreach">
              <IndustryFilters 
                industryOptions={INDUSTRY_OPTIONS}
                targetIndustry1={targetIndustry1}
                targetIndustry2={targetIndustry2}
                targetIndustry3={targetIndustry3}
                setTargetIndustry1={setTargetIndustry1}
                setTargetIndustry2={setTargetIndustry2}
                setTargetIndustry3={setTargetIndustry3}
              />
              
              <StatsCards 
                emailMetrics={emailMetrics} 
                linkedInMetrics={linkedInMetrics}
                calculateRate={calculateRate}
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                <EmailPerformanceChart 
                  emailData={emailData}
                  emailMetrics={emailMetrics}
                  timePeriod={timePeriod}
                  setTimePeriod={setTimePeriod}
                />
                
                <LinkedInPerformanceChart 
                  linkedInData={linkedInData}
                  linkedInMetrics={linkedInMetrics}
                />
                
                <GoogleMapsLeadMatcher 
                  industryOptions={INDUSTRY_OPTIONS}
                  mockLeads={mockLeads}
                />
                
                <ActivityFeed />
              </div>
            </TabsContent>

            {/* LinkedIn Scraper Tab */}
            <TabsContent value="scraper">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">LinkedIn Scraper</h2>
                
                <Button variant="outline" onClick={handleExportCSV}>
                  Export to CSV
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <ScraperActivityTracker 
                  totalContacts={contacts.length} 
                  emailsSent={contacts.filter(c => c.emailStatus !== 'Not Sent').length}
                  linkedinSent={contacts.filter(c => c.linkedinStatus !== 'Not Sent').length}
                  appointmentConflicts={contacts.filter(c => c.appointmentConflict).length}
                />
              </div>

              <Card>
                <Tabs defaultValue="search" className="w-full">
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="search">LinkedIn & Maps Search</TabsTrigger>
                    <TabsTrigger value="upload">CSV Upload</TabsTrigger>
                    <TabsTrigger value="results">Results ({filteredContacts.length})</TabsTrigger>
                  </TabsList>

                  <TabsContent value="search">
                    <ScraperSearchSection 
                      onSearch={handleSearch}
                      onMapsSearch={handleMapsSearch}
                      loading={loading}
                    />
                  </TabsContent>

                  <TabsContent value="upload">
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-4">Upload Contact CSV</h2>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                        <input
                          type="file"
                          accept=".csv"
                          className="hidden"
                          id="csv-upload"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileUpload(e.target.files[0]);
                            }
                          }}
                        />
                        <label
                          htmlFor="csv-upload"
                          className="cursor-pointer flex flex-col items-center justify-center"
                        >
                          <svg
                            className="h-12 w-12 text-gray-400 mb-4"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="text-gray-500 font-medium">
                            Click to upload a CSV file
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            CSV should contain columns for name, company, email, etc.
                          </p>
                        </label>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="results">
                    <ScraperResultsTable 
                      contacts={filteredContacts}
                      onUpdateContact={updateContact}
                      dateFilter={dateFilter}
                      onDateFilterChange={setDateFilter}
                      nicheFilter={nicheFilter}
                      onNicheFilterChange={setNicheFilter}
                      statusFilter={statusFilter}
                      onStatusFilterChange={setStatusFilter}
                    />
                  </TabsContent>
                </Tabs>
              </Card>
            </TabsContent>

            {/* New Job Scraper Tab */}
            <TabsContent value="jobs">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Job Search</h2>
              </div>
              
              <IndeedJobScraper />
            </TabsContent>

            {/* New Role Replacement Tab */}
            <TabsContent value="job-replacement">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Role Replacement Scraper</h2>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-wilfred-accent" />
                  <span className="font-medium">Find jobs you can replace with your services</span>
                </div>
              </div>
              
              <JobScraperDashboard updateOutreachStats={updateJobScraperStats} />
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <OutreachSettings />
              <div className="mt-8 flex justify-end">
                <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      <Footer />
    </main>
  );
};

export default Dashboard;
