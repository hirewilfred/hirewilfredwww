
import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyWilfred from '@/components/WhyWilfred';
import Process from '@/components/Process';
import Portfolio from '@/components/Portfolio';
import About from '@/components/About';
import Partners from '@/components/Partners';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import { FloatingConsultButton } from '@/components/ui/floating-consult-button';

const Index = () => {
  useEffect(() => {
    // Add structured data to the page for SEO
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    // Load schema from file
    fetch('/schema.json')
      .then(response => response.json())
      .then(data => {
        script.innerHTML = JSON.stringify(data);
        document.head.appendChild(script);
      })
      .catch(error => console.error('Error loading schema:', error));

    return () => {
      // Clean up
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      <Hero />
      <Services />
      <Portfolio />
      <Process />
      <WhyWilfred />
      <About />
      <Partners />
      <CTA />
      <Footer />
      <FloatingConsultButton
        buttonSize={200}
        imageSize={120}
        imageSrc="/wilfred_mascot.png"
        imageAlt="Wilfred"
        revolvingText="GET IN TOUCH - LET'S TALK - FREE CONSULT - "
        revolvingSpeed={8}
        popupHeading="Schedule a Call"
        popupDescription="Discuss your project with our team in a free 30-minute consultation."
        ctaButtonText="Book Now"
        ctaButtonAction={() => (window.location.href = '/call-to-action')}
      />
    </main>
  );
};

export default Index;
