
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Users, Briefcase, Rocket } from 'lucide-react';

const Audience = () => {
  const audiences = [
    {
      icon: <Rocket className="h-12 w-12 text-wilfred-accent mb-4" />,
      title: "Startups",
      description: "Reach more potential customers without expanding your team. Scale your outreach efforts efficiently as you grow.",
      benefits: ["Quick implementation", "Flexible scaling", "ROI-focused approach"]
    },
    {
      icon: <Users className="h-12 w-12 text-wilfred-accent mb-4" />,
      title: "Sales Teams",
      description: "Empower your sales team with AI tools that automate prospecting and personalize outreach at scale.",
      benefits: ["More qualified leads", "Higher conversion rates", "Data-driven insights"]
    },
    {
      icon: <Briefcase className="h-12 w-12 text-wilfred-accent mb-4" />,
      title: "Agencies",
      description: "Deliver better results for clients through intelligent outreach automation and detailed performance tracking.",
      benefits: ["Client reporting tools", "White-label options", "Multi-account management"]
    },
    {
      icon: <Building className="h-12 w-12 text-wilfred-accent mb-4" />,
      title: "Enterprises",
      description: "Enterprise-grade automation with the security, compliance, and scalability your organization demands.",
      benefits: ["Enterprise security", "Custom integrations", "Dedicated support"]
    }
  ];

  return (
    <section id="audience" className="section-padding bg-muted/20">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Who It's For</h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Our solutions are designed for organizations serious about scaling their outreach 
            and creating meaningful connections.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {audiences.map((audience, index) => (
            <Card key={index} className="card-hover border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
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
