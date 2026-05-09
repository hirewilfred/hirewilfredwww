
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingDown, TrendingUp, Mail, Eye, MousePointer, MessageSquare, AlertTriangle } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TIME_PERIOD_OPTIONS } from './constants';

interface EmailMetrics {
  sent: number;
  opened: number;
  clicked: number;
  replied: number;
  bounced?: number;
}

interface EmailData {
  name: string;
  sent: number;
  opened: number;
  clicked: number;
  replied: number;
  bounced?: number;
}

interface EmailPerformanceChartProps {
  emailData: EmailData[];
  emailMetrics: EmailMetrics;
  timePeriod: 'day' | 'week' | 'month';
  setTimePeriod: React.Dispatch<React.SetStateAction<'day' | 'week' | 'month'>>;
}

const EmailPerformanceChart: React.FC<EmailPerformanceChartProps> = ({
  emailData,
  emailMetrics,
  timePeriod,
  setTimePeriod
}) => {
  // Calculate rates
  const calculateRate = (value: number, total: number) => {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  };

  const openRate = calculateRate(emailMetrics.opened, emailMetrics.sent);
  const clickRate = calculateRate(emailMetrics.clicked, emailMetrics.sent);
  const replyRate = calculateRate(emailMetrics.replied, emailMetrics.sent);
  const bounceRate = calculateRate(emailMetrics.bounced || 0, emailMetrics.sent);

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-blue-500" />
          Cold Email Tracker
        </CardTitle>
        <CardDescription>
          <div className="flex items-center gap-2">
            <Tabs value={timePeriod} onValueChange={(value) => setTimePeriod(value as 'day' | 'week' | 'month')}>
              <TabsList className="grid w-full grid-cols-3">
                {TIME_PERIOD_OPTIONS.map((option) => (
                  <TabsTrigger key={option.value} value={option.value}>{option.label}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[300px]">
          <ChartContainer
            config={{
              sent: { label: 'Sent', color: '#94a3b8' },
              opened: { label: 'Opened', color: '#64748b' },
              clicked: { label: 'Clicked', color: '#334155' },
              replied: { label: 'Replied', color: '#0ea5e9' },
              bounced: { label: 'Bounced', color: '#ef4444' }
            }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={emailData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="sent" name="Sent" fill="#94a3b8" />
                <Bar dataKey="opened" name="Opened" fill="#64748b" />
                <Bar dataKey="clicked" name="Clicked" fill="#334155" />
                <Bar dataKey="replied" name="Replied" fill="#0ea5e9" />
                <Bar dataKey="bounced" name="Bounced" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="grid grid-cols-5 gap-2 mt-4">
          <div className="text-center p-2 rounded-md bg-slate-50">
            <div className="flex items-center justify-center mb-1">
              <Mail className="h-4 w-4 text-slate-600 mr-1" />
              <p className="text-xs text-muted-foreground">Sent</p>
            </div>
            <p className="font-semibold">{emailMetrics.sent}</p>
          </div>
          <div className="text-center p-2 rounded-md bg-slate-50">
            <div className="flex items-center justify-center mb-1">
              <Eye className="h-4 w-4 text-green-600 mr-1" />
              <p className="text-xs text-muted-foreground">Open Rate</p>
            </div>
            <p className="font-semibold">{openRate}%</p>
          </div>
          <div className="text-center p-2 rounded-md bg-slate-50">
            <div className="flex items-center justify-center mb-1">
              <MousePointer className="h-4 w-4 text-blue-600 mr-1" />
              <p className="text-xs text-muted-foreground">Click Rate</p>
            </div>
            <p className="font-semibold">{clickRate}%</p>
          </div>
          <div className="text-center p-2 rounded-md bg-slate-50">
            <div className="flex items-center justify-center mb-1">
              <MessageSquare className="h-4 w-4 text-purple-600 mr-1" />
              <p className="text-xs text-muted-foreground">Reply Rate</p>
            </div>
            <p className="font-semibold">{replyRate}%</p>
          </div>
          <div className="text-center p-2 rounded-md bg-slate-50">
            <div className="flex items-center justify-center mb-1">
              <AlertTriangle className="h-4 w-4 text-red-600 mr-1" />
              <p className="text-xs text-muted-foreground">Bounce Rate</p>
            </div>
            <p className="font-semibold">{bounceRate}%</p>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Status Indicators</h4>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
              <span className="mr-1">✅</span> Email Sent
            </div>
            <div className="flex items-center text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
              <span className="mr-1">👁️</span> Email Opened
            </div>
            <div className="flex items-center text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
              <span className="mr-1">🔗</span> Link Clicked
            </div>
            <div className="flex items-center text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full">
              <span className="mr-1">💬</span> Replied
            </div>
            <div className="flex items-center text-xs bg-red-50 text-red-700 px-2 py-1 rounded-full">
              <span className="mr-1">❌</span> Bounced
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailPerformanceChart;
