import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-foreground to-foreground/90 text-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Get Things Done?
          </h2>
          <p className="text-xl md:text-2xl mb-10 opacity-90">
            Start messaging Wilfred today and take back your time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-white font-medium text-lg h-14 px-8"
              asChild
            >
              <Link to="/call-to-action">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-background/30 bg-background/10 hover:bg-background/20 text-background font-medium text-lg h-14 px-8"
              asChild
            >
              <Link to="/call-to-action">
                <MessageCircle className="mr-2 h-5 w-5" />
                Book a Demo
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
