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
  '3 Star Hotel',
  '5 Star Hotel',
  'Private Villa',
];

export const DECOR_STYLES = [
  'Tropical Modern',
  'Minimal White',
  'Need Consultant',
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
  'RSVP',
  "Welcome Hampers",
  'Guest Management & Logistics Planning',
  'On Arrival / Check-ins',
  'F&B Coordination & Management',
  'On the Day Management & Coordination',
  'Departure / Check-outs',
];

export const ENTERTAINMENT_OPTIONS = [
  'Dhols',
  'Ghodi',
  'Brass Band',
  'Band',
  'DJ',
  'One-wheel Stall',
  'Vintage Cars',
  'Mehendi & Makeup Artist',
  'Belly Dancer',
  'Singer',
  'Magician',
  'Emcee',
  'Stand-up Comedian',
  'Russian Dancer',
  'Mixologist',
];

export const EXPERIENCE_OPTIONS = [
  'Colour Shots',
  'Flower Petals',
  'Colours',
  'Pyros',
  'Laser Lights',
];

/**
 * Pricing engine config (values in INR lakhs).
 * Ranges are planning estimates — not quotations.
 */
export const PRICING = {
  basePlanning: { min: 2.5, max: 4 },

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
    '3 Star Hotel': { min: 35, max: 40 },
    '5 Star Hotel': { min: 70, max: 80 },
    'Private Villa': { min: 45, max: 55 },
  } as Record<string, { min: number; max: number }>,

  decorBase: { min: 4, max: 6 },
  decorMultiplier: {
    essential: { min: 1, max: 1 },
    signature: { min: 1.25, max: 1.35 },
    immersive: { min: 1.6, max: 1.7 },
  } as Record<DecorLevel, { min: number; max: number }>,

  eventAddPerEvent: { min: 1.2, max: 2.5 },

  photography: { min: 2.5, max: 3.5 },

  entertainmentVendors: { min: 3, max: 5 },

  experiences: {
    'Colour Shots': { min: 0.4, max: 0.7 },
    'Flower Petals': { min: 0.3, max: 0.5 },
    Colours: { min: 0.3, max: 0.5 },
    Pyros: { min: 0.6, max: 1 },
    'Laser Lights': { min: 0.5, max: 0.8 },
  } as Record<string, { min: number; max: number }>,

  accommodationPerNight: { min: 1.5, max: 3 },

  guestExperienceAddOns: {
    RSVP: { min: 0.3, max: 0.5 },
    'Welcome Hampers': { min: 0.4, max: 0.7 },
    'Guest Management & Logistics Planning': { min: 0.6, max: 1 },
    'On Arrival / Check-ins': { min: 0.4, max: 0.7 },
    'F&B Coordination & Management': { min: 0.4, max: 0.7 },
    'On the Day Management & Coordination': { min: 0.6, max: 1 },
    'Departure / Check-outs': { min: 0.3, max: 0.5 },
  } as Record<string, { min: number; max: number }>,

  caps: {
    decor: { min: 4, max: 10 },
    hospitality: { min: 0, max: 8 },
    entertainment: { min: 0, max: 5 },
  },
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
