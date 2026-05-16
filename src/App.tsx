
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import CaseStudies from "./pages/CaseStudies";
import CallToAction from "./pages/CallToAction";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Solutions from "./pages/Solutions";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AdminPage from "./pages/AdminPage";
import ScraperDashboard from "./pages/ScraperDashboard";
import OutreachDashboard from "./pages/OutreachDashboard";
import ContentDashboard from "./pages/ContentDashboard";
import HeroAdmin from "./pages/HeroAdmin";
import NotFound from "./pages/NotFound";
import DownloadIcon from "./pages/DownloadIcon";
import RentalDashboard from "./pages/RentalDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/call-to-action" element={<CallToAction />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin-secure" element={<AdminPage />} />
          <Route path="/scraper" element={<ScraperDashboard />} />
          <Route path="/outreach" element={<OutreachDashboard />} />
          <Route path="/content" element={<ContentDashboard />} />
          <Route path="/hero-admin" element={<HeroAdmin />} />
          <Route path="/download-icon" element={<DownloadIcon />} />
          <Route path="/my-realtor" element={<RentalDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
