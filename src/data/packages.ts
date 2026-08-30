import type { WeddingPackage } from '../lib/types';

/** Update package names, prices and inclusions from this single file. */
export const packages: WeddingPackage[] = [
  {
    id: 'essential',
    name: 'Essential',
    slug: 'essential',
    tagline: 'For focused and elegant celebrations.',
    startingPrice: 18,
    inclusions: [
      { text: 'Planning coordination for 1–2 events' },
      { text: 'Core décor direction for key spaces' },
      { text: 'Vendor recommendations and management' },
      { text: 'Day-of execution team' },
      { text: 'Guest flow planning' },
    ],
    cta: 'Build This Package',
    ctaLink: '/plan/build?package=essential',
  },
  {
    id: 'signature',
    name: 'Signature',
    slug: 'signature',
    tagline: 'For multi-event destination weddings.',
    startingPrice: 35,
    highlighted: true,
    inclusions: [
      { text: 'Full planning for multi-day celebrations' },
      { text: 'Design direction across all events' },
      { text: 'Hospitality & guest coordination' },
      { text: 'Detailed timelines and run-of-show' },
      { text: 'On-ground team throughout' },
      { text: 'Vendor sourcing and management' },
    ],
    cta: 'Build This Package',
    ctaLink: '/plan/build?package=signature',
  },
  {
    id: 'bespoke',
    name: 'Bespoke',
    slug: 'bespoke',
    tagline: 'For fully customised celebrations.',
    priceNote: 'Designed around your vision, scale and celebration.',
    inclusions: [
      { text: 'Completely customised planning scope' },
      { text: 'Immersive design & spatial storytelling' },
      { text: 'Premium hospitality architecture' },
      { text: 'Entertainment & experience curation' },
      { text: 'Dedicated creative and operations leads' },
    ],
    cta: 'Start Building Your Celebration',
    ctaLink: '/plan/build?package=bespoke',
  },
];
