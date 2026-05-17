
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, BookOpen, ShoppingBag, Rocket } from 'lucide-react';

const Audience = () => {
  const audiences = [
    {
      icon: <Wrench className="h-12 w-12 text-wilfred-accent mb-4" />,
      title: "Trades & Field Services",
      description: "HVAC, plumbing, electrical, landscaping — your techs are in the field, not at a desk. Wilfred handles scheduling, dispatch coordination, client follow-ups, and job confirmations so you don't need a full-time admin.",
      benefits: ["No more missed callbacks", "Scheduling handled automatically", "Runs while you're on-site"]
    },
    {
      icon: <BookOpen className="h-12 w-12 text-wilfred-accent mb-4" />,
      title: "Professional Services",
      description: "Law firms, accountants, consultants, and brokers all carry admin weight that doesn't bill. Wilfred takes on intake coordination, appointment booking, document follow-ups, and routine client communication — without adding overhead.",
      benefits: ["More billable hours recovered", "Client communication on autopilot", "No hiring, no onboarding"]
    },
    {
      icon: <ShoppingBag className="h-12 w-12 text-wilfred-accent mb-4" />,
      title: "Small Retailers & E-Commerce",
      description: "Between orders, suppliers, customer questions, and social, you're stretched thin. Wilfred covers order follow-up, customer service responses, inventory reminders, and vendor coordination — at a fraction of a part-time hire.",
      benefits: ["Customer response time drops", "Ops gaps closed without hiring", "Works across email and chat"]
    },
    {
      icon: <Rocket className="h-12 w-12 text-wilfred-accent mb-4" />,
      title: "Early-Stage Startups",
      description: "You need output, not payroll. Wilfred gives you the operational capacity of a small team without the burn rate — handling the tasks that eat founder time before you're ready to hire for them.",
      benefits: ["Extend runway, not headcount", "Deploy in days, not weeks", "Scales as you grow"]
    }
  ];

  return (
    <section id="audience" className="section-padding bg-muted/20">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Who It's For</h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            If you have work that needs doing and a hire you can't justify yet — Wilfred fills that gap.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {audiences.map((audience, index) => (
            <Card key={index} className="card-hover border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden relative">
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-wilfred-accent to-amber-400"></div>
              <CardHeader className="pb-2">
                {audience.icon}
                <CardTitle className="text-2xl">{audience.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">{audience.description}</p>
                <div className="space-y-2">
                  {audience.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center">
                      <span className="h-5 w-5 rounded-full bg-wilfred-accent/10 flex items-center justify-center mr-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-wilfred-accent"></span>
                      </span>
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Audience;
