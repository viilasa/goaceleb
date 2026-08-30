import type { JournalArticle } from '../lib/types';

export const journalArticles: JournalArticle[] = [
  {
    id: '1',
    slug: 'how-much-does-a-destination-wedding-in-goa-cost',
    title: 'How Much Does a Destination Wedding in Goa Cost?',
    excerpt:
      'A clear look at what shapes a Goa wedding budget — from guest count and venue to décor, hospitality and the experiences in between.',
    category: 'Planning',
    date: '2025-11-12',
    readTime: '8 min',
    coverImage:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80',
    content: [
      'A destination wedding in Goa can feel expansive or intimate — and the investment range reflects that choice. Guest count, number of events, venue type and décor ambition are usually the largest drivers.',
      'Venue and accommodation often form the foundation of the budget. Beachfront resorts, private villas and heritage properties each come with different cost structures and guest capacities.',
      'Décor and design scale with the number of spaces you transform. An essential approach focuses on key moments; immersive design can reshape entire venues across multiple days.',
      'Hospitality — transfers, welcome desks, guest care — is what makes a destination wedding feel considered. It is often underestimated, yet it shapes how guests remember the celebration.',
      'The most useful starting point is not a single number, but a thoughtful range based on your vision. Our celebration builder helps you explore that range before you commit to a detailed proposal.',
    ],
  },
  {
    id: '2',
    slug: 'best-time-for-a-wedding-in-goa',
    title: 'Best Time for a Wedding in Goa',
    excerpt:
      'Seasonality, weather and venue availability — how to choose wedding dates that work for Goa.',
    category: 'Guides',
    date: '2025-10-03',
    readTime: '6 min',
    coverImage:
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1400&q=80',
    content: [
      'Goa’s wedding season typically runs from November through February, when skies are clear and evenings are comfortable for outdoor celebrations.',
      'Shoulder months can offer softer light, fewer crowds and more venue flexibility — with careful planning around weather.',
      'Monsoon months bring atmosphere and greenery, but require covered contingency plans for outdoor ceremonies and guest comfort.',
      'Book early for peak season dates, especially if you need larger room blocks or beachfront ceremony permissions.',
    ],
  },
  {
    id: '3',
    slug: 'beach-wedding-planning-guide',
    title: 'Beach Wedding Planning Guide',
    excerpt:
      'Permissions, tides, lighting and guest comfort — the practical side of a beautiful beach wedding.',
    category: 'Guides',
    date: '2025-09-18',
    readTime: '7 min',
    coverImage:
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=80',
    content: [
      'A beach wedding in Goa begins with the right stretch of shoreline — private resort beaches often simplify permissions and guest access.',
      'Tide timing, sun direction and wind all influence ceremony placement and photography. We plan around these from the first site visit.',
      'Guest comfort matters: shaded seating, clear walkways, footwear guidance and evening lighting make the experience feel effortless.',
      'Décor should enhance the setting, not compete with it. Soft florals, clean lines and natural textures usually photograph beautifully against the sea.',
    ],
  },
  {
    id: '4',
    slug: 'how-to-plan-a-3-day-destination-wedding',
    title: 'How to Plan a 3-Day Destination Wedding',
    excerpt:
      'A calm framework for welcome night, ceremony day and farewell — without overwhelming your guests.',
    category: 'Planning',
    date: '2025-08-22',
    readTime: '9 min',
    coverImage:
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1400&q=80',
    content: [
      'Three days is a natural rhythm for destination weddings: arrival and welcome, celebration day, and a softer farewell.',
      'Pace matters. Guests travelling into Goa need breathing room between events — and the celebration feels better for it.',
      'Map each day with a clear emotional arc: connection on night one, ceremony and reception on day two, warmth and goodbye on day three.',
      'Hospitality threads everything together — room blocks, transfers and communication so guests always know where to be.',
    ],
  },
  {
    id: '5',
    slug: 'choosing-the-right-goa-wedding-venue',
    title: 'Choosing the Right Goa Wedding Venue',
    excerpt:
      'Beachfront, villa, resort or heritage — how to match venue to guest count, style and celebration shape.',
    category: 'Venues',
    date: '2025-07-14',
    readTime: '8 min',
    coverImage:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=80',
    content: [
      'Start with guest count and the number of events. A villa may be perfect for eighty guests; a resort campus often serves larger multi-day celebrations better.',
      'Consider where guests will stay. Properties that combine ceremony spaces with accommodation reduce transfer friction.',
      'Look at natural light, backup indoor spaces and how décor can work with the architecture rather than against it.',
      'Visit when possible — or review spaces with a planner who knows how each venue performs for real weddings.',
    ],
  },
];

export function getArticleBySlug(slug: string): JournalArticle | undefined {
  return journalArticles.find((a) => a.slug === slug);
}
