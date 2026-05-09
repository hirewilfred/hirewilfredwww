
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Mail, MessageSquare, Calendar } from 'lucide-react';

interface JobScraperOutreachStatsProps {
  stats: {
    jobsFound: number;
    emailsSent: number;
    iceBreakersSent: number;
    appointmentsBooked: number;
  };
}

const JobScraperOutreachStats: React.FC<JobScraperOutreachStatsProps> = ({ stats }) => {
  const statsData = [
    {
      title: 'Jobs Found',
      value: stats.jobsFound,
      icon: <Briefcase className="h-4 w-4 text-blue-500" />,
    },
    {
      title: 'Cold Emails Sent',
      value: stats.emailsSent,
      icon: <Mail className="h-4 w-4 text-green-500" />,
    },
    {
      title: 'Ice Breakers',
      value: stats.iceBreakersSent,
      icon: <MessageSquare className="h-4 w-4 text-purple-500" />,
    },
    {
      title: 'Appointments',
      value: stats.appointmentsBooked,
      icon: <Calendar className="h-4 w-4 text-amber-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between py-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.title === 'Appointments' && stats.emailsSent > 0 ? 
                `${Math.round((stats.appointmentsBooked / stats.emailsSent) * 100)}% conversion rate` : 
                '\u00A0'}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JobScraperOutreachStats;
