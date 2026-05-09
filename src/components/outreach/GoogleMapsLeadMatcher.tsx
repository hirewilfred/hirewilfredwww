
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Mail, Linkedin, Calendar, CircleX, Check, CheckCircle, Filter, MapPinned, ArrowRightLeft, Sparkles } from 'lucide-react';

interface Lead {
  id: number;
  name: string;
  industry: string;
  location: {
    lat: number;
    lng: number;
  };
  hasAppointment: boolean;
}

interface GoogleMapsLeadMatcherProps {
  industryOptions: string[];
  mockLeads: Lead[];
}

const GoogleMapsLeadMatcher: React.FC<GoogleMapsLeadMatcherProps> = ({
  industryOptions,
  mockLeads
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [radius, setRadius] = useState<string>("5");
  const [showAppointmentsOnly, setShowAppointmentsOnly] = useState<boolean>(false);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>(mockLeads);
  
  const handleSearch = () => {
    let filtered = [...mockLeads];
    
    if (selectedIndustry) {
      filtered = filtered.filter(lead => lead.industry === selectedIndustry);
    }
    
    if (showAppointmentsOnly) {
      filtered = filtered.filter(lead => lead.hasAppointment);
    }
    
    // In a real app, we would filter based on location and radius too
    // For now, we'll just update the filtered leads
    setFilteredLeads(filtered);
    console.log("Searching for leads:", { industry: selectedIndustry, location, radius, showAppointmentsOnly });
  };
  
  const handleReset = () => {
    setSelectedIndustry("");
    setLocation("");
    setRadius("5");
    setShowAppointmentsOnly(false);
    setFilteredLeads(mockLeads);
  };
  
  const handleMatchAppointments = () => {
    // In a real app, this would run a matching algorithm
    console.log("Matching appointments with nearby leads");
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPinned className="h-5 w-5 text-green-600" />
          Google Maps Lead Matcher
        </CardTitle>
        <CardDescription>
          Find and match leads from Google Maps with your appointment schedule
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="industry" className="text-sm font-medium mb-1 block">Target Industry</label>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent>
                  {industryOptions.map(industry => (
                    <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="location" className="text-sm font-medium mb-1 block">Location</label>
              <Input 
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, zip code, or address" 
              />
            </div>
            
            <div className="w-[100px]">
              <label htmlFor="radius" className="text-sm font-medium mb-1 block">Radius (mi)</label>
              <Input 
                id="radius"
                type="number" 
                min="1"
                max="50"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
              />
            </div>
            
            <div className="flex items-end">
              <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700">
                <MapPin className="h-4 w-4 mr-2" />
                Find Leads
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowAppointmentsOnly(!showAppointmentsOnly)}
              className={showAppointmentsOnly ? "bg-blue-50 text-blue-700 border-blue-200" : ""}
            >
              {showAppointmentsOnly ? <CheckCircle className="h-4 w-4 mr-1" /> : <Filter className="h-4 w-4 mr-1" />}
              {showAppointmentsOnly ? "Showing Appointments" : "Show Appointments Only"}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleMatchAppointments}
            >
              <ArrowRightLeft className="h-4 w-4 mr-1" />
              Match With Appointments
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleReset}
            >
              <CircleX className="h-4 w-4 mr-1" />
              Reset Filters
            </Button>
          </div>
          
          <div className="border rounded-md h-[300px] bg-slate-100 flex items-center justify-center relative overflow-hidden">
            <div className="text-center text-slate-500 z-10">
              <MapPin className="h-12 w-12 mx-auto mb-2" />
              <p>Google Maps integration would be displayed here</p>
              <p className="text-xs">Map shows nearby businesses based on selected niche and location</p>
            </div>
            {/* This would be replaced with a real map integration */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=New+York,NY&zoom=13&size=600x400&key=YOUR_API_KEY')]"></div>
          </div>
        </div>
        
        <div className="border rounded-md overflow-hidden">
          <div className="bg-muted px-4 py-2 flex items-center justify-between">
            <h3 className="font-medium">Found Leads ({filteredLeads.length})</h3>
            <Button size="sm" variant="outline" className="text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              Auto Assign
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="px-4 py-3 text-left font-medium">Business Name</th>
                  <th className="px-4 py-3 text-left font-medium">Industry</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map(lead => (
                  <tr key={lead.id} className="border-b hover:bg-muted/50">
                    <td className="px-4 py-3">
                      <div className="font-medium">{lead.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {`${lead.location.lat.toFixed(3)}, ${lead.location.lng.toFixed(3)}`}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                        {lead.industry}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {lead.hasAppointment ? (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-green-500 mr-1" />
                          <span>Appointment Booked</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <CircleX className="h-4 w-4 text-amber-500 mr-1" />
                          <span>No Appointment</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost" title="Send email">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" title="Connect on LinkedIn">
                          <Linkedin className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" title="Schedule appointment">
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredLeads.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              <CircleX className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No leads found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoogleMapsLeadMatcher;
