
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/utils/auth';
import { useToast } from "@/components/ui/use-toast";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScraperSearchSection from '@/components/scraper/ScraperSearchSection';
import ScraperResultsTable from '@/components/scraper/ScraperResultsTable';
import ScraperActivityTracker from '@/components/scraper/ScraperActivityTracker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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

const ScraperDashboard = () => {
  const [contacts, setContacts] = useState<ContactRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('search');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  // Filter states
  const [dateFilter, setDateFilter] = useState<{from: Date | undefined, to: Date | undefined}>({
    from: undefined,
    to: undefined
  });
  const [nicheFilter, setNicheFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  // Mock data generators for demo purposes
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

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">LinkedIn Scraper Dashboard</h1>
            
            <Button variant="outline" onClick={handleExportCSV}>
              Export to CSV
            </Button>
          </div>
          
          {/* Updated grid layout for activity tracker components */}
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
        </div>
      </section>
      
      <Footer />
    </main>
  );
};

export default ScraperDashboard;
