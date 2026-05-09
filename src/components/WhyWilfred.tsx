import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const WhyWilfred = () => {
  const benefits = [
    {
      title: "One App to Rule Them All",
      description: "Stop switching between apps. Manage tasks, emails, calendar, and expenses from Telegram."
    },
    {
      title: "Voice & Text Support",
      description: "Send a quick voice note or type your request. Wilfred understands both instantly."
    },
    {
      title: "Instant Responses",
      description: "No waiting around. Wilfred processes your request and responds in seconds."
    },
    {
      title: "Always Available",
      description: "24/7 access to your personal assistant. Wilfred never sleeps, never takes breaks."
    },
    {
      title: "Secure & Private",
      description: "Your data stays yours. Secure connections to Gmail, Calendar, and Contacts."
    },
    {
      title: "Simple Setup",
      description: "Connect your accounts once and you're ready. No complex configuration needed."
    }
  ];

  return (
    <section className="section-padding bg-background" id="why-wilfred">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Why Choose Wilfred
          </h2>
          <p className="text-xl text-muted-foreground">
            Your personal assistant that actually gets things done
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyWilfred;
