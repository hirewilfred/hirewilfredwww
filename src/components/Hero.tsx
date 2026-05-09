import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-b from-background to-muted/30">
      <div className="container-custom relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <MessageCircle className="h-4 w-4" />
            Your AI Assistant on Telegram
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 tracking-tight">
            Meet Wilfred.{' '}
            <span className="bg-gradient-to-r from-accent to-orange-600 bg-clip-text text-transparent">
              Your Personal AI.
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-4 font-light">
            One message away from getting things done.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Tasks, emails, calendar, expenses — all managed through Telegram. 
            Just tell Wilfred what you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-white font-medium text-lg h-14 px-8" 
              asChild
            >
              <Link to="/call-to-action">
                Get Wilfred Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-foreground/20 hover:bg-foreground/5 font-medium text-lg h-14 px-8" asChild>
              <Link to="/case-studies">
                See How It Works
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Feature highlights */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {[
            { emoji: "✅", label: "Task Management" },
            { emoji: "📅", label: "Calendar Events" },
            { emoji: "📧", label: "Email & Gmail" },
            { emoji: "👥", label: "Contacts" },
            { emoji: "💵", label: "Expense Tracking" },
          ].map((item, index) => (
            <div 
              key={index}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border/50 hover:border-accent/50 transition-colors"
            >
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-sm font-medium text-center">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute -top-20 right-0 w-1/2 h-1/2 opacity-10 blur-3xl bg-gradient-to-br from-accent to-orange-400 rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 opacity-10 blur-3xl bg-gradient-to-tr from-accent to-orange-300 rounded-full" />
    </section>
  );
};

export default Hero;
