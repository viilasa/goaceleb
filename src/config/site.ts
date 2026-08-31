/** Central site config for SEO, GEO, sitemap, and social meta. */
const PRIMARY_URL = 'https://goacelebrations.com';
const PREVIEW_URL = 'https://goaceleb.vercel.app';

export const SITE = {
  name: 'Goa Celebrations',
  legalName: 'Goa Celebrations',
  tagline: 'Bespoke destination weddings and celebrations in Goa',
  description:
    'Plan a premium destination wedding in Goa with Goa Celebrations — bespoke planning, design, hospitality and multi-day celebrations crafted around your story.',
  /** Canonical / production domain — used for sitemap, OG, and JSON-LD. */
  url: (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') || PRIMARY_URL,
  /** Live domains for this project. */
  domains: {
    primary: PRIMARY_URL,
    preview: PREVIEW_URL,
  },
  locale: 'en_IN',
  language: 'en',
  email: 'hello@goacelebrations.com',
  phone: '+91-9999999999',
  whatsapp: 'https://wa.me/919999999999',
  address: {
    locality: 'Goa',
    region: 'Goa',
    country: 'IN',
    countryName: 'India',
  },
  social: {
    instagram: '',
    facebook: '',
    pinterest: '',
  },
  /** Default Open Graph / social share image (JPG preferred for WhatsApp/Facebook). */
  ogImagePath: '/og-default.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/jpeg',
  themeColor: '#ffffff',
  foundingYear: 2020,
} as const;

/** Prefer the live host being shared so previews always load the image. */
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

/** Public indexable routes (exclude redirects / private flows if desired). */
export const INDEXABLE_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: 1.0, title: 'Home' },
  { path: '/services', changefreq: 'monthly', priority: 0.9, title: 'Services' },
  { path: '/plan/build', changefreq: 'monthly', priority: 0.9, title: 'Build Your Celebration' },
  { path: '/about', changefreq: 'monthly', priority: 0.8, title: 'About' },
  { path: '/blogs', changefreq: 'weekly', priority: 0.8, title: 'Blogs' },
  { path: '/book', changefreq: 'monthly', priority: 0.85, title: 'Get in Touch' },
] as const;
