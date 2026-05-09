import React from 'react';

const About = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            About Wilfred
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
            Wilfred isn't a person — he's your AI-powered personal assistant.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Built on OpenAI and integrated with your favorite tools, Wilfred lives inside Telegram 
            and handles the tasks you don't have time for. Whether you need to schedule a meeting, 
            draft an email, log an expense, or find a contact — just message Wilfred and it's done.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
