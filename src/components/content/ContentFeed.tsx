
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Plus, Star, MessageSquare, ArrowUp, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { mockTrendingContent } from '@/components/content/mockData';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  source: 'rss' | 'reddit' | 'hackernews';
  sourceName: string;
  url: string;
  publishDate: string;
  engagement: {
    upvotes?: number;
    comments?: number;
  };
  keywords: string[];
}

const ContentFeed = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [source, setSource] = useState<'all' | 'rss' | 'reddit' | 'hackernews'>('all');
  const [minUpvotes, setMinUpvotes] = useState(50);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [trendingContent, setTrendingContent] = useState<ContentItem[]>(mockTrendingContent);
  
  const filteredContent = trendingContent.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSource = source === 'all' || item.source === source;
    
    const meetsUpvoteThreshold = 
      item.engagement.upvotes === undefined || 
      item.engagement.upvotes >= minUpvotes;
    
    return matchesSearch && matchesSource && meetsUpvoteThreshold;
  });
  
  const refreshFeed = () => {
    setIsRefreshing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Feed Refreshed",
        description: "Your content feed has been updated with the latest trending topics.",
      });
    }, 1500);
  };
  
  const createDraftFromContent = (item: ContentItem) => {
    toast({
      title: "Draft Created",
      description: `A new post draft has been created from "${item.title}"`,
    });
  };

  const getSourceIcon = (source: string) => {
    switch(source) {
      case 'reddit': return '🔴';
      case 'hackernews': return '🟠';
      default: return '📰';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Content Feed</h2>
        <Button onClick={refreshFeed} disabled={isRefreshing}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh Feed'}
        </Button>
      </div>
      
      <Tabs defaultValue="trending">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trending">Trending Topics</TabsTrigger>
          <TabsTrigger value="rss">RSS Feeds</TabsTrigger>
          <TabsTrigger value="reddit">Reddit</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Filter Content</CardTitle>
              <CardDescription>Find trending topics by keyword, source, or engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Input
                  placeholder="Search by keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                
                <Select value={source} onValueChange={(value) => setSource(value as 'all' | 'rss' | 'reddit' | 'hackernews')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="rss">RSS Feeds</SelectItem>
                    <SelectItem value="reddit">Reddit</SelectItem>
                    <SelectItem value="hackernews">Hacker News</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Min. Upvotes: {minUpvotes}</span>
                  </div>
                  <Slider
                    min={0}
                    max={500}
                    step={10}
                    value={[minUpvotes]}
                    onValueChange={(value) => setMinUpvotes(value[0])}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredContent.length === 0 ? (
              <Card className="md:col-span-2 text-center py-12">
                <CardContent>
                  <p className="text-muted-foreground">No content found matching your filters.</p>
                </CardContent>
              </Card>
            ) : (
              filteredContent.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="mr-2 text-xl">{getSourceIcon(item.source)}</span>
                        <span className="text-sm text-muted-foreground">{item.sourceName}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(item.publishDate).toLocaleDateString()}
                      </span>
                    </div>
                    <CardTitle className="text-base mt-2">{item.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {item.keywords.map((keyword, index) => (
                        <span key={index} className="inline-flex text-xs bg-accent px-2 py-1 rounded-full">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <div className="flex items-center text-sm text-muted-foreground">
                      {item.engagement.upvotes !== undefined && (
                        <div className="flex items-center mr-4">
                          <ArrowUp className="h-4 w-4 mr-1" />
                          <span>{item.engagement.upvotes}</span>
                        </div>
                      )}
                      {item.engagement.comments !== undefined && (
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span>{item.engagement.comments}</span>
                        </div>
                      )}
                    </div>
                    <Button size="sm" onClick={() => createDraftFromContent(item)}>
                      <Plus className="h-4 w-4 mr-1" />
                      Create Draft
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="rss">
          <Card>
            <CardHeader>
              <CardTitle>RSS Feed Management</CardTitle>
              <CardDescription>Manage your RSS feed sources and content</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground mb-4">RSS feeds configuration coming soon.</p>
              <p className="text-sm">Here you'll be able to add, edit, and manage your RSS feed sources such as TechCrunch, Wired, and industry blogs.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reddit">
          <Card>
            <CardHeader>
              <CardTitle>Reddit Integration</CardTitle>
              <CardDescription>Connect and monitor relevant subreddits</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground mb-4">Reddit integration coming soon.</p>
              <p className="text-sm">Here you'll be able to connect to subreddits like r/Entrepreneur, r/technology, r/marketing and monitor trending posts.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentFeed;
