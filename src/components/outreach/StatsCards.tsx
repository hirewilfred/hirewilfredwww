
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Mail, Eye, Linkedin, MessageSquare, TrendingUp, TrendingDown, MousePointer, AlertCircle, Briefcase, Calendar } from 'lucide-react';

interface StatsCardsProps {
  emailMetrics: {
    sent: number;
    opened: number;
    clicked: number;
    replied: number;
    bounced?: number;
  };
  linkedInMetrics: {
    sent: number;
    accepted: number;
    replied: number;
    viewed?: number;
  };
  calculateRate: (part: number, total: number) => number;
  outreachStats?: {
    jobsFound: number;
    emailsSent: number;
    iceBreakersSent: number;
    appointmentsBooked: number;
  };
}

const StatsCards: React.FC<StatsCardsProps> = ({ 
  emailMetrics, 
  linkedInMetrics, 
  calculateRate,
  outreachStats = { jobsFound: 0, emailsSent: 0, iceBreakersSent: 0, appointmentsBooked: 0 } 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="border-l-4 border-l-blue-500 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Cold Emails Sent
          </CardTitle>
          <Mail className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{emailMetrics.sent + outreachStats.emailsSent}</div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="inline h-3 w-3 mr-1 text-green-500" />
              +12% from last period
            </p>
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Daily</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-green-500 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Email Engagement
          </CardTitle>
          <Eye className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {calculateRate(emailMetrics.opened, emailMetrics.sent)}%
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="inline h-3 w-3 mr-1 text-green-500" />
              +5% from last period
            </p>
            <div className="flex items-center gap-2">
              <span className="flex items-center text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                <Eye className="h-3 w-3 mr-1" />
                {emailMetrics.opened}
              </span>
              <span className="flex items-center text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                <MousePointer className="h-3 w-3 mr-1" />
                {emailMetrics.clicked}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-indigo-500 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            LinkedIn Messages
          </CardTitle>
          <Linkedin className="h-4 w-4 text-indigo-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{linkedInMetrics.sent + outreachStats.iceBreakersSent}</div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingDown className="inline h-3 w-3 mr-1 text-red-500" />
              -3% from last period
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                {linkedInMetrics.accepted} accepted
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-amber-500 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {outreachStats.appointmentsBooked > 0 ? "Appointments Booked" : "Response Rate"}
          </CardTitle>
          {outreachStats.appointmentsBooked > 0 ? 
            <Calendar className="h-4 w-4 text-amber-500" /> : 
            <MessageSquare className="h-4 w-4 text-amber-500" />
          }
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {outreachStats.appointmentsBooked > 0 ? 
              outreachStats.appointmentsBooked : 
              calculateRate(linkedInMetrics.replied + emailMetrics.replied, linkedInMetrics.sent + emailMetrics.sent) + '%'
            }
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="inline h-3 w-3 mr-1 text-green-500" />
              +8% from last period
            </p>
            {outreachStats.appointmentsBooked === 0 && (
              <div className="flex items-center gap-2">
                <span className="flex items-center text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                  <Mail className="h-3 w-3 mr-1" />
                  {emailMetrics.replied}
                </span>
                <span className="flex items-center text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                  <Linkedin className="h-3 w-3 mr-1" />
                  {linkedInMetrics.replied}
                </span>
              </div>
            )}
            {outreachStats.appointmentsBooked > 0 && (
              <div className="flex items-center gap-2">
                <span className="flex items-center text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full">
                  <Briefcase className="h-3 w-3 mr-1" />
                  {outreachStats.jobsFound} leads
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
