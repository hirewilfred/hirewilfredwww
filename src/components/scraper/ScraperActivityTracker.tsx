
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, MessageSquare, Calendar } from 'lucide-react';

interface ScraperActivityTrackerProps {
  totalContacts: number;
  emailsSent: number;
  linkedinSent: number;
  appointmentConflicts: number;
}

const ScraperActivityTracker: React.FC<ScraperActivityTrackerProps> = ({
  totalContacts,
  emailsSent,
  linkedinSent,
  appointmentConflicts
}) => {
  const stats = [
    {
      title: 'Total Leads',
      value: totalContacts,
      icon: <User className="h-4 w-4 text-blue-500" />,
      description: 'Total leads found'
    },
    {
      title: 'Emails Sent',
      value: emailsSent,
      icon: <Mail className="h-4 w-4 text-green-500" />,
      description: 'Cold emails sent'
    },
    {
      title: 'LinkedIn Messages',
      value: linkedinSent,
      icon: <MessageSquare className="h-4 w-4 text-purple-500" />,
      description: 'LinkedIn InMail sent'
    },
    {
      title: 'Appointments',
      value: appointmentConflicts,
      icon: <Calendar className="h-4 w-4 text-amber-500" />,
      description: 'Scheduled appointments'
    }
  ];
  
  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default ScraperActivityTracker;
