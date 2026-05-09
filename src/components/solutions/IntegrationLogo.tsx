
import React from 'react';
import { Download, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface IntegrationLogoProps {
  src: string;
  alt: string;
  filename: string;
}

const IntegrationLogo: React.FC<IntegrationLogoProps> = ({ src, alt, filename }) => {
  const { toast } = useToast();

  // Function to download SVG logo
  const downloadLogo = () => {
    try {
      // Create a link and trigger download
      const link = document.createElement('a');
      link.href = src;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      
      toast({
        title: "Logo downloaded",
        description: `${alt} logo has been downloaded successfully.`,
        duration: 3000
      });
    } catch (error) {
      console.error('Error downloading logo:', error);
      toast({
        title: "Download failed",
        description: "Unable to download the logo. Please try again.",
        variant: "destructive",
        duration: 3000
      });
    }
  };

  // Function to save logo to localStorage
  const saveLogo = () => {
    try {
      const savedLogos = JSON.parse(localStorage.getItem('savedLogos') || '{}');
      savedLogos[alt] = src;
      localStorage.setItem('savedLogos', JSON.stringify(savedLogos));
      
      toast({
        title: "Logo saved",
        description: `${alt} logo has been saved to your local storage.`,
        duration: 3000
      });
    } catch (error) {
      console.error('Error saving logo:', error);
      toast({
        title: "Error",
        description: "Failed to save the logo locally.",
        variant: "destructive",
        duration: 3000
      });
    }
  };

  return (
    <div className="bg-white rounded-lg p-2 shadow-sm w-16 h-16 flex flex-col hover:shadow-md transition-all">
      <div className="flex-1 flex items-center justify-center">
        <img 
          src={src} 
          alt={alt}
          className="max-h-full max-w-full"
        />
      </div>
      <div className="flex justify-center mt-1 gap-1">
        <button 
          onClick={downloadLogo}
          className="text-gray-500 hover:text-wilfred-accent transition-colors p-1"
          title={`Download ${alt} logo`}
        >
          <Download className="h-3 w-3" />
        </button>
        <button 
          onClick={saveLogo}
          className="text-gray-500 hover:text-wilfred-accent transition-colors p-1"
          title={`Save ${alt} logo locally`}
        >
          <Save className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export default IntegrationLogo;
