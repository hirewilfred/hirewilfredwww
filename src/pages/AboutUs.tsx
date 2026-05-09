
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const AboutUs = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container-custom pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">About Us</h1>
          
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="md:w-1/2">
              <img 
                src="/lovable-uploads/774382fe-1359-4c9b-9529-0429e86d19f3.png" 
                alt="Wilfred Team" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <p className="text-sm text-muted-foreground mt-2 text-center italic">The Wilfred AI consulting team</p>
            </div>
            
            <div className="md:w-1/2 flex flex-col justify-center">
              <p className="text-lg mb-6">
                Wilfred is an innovative AI consulting agency focused on transforming the way businesses operate through intelligent workflow automation. We specialize in helping organizations maximize their outreach, streamline operations, and unlock growth with cutting-edge, AI-powered solutions.
              </p>
              
              <p className="text-lg">
                At Wilfred, we believe the future belongs to businesses that work smarter—not harder. That's why we build tailored automation strategies that eliminate repetitive tasks, optimize internal processes, and free up your team to focus on what truly matters: delivering value and scaling with purpose.
              </p>
            </div>
          </div>
          
          <div className="prose lg:prose-xl max-w-none">
            <p className="text-lg mb-12">
              Whether you're looking to integrate AI into your daily workflows, automate customer interactions, or analyze data more intelligently, Wilfred is always watching over you—guiding your journey into the future of work.
            </p>
            
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg mb-12">
              To empower businesses of all sizes with seamless, smart, and scalable AI automation that drives efficiency, innovation, and measurable results.
            </p>
            
            <h2 className="text-3xl font-bold mb-6">What We Do</h2>
            <ul className="space-y-4 list-disc pl-6 text-lg">
              <li>Workflow Automation Consulting</li>
              <li>AI Integration & Deployment</li>
              <li>Business Process Optimization</li>
              <li>Custom AI Solutions for Growth & Outreach</li>
            </ul>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
};

export default AboutUs;
