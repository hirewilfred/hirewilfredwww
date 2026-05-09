
import React, { useState } from 'react';
import { Search, Briefcase, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  link: string;
  datePosted: string;
}

const IndeedJobScraper = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [jobType, setJobType] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const { toast } = useToast();

  const handleSearch = () => {
    if (!jobTitle.trim()) {
      toast({
        title: "Search error",
        description: "Please enter a job title",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    
    // In a real implementation, this would be an API call to a backend service
    // that scrapes Indeed for job listings
    setTimeout(() => {
      const mockJobListings: JobListing[] = [
        {
          id: '1',
          title: 'Senior React Developer',
          company: 'Tech Solutions Inc',
          location: location || 'Remote',
          salary: '$100,000 - $130,000 a year',
          description: 'We are looking for a Senior React Developer to join our team...',
          link: 'https://indeed.com/job/1',
          datePosted: '2 days ago'
        },
        {
          id: '2',
          title: 'Frontend Engineer',
          company: 'Digital Innovations',
          location: location || 'San Francisco, CA',
          salary: '$90,000 - $120,000 a year',
          description: 'Join our team of passionate developers working on cutting-edge projects...',
          link: 'https://indeed.com/job/2',
          datePosted: '1 week ago'
        },
        {
          id: '3',
          title: 'Full Stack Developer',
          company: 'Growth Partners',
          location: location || 'New York, NY',
          salary: '$110,000 - $140,000 a year',
          description: 'We\'re seeking an experienced Full Stack Developer with React expertise...',
          link: 'https://indeed.com/job/3',
          datePosted: 'Today'
        },
      ];
      
      setJobListings(mockJobListings);
      setIsSearching(false);
      
      toast({
        title: "Search complete",
        description: `Found ${mockJobListings.length} job listings matching your criteria.`,
      });
    }, 1500);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-wilfred-accent" />
          <CardTitle>Indeed Job Scraper</CardTitle>
        </div>
        <CardDescription>Find job opportunities across Indeed</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label htmlFor="job-title" className="block text-sm font-medium mb-1">Job Title</label>
            <Input
              id="job-title"
              placeholder="e.g. React Developer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
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
            <label htmlFor="experience" className="block text-sm font-medium mb-1">Experience</label>
            <Select value={experienceLevel} onValueChange={setExperienceLevel}>
              <SelectTrigger id="experience">
                <SelectValue placeholder="Any experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entry">Entry level</SelectItem>
                <SelectItem value="mid">Mid level</SelectItem>
                <SelectItem value="senior">Senior level</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="job-type" className="block text-sm font-medium mb-1">Job Type</label>
            <Select value={jobType} onValueChange={setJobType}>
              <SelectTrigger id="job-type">
                <SelectValue placeholder="Any type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button 
          className="w-full md:w-auto bg-wilfred hover:bg-wilfred-accent" 
          onClick={handleSearch}
          disabled={isSearching}
        >
          {isSearching ? (
            <>Searching...</>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Find Jobs
            </>
          )}
        </Button>

        {jobListings.length > 0 && (
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-medium">Results ({jobListings.length})</h3>
            <div className="divide-y">
              {jobListings.map((job) => (
                <div key={job.id} className="py-4">
                  <div className="flex justify-between">
                    <h4 className="text-md font-medium">{job.title}</h4>
                    <span className="text-sm text-muted-foreground">{job.datePosted}</span>
                  </div>
                  <div className="mt-1">
                    <p className="text-sm">{job.company} • {job.location}</p>
                    <p className="text-sm font-medium mt-1 text-green-600">{job.salary}</p>
                  </div>
                  <p className="text-sm mt-2 text-muted-foreground line-clamp-2">{job.description}</p>
                  <div className="mt-3">
                    <Button variant="outline" size="sm" className="text-xs">
                      View Details
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        <p>Note: This is a demo scraper. In a production environment, web scraping may be subject to terms of service restrictions.</p>
      </CardFooter>
    </Card>
  );
};

export default IndeedJobScraper;
