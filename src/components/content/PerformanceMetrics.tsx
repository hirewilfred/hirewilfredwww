
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { mockPerformanceData, mockEngagementByTypeData, mockPlatformData } from '@/components/content/mockData';

const PerformanceMetrics = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [metrics, setMetrics] = useState(mockPerformanceData);
  const [engagementByType, setEngagementByType] = useState(mockEngagementByTypeData);
  const [platformData, setPlatformData] = useState(mockPlatformData);
  
  // Colors for charts
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00C49F'];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Performance Analytics</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Impressions</CardDescription>
            <CardTitle className="text-3xl">125,401</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              <span className="text-emerald-500">↑ 12.5%</span> from previous period
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Engagement Rate</CardDescription>
            <CardTitle className="text-3xl">4.2%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              <span className="text-emerald-500">↑ 0.8%</span> from previous period
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Link Clicks</CardDescription>
            <CardTitle className="text-3xl">2,863</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              <span className="text-emerald-500">↑ 23.1%</span> from previous period
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Conversion Rate</CardDescription>
            <CardTitle className="text-3xl">1.8%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              <span className="text-rose-500">↓ 0.3%</span> from previous period
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance Over Time</CardTitle>
            <CardDescription>Impressions, Engagement, and Clicks</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={metrics}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="impressions" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="engagement" stroke="#82ca9d" />
                <Line type="monotone" dataKey="clicks" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Engagement by Content Type</CardTitle>
            <CardDescription>Which content types perform best</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={engagementByType}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="likes" fill="#8884d8" />
                <Bar dataKey="comments" fill="#82ca9d" />
                <Bar dataKey="shares" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Platform Breakdown</CardTitle>
            <CardDescription>Performance across different platforms</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Posts</CardTitle>
          <CardDescription>Your best performing content from the selected period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Post</th>
                  <th className="text-left py-3 px-4 font-medium">Platform</th>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-left py-3 px-4 font-medium">Impressions</th>
                  <th className="text-left py-3 px-4 font-medium">Engagement</th>
                  <th className="text-left py-3 px-4 font-medium">Clicks</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">How to Improve Your B2B Marketing Strategy in 2024</td>
                  <td className="py-3 px-4">LinkedIn</td>
                  <td className="py-3 px-4">Apr 15, 2024</td>
                  <td className="py-3 px-4">5,287</td>
                  <td className="py-3 px-4">312</td>
                  <td className="py-3 px-4">198</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Case Study: How We Helped Client X Increase Sales by 200%</td>
                  <td className="py-3 px-4">LinkedIn</td>
                  <td className="py-3 px-4">Apr 22, 2024</td>
                  <td className="py-3 px-4">4,871</td>
                  <td className="py-3 px-4">294</td>
                  <td className="py-3 px-4">176</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">5 Tools Every Marketing Team Needs in 2024</td>
                  <td className="py-3 px-4">Twitter</td>
                  <td className="py-3 px-4">Apr 10, 2024</td>
                  <td className="py-3 px-4">3,968</td>
                  <td className="py-3 px-4">251</td>
                  <td className="py-3 px-4">143</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Behind the Scenes: Our Company Culture</td>
                  <td className="py-3 px-4">LinkedIn</td>
                  <td className="py-3 px-4">Apr 05, 2024</td>
                  <td className="py-3 px-4">3,421</td>
                  <td className="py-3 px-4">231</td>
                  <td className="py-3 px-4">124</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Industry Trends: What to Watch for in Q3</td>
                  <td className="py-3 px-4">Twitter</td>
                  <td className="py-3 px-4">Apr 18, 2024</td>
                  <td className="py-3 px-4">2,987</td>
                  <td className="py-3 px-4">198</td>
                  <td className="py-3 px-4">109</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMetrics;
