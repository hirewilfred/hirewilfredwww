
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const OutreachSettings = () => {
  const handleSave = () => {
    // TODO: Implement save functionality when backend is ready
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Target Criteria</CardTitle>
          <CardDescription>Define your target audience and location preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contractTypes">Contract Types</Label>
            <Select defaultValue="fulltime">
              <SelectTrigger>
                <SelectValue placeholder="Select contract type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fulltime">Full-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="parttime">Part-time</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="province">Province</Label>
              <Select defaultValue="on">
                <SelectTrigger>
                  <SelectValue placeholder="Select province" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="on">Ontario</SelectItem>
                  <SelectItem value="bc">British Columbia</SelectItem>
                  <SelectItem value="qc">Quebec</SelectItem>
                  <SelectItem value="ab">Alberta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Select defaultValue="toronto">
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="toronto">Toronto</SelectItem>
                  <SelectItem value="ottawa">Ottawa</SelectItem>
                  <SelectItem value="mississauga">Mississauga</SelectItem>
                  <SelectItem value="brampton">Brampton</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Message Templates</CardTitle>
          <CardDescription>Customize your outreach messages</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="linkedinMessage">LinkedIn Message (180 characters max)</Label>
            <Textarea 
              id="linkedinMessage" 
              placeholder="Enter your LinkedIn message template" 
              defaultValue="Hi {first_name}, I noticed you're in the {industry} industry. I'd love to connect and share how Wilfred AI can help automate your outreach efforts. Looking forward to connecting!"
              className="h-24"
              maxLength={180}
            />
            <p className="text-xs text-muted-foreground">Use {'{first_name}'}, {'{company}'}, {'{industry}'} as placeholders</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="emailMessage">Email Message</Label>
            <Textarea 
              id="emailMessage" 
              placeholder="Enter your email message template" 
              defaultValue="Dear {first_name},

I hope this email finds you well. I noticed your work at {company} in the {industry} sector, and I believe Wilfred AI could significantly streamline your outreach processes.

Would you be interested in a brief demo to see how we can help automate your lead generation?

Best regards,
[Your name]"
              className="h-48"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="messageStyle">Message Tone</Label>
            <Select defaultValue="professional">
              <SelectTrigger>
                <SelectValue placeholder="Select message tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={handleSave} className="w-full mt-4">
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OutreachSettings;
