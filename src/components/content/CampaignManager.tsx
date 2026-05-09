
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Users, Target, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useToast } from '@/components/ui/use-toast';
import { mockCampaigns } from '@/components/content/mockData';

interface Campaign {
  id: string;
  name: string;
  description: string;
  platform: 'linkedin' | 'twitter' | 'facebook';
  targetAudience: {
    industries?: string[];
    personas?: string[];
  };
  startDate: string;
  endDate: string;
  status: 'draft' | 'active' | 'completed' | 'paused';
  postCount: number;
}

const CampaignManager = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = 
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'paused': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateCampaign = (data: any) => {
    const newCampaign: Campaign = {
      id: Date.now().toString(),
      name: data.name as string,
      description: data.description as string,
      platform: (data.platform as 'linkedin' | 'twitter' | 'facebook') || 'linkedin',
      targetAudience: {
        industries: data.industries?.split(',').map((i: string) => i.trim()),
        personas: data.personas?.split(',').map((p: string) => p.trim()),
      },
      startDate: data.startDate as string,
      endDate: data.endDate as string,
      status: 'draft',
      postCount: 0
    };
    
    setCampaigns([newCampaign, ...campaigns]);
    setDialogOpen(false);
    toast({
      title: "Campaign Created",
      description: "Your campaign has been created successfully.",
    });
  };

  const deleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter(campaign => campaign.id !== id));
    toast({
      title: "Campaign Deleted",
      description: "The campaign has been deleted successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-2xl font-bold">LinkedIn Campaign Manager</h2>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
              <DialogDescription>
                Set up a new LinkedIn content campaign with targeted audience and schedule.
              </DialogDescription>
            </DialogHeader>
            <form className="py-4" onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const data = Object.fromEntries(formData);
              handleCreateCampaign(data);
            }}>
              <div className="space-y-4">
                <div>
                  <FormLabel>Campaign Name</FormLabel>
                  <Input name="name" placeholder="Q2 Product Launch" required />
                </div>
                
                <div>
                  <FormLabel>Description</FormLabel>
                  <Textarea name="description" placeholder="Campaign goals and details..." />
                </div>
                
                <div>
                  <FormLabel>Platform</FormLabel>
                  <Select name="platform" defaultValue="linkedin">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="twitter">Twitter</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <FormLabel>Start Date</FormLabel>
                    <Input name="startDate" type="date" required />
                  </div>
                  
                  <div>
                    <FormLabel>End Date</FormLabel>
                    <Input name="endDate" type="date" required />
                  </div>
                </div>
                
                <div>
                  <FormLabel>Target Industries</FormLabel>
                  <Input name="industries" placeholder="Tech, Finance, Healthcare" />
                  <FormDescription>Comma-separated list of industries</FormDescription>
                </div>
                
                <div>
                  <FormLabel>Target Personas</FormLabel>
                  <Input name="personas" placeholder="CTO, Marketing Director, Founder" />
                  <FormDescription>Comma-separated list of job roles</FormDescription>
                </div>
                
                <Button type="submit" className="w-full">Create Campaign</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Filter Campaigns</CardTitle>
          <CardDescription>Search and filter your LinkedIn campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        {filteredCampaigns.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground">No campaigns found matching your filters.</p>
            </CardContent>
          </Card>
        ) : (
          filteredCampaigns.map((campaign) => (
            <Card key={campaign.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{campaign.name}</CardTitle>
                  <Badge variant="outline" className={getStatusColor(campaign.status)}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </Badge>
                </div>
                <CardDescription>{campaign.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div className="text-sm">
                      <div>Start: {new Date(campaign.startDate).toLocaleDateString()}</div>
                      <div>End: {new Date(campaign.endDate).toLocaleDateString()}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div className="text-sm">
                      {campaign.targetAudience.industries && (
                        <div>Industries: {campaign.targetAudience.industries.join(', ')}</div>
                      )}
                      {campaign.targetAudience.personas && (
                        <div>Personas: {campaign.targetAudience.personas.join(', ')}</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Target className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div className="text-sm">
                      <div>Platform: {campaign.platform}</div>
                      <div>Posts: {campaign.postCount}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Posts
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-500" 
                  onClick={() => deleteCampaign(campaign.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CampaignManager;
