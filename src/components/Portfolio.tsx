import React from 'react';
import { Card } from "@/components/ui/card";
import { CheckSquare, Calendar, Mail, DollarSign, MessageCircle, Search } from 'lucide-react';

const Portfolio = () => {
  const useCases = [
    {
      icon: Calendar,
      title: '"Schedule a meeting with John tomorrow at 3pm"',
      category: "Calendar",
      result: "Meeting created and invite sent"
    },
    {
      icon: Mail,
      title: '"Draft a reply to Steve\'s project proposal"',
      category: "Email",
      result: "Draft ready for your review"
    },
    {
      icon: CheckSquare,
      title: '"Add task: Review Q4 budget by Friday"',
      category: "Tasks",
      result: "Task added with due date"
    },
    {
      icon: DollarSign,
      title: '"Log $85 expense for team lunch"',
      category: "Expenses",
      result: "Expense logged and categorized"
    },
    {
      icon: Search,
      title: '"Find Sarah\'s phone number"',
      category: "Contacts",
      result: "Contact details retrieved"
    },
    {
      icon: MessageCircle,
      title: '"What\'s on my calendar today?"',
      category: "Availability",
      result: "Today's schedule summarized"
    }
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            See Wilfred in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real examples of what you can ask Wilfred to do
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {useCases.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card 
                key={index}
                className="group relative overflow-hidden border-2 hover:border-accent transition-all duration-300 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-accent font-medium mb-2">{item.category}</p>
                    <p className="font-medium text-foreground mb-3 italic">{item.title}</p>
                    <p className="text-sm text-muted-foreground">→ {item.result}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
