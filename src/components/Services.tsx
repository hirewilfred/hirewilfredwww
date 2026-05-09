import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CheckSquare, Calendar, Mail, Users, DollarSign, Mic } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: CheckSquare,
      title: "Task Management",
      description: "Create, complete, or delete tasks with a simple message. Stay organized without opening another app."
    },
    {
      icon: Calendar,
      title: "Calendar Events",
      description: "Schedule, reschedule, or check availability. Wilfred manages your Google Calendar seamlessly."
    },
    {
      icon: Mail,
      title: "Email Integration",
      description: "Send, draft, or fetch emails through Gmail. Reply to messages without leaving Telegram."
    },
    {
      icon: Users,
      title: "Contacts Access",
      description: "Retrieve Google Contacts instantly. Find anyone's details when you need them."
    },
    {
      icon: DollarSign,
      title: "Expense Tracking",
      description: "Log and track expenses on the go. Just tell Wilfred what you spent and categorize it."
    },
    {
      icon: Mic,
      title: "Voice & Text",
      description: "Send text or voice messages. Wilfred understands both and responds in seconds."
    }
  ];

  return (
    <section className="section-padding bg-background" id="services">
      <div className="container-custom">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            What Wilfred Can Do
          </h2>
          <p className="text-xl text-muted-foreground">
            Your unified command center — all from Telegram
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="border-2 hover:border-accent transition-all duration-300 group hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <Icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
