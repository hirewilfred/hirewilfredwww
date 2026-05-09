
// Mock data for the Content Dashboard

// Scheduled Posts for Calendar
export const mockScheduledPosts = [
  {
    id: '1',
    content: 'Excited to announce our latest case study: How we helped Company X increase their lead generation by 150% in just 3 months. #B2BMarketing #LeadGeneration',
    platform: 'linkedin',
    scheduledTime: '2024-05-15T10:00:00Z',
    hashtags: ['B2BMarketing', 'LeadGeneration']
  },
  {
    id: '2',
    content: 'Join us for our upcoming webinar on "The Future of B2B Marketing" next Tuesday at 2 PM ET. Register now at the link in bio! #Webinar #Marketing',
    platform: 'linkedin',
    scheduledTime: '2024-05-16T14:30:00Z',
    hashtags: ['Webinar', 'Marketing']
  },
  {
    id: '3',
    content: 'New blog post: 5 Strategies to Improve Your B2B Content Marketing in 2024. Check it out on our website! #ContentMarketing #B2B',
    platform: 'twitter',
    scheduledTime: '2024-05-17T09:00:00Z',
    hashtags: ['ContentMarketing', 'B2B']
  },
  {
    id: '4',
    content: "Meet our team! This week we're highlighting our amazing marketing department and the incredible work they do for our clients. #BehindTheScenes #TeamHighlight",
    platform: 'linkedin',
    scheduledTime: '2024-05-18T13:00:00Z',
    hashtags: ['BehindTheScenes', 'TeamHighlight']
  },
  {
    id: '5',
    content: 'Industry news: The latest trends in B2B marketing automation and how they can benefit your business. Read our analysis at the link below. #MarketingAutomation',
    platform: 'linkedin',
    scheduledTime: '2024-05-19T11:00:00Z',
    hashtags: ['MarketingAutomation']
  }
];

// Library Posts
export const mockLibraryPosts = [
  {
    id: '1',
    content: 'Excited to announce our latest case study: How we helped Company X increase their lead generation by 150% in just 3 months. #B2BMarketing #LeadGeneration',
    status: 'published' as const,
    category: 'client-wins' as const,
    platform: 'linkedin',
    createdAt: '2024-04-15T10:00:00Z',
    publishedAt: '2024-04-15T10:00:00Z',
    engagement: {
      likes: 125,
      comments: 32,
      clicks: 76,
      impressions: 3200
    }
  },
  {
    id: '2',
    content: 'Join us for our upcoming webinar on "The Future of B2B Marketing" next Tuesday at 2 PM ET. Register now at the link in bio! #Webinar #Marketing',
    status: 'draft' as const,
    category: 'product-updates' as const,
    platform: 'linkedin',
    createdAt: '2024-04-16T14:30:00Z'
  },
  {
    id: '3',
    content: 'New blog post: 5 Strategies to Improve Your B2B Content Marketing in 2024. Check it out on our website! #ContentMarketing #B2B',
    status: 'approved' as const,
    category: 'tips' as const,
    platform: 'twitter',
    createdAt: '2024-04-17T09:00:00Z'
  },
  {
    id: '4',
    content: "Meet our team! This week we're highlighting our amazing marketing department and the incredible work they do for our clients. #BehindTheScenes #TeamHighlight",
    status: 'published' as const,
    category: 'behind-the-scenes' as const,
    platform: 'linkedin',
    createdAt: '2024-04-18T13:00:00Z',
    publishedAt: '2024-04-18T13:00:00Z',
    engagement: {
      likes: 98,
      comments: 24,
      clicks: 43,
      impressions: 2800
    }
  },
  {
    id: '5',
    content: 'Industry news: The latest trends in B2B marketing automation and how they can benefit your business. Read our analysis at the link below. #MarketingAutomation',
    status: 'published' as const,
    category: 'industry-news' as const,
    platform: 'linkedin',
    createdAt: '2024-04-19T11:00:00Z',
    publishedAt: '2024-04-19T11:00:00Z',
    engagement: {
      likes: 112,
      comments: 18,
      clicks: 67,
      impressions: 2950
    }
  },
  {
    id: '6',
    content: 'How to optimize your LinkedIn profile for B2B lead generation - check out our latest guide with step-by-step instructions! #LinkedIn #LeadGeneration',
    status: 'draft' as const,
    category: 'tips' as const,
    platform: 'linkedin',
    createdAt: '2024-04-20T15:00:00Z'
  }
];

