import type { WeddingStory } from '../lib/types';

/**
 * Replace image URLs with your own photography assets.
 * Keep the same field structure for easy CMS migration later.
 */
export const weddings: WeddingStory[] = [
  {
    id: '1',
    slug: 'celebration-by-the-sea',
    name: 'A Celebration by the Sea',
    location: 'La Cabana Beach & Spa, Goa',
    days: 3,
    guestCount: 180,
    tags: ['Beach', 'Multi-Day', 'Destination', 'Resort'],
    shortDescription:
      'Three days at La Cabana Beach & Spa — coastal light, intimate gatherings and a ceremony by the water.',
    introduction:
      'Set at La Cabana Beach & Spa, this celebration unfolded over three days — from a soft welcome dinner to a seaside ceremony and an evening of music under open skies.',
    coverImage:
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80',
    featured: true,
    featuredSize: 'large',
    details:
      'The couple chose La Cabana Beach & Spa as their home base, hosting family and friends across connected spaces that moved from garden lawns to the shoreline.',
    decorMoments:
      'Soft whites, tropical greens and natural textures shaped each event. Ceremony florals framed the ocean view without competing with it.',
    guestExperience:
      'Guests arrived to welcome hampers, curated transfers and a hospitality desk that made every moment feel considered.',
    gallery: [
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1200&q=80',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80',
      'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&q=80',
    ],
  },
  {
    id: '2',
    slug: 'villa-weekend-in-anjuna',
    name: 'Villa Weekend in Anjuna',
    location: 'North Goa',
    days: 2,
    guestCount: 80,
    tags: ['Intimate', 'Resort'],
    shortDescription: 'An intimate villa wedding with garden ceremonies and candlelit dinners.',
    introduction:
      'Eighty guests gathered in a private villa for a weekend that felt personal, unhurried and beautifully designed.',
    coverImage:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&q=80',
    featured: true,
    featuredSize: 'medium',
    details:
      'Every space was considered — from the mehendi courtyard to the evening reception under a canopy of lights.',
    decorMoments:
      'Minimal white florals, linen textures and candlelight created a calm, contemporary atmosphere.',
    guestExperience:
      'Villa accommodation, private transfers and a dedicated host team kept the weekend effortless.',
    gallery: [
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&q=80',
      'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=1200&q=80',
      'https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=1200&q=80',
      'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1200&q=80',
    ],
  },
  {
    id: '3',
    slug: 'heritage-garden-wedding',
    name: 'Heritage Garden Wedding',
    location: 'Central Goa',
    days: 3,
    guestCount: 250,
    tags: ['Large Celebration', 'Multi-Day', 'Destination'],
    shortDescription: 'A multi-day celebration across heritage grounds with immersive décor.',
    introduction:
      'A larger celebration that still felt intimate — designed across heritage lawns with thoughtful guest flow and layered experiences.',
    coverImage:
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1600&q=80',
    featured: true,
    featuredSize: 'medium',
    details:
      'Events spanned welcome drinks, sangeet, ceremony and reception — each with its own visual language and energy.',
    decorMoments:
      'Colour, scale and lighting transformed the grounds for evening events while daytime spaces stayed soft and open.',
    guestExperience:
      'Resort room blocks, airport coordination and a guest app kept 250 guests comfortably connected.',
    gallery: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80',
      'https://images.unsplash.com/photo-1537633552985-df8429e804cb?w=1200&q=80',
      'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=1200&q=80',
      'https://images.unsplash.com/photo-1544077890-4a3d8e8e0e0f?w=1200&q=80',
    ],
  },
  {
    id: '4',
    featured: false,
    featuredSize: 'small',
    details:
      'A morning ceremony, afternoon portraits and an evening reception with close family and friends.',
    decorMoments:
      'Natural stone, soft florals and candlelit tables framed the cliff edge without distraction.',
    guestExperience:
      'Boutique property stays and private transfers for a small, well-cared-for guest list.',
    gallery: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
      'https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=1200&q=80',
      'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&q=80',
    ],
  },
  {
    id: '5',
    slug: 'resort-celebration-candolim',
    name: 'Resort Celebration, Candolim',
    location: 'North Goa',
    days: 4,
    guestCount: 320,
    tags: ['Large Celebration', 'Resort', 'Multi-Day', 'Destination'],
    shortDescription: 'A four-day destination wedding with full guest hospitality.',
    introduction:
      'A destination wedding at scale — thoughtfully designed so every guest felt welcomed from arrival to farewell brunch.',
    coverImage:
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600&q=80',
    featured: false,
    featuredSize: 'medium',
    details:
      'Planning covered venue coordination, multi-event design, entertainment and complete guest logistics.',
    decorMoments:
      'Each event had a distinct mood — tropical modern for welcome night, romantic florals for the ceremony, contemporary luxury for the reception.',
    guestExperience:
      'Room allocations, welcome desk, transfers, activities and a dedicated hospitality team throughout.',
    gallery: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
      'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1200&q=80',
      'https://images.unsplash.com/photo-1482575832494-771f74bf6857?w=1200&q=80',
    ],
  },
  {
    id: '6',
    slug: 'private-estate-evening',
    name: 'Private Estate Evening',
    location: 'South Goa',
    days: 2,
    guestCount: 120,
    tags: ['Intimate', 'Destination'],
    shortDescription: 'An evening-focused celebration on a private estate with immersive lighting.',
    introduction:
      'Designed for evenings — soft daylight gatherings giving way to a luminous, atmospheric celebration.',
    coverImage:
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1600&q=80',
    featured: false,
    featuredSize: 'small',
    details:
      'A welcome dinner and next-day ceremony and reception on estate grounds.',
    decorMoments:
      'Lighting design and floral installations created depth and intimacy across outdoor spaces.',
    guestExperience:
      'Boutique stays nearby with curated transport and a quiet, polished guest journey.',
    gallery: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1200&q=80',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&q=80',
    ],
  },
];

export const weddingFilters = [
  'All',
  'Beach',
  'Resort',
  'Intimate',
  'Large Celebration',
  'Multi-Day',
  'Destination',
] as const;

export function getWeddingBySlug(slug: string): WeddingStory | undefined {
  return weddings.find((w) => w.slug === slug);
}

export function getFeaturedWeddings(): WeddingStory[] {
  return weddings.filter((w) => w.featured);
}
