
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, ShieldCheck, Mail, LayoutDashboard, ArrowLeft, Briefcase, FileText } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  
  return <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          
          <Link to="/">
            <img src="/lovable-uploads/c3e85de0-3ab1-4dca-9858-443e92ddbcf8.png" alt="Wilfred Logo" className="h-16" />
          </Link>
        </div>
        
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <ExternalLink className="h-6 w-6 text-wilfred-accent" />
              <CardTitle className="text-2xl">Dashboard Demo Menu</CardTitle>
            </div>
            <CardDescription>
              No login required - Access dashboards directly in demo mode
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-5 rounded-md">
              <h3 className="font-medium mb-4 text-blue-800">Select a dashboard:</h3>
              <div className="space-y-3">
                <Button className="w-full flex items-center justify-center gap-2 bg-wilfred hover:bg-wilfred-accent" onClick={() => handleNavigation('/dashboard')}>
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Main Dashboard</span>
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
                
                <Button variant="outline" onClick={() => handleNavigation('/outreach')} className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950">
                  <Mail className="h-4 w-4" />
                  <span>DEMO- Outreach Dashboard</span>
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
                
                <Button variant="outline" onClick={() => handleNavigation('/scraper')} className="w-full flex items-center justify-center gap-2 text-slate-50 bg-violet-900 hover:bg-violet-800">
                  <Briefcase className="h-4 w-4" />
                  <span>DEMO- Job Scraper Dashboard</span>
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
                
                <Button variant="outline" onClick={() => handleNavigation('/content')} className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white">
                  <FileText className="h-4 w-4" />
                  <span>DEMO- B2B Content Management</span>
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
                
                <Button className="w-full flex items-center justify-center gap-2" variant="outline" onClick={() => handleNavigation('/admin')}>
                  <ShieldCheck className="h-4 w-4" />
                  <span>Admin Dashboard</span>
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <p className="px-2 text-center text-sm text-muted-foreground w-full">
              <span className="font-medium">Demo Mode:</span> The Main Dashboard combines all features, the Outreach Dashboard focuses on LinkedIn outreach, the Job Scraper helps find job opportunities, the Content Dashboard manages B2B content and campaigns, and the Admin Dashboard allows managing users and payment details.
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>;
};

export default Auth;