// Trending Content Items
export const mockTrendingContent = [
  {
    id: '1',
    title: 'The Future of B2B Marketing: AI and Automation Trends for 2024',
    description: 'Explore how AI and marketing automation are transforming B2B marketing strategies and what to expect in the coming year.',
    source: 'rss' as const,
    sourceName: 'Marketing Today',
    url: 'https://example.com/article1',
    publishDate: '2024-05-10T10:00:00Z',
    engagement: {},
    keywords: ['AI', 'Marketing Automation', 'B2B', '2024 Trends']
  },
  {
    id: '2',
    title: "What's working in B2B content marketing right now? Let's discuss.",
    description: 'A discussion thread about current effective strategies in B2B content marketing with insights from industry professionals.',
    source: 'reddit' as const,
    sourceName: 'r/marketing',
    url: 'https://example.com/article2',
    publishDate: '2024-05-09T14:30:00Z',
    engagement: {
      upvotes: 342,
      comments: 87
    },
    keywords: ['Content Marketing', 'B2B', 'Strategy', 'Discussion']
  },
  {
    id: '3',
    title: 'LinkedIn Analytics Study: Best Times to Post for B2B Companies',
    description: 'New research reveals optimal posting times for B2B companies on LinkedIn based on engagement data from over 5,000 businesses.',
    source: 'hackernews' as const,
    sourceName: 'Hacker News',
    url: 'https://example.com/article3',
    publishDate: '2024-05-08T09:00:00Z',
    engagement: {
      upvotes: 189,
      comments: 42
    },
    keywords: ['LinkedIn', 'Analytics', 'Posting Schedule', 'Engagement']
  },
  {
    id: '4',
    title: 'How We Generated 500 Qualified B2B Leads in 30 Days with Content Marketing',
    description: 'A detailed case study of a successful B2B lead generation campaign using content marketing strategies.',
    source: 'reddit' as const,
    sourceName: 'r/Entrepreneur',
    url: 'https://example.com/article4',
    publishDate: '2024-05-07T13:00:00Z',
    engagement: {
      upvotes: 456,
      comments: 112
    },
    keywords: ['Lead Generation', 'Case Study', 'Content Marketing', 'B2B']
  },
  {
    id: '5',
    title: 'The Role of Video in B2B Marketing Strategies for 2024',
    description: 'Exploring how video content is becoming increasingly important in B2B marketing and strategies for implementation.',
    source: 'rss' as const,
    sourceName: 'B2B Marketing Magazine',
    url: 'https://example.com/article5',
    publishDate: '2024-05-06T11:00:00Z',
    engagement: {},
    keywords: ['Video Marketing', 'B2B', 'Strategy', '2024 Trends']
  },
  {
    id: '6',
    title: 'Using Account-Based Marketing to Target Enterprise Clients',
    description: 'Strategic guide on implementing account-based marketing approaches to target and acquire large enterprise clients.',
    source: 'hackernews' as const,
    sourceName: 'Hacker News',
    url: 'https://example.com/article6',
    publishDate: '2024-05-05T16:00:00Z',
    engagement: {
      upvotes: 274,
      comments: 63
    },
    keywords: ['Account-Based Marketing', 'ABM', 'Enterprise', 'B2B Strategy']
  }
];

