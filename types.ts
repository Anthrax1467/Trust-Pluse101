
export interface CategorizedPulse {
  quality: number;
  durability: number;
  value: number;
  utility: number;
}

export interface NutritionalFacts {
  calories?: string;
  macros?: { label: string; value: string }[];
  healthBenefits: string[];
  healthWarnings: string[];
}

export interface Recipe {
  title: string;
  servings?: string;
  ingredients: string[];
  steps: string[];
}

export interface ProductInsight {
  name: string;
  category: string;
  isConsumable: boolean;
  description: string;
  priceComparison: PricePoint[];
  productTiers?: ProductTier[];
  budgetAlternatives?: BudgetAlternative[];
  sentiment: SentimentStats;
  categorizedPulse?: CategorizedPulse;
  nutritionalFacts?: NutritionalFacts;
  recipes?: Recipe[];
  pairings?: string[];
  redditComments: SocialComment[];
  googleReviews: SocialComment[];
  topRelevantReviews: SocialComment[];
  topPositiveReviews: SocialComment[];
  topNegativeReviews: SocialComment[];
  influencerReviews: InfluencerReview[];
  similarProducts: SimilarProduct[];
  specifications?: ProductSpec[];
  events?: PulseEvent[];
  videoReviews: string[];
  brandScore: number;
  totalVerifiedReviews?: number; // New field
  lastPriceRefresh?: string;
}

export interface BrandInsight {
  brandName: string;
  logoUrl?: string;
  industry: string;
  description: string;
  email?: string;
  mission?: string;
  marketTrustScore: number;
  productCatalog: {
    name: string;
    category: string;
    priceRange: string;
    imageUrl: string;
    trustPulse: number;
  }[];
  services: {
    name: string;
    description: string;
    priceRange: string;
  }[];
  events?: PulseEvent[];
  influencerPulse: {
    name: string;
    handle: string;
    quote: string;
    score: number;
  }[];
  webMentions: SocialComment[];
}

export interface PulseEvent {
  id: string;
  title: string;
  date: string;
  platform: 'YouTube' | 'Zoom' | 'Twitch' | 'Official' | 'Recorded';
  link: string;
  description: string;
  status: 'live' | 'upcoming' | 'on-demand';
  recommendationReason: string;
}

export interface ProductSpec {
  label: string;
  value: string;
  category?: string;
}

export interface SimilarProduct {
  name: string;
  imageUrl: string;
  priceEstimate?: string;
  details?: string;
  styleCategory: 'Luxury' | 'Comfort' | 'Aesthetics' | 'Casual';
}

export interface BudgetAlternative {
  store: string;
  name: string;
  price: string;
  link: string;
  imageUrl?: string;
}

export interface ProductTier {
  tier: 'High-End' | 'Mid-Range' | 'Budget';
  name: string;
  price: string;
  reason: string;
  link: string;
  store: string;
  image: string;
}

export interface PricePoint {
  store: string;
  price: string;
  link: string;
  availability: boolean;
  previousPrice?: string;
  lastUpdated?: string;
}

export interface SentimentHistoryPoint {
  date: string;
  positive: number;
  neutral: number;
  negative: number;
  netScore?: number;
}

export interface SentimentStats {
  positive: number;
  neutral: number;
  negative: number;
  averageRating: number;
  totalReviewsAnalyzed: number; // New field
  history: SentimentHistoryPoint[];
}

export interface SocialComment {
  id?: string;
  user: string;
  text: string;
  score: number;
  detailedRating?: CategorizedPulse;
  date: string;
  source: 'reddit' | 'google' | 'trustpulse' | 'internet' | 'youtube' | 'website' | 'yelp' | 'ubereats' | 'tripadvisor' | 'amazon' | 'ebay' | 'pinterest';
  sourceUrl?: string;
  isVerified?: boolean;
  isBuyer?: boolean;
  isCollaboration?: boolean;
  videoUrl?: string;
  keywords?: { word: string; sentiment: 'positive' | 'negative' }[];
  replies?: SocialComment[];
}

export interface InfluencerProfile {
  id: string;
  name: string;
  handle: string;
  email?: string;
  avatar: string;
  category: string;
  trustScore: number;
  totalReviews: number;
  collaborations: number;
  followers: number;
  isVerified: boolean;
  alignmentScore?: number;
  topReviews?: SocialComment[];
  recentBlogs?: BlogPost[];
}

export interface CreatorProduct {
  id: string;
  name: string;
  price: string;
  category: string;
  totalSales: number;
  verifiedBuyerRatio: number;
  sentimentScore: number;
  recentReviews: SocialComment[];
  status: 'active' | 'draft';
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  content: string;
  category: string;
  date: string;
  isVerified: boolean;
  readTime: string;
  likes: number;
  videoUrl?: string;
}

export interface InfluencerReview {
  name: string;
  avatar: string;
  platform: string;
  content: string;
  trustScore: number;
  videoUrl?: string;
}

export interface BusinessListing {
  id: string;
  businessName: string;
  category: string;
  description: string;
  slogan?: string;
  location: string;
  address?: string;
  website?: string;
  phone?: string;
  contact: string;
  rating: number;
  isVerified: boolean;
  image: string;
  style?: string;
  color?: string;
  verifiedReviews?: SocialComment[];
}

export interface User {
  id: string;
  name: string;
  isVerified: boolean;
  isBlogger?: boolean;
  isInfluencer?: boolean;
  influenceScore?: number;
  email: string;
  provider: 'google' | 'facebook' | 'guest';
  isCreator?: boolean;
}
