import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Handshake, TrendingUp, Users, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Partners = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "A Solution for Gaps You Can't Staff",
      description: "When a client has a role that's too small to fill, too specialized to find, or too costly to justify — Wilfred is the answer. You close the conversation with a solution instead of a dead end."
    },
    {
      icon: Users,
      title: "Strengthen Client Relationships",
      description: "Recommending Wilfred positions you as a strategic advisor, not just a recruiter. Clients remember who brought them the solution that actually worked."
    },
    {
      icon: Handshake,
      title: "Referral Revenue, Zero Delivery Work",
      description: "We handle everything — onboarding, deployment, and ongoing support. You make the introduction and earn a referral fee on every client you bring in."
    }
  ];

  const partnerTypes = [
    {
      title: "HR Staffing Firms",
      description: "You see the capacity gaps before anyone else. When a client has a role that doesn't justify a full hire, Wilfred is the bridge. Refer them and we'll handle the rest."
    },
    {
      title: "HR Consulting Firms",
      description: "Your clients trust you to optimize how they operate. Adding Wilfred to your toolkit lets you deliver measurable cost savings alongside your advisory work."
    },
    {
      title: "Business Coaches & Advisors",
      description: "When your clients are stuck in the weeds, Wilfred frees them up. A simple referral turns into real ROI your clients can quantify — and attribute to you."
    },
    {
      title: "Bookkeepers & Accountants",
      description: "You already see where your clients are overspending on admin or falling behind on ops. Wilfred is a natural recommendation when the numbers don't support a hire."
    }
  ];

  return (
    <section id="partners" className="section-padding bg-background">
      <div className="container-custom">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-extrabold tracking-[0.14em] uppercase text-accent mb-4">
            Partner Program
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Built for the People Who See the Gaps First
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            HR firms, consultants, and advisors work with clients who have workforce challenges every day.
            Partner with Wilfred and give those clients a solution — while building a new revenue stream for your firm.
          </p>
        </div>

        {/* Why Partner */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="border-2 hover:border-accent transition-all duration-300 group hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <Icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Partner Types */}
        <div className="bg-muted/30 rounded-2xl p-8 md:p-12 mb-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">Who We Partner With</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {partnerTypes.map((type, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <span className="h-6 w-6 rounded-full bg-accent/15 flex items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-accent"></span>
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">{type.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{type.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">How the Partnership Works</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Apply to Partner", description: "Tell us about your firm and client base. We'll confirm fit and get you set up with a partner account and co-branded materials." },
              { step: "02", title: "Refer a Client", description: "When a client has a gap Wilfred can fill, make the introduction. We'll take it from there — discovery, scoping, and deployment." },
              { step: "03", title: "Earn Your Fee", description: "You receive a referral fee for every client you bring on. Recurring engagements mean recurring revenue with zero ongoing work on your end." }
            ].map((item, index) => (
              <div key={index} className="relative border border-border/50 rounded-xl p-6 overflow-hidden">
                <div className="absolute top-3 right-4 text-6xl font-bold text-muted/10">{item.step}</div>
                <div className="relative z-10">
                  <span className="text-xs font-extrabold tracking-widest uppercase text-accent mb-3 block">{item.step}</span>
                  <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partner CTA */}
        <div className="text-center bg-gradient-to-br from-accent/10 to-amber-400/10 border border-accent/20 rounded-2xl p-10 md:p-14">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Add Wilfred to Your Client Toolkit?
          </h3>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            We're building a focused network of partners who work with SMBs. Spots are limited to keep
            quality high — reach out to explore whether it's a fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white font-semibold h-12 px-8"
              asChild
            >
              <Link to="/call-to-action">
                Apply to Partner
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-accent/30 hover:bg-accent/5 font-semibold h-12 px-8"
              asChild
            >
              <Link to="/call-to-action">
                Book a Partner Call
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Partners;
