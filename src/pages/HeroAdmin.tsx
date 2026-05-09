import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, BarChart3, Eye, MousePointer } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

import heroUgcAi from '@/assets/hero-ugc-ai.jpg';
import heroTechOffice from '@/assets/hero-tech-office.jpg';
import heroFoodOutdoor from '@/assets/hero-food-outdoor.jpg';
import heroFashionStudio from '@/assets/hero-fashion-studio.jpg';
import heroFitnessGym from '@/assets/hero-fitness-gym.jpg';
import heroLifestyleHome from '@/assets/hero-lifestyle-home.jpg';
import heroUgcGrid from '@/assets/hero-ugc-grid.jpg';

interface HeroImageConfig {
  id: string;
  name: string;
  src: string;
  alt: string;
  enabled: boolean;
  priority: number;
  views: number;
  clicks: number;
}

const defaultHeroImages: HeroImageConfig[] = [
  {
    id: 'ugc-ai',
    name: 'UGC AI Beauty',
    src: heroUgcAi,
    alt: "Professional UGC creator showcasing beauty product with authentic content style",
    enabled: true,
    priority: 1,
    views: 0,
    clicks: 0
  },
  {
    id: 'tech-office',
    name: 'Tech Office',
    src: heroTechOffice,
    alt: "UGC creator reviewing tech gadgets in modern home office with natural lighting",
    enabled: true,
    priority: 1,
    views: 0,
    clicks: 0
  },
  {
    id: 'food-outdoor',
    name: 'Food Outdoor',
    src: heroFoodOutdoor,
    alt: "Content creator showcasing food delivery app review at outdoor coffee shop",
    enabled: true,
    priority: 1,
    views: 0,
    clicks: 0
  },
  {
    id: 'fashion-studio',
    name: 'Fashion Studio',
    src: heroFashionStudio,
    alt: "UGC creator presenting sustainable fashion and eco-friendly products in studio",
    enabled: true,
    priority: 1,
    views: 0,
    clicks: 0
  },
  {
    id: 'fitness-gym',
    name: 'Fitness Gym',
    src: heroFitnessGym,
    alt: "Fitness content creator demonstrating workout supplements and gear in home gym",
    enabled: true,
    priority: 1,
    views: 0,
    clicks: 0
  },
  {
    id: 'lifestyle-home',
    name: 'Lifestyle Home',
    src: heroLifestyleHome,
    alt: "Lifestyle creator reviewing home decor products in cozy living room setup",
    enabled: true,
    priority: 1,
    views: 0,
    clicks: 0
  },
  {
    id: 'ugc-grid',
    name: 'UGC Grid Layout',
    src: heroUgcGrid,
    alt: "Multi-panel showcase of authentic UGC content creation with beauty serum product and diverse creators",
    enabled: true,
    priority: 1,
    views: 0,
    clicks: 0
  }
];

const HeroAdmin = () => {
  const [heroConfigs, setHeroConfigs] = useState<HeroImageConfig[]>(defaultHeroImages);
  const { toast } = useToast();

  useEffect(() => {
    // Load saved configurations from localStorage
    const saved = localStorage.getItem('heroImageConfigs');
    if (saved) {
      try {
        setHeroConfigs(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading hero configs:', error);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('heroImageConfigs', JSON.stringify(heroConfigs));
    toast({
      title: "Settings saved",
      description: "Hero image preferences have been updated.",
    });
  };

  const handleToggle = (id: string) => {
    setHeroConfigs(configs =>
      configs.map(config =>
        config.id === id ? { ...config, enabled: !config.enabled } : config
      )
    );
  };

  const handlePriorityChange = (id: string, priority: number[]) => {
    setHeroConfigs(configs =>
      configs.map(config =>
        config.id === id ? { ...config, priority: priority[0] } : config
      )
    );
  };

  const calculateCTR = (clicks: number, views: number) => {
    if (views === 0) return 0;
    return ((clicks / views) * 100).toFixed(2);
  };

  const enabledCount = heroConfigs.filter(c => c.enabled).length;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="container-custom py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Hero Image Manager</h1>
              <p className="text-sm text-muted-foreground">
                Configure which hero images appear on your homepage
              </p>
            </div>
          </div>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </header>

      <main className="container-custom py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {enabledCount} of {heroConfigs.length} Active
            </Badge>
          </div>
        </div>

        <div className="grid gap-6">
          {heroConfigs.map((config) => (
            <Card key={config.id} className={!config.enabled ? 'opacity-60' : ''}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {config.name}
                      {config.enabled && (
                        <Badge variant="default">Active</Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="mt-1">{config.alt}</CardDescription>
                  </div>
                  <Switch
                    checked={config.enabled}
                    onCheckedChange={() => handleToggle(config.id)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <img
                      src={config.src}
                      alt={config.alt}
                      className="w-full h-auto rounded-lg border shadow-sm"
                    />
                  </div>
                  
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium">Priority Weight</label>
                        <span className="text-sm text-muted-foreground">{config.priority}x</span>
                      </div>
                      <Slider
                        value={[config.priority]}
                        onValueChange={(value) => handlePriorityChange(config.id, value)}
                        min={1}
                        max={5}
                        step={1}
                        disabled={!config.enabled}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Higher priority = more likely to be shown
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Eye className="h-4 w-4" />
                            <span className="text-sm">Views</span>
                          </div>
                          <p className="text-2xl font-bold">{config.views.toLocaleString()}</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <MousePointer className="h-4 w-4" />
                            <span className="text-sm">Clicks</span>
                          </div>
                          <p className="text-2xl font-bold">{config.clicks.toLocaleString()}</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <BarChart3 className="h-4 w-4" />
                            <span className="text-sm">CTR</span>
                          </div>
                          <p className="text-2xl font-bold">{calculateCTR(config.clicks, config.views)}%</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HeroAdmin;
