
import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CheckCircle, Sparkles } from 'lucide-react';

// Import the SVG files directly to ensure they're properly bundled
import salesforceLogo from "../assets/integration-logos/crm/salesforce.svg";
import hubspotLogo from "../assets/integration-logos/crm/hubspot.svg";
import pipedriveLogo from "../assets/integration-logos/crm/pipedrive.svg";
import gmailLogo from "../assets/integration-logos/email/gmail.svg";
import outlookLogo from "../assets/integration-logos/email/outlook.svg";
import mailchimpLogo from "../assets/integration-logos/email/mailchimp.svg";
import slackLogo from "../assets/integration-logos/communication/slack.svg";
import teamsLogo from "../assets/integration-logos/communication/teams.svg";
import zoomLogo from "../assets/integration-logos/communication/zoom.svg";
import discordLogo from "../assets/integration-logos/communication/discord.svg";
import linkedinLogo from "../assets/integration-logos/social/linkedin.svg";
import twitterLogo from "../assets/integration-logos/social/twitter.svg";
import instagramLogo from "../assets/integration-logos/social/instagram.svg";
import facebookLogo from "../assets/integration-logos/social/facebook.svg";
import googleWorkspaceLogo from "../assets/integration-logos/productivity/google-workspace.svg";
import microsoft365Logo from "../assets/integration-logos/productivity/microsoft-365.svg";
import trelloLogo from "../assets/integration-logos/productivity/trello.svg";

// Integration logos organized by category with direct imports
const integrationLogos = {
  crm: [
    { name: "Salesforce", logo: salesforceLogo, alt: "Salesforce logo" },
    { name: "HubSpot", logo: hubspotLogo, alt: "HubSpot logo" },
    { name: "Pipedrive", logo: pipedriveLogo, alt: "Pipedrive logo" },
  ],
  email: [
    { name: "Gmail", logo: gmailLogo, alt: "Gmail logo" },
    { name: "Outlook", logo: outlookLogo, alt: "Outlook logo" },
    { name: "Mailchimp", logo: mailchimpLogo, alt: "Mailchimp logo" },
  ],
  communication: [
    { name: "Slack", logo: slackLogo, alt: "Slack logo" },
    { name: "Microsoft Teams", logo: teamsLogo, alt: "Microsoft Teams logo" },
    { name: "Zoom", logo: zoomLogo, alt: "Zoom logo" },
    { name: "Discord", logo: discordLogo, alt: "Discord logo" },
  ],
  social: [
    { name: "LinkedIn", logo: linkedinLogo, alt: "LinkedIn logo" },
    { name: "Twitter", logo: twitterLogo, alt: "Twitter logo" },
    { name: "Instagram", logo: instagramLogo, alt: "Instagram logo" },
    { name: "Facebook", logo: facebookLogo, alt: "Facebook logo" },
  ],
  productivity: [
    { name: "Google Workspace", logo: googleWorkspaceLogo, alt: "Google Workspace logo" },
    { name: "Microsoft 365", logo: microsoft365Logo, alt: "Microsoft 365 logo" },
    { name: "Trello", logo: trelloLogo, alt: "Trello logo" },
  ]
};

// Generate a pseudo-random delay for staggered animations
const getRandomDelay = (index: number) => {
  return (index % 5) * 0.1 + Math.random() * 0.3;
};

