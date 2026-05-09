import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Cpu, Zap } from 'lucide-react';

const Process = () => {
  const steps = [
    {
      icon: MessageCircle,
      number: "01",
      title: "Message Wilfred on Telegram",
      description: "Send a text or voice message with your request. 'Schedule a meeting tomorrow at 3pm' or 'Log $50 expense for lunch.'"
    },
    {
      icon: Cpu,
      number: "02",
      title: "Wilfred Processes Your Request",
      description: "Using OpenAI, Wilfred understands your intent and connects to Gmail, Calendar, Contacts, or your task list."
    },
    {
      icon: Zap,
      number: "03",
      title: "Task Completed Instantly",
      description: "Get confirmation right in Telegram. Your meeting is scheduled, email sent, or expense logged — done."
    }
  ];

  return (
    <section className="section-padding bg-muted/30" id="process">
      <div className="container-custom">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground">
            From request to done in seconds
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="border-2 relative overflow-hidden group hover:border-accent transition-all duration-300 hover:shadow-lg">
                <div className="absolute top-0 right-0 text-8xl font-bold text-muted/10 group-hover:text-accent/10 transition-colors">
                  {step.number}
                </div>
                <CardContent className="pt-6 relative z-10">
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <Icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
