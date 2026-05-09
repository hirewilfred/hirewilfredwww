
import React, { useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const DownloadIcon = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  const handleDownload = () => {
    if (!svgRef.current) return;
    
    const svg = svgRef.current;
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);
    
    // Create a canvas element to draw the SVG
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = 256;
    canvas.height = 256;
    
    // Create an image from the SVG string
    const img = new Image();
    img.onload = () => {
      if (!ctx) return;
      
      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0);
      
      // Convert canvas to data URL and trigger download
      try {
        // Convert to PNG
        const dataUrl = canvas.toDataURL('image/png');
        
        // Create download link
        const downloadLink = document.createElement('a');
        downloadLink.href = dataUrl;
        downloadLink.download = 'wilfred-favicon.png';
        
        // Trigger download
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        toast({
          title: "Success!",
          description: "Icon downloaded successfully.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to download icon. Please try again.",
          variant: "destructive",
        });
        console.error('Error downloading icon:', error);
      }
    };
    
    // Handle potential errors
    img.onerror = () => {
      toast({
        title: "Error",
        description: "Failed to generate icon. Please try again.",
        variant: "destructive",
      });
      console.error('Error loading SVG as image');
    };
    
    // Set the source of the image to the SVG string
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgStr)));
  };

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-6">Wilfred AI Icon</h1>
        <p className="text-muted-foreground mb-6">
          Preview and download the Wilfred AI favicon as a PNG file.
        </p>
        
        <div className="flex flex-col items-center justify-center mb-8 p-8 border border-border rounded-lg bg-muted/30">
          <svg 
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg" 
            width="256" 
            height="256" 
            viewBox="0 0 256 256"
            className="w-48 h-48 mb-6"
          >
            <rect width="256" height="256" rx="32" fill="#171717" />
            <text 
              x="128" 
              y="192" 
              fontFamily="Arial, sans-serif" 
              fontSize="192" 
              fontWeight="bold" 
              textAnchor="middle" 
              fill="#F9AA33"
            >
              W
            </text>
          </svg>
          
          <Button 
            onClick={handleDownload}
            className="bg-wilfred-accent hover:bg-wilfred hover:text-white text-wilfred font-medium"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Icon
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <p>
            <strong>Note:</strong> The downloaded icon will be a 256x256 PNG file 
            with the Wilfred AI logo. This can be used as a favicon or app icon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DownloadIcon;
