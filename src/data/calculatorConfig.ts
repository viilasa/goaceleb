import type { DayCount, DecorLevel, GuestRange } from '../lib/types';

/** Central configuration for calculator options and pricing. Update here — not in components. */

export const CALCULATOR_STEPS = [
  { id: 1, label: 'Celebration', short: '01 Celebration' },
  { id: 2, label: 'Events', short: '02 Events' },
  { id: 3, label: 'Venue', short: '03 Venue' },
  { id: 4, label: 'Décor', short: '04 Décor' },
  { id: 5, label: 'Guest Experience', short: '05 Guest Experience' },
  { id: 6, label: 'Add-ons', short: '06 Add-ons' },
  { id: 7, label: 'Estimate', short: '07 Estimate' },
] as const;

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const YEARS = (() => {
  const current = new Date().getFullYear();
  return Array.from({ length: 5 }, (_, i) => String(current + i));
})();

export const GUEST_OPTIONS: { value: GuestRange; label: string }[] = [
  { value: '50-100', label: '50–100' },
  { value: '100-200', label: '100–200' },
  { value: '200-300', label: '200–300' },
  { value: '300-500', label: '300–500' },
  { value: '500+', label: '500+' },
];

export const DAY_OPTIONS: { value: DayCount; label: string }[] = [
  { value: '1', label: '1 Day' },
  { value: '2', label: '2 Days' },
  { value: '3', label: '3 Days' },
  { value: '4+', label: '4+ Days' },
];

export const EVENT_OPTIONS = [
  'Welcome Dinner',
  'Mehendi',
  'Haldi',
  'Sangeet',
  'Wedding Ceremony',
  'Reception',
  'After Party',
  'Brunch / Farewell',
];

export const VENUE_OPTIONS = [
  'Beachfront',
  'Luxury Resort',
  'Private Villa',
  'Boutique Property',
  'Outdoor Garden',
  'Heritage Property',
  'Not Sure Yet',
];

export const DECOR_STYLES = [
  'Tropical Modern',
  'Minimal White',
  'Romantic Floral',
  'Colourful Indian',
  'Contemporary Luxury',
  'Bespoke / Something Else',
];

export const DECOR_LEVELS: {
  value: DecorLevel;
  title: string;
  description: string;
}[] = [
  {
    value: 'essential',
    title: 'Essential',
    description: 'Elegant décor focused on the most important spaces.',
  },
  {
    value: 'signature',
    title: 'Signature',
    description: 'Detailed design across multiple events and spaces.',
  },
  {
    value: 'immersive',
    title: 'Immersive',
    description: 'Large-scale transformations, installations and highly customised experiences.',
  },
];

export const ACCOMMODATION_OPTIONS = ['Yes', 'No', 'Not Sure'] as const;

export const GUEST_EXPERIENCE_OPTIONS = [
  'Airport transfers',
  'Local transportation',
  'Guest welcome desk',
  'Hospitality team',
  'Welcome hampers',
];

export const PHOTOGRAPHY_OPTIONS = [
  'Photography',
  'Photography + Cinematic Film',
  'Full Premium Production',
];

export const ENTERTAINMENT_OPTIONS = [
  'DJ',
  'Live Band',
  'Traditional Performers',
  'Special Artist',
  'Custom Entertainment',
];

export const FOOD_OPTIONS = [
  'Venue Package',
  'Curated Catering',
  'Premium Dining Experience',
];

export const EXPERIENCE_OPTIONS = [
  'Welcome Hampers',
  'Cocktail Experience',
  'Fireworks / Special Effects',
  'Custom Gifting',
  'Guest Activities',
  'After Party',
  'Bridal Entry Experience',
  'Custom Entertainment',
];

/**
 * Pricing engine config (values in INR lakhs).
 * Ranges are planning estimates — not quotations.
 */
