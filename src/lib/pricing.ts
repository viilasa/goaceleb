import { LEAD_SCORE_CONFIG, PRICING } from '../data/calculatorConfig';
import type {
  CelebrationSelections,
  EstimateBreakdown,
  EstimateResult,
  LeadCategory,
} from './types';

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export function calculateEstimate(s: CelebrationSelections): EstimateResult {
  const guestMul =
    (s.guestRange && PRICING.guestMultiplier[s.guestRange]) || { min: 1, max: 1.2 };
  const venue =
    (s.venuePreference && PRICING.venueBase[s.venuePreference]) ||
    PRICING.venueBase['3 Star Hotel'];
  const decorMul =
    (s.decorLevel && PRICING.decorMultiplier[s.decorLevel]) || { min: 1, max: 1.2 };

  const eventCount = Math.max(s.events.length, 1);

  const venueMin = round1(venue.min);
  const venueMax = round1(venue.max);

  const decorMin = round1(PRICING.decorBase.min * decorMul.min * Math.sqrt(eventCount));
  const decorMax = round1(PRICING.decorBase.max * decorMul.max * Math.sqrt(eventCount));

  const planningMin = round1(PRICING.basePlanning.min);
  const planningMax = round1(PRICING.basePlanning.max);

  const photo = PRICING.photography;

  let hospitalityMin = 0;
  let hospitalityMax = 0;
  if (s.accommodation === 'Yes') {
    const nights = Math.max(s.accommodationNights || 1, 1);
    hospitalityMin += PRICING.accommodationPerNight.min * nights * guestMul.min;
    hospitalityMax += PRICING.accommodationPerNight.max * nights * guestMul.max;
  }
  for (const item of s.guestExperience) {
    const range = PRICING.guestExperienceAddOns[item];
    if (range) {
      hospitalityMin += range.min;
      hospitalityMax += range.max;
    }
  }

  let entertainmentMin = 0;
  let entertainmentMax = 0;
  if (s.entertainment.length > 0) {
    entertainmentMin += PRICING.entertainmentVendors.min;
    entertainmentMax += PRICING.entertainmentVendors.max;
  }
  for (const item of s.experiences) {
    const range = PRICING.experiences[item];
    if (range) {
      entertainmentMin += range.min;
      entertainmentMax += range.max;
    }
  }

  const breakdown: EstimateBreakdown = {
    venue: { min: venueMin, max: venueMax },
    decor: { min: decorMin, max: decorMax },
    food: { min: 0, max: 0 },
    planning: { min: planningMin, max: planningMax },
    photography: { min: round1(photo.min), max: round1(photo.max) },
    hospitality: { min: round1(hospitalityMin), max: round1(hospitalityMax) },
    entertainment: { min: round1(entertainmentMin), max: round1(entertainmentMax) },
  };

  const minimum = round1(
    Object.values(breakdown).reduce((sum, r) => sum + r.min, 0),
  );
  const maximum = round1(
    Object.values(breakdown).reduce((sum, r) => sum + r.max, 0),
  );

  return { minimum, maximum, breakdown };
}

export function formatLakhs(n: number): string {
  if (n >= 100) return `₹${(n / 100).toFixed(1)} Cr`;
  return `₹${n.toFixed(n % 1 === 0 ? 0 : 1)} L`;
}

export function formatLakhsRange(min: number, max: number): string {
  return `${formatLakhs(min)} — ${formatLakhs(max)}`;
}

export function computeLeadScore(
  selections: CelebrationSelections,
  estimate: EstimateResult | null,
  consultationBooked = false,
): { score: number; category: LeadCategory } {
  const w = LEAD_SCORE_CONFIG.weights;
  let score = 20;

  if (selections.year && selections.month) {
    const monthIndex = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ].indexOf(selections.month);
    const weddingDate = new Date(Number(selections.year), monthIndex, 15);
    const now = new Date();
    const monthsAway =
      (weddingDate.getFullYear() - now.getFullYear()) * 12 +
      (weddingDate.getMonth() - now.getMonth());
    if (monthsAway >= 3 && monthsAway <= 18) score += w.weddingWithin3to18Months;
  }

  if (
    selections.guestRange === '100-200' ||
    selections.guestRange === '200-300' ||
    selections.guestRange === '300-500' ||
    selections.guestRange === '500+'
  ) {
    score += w.guests150Plus;
  }

  if (selections.events.length >= 3) score += w.multipleEvents;
  if (selections.numberOfDays === '4+' || selections.numberOfDays === '3') {
    score += w.fourPlusDays;
  }

  if (estimate && estimate.minimum >= LEAD_SCORE_CONFIG.highBudgetThresholdLakhs) {
    score += w.highBudget;
  }

  if (selections.decorLevel === 'signature') score += w.premiumDecor;
  if (selections.decorLevel === 'immersive') {
    score += w.premiumDecor + w.immersiveDecor;
  }

  if (selections.accommodation === 'Yes') score += w.accommodationRequired;
  if (consultationBooked) score += w.consultationBooked;

  score = Math.min(100, Math.max(0, score));

  let category: LeadCategory = 'early';
  if (score >= LEAD_SCORE_CONFIG.thresholds.hot) category = 'hot';
  else if (score >= LEAD_SCORE_CONFIG.thresholds.warm) category = 'warm';

  return { score, category };
}
