
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, BarChart, Edit, Trash2 } from 'lucide-react';

const AdminCampaigns = () => {
  // Dummy data for demo purposes
  const campaigns = [
    { 
      id: 1, 
      name: 'Spring Promotion 2025', 
      status: 'Active', 
      emails: 12543,
      openRate: '24.8%',
      clickRate: '3.9%',
      startDate: '2025-03-15',
      endDate: '2025-04-15'
    },
    { 
      id: 2, 
      name: 'New Customer Onboarding', 
      status: 'Active', 
      emails: 8750,
      openRate: '42.3%',
      clickRate: '12.7%',
      startDate: '2025-01-01',
      endDate: 'Ongoing'
    },
    { 
      id: 3, 
      name: 'Winter Sale 2024', 
      status: 'Completed', 
      emails: 25600,
      openRate: '21.6%',
      clickRate: '4.5%',
      startDate: '2024-12-01',
      endDate: '2025-01-15'
    },
    { 
      id: 4, 
      name: 'Product Launch - Wilfred AI 2.0', 
      status: 'Draft', 
      emails: 0,
      openRate: '--',
      clickRate: '--',
      startDate: '2025-05-01',
      endDate: '2025-05-30'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Campaign Management</h2>
        <div className="flex w-full sm:w-auto gap-2">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search campaigns..."
              className="pl-8 w-full sm:w-[250px]"
            />
          </div>
          <Button className="bg-wilfred hover:bg-wilfred-accent">
            <Plus className="mr-1 h-4 w-4" /> New Campaign
          </Button>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Emails Sent</TableHead>
              <TableHead>Open Rate</TableHead>
              <TableHead>Click Rate</TableHead>
              <TableHead>Date Range</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell className="font-medium">{campaign.name}</TableCell>
                <TableCell>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                    campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    campaign.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {campaign.status}
                  </span>
                </TableCell>
                <TableCell>{campaign.emails.toLocaleString()}</TableCell>
                <TableCell>{campaign.openRate}</TableCell>
                <TableCell>{campaign.clickRate}</TableCell>
                <TableCell>
                  {campaign.startDate} to {campaign.endDate}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="ghost">
                      <BarChart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminCampaigns;
