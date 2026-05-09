
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const AdminSettings = () => {
  // Demo state for settings
  const [settings, setSettings] = useState({
    companyName: 'Wilfred AI',
    emailFrom: 'no-reply@wilfredai.com',
    maxDailyEmails: 5000,
    apiKey: 'wlf_123456789abcdef',
    enableNotifications: true,
    enableAnalytics: true,
    maintenanceMode: false,
    debugMode: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Settings saved successfully');
    // In a real app, this would save the settings to a database
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">System Settings</h2>
        
        <form onSubmit={handleSaveSettings} className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">General Settings</h3>
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={settings.companyName}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emailFrom">Default Email From</Label>
                <Input
                  id="emailFrom"
                  name="emailFrom"
                  type="email"
                  value={settings.emailFrom}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxDailyEmails">Max Daily Email Limit</Label>
                <Input
                  id="maxDailyEmails"
                  name="maxDailyEmails"
                  type="number"
                  value={settings.maxDailyEmails}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="apiKey"
                    name="apiKey"
                    type="password"
                    value={settings.apiKey}
                    onChange={handleChange}
                    className="flex-1"
                  />
                  <Button variant="outline" type="button" onClick={() => toast.info('New API key generated')}>
                    Regenerate
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">System Controls</h3>
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableNotifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send email notifications for system events</p>
                </div>
                <Switch
                  id="enableNotifications"
                  checked={settings.enableNotifications}
                  onCheckedChange={(checked) => handleSwitchChange('enableNotifications', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableAnalytics">Analytics Tracking</Label>
                  <p className="text-sm text-muted-foreground">Collect usage data for analytics</p>
                </div>
                <Switch
                  id="enableAnalytics"
                  checked={settings.enableAnalytics}
                  onCheckedChange={(checked) => handleSwitchChange('enableAnalytics', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Disable user access during maintenance</p>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleSwitchChange('maintenanceMode', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="debugMode">Debug Mode</Label>
                  <p className="text-sm text-muted-foreground">Enable detailed logs for troubleshooting</p>
                </div>
                <Switch
                  id="debugMode"
                  checked={settings.debugMode}
                  onCheckedChange={(checked) => handleSwitchChange('debugMode', checked)}
                />
              </div>
            </div>
          </div>
          
          <div className="pt-4 flex justify-end space-x-2">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit" className="bg-wilfred hover:bg-wilfred-accent">
              Save Settings
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
