
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Linkedin, Search, Map } from 'lucide-react';

interface ScraperSearchSectionProps {
  onSearch: (niche: string, location: string, appointmentsOnly: boolean) => void;
  onMapsSearch: (businessType: string, area: string, checkAppointments: boolean) => void;
  loading: boolean;
}

const ScraperSearchSection: React.FC<ScraperSearchSectionProps> = ({ 
  onSearch, 
  onMapsSearch,
  loading 
}) => {
  const [niche, setNiche] = useState('');
  const [location, setLocation] = useState('');
  const [appointmentsOnly, setAppointmentsOnly] = useState(false);
  const [businessType, setBusinessType] = useState('');
  const [area, setArea] = useState('');
  const [checkAppointments, setCheckAppointments] = useState(false);
  const [replacementService, setReplacementService] = useState('');

  return (
    <div className="p-6">
      <Tabs defaultValue="linkedin" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="linkedin">LinkedIn Search</TabsTrigger>
          <TabsTrigger value="maps">Google Maps Search</TabsTrigger>
        </TabsList>

        <TabsContent value="linkedin" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="niche">Target Role/Job Title</Label>
              <Input 
                id="niche" 
                value={niche} 
                onChange={(e) => setNiche(e.target.value)}
                placeholder="IT Manager, CTO, etc."
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, State, or Remote"
              />
            </div>
            <div>
              <Label htmlFor="replacement-service">Your Replacement Service</Label>
              <Select value={replacementService} onValueChange={setReplacementService}>
                <SelectTrigger id="replacement-service">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="msp">Managed IT Services (MSP)</SelectItem>
                  <SelectItem value="fractional-cto">Fractional CTO</SelectItem>
                  <SelectItem value="outsourced-it">Outsourced IT Department</SelectItem>
                  <SelectItem value="cloud-migration">Cloud Migration Services</SelectItem>
                  <SelectItem value="security-services">Cybersecurity Services</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center mt-4 mb-6">
            <Checkbox 
              id="appointmentsOnly" 
              checked={appointmentsOnly}
              onCheckedChange={(checked) => setAppointmentsOnly(checked as boolean)}
            />
            <label 
              htmlFor="appointmentsOnly"
              className="text-sm font-medium ml-2 cursor-pointer"
            >
              Check for calendar appointments to avoid conflicts
            </label>
          </div>

          <Button 
            onClick={() => onSearch(niche, location, appointmentsOnly)}
            className="bg-[#0A66C2] hover:bg-[#084482] text-white"
            disabled={loading || !niche}
          >
            <Linkedin className="mr-2 h-4 w-4" />
            Search LinkedIn
          </Button>
        </TabsContent>

        <TabsContent value="maps" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="businessType">Business Type</Label>
              <Input 
                id="businessType" 
                value={businessType} 
                onChange={(e) => setBusinessType(e.target.value)}
                placeholder="IT Company, Marketing Agency, etc."
              />
            </div>
            <div>
              <Label htmlFor="area">Area/Location</Label>
              <Input 
                id="area" 
                value={area} 
                onChange={(e) => setArea(e.target.value)}
                placeholder="City or Zip Code"
              />
            </div>
          </div>

          <div className="flex items-center mt-4 mb-6">
            <Checkbox 
              id="checkAppointments" 
              checked={checkAppointments}
              onCheckedChange={(checked) => setCheckAppointments(checked as boolean)}
            />
            <label 
              htmlFor="checkAppointments"
              className="text-sm font-medium ml-2 cursor-pointer"
            >
              Check for calendar appointments to avoid conflicts
            </label>
          </div>

          <Button 
            onClick={() => onMapsSearch(businessType, area, checkAppointments)}
            className="bg-green-600 hover:bg-green-700 text-white"
            disabled={loading || !businessType || !area}
          >
            <Map className="mr-2 h-4 w-4" />
            Search Google Maps
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScraperSearchSection;
