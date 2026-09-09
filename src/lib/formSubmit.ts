import { SITE } from '../config/site';
import type { Lead } from './types';

const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${SITE.email}`;

function formatEstimate(lead: Lead): string {
  if (!lead.estimate) return 'Not calculated';
  const { minimum, maximum, breakdown } = lead.estimate;
  const lines = [
    `Range: ₹${minimum}–${maximum} L`,
    ...Object.entries(breakdown).map(
      ([key, range]) => `${key}: ₹${range.min}–${range.max} L`,
    ),
  ];
  return lines.join('\n');
}

function formatWedding(lead: Lead): string {
  const w = lead.wedding;
  return [
    `Month/Year: ${[w.month, w.year].filter(Boolean).join(' ') || '—'}`,
    `Guests: ${w.guestRange || '—'}`,
    `Days: ${w.numberOfDays || '—'}`,
    `Events: ${w.events.length ? w.events.join(', ') : '—'}`,
    `Venue preference: ${w.venuePreference || '—'}`,
    `Existing venue: ${w.hasExistingVenue ? w.existingVenueName || 'Yes' : 'No'}`,
    `Décor: ${[w.decorStyle, w.decorLevel].filter(Boolean).join(' / ') || '—'}`,
    `Accommodation: ${w.accommodation || '—'} (${w.accommodationNights || 0} nights)`,
    `Guest experience: ${w.guestExperience.length ? w.guestExperience.join(', ') : '—'}`,
    `Photography: ${w.photography || '—'}`,
    `Entertainment: ${w.entertainment.length ? w.entertainment.join(', ') : '—'}`,
    `Food & beverage: ${w.foodAndBeverage || '—'}`,
    `Experiences: ${w.experiences.length ? w.experiences.join(', ') : '—'}`,
    `Package preference: ${w.packagePreference || '—'}`,
  ].join('\n');
}

/** Build a FormSubmit-friendly payload from a lead. */
export function leadToFormSubmitPayload(lead: Lead): Record<string, string> {
  const subjectBySource =
    lead.notes.includes('Consultation')
      ? 'Goa Celebrations — Consultation booking'
      : lead.notes.includes('Build')
        ? 'Goa Celebrations — Wedding plan lead'
        : 'Goa Celebrations — Contact form enquiry';

  const booking = lead.booking
    ? [
        `Type: ${lead.booking.consultationType}`,
        `Date: ${lead.booking.date}`,
        `Time: ${lead.booking.time}`,
      ].join('\n')
    : '—';

  return {
    _subject: subjectBySource,
    _template: 'table',
    _captcha: 'false',
    _honey: '',
    leadId: lead.id,
    source: lead.notes || 'Website',
    status: lead.status,
    score: String(lead.score),
    category: lead.category,
    name: lead.contact.name,
    partnerName: lead.contact.partnerName || '—',
    email: lead.contact.email,
    phone: lead.contact.phone,
    location: lead.contact.location || '—',
    preferredContactMethod: lead.contact.preferredContactMethod || '—',
    preferredContactTime: lead.contact.preferredContactTime || '—',
    message: lead.contact.message || '—',
    weddingPlan: formatWedding(lead),
    estimate: formatEstimate(lead),
    booking,
    createdAt: lead.createdAt,
  };
}

/**
 * Send lead / contact details to FormSubmit (email inbox).
 * Keeps local lead storage as backup; does not throw on network failure.
 */
export async function submitLeadToFormSubmit(lead: Lead): Promise<boolean> {
  try {
    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(leadToFormSubmitPayload(lead)),
    });

    if (!response.ok) return false;
    const data = (await response.json().catch(() => null)) as { success?: string | boolean } | null;
    if (data && (data.success === false || data.success === 'false')) return false;
    return true;
  } catch {
    return false;
  }
}
