
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Calendar as CalendarIcon, List, LayoutGrid } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import PostCreator from './PostCreator';
import { mockScheduledPosts } from '@/components/content/mockData';

const ContentCalendar = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<'calendar' | 'list' | 'grid'>('calendar');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [scheduledPosts, setScheduledPosts] = useState(mockScheduledPosts);
  
  // Get posts for selected date
  const postsForSelectedDate = date 
    ? scheduledPosts.filter(post => {
        const postDate = new Date(post.scheduledTime);
        return postDate.getDate() === date.getDate() && 
               postDate.getMonth() === date.getMonth() && 
               postDate.getFullYear() === date.getFullYear();
      })
    : [];

  const handlePostScheduled = (newPost) => {
    setScheduledPosts([...scheduledPosts, newPost]);
    setDialogOpen(false);
    toast({
      title: "Post Scheduled",
      description: `Your post has been scheduled for ${new Date(newPost.scheduledTime).toLocaleString()}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Content Calendar</h2>
        <div className="flex items-center gap-2">
          <div className="border rounded-md p-1">
            <Button 
              variant={view === 'calendar' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setView('calendar')}
            >
              <CalendarIcon className="h-4 w-4" />
            </Button>
            <Button 
              variant={view === 'list' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setView('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button 
              variant={view === 'grid' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setView('grid')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Schedule Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Schedule New Post</DialogTitle>
                <DialogDescription>
                  Create and schedule a new post for your social media campaign.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <PostCreator onSchedule={handlePostScheduled} initialDate={date} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
              <CardDescription>View and manage posts for specific dates</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>
                {date ? date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Select a date'}
              </CardTitle>
              <CardDescription>
                {postsForSelectedDate.length === 0 
                  ? "No posts scheduled for this date" 
                  : `${postsForSelectedDate.length} posts scheduled`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {view === 'calendar' && (
                <div className="space-y-4">
                  {postsForSelectedDate.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No posts scheduled for this date. Click "Schedule Post" to add content.
                    </div>
                  ) : (
                    postsForSelectedDate.map((post) => (
                      <div key={post.id} className="border rounded-lg p-4 hover:bg-accent transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium">{new Date(post.scheduledTime).toLocaleTimeString()}</p>
                          <div className="flex items-center gap-1">
                            <span className={`w-2 h-2 rounded-full ${post.platform === 'linkedin' ? 'bg-blue-500' : 'bg-green-500'}`}></span>
                            <span className="text-sm text-muted-foreground capitalize">{post.platform}</span>
                          </div>
                        </div>
                        <p className="text-sm line-clamp-2">{post.content}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
              {view === 'list' && (
                <div className="space-y-4">
                  {scheduledPosts.map((post) => (
                    <div key={post.id} className="border-b pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">{new Date(post.scheduledTime).toLocaleDateString()}</p>
                        <span className="text-sm text-muted-foreground capitalize">{post.platform}</span>
                      </div>
                      <p className="text-sm line-clamp-2">{post.content}</p>
                    </div>
                  ))}
                </div>
              )}
              {view === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {scheduledPosts.map((post) => (
                    <Card key={post.id}>
                      <CardHeader className="p-4">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{new Date(post.scheduledTime).toLocaleDateString()}</p>
                          <span className="text-sm text-muted-foreground capitalize">{post.platform}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm line-clamp-3">{post.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContentCalendar;
