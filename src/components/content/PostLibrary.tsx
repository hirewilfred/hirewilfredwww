
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, RefreshCw, Calendar, Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from '@/components/ui/use-toast';
import PostCreator from './PostCreator';
import { mockLibraryPosts } from '@/components/content/mockData';

type PostStatus = 'draft' | 'approved' | 'published';
type PostCategory = 'tips' | 'client-wins' | 'behind-the-scenes' | 'industry-news' | 'product-updates';

interface Post {
  id: string;
  content: string;
  status: PostStatus;
  category: PostCategory;
  platform: string;
  createdAt: string;
  publishedAt?: string;
  engagement?: {
    likes: number;
    comments: number;
    clicks: number;
    impressions: number;
  }
}

const PostLibrary = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<PostStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<PostCategory | 'all'>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>(mockLibraryPosts);
  
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });
  
  const handlePostCreate = (newPost) => {
    const postWithId = {
      ...newPost,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'draft' as PostStatus,
    };
    
    setPosts([postWithId, ...posts]);
    setDialogOpen(false);
    toast({
      title: "Post Created",
      description: "Your post has been added to the library as a draft.",
    });
  };
  
  const handleReusePost = (post: Post) => {
    toast({
      title: "Post Selected for Reuse",
      description: "Edit and schedule this post now.",
    });
    // Additional logic for reusing the post would go here
  };

  const getStatusColor = (status: PostStatus) => {
    switch(status) {
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'published': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getCategoryColor = (category: PostCategory) => {
    switch(category) {
      case 'tips': return 'bg-purple-100 text-purple-800';
      case 'client-wins': return 'bg-green-100 text-green-800';
      case 'behind-the-scenes': return 'bg-blue-100 text-blue-800';
      case 'industry-news': return 'bg-orange-100 text-orange-800';
      case 'product-updates': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-2xl font-bold">Post Library</h2>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Post</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <PostCreator onSchedule={handlePostCreate} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Filter Posts</CardTitle>
          <CardDescription>Search and filter your content by status and category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as PostStatus | 'all')}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="draft">Drafts</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value as PostCategory | 'all')}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="tips">Tips</SelectItem>
                <SelectItem value="client-wins">Client Wins</SelectItem>
                <SelectItem value="behind-the-scenes">Behind The Scenes</SelectItem>
                <SelectItem value="industry-news">Industry News</SelectItem>
                <SelectItem value="product-updates">Product Updates</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground">No posts found matching your filters.</p>
            </CardContent>
          </Card>
        ) : (
          filteredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 p-6">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="outline" className={getStatusColor(post.status)}>
                      {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                    </Badge>
                    <Badge variant="outline" className={getCategoryColor(post.category)}>
                      {post.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </Badge>
                    <Badge variant="outline">{post.platform}</Badge>
                  </div>
                  <p className="line-clamp-3 mb-4">{post.content}</p>
                  <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-4">
                    <span>Created: {new Date(post.createdAt).toLocaleDateString()}</span>
                    {post.publishedAt && <span>Published: {new Date(post.publishedAt).toLocaleDateString()}</span>}
                    {post.engagement && (
                      <>
                        <span>Likes: {post.engagement.likes}</span>
                        <span>Comments: {post.engagement.comments}</span>
                        <span>Clicks: {post.engagement.clicks}</span>
                        <span>Impressions: {post.engagement.impressions}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex md:flex-col justify-end p-4 border-t md:border-t-0 md:border-l bg-muted/20">
                  <Button variant="ghost" size="sm" className="flex-1" onClick={() => handleReusePost(post)}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reuse
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default PostLibrary;
