import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const pricingTiers = [
    {
      name: "Personal",
      price: "$19",
      period: "/month",
      description: "Perfect for individuals",
      features: [
        "Unlimited Telegram messages",
        "Task management",
        "Google Calendar integration",
        "Gmail read & draft",
        "Basic expense tracking",
        "Email support"
      ],
      cta: "Get Started",
      highlighted: false
    },
    {
      name: "Pro",
      price: "$49",
      period: "/month",
      description: "For power users",
      features: [
        "Everything in Personal",
        "Voice message support",
        "Full Gmail access (send/receive)",
        "Google Contacts integration",
        "Advanced expense categories",
        "Priority support",
        "Custom reminders"
      ],
      cta: "Get Started",
      highlighted: true
    },
    {
      name: "Team",
      price: "Custom",
      period: "",
      description: "For teams & businesses",
      features: [
        "Everything in Pro",
        "Multiple team members",
        "Shared task lists",
        "Team expense tracking",
        "Admin dashboard",
        "Custom integrations",
        "Dedicated support",
        "SLA guarantee"
      ],
      cta: "Contact Us",
      highlighted: false
    }
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier) => (
            <Card 
              key={tier.name}
              className={`relative ${tier.highlighted ? 'border-accent border-2 shadow-lg scale-105' : 'border-2'}`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.period && <span className="text-muted-foreground">{tier.period}</span>}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${tier.highlighted ? 'bg-accent hover:bg-accent/90' : ''}`}
                  variant={tier.highlighted ? 'default' : 'outline'}
                  size="lg"
                  asChild
                >
                  <Link to="/call-to-action">{tier.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
