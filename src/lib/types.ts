export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'consultation_booked'
  | 'proposal_sent'
  | 'won'
  | 'lost';

export type LeadCategory = 'hot' | 'warm' | 'early';

export type GuestRange = '50-100' | '100-200' | '200-300' | '300-500' | '500+';
export type DayCount = '1' | '2' | '3' | '4+';
export type DecorLevel = 'essential' | 'signature' | 'immersive';
export type LocationType = 'Goa' | 'Another Indian City' | 'NRI' | 'International';
export type ContactMethod = 'WhatsApp' | 'Phone' | 'Email';
export type ContactTime = 'Morning' | 'Afternoon' | 'Evening';
export type AccommodationNeed = 'Yes' | 'No' | 'Not Sure';

export interface WeddingStory {
  id: string;
  slug: string;
  name: string;
  location: string;
  days: number;
  guestCount: number;
  tags: string[];
  shortDescription: string;
  introduction: string;
  coverImage: string;
  featured?: boolean;
  featuredSize?: 'large' | 'medium' | 'small';
  details: string;
  decorMoments: string;
  guestExperience: string;
  gallery: string[];
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  image: string;
}

export interface PackageInclusion {
  text: string;
}

export interface WeddingPackage {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  startingPrice?: number;
  priceNote?: string;
  inclusions: PackageInclusion[];
  cta: string;
  ctaLink: string;
  highlighted?: boolean;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  coverImage: string;
  content: string[];
}

export interface EstimateBreakdown {
  venue: { min: number; max: number };
  decor: { min: number; max: number };
  food: { min: number; max: number };
  planning: { min: number; max: number };
  photography: { min: number; max: number };
  hospitality: { min: number; max: number };
  entertainment: { min: number; max: number };
}

export interface EstimateResult {
  minimum: number;
  maximum: number;
  breakdown: EstimateBreakdown;
}

export interface CelebrationSelections {
  month: string;
  year: string;
  guestRange: GuestRange | '';
  numberOfDays: DayCount | '';
  events: string[];
  venuePreference: string;
  hasExistingVenue: boolean | null;
  existingVenueName: string;
  decorStyle: string;
  decorLevel: DecorLevel | '';
  accommodation: AccommodationNeed | '';
  accommodationNights: number;
  guestExperience: string[];
  photography: string;
  entertainment: string[];
  foodAndBeverage: string;
  experiences: string[];
  packagePreference: string;
}

export interface LeadContact {
  name: string;
  partnerName: string;
  phone: string;
  email: string;
  location: LocationType | '';
  preferredContactMethod: ContactMethod | '';
  preferredContactTime: ContactTime | '';
  message?: string;
}

export interface LeadBooking {
  consultationType: string;
  date: string;
  time: string;
  meetingLink?: string;
}

export interface Lead {
  id: string;
  createdAt: string;
  status: LeadStatus;
  score: number;
  category: LeadCategory;
  contact: LeadContact;
  wedding: CelebrationSelections;
  estimate: EstimateResult | null;
  booking: LeadBooking | null;
  notes: string;
}

export interface ConsultationType {
  id: string;
  name: string;
  duration: string;
  description: string;
}