// Animated integration icon
const IntegrationIcon = ({ name, logo, alt, index }: { name: string; logo: string; alt: string; index: number }) => {
  // Generate a pseudo-random background color based on name
  const colorIndex = name.charCodeAt(0) % 5;
  const colors = [
    'bg-blue-100 text-blue-600 border-blue-200', 
    'bg-green-100 text-green-600 border-green-200', 
    'bg-purple-100 text-purple-600 border-purple-200',
    'bg-amber-100 text-amber-600 border-amber-200',
    'bg-rose-100 text-rose-600 border-rose-200'
  ];
  
  const delay = getRandomDelay(index);
  const [imgError, setImgError] = useState<boolean>(false);
  
  return (
    <div 
      className={`w-16 h-16 rounded-lg flex items-center justify-center ${logo && !imgError ? 'bg-white' : colors[colorIndex]} shadow-sm border relative overflow-hidden
                  hover:scale-110 transition-all duration-300 hover:shadow-md animate-float`}
      style={{ animationDelay: `${delay}s` }}
    >
      {logo && !imgError ? (
        <img 
          src={logo} 
          alt={alt || name} 
          className="max-w-[80%] max-h-[80%] object-contain relative z-10"
          onError={() => setImgError(true)}
        />
      ) : (
        // Fallback to initials if no logo is provided or if there's an error
        <span className="font-bold text-lg relative z-10">
          {name.split(' ').map(word => word[0]).join('').toUpperCase()}
        </span>
      )}
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

const Integrations = () => {
  // Flatten all logos into a single array for display
  const allLogos = Object.values(integrationLogos).flat();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set visible after component mounts for entrance animation
    setIsVisible(true);
    
    // Function to handle scroll events
    const handleScroll = () => {
      const element = document.getElementById('integrations-section');
      if (element) {
        const rect = element.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom >= 0;
        setIsVisible(isInView);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check in case section is already in view
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <section id="integrations-section" className="section-padding bg-muted/30 overflow-hidden">
      <div className="container-custom text-center">
        <div className={`max-w-3xl mx-auto mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6 text-wilfred-accent animate-pulse" />
            <span>400+ Integrations</span>
            <Sparkles className="h-6 w-6 text-wilfred-accent animate-pulse" />
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Wilfred seamlessly connects with all your favorite tools and platforms
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {["CRM Systems", "Email Platforms", "Social Media", "Productivity Tools"].map((category, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-2 px-4 py-2 bg-background rounded-full shadow-sm hover:shadow-md transition-all duration-300 
                hover:scale-105 hover:bg-wilfred-accent/10"
                style={{ transitionDelay: `${idx * 0.1}s` }}
              >
                <CheckCircle className="h-5 w-5 text-wilfred-accent" />
                <span className="font-medium">{category}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className={`relative py-12 px-4 bg-gradient-to-b from-background to-muted/20 rounded-xl overflow-hidden mb-12
                       transition-all duration-700 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '0.3s' }}>
          {/* Animated background decorations */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-wilfred-accent/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-wilfred-accent/5 rounded-full blur-3xl animate-pulse" 
               style={{ animationDuration: '8s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-blue-400/5 rounded-full blur-xl animate-float"
               style={{ animationDuration: '7s' }}></div>
          <div className="absolute bottom-1/4 right-1/3 w-32 h-32 bg-amber-400/5 rounded-full blur-xl animate-float"
               style={{ animationDuration: '9s' }}></div>
          
          <div className="relative z-10 overflow-visible">
            {/* Rotating Carousel */}
            <Carousel
              opts={{
                align: "center",
                loop: true,
                dragFree: true,
              }}
              autoplay={true}
              autoplayInterval={2000}
              className="w-full"
            >
              <CarouselContent className="py-4">
                {allLogos.map((integration, index) => (
                  <CarouselItem key={index} className="md:basis-1/4 lg:basis-1/6 flex justify-center"
                                style={{ transitionDelay: `${getRandomDelay(index)}s` }}>
                    <div className="flex flex-col items-center gap-2 p-3 group cursor-pointer">
                      <IntegrationIcon 
                        name={integration.name} 
                        logo={integration.logo} 
                        alt={integration.alt} 
                        index={index} 
                      />
                      <span className="text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        {integration.name}
                      </span>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
        
        <p className="text-muted-foreground mt-6">And hundreds more integrations available!</p>
      </div>
    </section>
  );
};

export default Integrations;
