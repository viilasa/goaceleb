import { SITE, absoluteUrl } from '../config/site';

export interface PageSeo {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

const brand = SITE.name;

export function titleWithBrand(pageTitle: string): string {
  if (pageTitle.includes(brand)) return pageTitle;
  return `${pageTitle} | ${brand}`;
}

export const defaultSeo: PageSeo = {
  title: `${brand} | Destination Weddings in Goa`,
  description:
    'Plan a premium destination wedding in Goa with Goa Celebrations — bespoke planning, design, hospitality and multi-day celebrations crafted around your story.',
  path: '/',
  type: 'website',
};

export const routeSeo: Record<string, PageSeo> = {
  '/': {
    title: `${brand} | Destination Weddings in Goa`,
    description:
      'Plan a premium destination wedding in Goa with Goa Celebrations — bespoke planning, design, hospitality and multi-day celebrations crafted around your story.',
    path: '/',
  },
  '/services': {
    title: 'Wedding Planning Services in Goa',
    description:
      'From full wedding planning to design, destination coordination and guest hospitality — explore how Goa Celebrations brings celebrations to life in Goa.',
    path: '/services',
  },
  '/plan/build': {
    title: 'Build Your Celebration — Wedding Budget Estimate',
    description:
      'Select guests, events, venue style and décor to get an estimated investment range for your Goa destination wedding — then book a consultation.',
    path: '/plan/build',
  },
  '/about': {
    title: 'About Goa Celebrations',
    description:
      'Goa Celebrations is a premium destination wedding studio in Goa — calm process, refined design, and celebrations planned around your story.',
    path: '/about',
  },
  '/blogs': {
    title: 'Wedding Planning Blogs & Guides',
    description:
      'Expert guides on Goa wedding costs, best seasons, beach ceremonies, venues and how to plan a seamless 3-day destination celebration.',
    path: '/blogs',
  },
  '/book': {
    title: 'Book a Consultation | Goa Celebrations',
    description:
      'Book a complimentary discovery call or send an enquiry — start planning your destination wedding in Goa with the Goa Celebrations team.',
    path: '/book',
  },
  '/weddings': {
    title: 'Our Weddings — Destination Wedding Portfolio',
    description:
      'Explore real Goa Celebrations weddings — beachfront ceremonies, villa weekends, and multi-day destination celebrations.',
    path: '/weddings',
    noindex: true,
  },
};

export function resolveSeo(pathname: string): PageSeo {
  if (routeSeo[pathname]) return routeSeo[pathname];

  if (pathname.startsWith('/blogs/')) {
    return {
      title: 'Blog Article',
      description: SITE.description,
      path: pathname,
      type: 'article',
    };
  }

  if (pathname.startsWith('/weddings/')) {
    return {
      title: 'Wedding Story',
      description: SITE.description,
      path: pathname,
      noindex: true,
    };
  }

  return { ...defaultSeo, path: pathname };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
    '@id': absoluteUrl('/#organization'),
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phone,
    description: SITE.description,
    foundingDate: String(SITE.foundingYear),
    image: absoluteUrl(SITE.ogImagePath),
    logo: absoluteUrl('/favicon.svg'),
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Goa, India',
    },
    priceRange: '₹₹₹',
    sameAs: [
      SITE.domains.preview,
      SITE.whatsapp,
      SITE.social.instagram,
      SITE.social.facebook,
      SITE.social.pinterest,
    ].filter(Boolean),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: SITE.email,
        telephone: SITE.phone,
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi'],
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': absoluteUrl('/#website'),
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publisher: { '@id': absoluteUrl('/#organization') },
    inLanguage: SITE.language,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}