// Campaigns
export const mockCampaigns = [
  {
    id: '1',
    name: 'Q2 Product Launch',
    description: 'Campaign for our new software release in Q2 2024',
    platform: 'linkedin' as const,
    targetAudience: {
      industries: ['Technology', 'SaaS', 'IT'],
      personas: ['CTO', 'IT Director', 'Software Manager']
    },
    startDate: '2024-04-15',
    endDate: '2024-06-30',
    status: 'active' as const,
    postCount: 8
  },
  {
    id: '2',
    name: 'Industry Thought Leadership',
    description: 'Establishing our position as thought leaders in the industry',
    platform: 'linkedin' as const,
    targetAudience: {
      industries: ['Marketing', 'Advertising', 'Digital Media'],
      personas: ['CMO', 'Marketing Director', 'Brand Manager']
    },
    startDate: '2024-03-01',
    endDate: '2024-12-31',
    status: 'active' as const,
    postCount: 12
  },
  {
    id: '3',
    name: 'Summer Webinar Series',
    description: 'Promoting our summer webinar series on B2B marketing trends',
    platform: 'twitter' as const,
    targetAudience: {
      industries: ['Marketing', 'Consulting', 'Education'],
      personas: ['Marketing Manager', 'Content Creator', 'Strategist']
    },
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    status: 'draft' as const,
    postCount: 0
  },
  {
    id: '4',
    name: 'Client Success Stories',
    description: 'Highlighting our client success stories and case studies',
    platform: 'facebook' as const,
    targetAudience: {
      industries: ['Various'],
      personas: ['Decision Makers', 'Potential Clients']
    },
    startDate: '2024-02-15',
    endDate: '2024-04-30',
    status: 'completed' as const,
    postCount: 6
  },
  {
    id: '5',
    name: 'Trade Show Follow-up',
    description: 'Following up with contacts made at the spring trade show',
    platform: 'linkedin' as const,
    targetAudience: {
      industries: ['Manufacturing', 'Retail', 'Logistics'],
      personas: ['Operations Manager', 'Supply Chain Director', 'CEO']
    },
    startDate: '2024-05-15',
    endDate: '2024-06-15',
    status: 'paused' as const,
    postCount: 2
  }
];

// Performance Metrics
export const mockPerformanceData = [
  { date: '05/01', impressions: 2400, engagement: 240, clicks: 98 },
  { date: '05/02', impressions: 1398, engagement: 210, clicks: 87 },
  { date: '05/03', impressions: 3800, engagement: 350, clicks: 143 },
  { date: '05/04', impressions: 3908, engagement: 380, clicks: 152 },
  { date: '05/05', impressions: 4800, engagement: 460, clicks: 189 },
  { date: '05/06', impressions: 3800, engagement: 380, clicks: 143 },
  { date: '05/07', impressions: 4300, engagement: 430, clicks: 176 },
  { date: '05/08', impressions: 5000, engagement: 500, clicks: 198 },
  { date: '05/09', impressions: 4500, engagement: 430, clicks: 176 },
  { date: '05/10', impressions: 4200, engagement: 400, clicks: 165 },
  { date: '05/11', impressions: 4800, engagement: 460, clicks: 187 },
];

// Engagement by Content Type
export const mockEngagementByTypeData = [
  { type: 'Article', likes: 4000, comments: 2400, shares: 2400 },
  { type: 'Case Study', likes: 3000, comments: 1398, shares: 2210 },
  { type: 'Industry News', likes: 2000, comments: 9800, shares: 2290 },
  { type: 'Tips', likes: 2780, comments: 3908, shares: 2000 },
  { type: 'Behind the Scenes', likes: 1890, comments: 4800, shares: 2181 },
  { type: 'Product Updates', likes: 2390, comments: 3800, shares: 2500 },
];

// Platform Distribution
export const mockPlatformData = [
  { name: 'LinkedIn', value: 60 },
  { name: 'Twitter', value: 25 },
  { name: 'Facebook', value: 15 },
];
