
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ContactRecord } from '@/pages/ScraperDashboard';
import { Badge } from "@/components/ui/badge";
import { Card } from '@/components/ui/card';
import { Mail, MessageSquare, Calendar, Eye, Trash } from 'lucide-react';
import { DateRangePicker } from "@/components/ui/date-range-picker";

interface ScraperResultsTableProps {
  contacts: ContactRecord[];
  onUpdateContact: (id: string, updates: Partial<ContactRecord>) => void;
  dateFilter: { from: Date | undefined, to: Date | undefined };
  onDateFilterChange: (range: { from: Date | undefined, to: Date | undefined }) => void;
  nicheFilter: string;
  onNicheFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

const ScraperResultsTable: React.FC<ScraperResultsTableProps> = ({
  contacts,
  onUpdateContact,
  dateFilter,
  onDateFilterChange,
  nicheFilter,
  onNicheFilterChange,
  statusFilter,
  onStatusFilterChange
}) => {
  // Helper function to get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Not Sent':
        return <Badge variant="outline">Not Sent</Badge>;
      case 'Sent':
        return <Badge>Sent</Badge>;
      case 'Opened':
        return <Badge variant="secondary">Opened</Badge>;
      case 'Responded':
        return <Badge className="bg-green-500">Responded</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label htmlFor="date-filter" className="block text-sm font-medium mb-1">Date Range</label>
          <DateRangePicker
            value={dateFilter}
            onValueChange={onDateFilterChange}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="niche-filter" className="block text-sm font-medium mb-1">Search by Company</label>
          <Input
            id="niche-filter"
            placeholder="Filter by company name"
            value={nicheFilter}
            onChange={(e) => onNicheFilterChange(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="status-filter" className="block text-sm font-medium mb-1">Filter by Status</label>
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger id="status-filter">
              <SelectValue placeholder="Any status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Contacts</SelectItem>
              <SelectItem value="emailSent">Email Sent</SelectItem>
              <SelectItem value="linkedinSent">LinkedIn Sent</SelectItem>
              <SelectItem value="conflict">Appointment Conflicts</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {contacts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No contacts found. Start by searching for leads.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <Card key={contact.id} className="p-4">
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{contact.name}</h3>
                    <Badge variant="outline">{contact.source}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{contact.company}</p>
                </div>
                <div className="space-x-1 flex">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => onUpdateContact(contact.id, { emailStatus: 'Not Sent', linkedinStatus: 'Not Sent' })}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">
                <div className="flex items-center justify-between border rounded p-2">
                  <span className="text-sm">Email Status:</span>
                  {getStatusBadge(contact.emailStatus)}
                </div>
                <div className="flex items-center justify-between border rounded p-2">
                  <span className="text-sm">LinkedIn Status:</span>
                  {getStatusBadge(contact.linkedinStatus)}
                </div>
                <div className="flex items-center justify-between border rounded p-2">
                  <span className="text-sm">Appointment:</span>
                  <Badge variant={contact.appointmentConflict ? "destructive" : "outline"}>
                    {contact.appointmentConflict ? 'Conflict' : 'No Conflict'}
                  </Badge>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end space-x-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onUpdateContact(contact.id, { emailStatus: 'Sent' })}
                  disabled={contact.emailStatus !== 'Not Sent'}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onUpdateContact(contact.id, { linkedinStatus: 'Sent' })}
                  disabled={contact.linkedinStatus !== 'Not Sent'}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send InMail
                </Button>
                <Button 
                  size="sm" 
                  variant={contact.appointmentConflict ? "destructive" : "default"}
                  disabled={!contact.appointmentConflict}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {contact.appointmentConflict ? 'Resolve Conflict' : 'Book Appointment'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScraperResultsTable;
