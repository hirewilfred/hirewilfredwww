
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarDays, Mail } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const CallToAction = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    goal: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Email submission logic
      const response = await fetch('https://formsubmit.co/ajax/vgreco@hirewilfred.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          goal: formData.goal,
          _subject: "New Strategy Call Request from " + formData.name
        })
      });
      
      if (response.ok) {
        toast({
          title: "Success!",
          description: "Your request has been submitted. We'll be in touch soon!",
          duration: 5000,
        });
        setFormData({ name: '', email: '', company: '', goal: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
              Ready to <span className="text-gradient">Transform Your Outreach?</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Schedule a free strategy call with our team to discuss how Wilfred can help automate 
              and scale your outreach efforts.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <div className="mr-3 text-wilfred-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <span>No commitment required</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-3 text-wilfred-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <span>Custom strategy for your business</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-3 text-wilfred-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <span>ROI projection based on your goals</span>
                </li>
              </ul>
              <div className="flex items-center">
                <CalendarDays className="text-wilfred-accent h-10 w-10 mr-4" />
                <div>
                  <h4 className="text-xl font-bold">30-Minute Strategy Call</h4>
                  <p className="text-gray-500">Zoom call with our solution experts</p>
                </div>
              </div>
            </div>

            <div>
              <Card className="bg-white shadow-xl overflow-hidden">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Book Your Strategy Call</h3>
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <Input 
                        id="name" 
                        type="text" 
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name" 
                        className="border-gray-300"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Work Email
                      </label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@company.com" 
                        className="border-gray-300"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-2">
                        Company
                      </label>
                      <Input 
                        id="company" 
                        type="text" 
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company name" 
                        className="border-gray-300"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="goal" className="block text-sm font-medium mb-2">
                        Primary Goal
                      </label>
                      <select 
                        id="goal" 
                        value={formData.goal}
                        onChange={handleChange}
                        className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md"
                        required
                      >
                        <option value="" disabled>Select your primary goal</option>
                        <option value="increase_leads">Increase qualified leads</option>
                        <option value="improve_conversion">Improve conversion rates</option>
                        <option value="automate_workflow">Automate existing workflow</option>
                        <option value="scale_outreach">Scale outreach efforts</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <Button 
                      type="submit"
                      className="w-full bg-wilfred-accent text-wilfred hover:bg-wilfred hover:text-white font-medium text-lg h-12"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                          Submitting...
                        </span>
                      ) : (
                        <>
                          Book My Strategy Call
                          <Mail className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-center text-gray-500 mt-4">
                      By submitting this form, you agree to our privacy policy and terms of service.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
};

export default CallToAction;