export const PRICING = {
  basePlanning: { min: 4, max: 8 },

  guestMultiplier: {
    '50-100': { min: 1, max: 1.15 },
    '100-200': { min: 1.2, max: 1.45 },
    '200-300': { min: 1.5, max: 1.85 },
    '300-500': { min: 1.9, max: 2.4 },
    '500+': { min: 2.5, max: 3.2 },
  } as Record<GuestRange, { min: number; max: number }>,

  dayMultiplier: {
    '1': { min: 0.7, max: 0.85 },
    '2': { min: 1, max: 1.15 },
    '3': { min: 1.25, max: 1.5 },
    '4+': { min: 1.55, max: 1.9 },
  } as Record<DayCount, { min: number; max: number }>,

  venueBase: {
    Beachfront: { min: 8, max: 18 },
    'Luxury Resort': { min: 10, max: 22 },
    'Private Villa': { min: 6, max: 14 },
    'Boutique Property': { min: 5, max: 12 },
    'Outdoor Garden': { min: 4, max: 10 },
    'Heritage Property': { min: 7, max: 16 },
    'Not Sure Yet': { min: 6, max: 15 },
  } as Record<string, { min: number; max: number }>,

  decorBase: { min: 5, max: 10 },
  decorMultiplier: {
    essential: { min: 1, max: 1.2 },
    signature: { min: 1.5, max: 2 },
    immersive: { min: 2.2, max: 3.2 },
  } as Record<DecorLevel, { min: number; max: number }>,

  eventAddPerEvent: { min: 1.2, max: 2.5 },

  foodPerGuestBand: {
    'Venue Package': { min: 4, max: 8 },
    'Curated Catering': { min: 7, max: 14 },
    'Premium Dining Experience': { min: 12, max: 22 },
  } as Record<string, { min: number; max: number }>,

  photography: {
    Photography: { min: 2.5, max: 4 },
    'Photography + Cinematic Film': { min: 4.5, max: 8 },
    'Full Premium Production': { min: 8, max: 15 },
  } as Record<string, { min: number; max: number }>,

  entertainment: {
    DJ: { min: 0.8, max: 1.5 },
    'Live Band': { min: 2, max: 4 },
    'Traditional Performers': { min: 1.2, max: 2.5 },
    'Special Artist': { min: 3, max: 8 },
    'Custom Entertainment': { min: 2, max: 5 },
  } as Record<string, { min: number; max: number }>,

  experiences: {
    'Welcome Hampers': { min: 0.5, max: 1.2 },
    'Cocktail Experience': { min: 1, max: 2.5 },
    'Fireworks / Special Effects': { min: 1.5, max: 4 },
    'Custom Gifting': { min: 0.8, max: 2 },
    'Guest Activities': { min: 1, max: 3 },
    'After Party': { min: 1.5, max: 3.5 },
    'Bridal Entry Experience': { min: 0.8, max: 2 },
    'Custom Entertainment': { min: 1.5, max: 4 },
  } as Record<string, { min: number; max: number }>,

  accommodationPerNight: { min: 1.5, max: 3.5 },

  guestExperienceAddOns: {
    'Airport transfers': { min: 0.8, max: 2 },
    'Local transportation': { min: 0.6, max: 1.5 },
    'Guest welcome desk': { min: 0.4, max: 1 },
    'Hospitality team': { min: 1.2, max: 3 },
    'Welcome hampers': { min: 0.5, max: 1.2 },
  } as Record<string, { min: number; max: number }>,
};

export const LEAD_SCORE_CONFIG = {
  thresholds: { hot: 80, warm: 50 },
  weights: {
    weddingWithin3to18Months: 15,
    guests150Plus: 12,
    multipleEvents: 10,
    highBudget: 18,
    premiumDecor: 12,
    accommodationRequired: 8,
    consultationBooked: 15,
    immersiveDecor: 5,
    fourPlusDays: 5,
  },
  highBudgetThresholdLakhs: 40,
};
