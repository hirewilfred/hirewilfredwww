import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth, useProfile, auth } from '@/utils/auth';
import { useToast } from "@/components/ui/use-toast";
import { NavigationMenu, NavigationMenuItem, NavigationMenuContent, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, User, Settings, Plus, GraduationCap, ShieldCheck, Mail, LogIn, LayoutDashboard, Briefcase, FileText } from 'lucide-react';
import wilfredLogo from '@/assets/hirewilfred-logo.png';
const Navigation = () => {
  const {
    user
  } = useAuth();
  const {
    profile
  } = useProfile();
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      window.location.href = '/auth';
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message
      });
    }
  };
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Check if we're already on the dashboard page
  const isOnDashboard = location.pathname === '/dashboard';
  return <header className="bg-background py-4 border-b">
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={wilfredLogo} alt="Wilfred Logo" className="h-40" />
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px]">
                  <li>
                    <Link to="/#services" className="group flex h-9 w-full items-center justify-between rounded-md bg-accent px-3 text-sm font-medium hover:bg-secondary hover:text-secondary-foreground">
                      Task Management
                    </Link>
                  </li>
                  <li>
                    <Link to="/#services" className="group flex h-9 w-full items-center justify-between rounded-md bg-accent px-3 text-sm font-medium hover:bg-secondary hover:text-secondary-foreground">
                      Calendar Events
                    </Link>
                  </li>
                  <li>
                    <Link to="/#services" className="group flex h-9 w-full items-center justify-between rounded-md bg-accent px-3 text-sm font-medium hover:bg-secondary hover:text-secondary-foreground">
                      Email Integration
                    </Link>
                  </li>
                  <li>
                    <Link to="/#services" className="group flex h-9 w-full items-center justify-between rounded-md bg-accent px-3 text-sm font-medium hover:bg-secondary hover:text-secondary-foreground">
                      Contacts Access
                    </Link>
                  </li>
                  <li>
                    <Link to="/#services" className="group flex h-9 w-full items-center justify-between rounded-md bg-accent px-3 text-sm font-medium hover:bg-secondary hover:text-secondary-foreground">
                      Expense Tracking
                    </Link>
                  </li>
                  <li>
                    <Link to="/#services" className="group flex h-9 w-full items-center justify-between rounded-md bg-accent px-3 text-sm font-medium hover:bg-secondary hover:text-secondary-foreground">
                      Voice & Text
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/case-studies" className={navigationMenuTriggerStyle()}>
                Case Studies
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/about-us" className={navigationMenuTriggerStyle()}>
                About Us
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2 bg-background hover:bg-wilfred hover:text-white" onClick={() => handleNavigation('/dashboard')}>
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Button>
          
          <Button variant="ghost" size="sm" onClick={() => handleNavigation('/hero-admin')}>
            <Settings className="h-4 w-4 mr-2" />
            Hero Admin
          </Button>
        </div>
      </div>
    </header>;
};
export default Navigation;