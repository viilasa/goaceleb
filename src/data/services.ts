import type { Service } from '../lib/types';

export const services: Service[] = [
  {
    id: '1',
    title: 'Full Wedding Planning',
    slug: 'full-wedding-planning',
    summary: 'From the first conversation to the final celebration.',
    description:
      'End-to-end planning for destination weddings in Goa — timelines, vendor coordination, design direction, guest hospitality and on-ground execution. We stay with you from the first conversation through the last farewell.',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=80',
  },
  {
    id: '2',
    title: 'Wedding Design & Décor',
    slug: 'wedding-design-decor',
    summary: 'Concept, styling and visual direction.',
    description:
      'A clear design language for your celebration — mood, colour, florals, lighting and spatial storytelling. We create cohesive visual experiences across every event and space.',
    image:
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1400&q=80',
  },
  {
    id: '3',
    title: 'Destination Wedding Planning',
    slug: 'destination-wedding-planning',
    summary: 'For couples planning a Goa wedding from another city or country.',
    description:
      'Remote-friendly planning with clear communication, curated venue shortlists, travel coordination and local expertise — so distance never gets in the way of a beautifully planned celebration.',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80',
  },
  {
    id: '4',
    title: 'Hospitality & Guest Experience',
    slug: 'hospitality-guest-experience',
    summary: 'Accommodation, arrivals, transport and guest coordination.',
    description:
      'Room blocks, airport transfers, welcome desks, guest communication and on-ground hospitality teams. We design the guest journey with the same care as the celebration itself.',
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=80',
  },
  {
    id: '5',
    title: 'Bespoke Celebrations',
    slug: 'bespoke-celebrations',
    summary: 'Completely customised celebrations.',
    description:
      'Anniversaries, vow renewals, private gatherings and one-of-a-kind events — designed around your story, your people and the way you want to celebrate in Goa.',
    image:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1400&q=80',
  },
];

export const homeServicePreview = [
  'Full Wedding Planning',
  'Wedding Design & Décor',
  'Destination Weddings',
  'Hospitality & Guest Management',
  'Bespoke Celebrations',
];

export const coreAreas = [
  { number: '01', title: 'Planning', description: 'Clear timelines, thoughtful coordination and calm execution.' },
  { number: '02', title: 'Design', description: 'Visual direction that feels intentional, refined and personal.' },
  { number: '03', title: 'Hospitality', description: 'Guest care that makes every arrival feel considered.' },
  { number: '04', title: 'Celebration', description: 'Moments shaped around your story, not a template.' },
];
