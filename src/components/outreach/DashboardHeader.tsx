import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { DownloadIcon, BarChartIcon, MoreHorizontal, FileText, File, FileSpreadsheet, Mail, Calendar, Printer } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
interface DashboardHeaderProps {
  title: string;
}
const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title
}) => {
  const navigate = useNavigate();
  const handleGenerateReport = () => {
    console.log("Generate Report");
  };
  return <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <h1 className="text-4xl font-bold">{title}</h1>
      
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <DownloadIcon className="mr-2 h-4 w-4" />
              Export Data
              <MoreHorizontal className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Export Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log("Export to CSV")}>
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              <span>Export to CSV</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Export to Excel")}>
              <FileSpreadsheet className="mr-2 h-4 w-4 text-green-600" />
              <span>Export to Excel</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Export to PDF")}>
              <File className="mr-2 h-4 w-4 text-red-600" />
              <span>Export to PDF</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log("Print Report")}>
              <Printer className="mr-2 h-4 w-4" />
              <span>Print Report</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Email Report")}>
              <Mail className="mr-2 h-4 w-4" />
              <span>Email Report</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Schedule Report")}>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Schedule Report</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="default" onClick={handleGenerateReport} className="bg-wilfred-accent text-wilfred-DEFAULT">
          <BarChartIcon className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>
    </div>;
};
export default DashboardHeader;