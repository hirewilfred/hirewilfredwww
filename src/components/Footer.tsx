
import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin } from 'lucide-react';
import wilfredLogo from '@/assets/hirewilfred-logo.png';

const Footer = () => {
  return (
    <footer className="bg-background pt-16 pb-8">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <img 
              src={wilfredLogo} 
              alt="Wilfred Logo" 
              className="h-32 mb-6" 
            />
            <p className="text-muted-foreground mb-4">
              Authentic, human-style content using AI. No creators required.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/company/hire-wilfred" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-wilfred-accent"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-wilfred-accent">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/#services" className="text-muted-foreground hover:text-wilfred-accent">UGC Agency</Link></li>
              <li><Link to="/#services" className="text-muted-foreground hover:text-wilfred-accent">E-Commerce Marketing</Link></li>
              <li><Link to="/#services" className="text-muted-foreground hover:text-wilfred-accent">Social Recruiting</Link></li>
              <li><Link to="/#services" className="text-muted-foreground hover:text-wilfred-accent">Content Creation</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Advertising</h3>
            <ul className="space-y-2">
              <li><Link to="/#services" className="text-muted-foreground hover:text-wilfred-accent">Facebook Ads</Link></li>
              <li><Link to="/#services" className="text-muted-foreground hover:text-wilfred-accent">Instagram Ads</Link></li>
              <li><Link to="/#services" className="text-muted-foreground hover:text-wilfred-accent">TikTok Ads</Link></li>
              <li><Link to="/#services" className="text-muted-foreground hover:text-wilfred-accent">TikTok Shop</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/case-studies" className="text-muted-foreground hover:text-wilfred-accent">Case Studies</Link></li>
              <li><Link to="/about-us" className="text-muted-foreground hover:text-wilfred-accent">About Us</Link></li>
              <li><Link to="/privacy-policy" className="text-muted-foreground hover:text-wilfred-accent">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-wilfred-accent mr-2 mt-0.5" />
                <span className="text-muted-foreground">hello@hirewilfred.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-wilfred-accent mr-2 mt-0.5" />
                <span className="text-muted-foreground">519-223-0558</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-wilfred-accent mr-2 mt-0.5" />
                <span className="text-muted-foreground">Toronto, Ontario<br />Canada</span>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8 bg-border/50" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} Hire Wilfred. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
