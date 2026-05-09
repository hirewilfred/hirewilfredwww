
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Calendar, Check, Eye, MousePointer, MessageSquare, AlertCircle, CircleCheck, Clock, RefreshCw } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const ActivityFeed: React.FC = () => {
  const [loading, setLoading] = useState(false);
  
  const handleRefresh = () => {
    setLoading(true);
    // Simulate a refresh
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" /> 
            Recent Outreach Activity
          </CardTitle>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={handleRefresh}
            disabled={loading}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="sr-only">Refresh</span>
          </Button>
        </div>
        <CardDescription>
          Live feed of your latest outreach actions and their status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-md border border-green-100 bg-green-50">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Mail className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-green-900">Cold Email Sent</p>
                  <Badge variant="outline" className="bg-green-100 text-green-700 text-xs">Just now</Badge>
                </div>
                <p className="text-sm text-muted-foreground">To: John Smith (Dental Clinic)</p>
              </div>
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm font-medium text-green-700">Sent</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-md border border-blue-100 bg-blue-50">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-blue-900">Cold Email Opened</p>
                  <Badge variant="outline" className="bg-blue-100 text-blue-700 text-xs">3m ago</Badge>
                </div>
                <p className="text-sm text-muted-foreground">By: Sarah Johnson (Fitness Studio)</p>
              </div>
            </div>
            <div className="flex items-center">
              <Eye className="h-4 w-4 text-blue-500 mr-1" />
              <span className="text-sm font-medium text-blue-700">Opened</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-md border">
            <div className="flex items-center gap-3">
              <div className="bg-slate-100 p-2 rounded-full">
                <Linkedin className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">LinkedIn Message Sent</p>
                  <Badge variant="outline" className="bg-slate-100 text-slate-700 text-xs">15m ago</Badge>
                </div>
                <p className="text-sm text-muted-foreground">To: Mike Williams (Real Estate)</p>
              </div>
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm font-medium">Sent</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-md border">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <Mail className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">Email Link Clicked</p>
                  <Badge variant="outline" className="bg-purple-100 text-purple-700 text-xs">25m ago</Badge>
                </div>
                <p className="text-sm text-muted-foreground">By: Tom Harris (Insurance Broker)</p>
              </div>
            </div>
            <div className="flex items-center">
              <MousePointer className="h-4 w-4 text-purple-500 mr-1" />
              <span className="text-sm font-medium">Clicked</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-md border">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-full">
                <Linkedin className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">LinkedIn Message Replied</p>
                  <Badge variant="outline" className="bg-indigo-100 text-indigo-700 text-xs">45m ago</Badge>
                </div>
                <p className="text-sm text-muted-foreground">From: Lisa Brown (Marketing Agency)</p>
              </div>
            </div>
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 text-indigo-500 mr-1" />
              <span className="text-sm font-medium">Replied</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-md border border-amber-100 bg-amber-50">
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-amber-900">Appointment Scheduled</p>
                  <Badge variant="outline" className="bg-amber-100 text-amber-700 text-xs">1h ago</Badge>
                </div>
                <p className="text-sm text-muted-foreground">With: Robert Davis (Law Firm)</p>
              </div>
            </div>
            <div className="flex items-center">
              <CircleCheck className="h-4 w-4 text-amber-500 mr-1" />
              <span className="text-sm font-medium text-amber-700">Confirmed</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-md border border-red-100 bg-red-50">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-full">
                <Mail className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-red-900">Email Bounced</p>
                  <Badge variant="outline" className="bg-red-100 text-red-700 text-xs">2h ago</Badge>
                </div>
                <p className="text-sm text-muted-foreground">To: Invalid Contact (HVAC Company)</p>
              </div>
            </div>
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-sm font-medium text-red-700">Bounced</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button variant="outline" className="w-full">
          Show More Activity
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ActivityFeed;
