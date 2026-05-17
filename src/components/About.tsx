import React from 'react';

const About = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              The Smarter Alternative to Your Next Hire
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Most SMBs don't have a people problem. They have a capacity problem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
              <p>
                There's always more work than there are hands to do it — emails that go unanswered,
                follow-ups that slip, schedules that need managing, admin that piles up. The reflex
                is to hire. But a full-time employee costs $50,000–$80,000 a year before you factor
                in benefits, onboarding, and turnover.
              </p>
              <p>
                Wilfred is a deployable AI agent built specifically for this gap. He's not a chatbot
                or a productivity toy — he's a capable, configurable agent that handles real operational
                tasks across your business: scheduling, client communication, admin workflows, and more.
              </p>
              <p>
                Most clients are live within a week. The cost runs at roughly a third of what a
                part-time hire would run — with zero onboarding, no sick days, and no notice period
                if your needs change.
              </p>
            </div>

            <div className="bg-card border border-border/60 rounded-2xl p-8 space-y-6">
              <h3 className="text-xl font-semibold">Wilfred vs. a New Hire</h3>
              <div className="space-y-4">
                {[
                  { label: "Cost per year", wilfred: "~$6,000–$12,000", hire: "$55,000–$80,000+" },
                  { label: "Time to deploy", wilfred: "Under 1 week", hire: "4–8 weeks" },
                  { label: "Onboarding", wilfred: "None", hire: "30–90 days" },
                  { label: "Availability", wilfred: "24/7", hire: "Business hours" },
                  { label: "Scales with demand", wilfred: "Yes", hire: "Hire again" },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-3 gap-2 text-sm border-b border-border/40 pb-3 last:border-0 last:pb-0">
                    <span className="text-muted-foreground font-medium">{row.label}</span>
                    <span className="text-accent font-semibold">{row.wilfred}</span>
                    <span className="text-muted-foreground">{row.hire}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground/60 pt-1">
                <span></span>
                <span className="font-bold uppercase tracking-wide text-accent/70">Wilfred</span>
                <span className="font-bold uppercase tracking-wide">Traditional Hire</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
