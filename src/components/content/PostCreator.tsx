
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Image, Paperclip, Hash, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface PostCreatorProps {
  onSchedule: (post: any) => void;
  initialDate?: Date;
  initialContent?: string;
  initialPlatform?: string;
}

const suggestedHashtags = [
  'marketing', 'b2bmarketing', 'contentmarketing', 'digitalmarketing', 
  'socialmedia', 'business', 'entrepreneurship', 'startups', 
  'sales', 'technology', 'innovation', 'leadership'
];

const bestPostingTimes = [
  '08:30', '10:00', '12:00', '15:00', '17:00', '19:30'
];

const PostCreator = ({ onSchedule, initialDate, initialContent = '', initialPlatform = 'linkedin' }: PostCreatorProps) => {
  const { toast } = useToast();
  const [content, setContent] = useState(initialContent);
  const [platform, setPlatform] = useState(initialPlatform);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialDate || new Date());
  const [selectedTime, setSelectedTime] = useState('10:00');
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [contentLength, setContentLength] = useState(0);
  
  useEffect(() => {
    setContentLength(content.length);
  }, [content]);
  
  const handleAddHashtag = (hashtag: string) => {
    if (!selectedHashtags.includes(hashtag)) {
      setSelectedHashtags([...selectedHashtags, hashtag]);
      setContent(prevContent => `${prevContent} #${hashtag}`);
    }
  };
  
  const handleSchedulePost = () => {
    if (!content.trim()) {
      toast({
        title: "Content Required",
        description: "Please write some content for your post.",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedDate) {
      toast({
        title: "Date Required",
        description: "Please select a date for your post.",
        variant: "destructive",
      });
      return;
    }
    
    // Create a new date object with the selected date and time
    const [hours, minutes] = selectedTime.split(':').map(Number);
    const scheduledTime = new Date(selectedDate);
    scheduledTime.setHours(hours, minutes);
    
    const post = {
      id: Date.now().toString(),
      content,
      platform,
      scheduledTime: scheduledTime.toISOString(),
      hashtags: selectedHashtags,
      imageUrl: imageUrl || null,
      linkUrl: linkUrl || null,
    };
    
    onSchedule(post);
  };
  
  const getMaxLength = () => {
    switch (platform) {
      case 'linkedin': return 3000;
      case 'twitter': return 280;
      case 'facebook': return 5000;
      default: return 1000;
    }
  };
  
  const maxLength = getMaxLength();
  const isOverLimit = contentLength > maxLength;

  return (
    <div className="space-y-4">
      <div>
        <Select value={platform} onValueChange={setPlatform}>
          <SelectTrigger>
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="linkedin">LinkedIn</SelectItem>
            <SelectItem value="twitter">Twitter</SelectItem>
            <SelectItem value="facebook">Facebook</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Textarea
          placeholder={`Write your ${platform} post here...`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[150px]"
        />
        <div className={`text-xs mt-1 flex justify-between ${isOverLimit ? 'text-destructive' : 'text-muted-foreground'}`}>
          <span>
            {contentLength} / {maxLength} characters
          </span>
          {isOverLimit && <span>Character limit exceeded</span>}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Schedule Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal mt-1"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div>
          <label className="text-sm font-medium">Best Time to Post</label>
          <Select value={selectedTime} onValueChange={setSelectedTime}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {bestPostingTimes.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium">Add Image URL</label>
        <div className="flex mt-1">
          <Input 
            placeholder="https://example.com/image.jpg" 
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <Button variant="outline" className="ml-2">
            <Image className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium">Add Link</label>
        <div className="flex mt-1">
          <Input 
            placeholder="https://example.com" 
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          />
          <Button variant="outline" className="ml-2">
            <Paperclip className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium">Suggested Hashtags</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {suggestedHashtags.map((hashtag) => (
            <Button
              key={hashtag}
              variant="outline"
              size="sm"
              onClick={() => handleAddHashtag(hashtag)}
              className={selectedHashtags.includes(hashtag) ? 'bg-accent text-accent-foreground' : ''}
            >
              <Hash className="h-3 w-3 mr-1" />
              {hashtag}
            </Button>
          ))}
        </div>
      </div>
      
      <Button 
        onClick={handleSchedulePost} 
        disabled={!content.trim() || !selectedDate || isOverLimit}
        className="w-full"
      >
        {selectedDate ? 'Schedule Post' : 'Save to Library'}
      </Button>
    </div>
  );
};

export default PostCreator;
