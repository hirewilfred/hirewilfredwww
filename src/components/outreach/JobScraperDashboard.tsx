
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Search, Linkedin, Mail, Calendar, ArrowRight, Eye, Trash, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import JobScraperOutreachStats from './JobScraperOutreachStats';

interface JobListing {
  id: string;
  platform: 'linkedin' | 'indeed';
  title: string;
  company: string;
  location: string;
  role: string;
  datePosted: string;
  description: string;
  link: string;
  status: 'new' | 'contacted' | 'responded' | 'appointment' | 'archived';
}

interface JobScraperDashboardProps {
  updateOutreachStats: (stats: {
    jobsFound?: number;
    emailsSent?: number;
    iceBreakersSent?: number;
    appointmentsBooked?: number;
  }) => void;
}

const JobScraperDashboard: React.FC<JobScraperDashboardProps> = ({ updateOutreachStats }) => {
  const [jobKeyword, setJobKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [replacementService, setReplacementService] = useState('');
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const [activeListings, setActiveListings] = useState<JobListing[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const { toast } = useToast();

  // Mock data for replacement service options
  const replacementOptions = [
    { value: 'msp', label: 'MSP (Managed IT Services)' },
    { value: 'consulting', label: 'Consulting Services' },
    { value: 'outsourced-hr', label: 'Outsourced HR' },
    { value: 'fractional-cfo', label: 'Fractional CFO' },
    { value: 'marketing-agency', label: 'Marketing Agency' },
    { value: 'outsourced-dev', label: 'Outsourced Development' },
  ];

  // Stats for tracking outreach metrics
  const [stats, setStats] = useState({
    jobsFound: 0,
    emailsSent: 0,
    iceBreakersSent: 0,
    appointmentsBooked: 0,
  });

  const handleSearch = (platform: 'linkedin' | 'indeed') => {
    if (!jobKeyword.trim()) {
      toast({
        title: "Search error",
        description: "Please enter a job title",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    
    // In a real implementation, this would be an API call to a backend service
    // that scrapes LinkedIn/Indeed for job listings
    setTimeout(() => {
      // Generate mock data based on the platform
      const platformPrefix = platform === 'linkedin' ? 'li-' : 'indeed-';
      const mockData: JobListing[] = Array.from({ length: platform === 'linkedin' ? 3 : 5 }, (_, i) => ({
        id: `${platformPrefix}${Date.now()}-${i}`,
        platform,
        title: platform === 'linkedin' 
          ? `${jobKeyword} - Senior Position` 
          : `${jobKeyword} Opportunity`,
        company: platform === 'linkedin' 
          ? ['TechCorp', 'InnovateSoft', 'Enterprise Solutions'][i % 3] 
          : ['GlobalTech', 'Mercury Systems', 'Advance Inc', 'DataFlow', 'Cloud Solutions'][i],
        location: location || 'Remote',
        role: jobKeyword,
        datePosted: ['Today', '2 days ago', '1 week ago', '3 days ago', '5 days ago'][i % 5],
        description: `This position is for a ${jobKeyword} who will be responsible for managing IT infrastructure, security, and team coordination. This role could potentially be replaced with a ${replacementService || 'managed service'} solution.`,
        link: `https://${platform}.com/jobs/${Date.now()}-${i}`,
        status: 'new'
      }));
      
      const newJobsCount = mockData.length;
      
      // Update job listings
      setJobListings(prev => [...prev, ...mockData]);
      setActiveListings(mockData);
      
      // Update stats
      const newStats = {
        jobsFound: stats.jobsFound + newJobsCount
      };
      setStats(prev => ({
        ...prev,
        jobsFound: prev.jobsFound + newJobsCount
      }));
      
      // Update parent component stats
      updateOutreachStats(newStats);
      
      setIsSearching(false);
      
      toast({
        title: "Search complete",
        description: `Found ${newJobsCount} ${platform} job listings matching your criteria.`,
      });
    }, 1500);
  };

  const filterListings = (status: string) => {
    setFilterStatus(status);
    if (status === 'all') {
      setActiveListings(jobListings);
    } else {
      setActiveListings(jobListings.filter(job => job.status === status));
    }
  };

  const updateJobStatus = (id: string, newStatus: JobListing['status']) => {
    const updatedListings = jobListings.map(job => {
      if (job.id === id) {
        // Update stats based on status change
        if (newStatus === 'contacted' && job.status !== 'contacted') {
          const newStats = {
            emailsSent: stats.emailsSent + 1
          };
          setStats(prev => ({
            ...prev,
            emailsSent: prev.emailsSent + 1
          }));
          updateOutreachStats(newStats);
        } else if (newStatus === 'responded' && job.status !== 'responded') {
          const newStats = {
            iceBreakersSent: stats.iceBreakersSent + 1
          };
          setStats(prev => ({
            ...prev,
            iceBreakersSent: prev.iceBreakersSent + 1
          }));
          updateOutreachStats(newStats);
        } else if (newStatus === 'appointment' && job.status !== 'appointment') {
          const newStats = {
            appointmentsBooked: stats.appointmentsBooked + 1
          };
          setStats(prev => ({
            ...prev,
            appointmentsBooked: prev.appointmentsBooked + 1
          }));
          updateOutreachStats(newStats);
        }
        
        return { ...job, status: newStatus };
      }
      return job;
    });
    
    setJobListings(updatedListings);
    filterListings(filterStatus);
  };

  return (
    <div className="space-y-6">
      <JobScraperOutreachStats stats={stats} />
      
      <Card>
        <CardHeader>
          <CardTitle>Job Role Replacement Scraper</CardTitle>
          <CardDescription>
            Find job postings on LinkedIn and Indeed for roles that could be replaced with your services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label htmlFor="job-keyword" className="block text-sm font-medium mb-1">Job Title/Keyword</label>
              <Input
                id="job-keyword"
                placeholder="e.g. IT Manager, CTO"
                value={jobKeyword}
                onChange={(e) => setJobKeyword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium mb-1">Location</label>
              <Input
                id="location"
                placeholder="e.g. Remote, New York"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="replacement" className="block text-sm font-medium mb-1">Your Replacement Service</label>
              <Select value={replacementService} onValueChange={setReplacementService}>
                <SelectTrigger id="replacement">
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  {replacementOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2 items-end">
              <Button 
                className="flex-1 bg-[#0077b5] hover:bg-[#006097]" 
                onClick={() => handleSearch('linkedin')}
                disabled={isSearching}
              >
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </Button>
              <Button 
                className="flex-1 bg-[#2d64b3] hover:bg-[#1d4a8f]" 
                onClick={() => handleSearch('indeed')}
                disabled={isSearching}
              >
                <Briefcase className="mr-2 h-4 w-4" />
                Indeed
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {jobListings.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Job Opportunities ({jobListings.length})</CardTitle>
              <div className="flex space-x-2">
                <Button 
                  variant={filterStatus === 'all' ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => filterListings('all')}
                >
                  All
                </Button>
                <Button 
                  variant={filterStatus === 'new' ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => filterListings('new')}
                >
                  New
                </Button>
                <Button 
                  variant={filterStatus === 'contacted' ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => filterListings('contacted')}
                >
                  Contacted
                </Button>
                <Button 
                  variant={filterStatus === 'responded' ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => filterListings('responded')}
                >
                  Responded
                </Button>
                <Button 
                  variant={filterStatus === 'appointment' ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => filterListings('appointment')}
                >
                  Appointment
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeListings.map((job) => (
                <div key={job.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-lg font-medium">{job.title}</h4>
                        <Badge variant={job.platform === 'linkedin' ? 'secondary' : 'default'}>
                          {job.platform === 'linkedin' ? 'LinkedIn' : 'Indeed'}
                        </Badge>
                        {getStatusBadge(job.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{job.company} • {job.location} • {job.datePosted}</p>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm" onClick={() => window.open(job.link, '_blank')}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <p className="text-sm line-clamp-2">{job.description}</p>
                  </div>
                  
                  <div className="mt-4 flex justify-end space-x-2">
                    {job.status === 'new' && (
                      <Button size="sm" variant="outline" onClick={() => updateJobStatus(job.id, 'contacted')}>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Cold Email
                      </Button>
                    )}
                    {job.status === 'contacted' && (
                      <Button size="sm" variant="outline" onClick={() => updateJobStatus(job.id, 'responded')}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Record Ice Breaker
                      </Button>
                    )}
                    {job.status === 'responded' && (
                      <Button size="sm" variant="outline" onClick={() => updateJobStatus(job.id, 'appointment')}>
                        <Calendar className="mr-2 h-4 w-4" />
                        Book Appointment
                      </Button>
                    )}
                    <Button size="sm" variant="destructive" onClick={() => updateJobStatus(job.id, 'archived')}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {activeListings.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No job listings match the current filter.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Helper function to get status badge
const getStatusBadge = (status: JobListing['status']) => {
  switch (status) {
    case 'new':
      return <Badge variant="outline">New</Badge>;
    case 'contacted':
      return <Badge variant="secondary">Contacted</Badge>;
    case 'responded':
      return <Badge variant="default">Responded</Badge>;
    case 'appointment':
      return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Appointment</Badge>;
    case 'archived':
      return <Badge variant="destructive">Archived</Badge>;
    default:
      return null;
  }
};

export default JobScraperDashboard;
