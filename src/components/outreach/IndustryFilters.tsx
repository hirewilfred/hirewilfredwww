
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target, Filter } from 'lucide-react';

interface IndustryFiltersProps {
  industryOptions: string[];
  targetIndustry1: string;
  targetIndustry2: string;
  targetIndustry3: string;
  setTargetIndustry1: React.Dispatch<React.SetStateAction<string>>;
  setTargetIndustry2: React.Dispatch<React.SetStateAction<string>>;
  setTargetIndustry3: React.Dispatch<React.SetStateAction<string>>;
}

const IndustryFilters: React.FC<IndustryFiltersProps> = ({
  industryOptions,
  targetIndustry1,
  targetIndustry2,
  targetIndustry3,
  setTargetIndustry1,
  setTargetIndustry2,
  setTargetIndustry3
}) => {
  // Filter out already selected industries
  const getAvailableOptions = (currentSelection: string) => {
    const selections = [targetIndustry1, targetIndustry2, targetIndustry3];
    return industryOptions.filter(industry => 
      industry === currentSelection || !selections.includes(industry)
    );
  };

  return (
    <Card className="mb-8">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Filter className="h-5 w-5 text-blue-600" />
          Industry Prioritization Filters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium flex items-center mb-2">
              <Target className="h-4 w-4 mr-2 text-red-500" />
              Target Industry 1
            </label>
            <Select value={targetIndustry1} onValueChange={setTargetIndustry1}>
              <SelectTrigger className={targetIndustry1 ? "border-red-200 bg-red-50" : ""}>
                <SelectValue placeholder="Select Primary Industry" />
              </SelectTrigger>
              <SelectContent>
                {getAvailableOptions(targetIndustry1).map(industry => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium flex items-center mb-2">
              <Target className="h-4 w-4 mr-2 text-amber-500" />
              Target Industry 2
            </label>
            <Select value={targetIndustry2} onValueChange={setTargetIndustry2}>
              <SelectTrigger className={targetIndustry2 ? "border-amber-200 bg-amber-50" : ""}>
                <SelectValue placeholder="Select Secondary Industry" />
              </SelectTrigger>
              <SelectContent>
                {getAvailableOptions(targetIndustry2).map(industry => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium flex items-center mb-2">
              <Target className="h-4 w-4 mr-2 text-green-500" />
              Target Industry 3
            </label>
            <Select value={targetIndustry3} onValueChange={setTargetIndustry3}>
              <SelectTrigger className={targetIndustry3 ? "border-green-200 bg-green-50" : ""}>
                <SelectValue placeholder="Select Tertiary Industry" />
              </SelectTrigger>
              <SelectContent>
                {getAvailableOptions(targetIndustry3).map(industry => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndustryFilters;
