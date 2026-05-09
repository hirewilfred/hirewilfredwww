
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Linkedin, UserCheck, MessageSquare, Eye } from 'lucide-react';

interface LinkedInMetrics {
  sent: number;
  accepted: number;
  replied: number;
  viewed?: number;
}

interface LinkedInData {
  name: string;
  sent: number;
  accepted: number;
  replied: number;
  viewed?: number;
}

interface LinkedInPerformanceChartProps {
  linkedInData: LinkedInData[];
  linkedInMetrics: LinkedInMetrics;
}

const LinkedInPerformanceChart: React.FC<LinkedInPerformanceChartProps> = ({
  linkedInData,
  linkedInMetrics
}) => {
  // Calculate acceptance and reply rates
  const calculateRate = (value: number, total: number) => {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  };

  const acceptanceRate = calculateRate(linkedInMetrics.accepted, linkedInMetrics.sent);
  const replyRate = calculateRate(linkedInMetrics.replied, linkedInMetrics.sent);
  const viewRate = calculateRate(linkedInMetrics.viewed || 0, linkedInMetrics.sent);

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Linkedin className="h-5 w-5 text-blue-700" />
          LinkedIn Ice Breaker Tracker
        </CardTitle>
        <CardDescription>
          Track your LinkedIn outreach performance
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[300px]">
          <ChartContainer
            config={{
              sent: { label: 'Sent', color: '#94a3b8' },
              accepted: { label: 'Accepted', color: '#334155' },
              replied: { label: 'Replied', color: '#0ea5e9' },
              viewed: { label: 'Viewed', color: '#a855f7' }
            }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={linkedInData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="sent" name="Sent" stroke="#94a3b8" strokeWidth={2} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="accepted" name="Accepted" stroke="#334155" strokeWidth={2} />
                <Line type="monotone" dataKey="replied" name="Replied" stroke="#0ea5e9" strokeWidth={2} />
                <Line type="monotone" dataKey="viewed" name="Viewed" stroke="#a855f7" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-4">
          <div className="text-center p-2 rounded-md bg-slate-50">
            <div className="flex items-center justify-center mb-1">
              <Linkedin className="h-4 w-4 text-slate-600 mr-1" />
              <p className="text-xs text-muted-foreground">Sent</p>
            </div>
            <p className="font-semibold">{linkedInMetrics.sent}</p>
          </div>
          <div className="text-center p-2 rounded-md bg-slate-50">
            <div className="flex items-center justify-center mb-1">
              <UserCheck className="h-4 w-4 text-green-600 mr-1" />
              <p className="text-xs text-muted-foreground">Accepted</p>
            </div>
            <p className="font-semibold">{linkedInMetrics.accepted} ({acceptanceRate}%)</p>
          </div>
          <div className="text-center p-2 rounded-md bg-slate-50">
            <div className="flex items-center justify-center mb-1">
              <MessageSquare className="h-4 w-4 text-blue-600 mr-1" />
              <p className="text-xs text-muted-foreground">Replied</p>
            </div>
            <p className="font-semibold">{linkedInMetrics.replied} ({replyRate}%)</p>
          </div>
          <div className="text-center p-2 rounded-md bg-slate-50">
            <div className="flex items-center justify-center mb-1">
              <Eye className="h-4 w-4 text-purple-600 mr-1" />
              <p className="text-xs text-muted-foreground">Viewed</p>
            </div>
            <p className="font-semibold">{linkedInMetrics.viewed || 0} ({viewRate}%)</p>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Status Indicators</h4>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
              <span className="mr-1">✅</span> Message Sent
            </div>
            <div className="flex items-center text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
              <span className="mr-1">👁️</span> Profile Viewed
            </div>
            <div className="flex items-center text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
              <span className="mr-1">👥</span> Connection Accepted
            </div>
            <div className="flex items-center text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full">
              <span className="mr-1">💬</span> Reply Received
            </div>
            <div className="flex items-center text-xs bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full">
              <span className="mr-1">⏳</span> Pending
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LinkedInPerformanceChart;
