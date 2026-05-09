import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ArrowRight, Briefcase, Users, Rocket, CheckSquare, Calendar, Mail, DollarSign, Clock, Zap } from 'lucide-react';

const CaseStudies = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container-custom py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Use Cases</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">How People Use Wilfred</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Real examples of how professionals save hours every week with their AI assistant on Telegram.
          </p>
        </div>

        <div className="grid gap-12 md:gap-16">
          {/* Busy Professional Use Case */}
          <section id="professional" className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-block mb-4">
                <div className="bg-accent/10 p-2 rounded-lg">
                  <Briefcase className="h-6 w-6 text-accent" />
                </div>
              </div>
              <h2 className="text-2xl md:text-4xl font-bold mb-4">Use Case #1: The Busy Executive</h2>
              <p className="text-lg font-semibold mb-2">Profile: Marketing Director at a Tech Company</p>
              <p className="text-muted-foreground mb-4">Challenge: Juggling 50+ emails, 10 meetings, and countless tasks daily</p>
              
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-2">How Sarah Uses Wilfred:</h3>
                <p className="text-muted-foreground mb-4">
                  Sarah messages Wilfred during her commute: "What's on my calendar today?" and "Draft a reply to Mike's project update — tell him we're on track for Friday." By the time she reaches the office, her responses are ready for review.
                </p>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Results After 30 Days</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li className="text-muted-foreground"><span className="font-bold text-foreground">2 hours saved daily:</span> No more switching between apps to check schedules and draft emails.</li>
                    <li className="text-muted-foreground"><span className="font-bold text-foreground">Zero missed meetings:</span> Wilfred sends reminders and reschedules conflicts automatically.</li>
                    <li className="text-muted-foreground"><span className="font-bold text-foreground">Inbox Zero:</span> Quick voice messages to Wilfred handle routine responses in seconds.</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <p className="font-semibold text-accent">
                    "Wilfred is like having a personal executive assistant in my pocket — available 24/7."
                  </p>
                </CardFooter>
              </Card>
            </div>
            <div className="order-1 md:order-2 bg-gradient-to-br from-accent/10 to-orange-500/5 rounded-xl p-6">
              <div className="relative shadow-xl rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Professional woman working on laptop in modern office" 
                  className="object-cover w-full h-full rounded-lg" 
                />
              </div>
            </div>
          </section>

          {/* Freelancer Use Case */}
          <section id="freelancer" className="grid md:grid-cols-2 gap-8 items-center">
            <div className="md:order-2">
              <div className="inline-block mb-4">
                <div className="bg-accent/10 p-2 rounded-lg">
                  <Rocket className="h-6 w-6 text-accent" />
                </div>
              </div>
              <h2 className="text-2xl md:text-4xl font-bold mb-4">Use Case #2: The Freelance Designer</h2>
              <p className="text-lg font-semibold mb-2">Profile: Independent Graphic Designer</p>
              <p className="text-muted-foreground mb-4">Challenge: Managing multiple clients, tracking billable hours, and staying organized solo</p>
              
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-2">How Marcus Uses Wilfred:</h3>
                <p className="text-muted-foreground mb-4">
                  Marcus logs expenses on the go: "Add $45 for Adobe subscription to business expenses." He schedules client calls with a quick message: "Set up a call with Lisa tomorrow at 2pm." His entire business runs through Telegram.
                </p>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Results After 30 Days</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li className="text-muted-foreground"><span className="font-bold text-foreground">All expenses tracked:</span> No more lost receipts or forgotten deductions at tax time.</li>
                    <li className="text-muted-foreground"><span className="font-bold text-foreground">Client satisfaction up:</span> Faster response times and never missing a deadline.</li>
                    <li className="text-muted-foreground"><span className="font-bold text-foreground">$500+ saved monthly:</span> No need for expensive project management software subscriptions.</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <p className="font-semibold text-accent">
                    "I used to lose track of expenses constantly. Now I just tell Wilfred and it's done."
                  </p>
                </CardFooter>
              </Card>
            </div>
            <div className="md:order-1 bg-gradient-to-br from-accent/10 to-orange-500/5 rounded-xl p-6">
              <div className="relative shadow-xl rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Creative freelancer working from home studio" 
                  className="object-cover w-full h-full rounded-lg" 
                />
              </div>
            </div>
          </section>

          {/* Team Leader Use Case */}
          <section id="team-leader" className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-block mb-4">
                <div className="bg-accent/10 p-2 rounded-lg">
                  <Users className="h-6 w-6 text-accent" />
                </div>
              </div>
              <h2 className="text-2xl md:text-4xl font-bold mb-4">Use Case #3: The Small Business Owner</h2>
              <p className="text-lg font-semibold mb-2">Profile: Owner of a 10-Person Agency</p>
              <p className="text-muted-foreground mb-4">Challenge: Coordinating team schedules, client communications, and keeping overhead low</p>
              
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-2">How Jennifer Uses Wilfred:</h3>
                <p className="text-muted-foreground mb-4">
                  Jennifer coordinates her team while on the move: "Find Tom's phone number" when she needs to call her developer. "Create task: Review Q4 proposals by Friday" to keep projects moving. One app, total control.
                </p>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Results After 30 Days</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li className="text-muted-foreground"><span className="font-bold text-foreground">Team productivity up 30%:</span> Clear task assignments and deadline tracking.</li>
                    <li className="text-muted-foreground"><span className="font-bold text-foreground">No more context switching:</span> Everything managed from Telegram instead of 5 different apps.</li>
                    <li className="text-muted-foreground"><span className="font-bold text-foreground">Better work-life balance:</span> Quick voice commands handle work tasks without opening a laptop.</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <p className="font-semibold text-accent">
                    "Wilfred replaced my to-do app, expense tracker, and half my email time. Game changer."
                  </p>
                </CardFooter>
              </Card>
            </div>
            <div className="order-1 md:order-2 bg-gradient-to-br from-accent/10 to-orange-500/5 rounded-xl p-6">
              <div className="relative shadow-xl rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Business owner reviewing work on tablet" 
                  className="object-cover w-full h-full rounded-lg" 
                />
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-12">Why Wilfred Works for Everyone</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2 hover:border-accent transition-all">
                <CardHeader>
                  <div className="mb-2">
                    <Clock className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle>Always Available</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Wilfred responds in seconds, 24/7. No waiting for office hours or human availability. Just message and get it done.</p>
                </CardContent>
              </Card>
              <Card className="border-2 hover:border-accent transition-all">
                <CardHeader>
                  <div className="mb-2">
                    <Zap className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle>Zero Learning Curve</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">If you can send a text message, you can use Wilfred. Natural language commands mean no training required.</p>
                </CardContent>
              </Card>
              <Card className="border-2 hover:border-accent transition-all">
                <CardHeader>
                  <div className="mb-2">
                    <DollarSign className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle>Consolidate Your Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Replace expensive subscriptions to task managers, expense trackers, and calendar apps. One assistant does it all.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <div className="text-center mt-8">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-medium" asChild>
              <Link to="/call-to-action">
                Try Wilfred Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default CaseStudies;
