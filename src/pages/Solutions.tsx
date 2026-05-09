import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Mail, Layers, LineChart, Settings, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import IntegrationLogo from '@/components/solutions/IntegrationLogo';

// Import integration logos
import salesforceLogo from "../assets/integration-logos/crm/salesforce.svg";
import hubspotLogo from "../assets/integration-logos/crm/hubspot.svg";
import pipedriveLogo from "../assets/integration-logos/crm/pipedrive.svg";
import gmailLogo from "../assets/integration-logos/email/gmail.svg";
import outlookLogo from "../assets/integration-logos/email/outlook.svg";
import mailchimpLogo from "../assets/integration-logos/email/mailchimp.svg";
import slackLogo from "../assets/integration-logos/communication/slack.svg";
import linkedinLogo from "../assets/integration-logos/social/linkedin.svg";
import facebookLogo from "../assets/integration-logos/social/facebook.svg";
import instagramLogo from "../assets/integration-logos/social/instagram.svg";
import googleWorkspaceLogo from "../assets/integration-logos/productivity/google-workspace.svg";
import microsoft365Logo from "../assets/integration-logos/productivity/microsoft-365.svg";
import trelloLogo from "../assets/integration-logos/productivity/trello.svg";

const Solutions = () => {
  const solutions = [
    {
      id: 'email-automation',
      icon: <Mail className="h-12 w-12 text-wilfred-accent" />,
      title: "AI-Powered Email Automation",
      description: "Our intelligent email automation platform learns from interaction data to craft personalized, engaging messages at scale, ensuring maximum engagement with your audience.",
      features: [
        "Smart personalization tailored to individual recipients",
        "Automated A/B testing to optimize open and click rates",
        "Intelligent scheduling based on recipient behavior patterns",
        "Performance analytics and continuous improvement insights",
      ],
      cta: "Optimize your email outreach",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      integrationLogos: [
        {
          src: gmailLogo,
          alt: "Gmail",
          filename: "gmail-integration.svg"
        },
        {
          src: outlookLogo,
          alt: "Outlook",
          filename: "outlook-integration.svg"
        },
        {
          src: mailchimpLogo,
          alt: "Mailchimp",
          filename: "mailchimp-integration.svg"
        }
      ]
    },
    {
      id: 'crm-integration',
      icon: <Layers className="h-12 w-12 text-wilfred-accent" />,
      title: "CRM Integration",
      description: "Seamlessly connect Wilfred with your existing CRM tools to enhance your workflow, synchronize data across platforms, and create unified customer profiles.",
      features: [
        "Native integrations with leading CRM platforms",
        "Custom API connections for specialized needs",
        "Bi-directional data synchronization",
        "Automated workflow triggers and actions",
      ],
      cta: "Streamline your customer relationships",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      integrationLogos: [
        {
          src: salesforceLogo,
          alt: "Salesforce",
          filename: "salesforce-integration.svg"
        },
        {
          src: hubspotLogo,
          alt: "HubSpot",
          filename: "hubspot-integration.svg"
        },
        {
          src: pipedriveLogo,
          alt: "Pipedrive",
          filename: "pipedrive-integration.svg"
        }
      ]
    },
    {
      id: 'lead-generation',
      icon: <LineChart className="h-12 w-12 text-wilfred-accent" />,
      title: "Lead Generation at Scale",
      description: "Our AI analyzes patterns and behaviors to identify and engage high-value prospects with targeted messaging, significantly improving conversion rates.",
      features: [
        "Intelligent target audience identification",
        "Multi-channel engagement tracking",
        "Lead scoring and qualification automation",
        "Conversion path optimization",
      ],
      cta: "Accelerate your lead generation",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      integrationLogos: [
        {
          src: linkedinLogo,
          alt: "LinkedIn",
          filename: "linkedin-integration.svg"
        },
        {
          src: facebookLogo,
          alt: "Facebook",
          filename: "facebook-integration.svg"
        },
        {
          src: instagramLogo,
          alt: "Instagram",
          filename: "instagram-integration.svg"
        }
      ]
    },
    {
      id: 'custom-solutions',
      icon: <Settings className="h-12 w-12 text-wilfred-accent" />,
      title: "Custom Solutions",
      description: "We develop tailored AI solutions designed specifically for your business needs, ensuring you get exactly the right tools for your unique challenges.",
      features: [
        "Customized AI development for specific business challenges",
        "Integration with your existing technology stack",
        "Scalable architecture that grows with your business",
        "Ongoing support and optimization",
      ],
      cta: "Build your custom solution",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      integrationLogos: [
        {
          src: googleWorkspaceLogo,
          alt: "Google Workspace",
          filename: "google-workspace-integration.svg"
        },
        {
          src: microsoft365Logo,
          alt: "Microsoft 365",
          filename: "microsoft-365-integration.svg"
        },
        {
          src: slackLogo,
          alt: "Slack",
          filename: "slack-integration.svg"
        }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-16 bg-background">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Solutions</h1>
            <p className="text-lg text-muted-foreground">
              Wilfred helps businesses maximize their outreach and growth through intelligent, 
              AI-powered automation solutions designed for modern business needs.
            </p>
          </div>
          
          <div className="space-y-24 mb-16">
            {solutions.map((solution, index) => (
              <div 
                key={solution.id} 
                id={solution.id}
                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center`}
              >
                <div className="lg:w-1/2">
                  <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8 flex items-center justify-center h-72 overflow-hidden">
                    {solution.image ? (
                      <img
                        src={solution.image}
                        alt={solution.title}
                        className="object-cover w-full h-full rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center">
                        {solution.icon}
                        <h3 className="text-xl font-semibold mt-4 text-center">{solution.title}</h3>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="lg:w-1/2">
                  <h2 className="text-3xl font-bold mb-4">{solution.title}</h2>
                  <p className="text-lg text-muted-foreground mb-6">{solution.description}</p>
                  
                  <div className="mb-8">
                    <h4 className="font-semibold mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {solution.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <div className="h-2 w-2 rounded-full bg-wilfred-accent mt-2 mr-2"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {solution.integrationLogos && (
                    <div className="mb-8">
                      <h4 className="font-semibold mb-3">Compatible With:</h4>
                      <div className="flex flex-wrap gap-4">
                        {solution.integrationLogos.map((logo, i) => (
                          <IntegrationLogo
                            key={i}
                            src={logo.src}
                            alt={logo.alt}
                            filename={logo.filename}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <Button asChild className="bg-wilfred hover:bg-wilfred-accent text-white transition-colors">
                    <Link to="/call-to-action" className="flex items-center">
                      {solution.cta}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-wilfred/5">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Enhance Your Outreach?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Discover how Wilfred can transform your business communication and lead generation with our AI-powered solutions.
            </p>
            <Button asChild size="lg" className="bg-wilfred hover:bg-wilfred-accent text-white transition-colors">
              <Link to="/call-to-action" className="flex items-center">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
};

export default Solutions;
