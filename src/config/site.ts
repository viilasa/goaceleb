/** Central site config for SEO, GEO, sitemap, and social meta.
 * Contact details sourced from Goa Celebrations content inventory.
 */
const PRIMARY_URL = 'https://goacelebrations.com';
const PREVIEW_URL = 'https://goaceleb.vercel.app';

export const SITE = {
  name: 'Goa Celebrations',
  legalName: 'Goa Celebrations',
  tagline: 'Premium destination wedding planner in Goa',
  description:
    'Goa Celebrations plans premium destination and beach weddings in Goa — full planning, décor, hospitality and multi-day celebrations crafted around your story.',
  url: (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') || PRIMARY_URL,
  domains: {
    primary: PRIMARY_URL,
    preview: PREVIEW_URL,
  },
  locale: 'en_IN',
  language: 'en',
  email: 'briangoacelebrations@gmail.com',
  emailSecondary: '',
  phone: '+91 75074 90443',
  phoneSecondary: '+91 97645 06868',
  phoneTel: '+917507490443',
  phoneSecondaryTel: '+919764506868',
  whatsapp: 'https://wa.me/917507490443',
  address: {
    line1: 'H.no. 367, Ashvem Beach, Mandrem',
    locality: 'Goa',
    region: 'Goa',
    country: 'IN',
    countryName: 'India',
    full: 'H.no. 367, Ashvem Beach, Mandrem, Goa',
  },
  social: {
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
    youtube: 'https://www.youtube.com/',
    linkedin: 'https://www.linkedin.com/',
    pinterest: '',
  },
  claims: {
    yearsExperience: '10+',
    eventsManaged: '1000+',
    founded: 'October 2010',
  },
  logoUrl:
    'https://res.cloudinary.com/ddhhlkyut/image/upload/e_trim/f_png/v1788103509/logo_sdut0f.png',
  ogImagePath: '/og-default.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/jpeg',
  themeColor: '#ffffff',
  foundingYear: 2010,
} as const;

export function shareOrigin(): string {
  if (typeof window !== 'undefined' && window.location?.origin) {
    const origin = window.location.origin.replace(/\/$/, '');
    if (
      origin === SITE.domains.primary ||
      origin === SITE.domains.preview ||
      origin.includes('localhost') ||
      origin.includes('127.0.0.1')
    ) {
      return origin.includes('localhost') || origin.includes('127.0.0.1')
        ? SITE.domains.preview
        : origin;
    }
  }
  return SITE.url;
}

export function absoluteUrl(path = '/', origin = SITE.url): string {
  if (path.startsWith('http')) return path;
  const normalised = path.startsWith('/') ? path : `/${path}`;
  return `${origin}${normalised === '/' ? '' : normalised}`;
}

export function absoluteOgImage(path?: string, origin = shareOrigin()): string {
  return absoluteUrl(path || SITE.ogImagePath, origin);
}

export const INDEXABLE_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: 1.0, title: 'Home' },
  { path: '/services', changefreq: 'monthly', priority: 0.9, title: 'Services' },
  { path: '/plan/build', changefreq: 'monthly', priority: 0.9, title: 'Build Your Celebration' },
  { path: '/about', changefreq: 'monthly', priority: 0.8, title: 'About' },
  { path: '/blogs', changefreq: 'weekly', priority: 0.8, title: 'Blogs' },
  { path: '/book', changefreq: 'monthly', priority: 0.85, title: 'Get in Touch' },
] as const;
