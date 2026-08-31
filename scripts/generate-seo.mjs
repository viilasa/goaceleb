import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const publicDir = join(root, 'public');

const SITE_URL = (process.env.VITE_SITE_URL || 'https://goacelebrations.com').replace(/\/$/, '');
const PREVIEW_URL = (
  process.env.VITE_PREVIEW_URL || 'https://goaceleb.vercel.app'
).replace(/\/$/, '');

const staticRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/services', changefreq: 'monthly', priority: '0.9' },
  { path: '/plan/build', changefreq: 'monthly', priority: '0.9' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/blogs', changefreq: 'weekly', priority: '0.8' },
  { path: '/book', changefreq: 'monthly', priority: '0.85' },
];

const blogSlugs = [
  'why-goa-for-your-destination-wedding',
  'how-much-does-a-destination-wedding-in-goa-cost',
  'choosing-the-right-goa-wedding-venue',
  'goa-wedding-colour-trends',
  'why-hire-a-destination-wedding-planner',
  'beach-wedding-planning-guide',
  'best-time-for-a-wedding-in-goa',
  'how-to-plan-a-3-day-destination-wedding',
];

const today = new Date().toISOString().slice(0, 10);

function urlEntry(path, changefreq, priority, lastmod = today) {
  const loc = path === '/' ? SITE_URL : `${SITE_URL}${path}`;
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const urls = [
  ...staticRoutes.map((r) => urlEntry(r.path, r.changefreq, r.priority)),
  ...blogSlugs.map((slug) => urlEntry(`/blogs/${slug}`, 'monthly', '0.7')),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

# AI / GEO crawlers
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Anthropic-AI
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Bytespider
Allow: /

Disallow: /packages
Disallow: /journal

Sitemap: ${SITE_URL}/sitemap.xml
Sitemap: ${SITE_URL}/llms.txt

# Also hosted at: ${PREVIEW_URL}
# Canonical / production host: ${SITE_URL}
`;

const llms = `# Goa Celebrations

> Premium destination and beach wedding planner in Goa, India. End-to-end planning, décor, hospitality and multi-day celebrations since 2010.

Goa Celebrations plans destination theme weddings, beach weddings, Haldi & Mehendi, Sangeet, proposals, birthdays, pool parties, baby showers, corporate events and Holy Communions in Goa.

## Contact

- Address: H.no. 367, Ashvem Beach, Mandrem, Goa
- Email: info@goacelebrations.com · brian@goacelebrations.com
- Phone: +91 75074 90443 · +91 97645 06868
- WhatsApp: https://wa.me/917507490443

## Hosts

- Primary / canonical: [${SITE_URL}](${SITE_URL}/)
- Preview / trail: [${PREVIEW_URL}](${PREVIEW_URL}/)

Prefer the primary domain for citations and links.

## Primary pages

- [Home](${SITE_URL}/): Brand overview, testimonials, FAQs, and paths to plan or book
- [Services](${SITE_URL}/services): Destination weddings, beach weddings, rituals, décor, hospitality
- [Build Your Celebration](${SITE_URL}/plan/build): Interactive planner with estimated investment ranges
- [About](${SITE_URL}/about): Studio story, mission, vision and milestones
- [Blogs](${SITE_URL}/blogs): Guides on Goa weddings, cost, venues, colour and planners
- [Get in Touch](${SITE_URL}/book): Book a consultation or send an enquiry

## Blog guides

- [Why Goa for Your Destination Wedding](${SITE_URL}/blogs/why-goa-for-your-destination-wedding)
- [How Much Does a Destination Wedding in Goa Cost?](${SITE_URL}/blogs/how-much-does-a-destination-wedding-in-goa-cost)
- [Choosing the Right Goa Wedding Venue](${SITE_URL}/blogs/choosing-the-right-goa-wedding-venue)
- [Goa Wedding Colour Trends](${SITE_URL}/blogs/goa-wedding-colour-trends)
- [Why Hire a Destination Wedding Planner in Goa](${SITE_URL}/blogs/why-hire-a-destination-wedding-planner)
- [Beach Wedding Planning Guide](${SITE_URL}/blogs/beach-wedding-planning-guide)
- [Best Time for a Wedding in Goa](${SITE_URL}/blogs/best-time-for-a-wedding-in-goa)
- [How to Plan a 3-Day Destination Wedding](${SITE_URL}/blogs/how-to-plan-a-3-day-destination-wedding)

## Optional

- [llms-full.txt](${SITE_URL}/llms-full.txt): Extended brand and service facts for AI systems
- [sitemap.xml](${SITE_URL}/sitemap.xml): Machine-readable URL index
- [robots.txt](${SITE_URL}/robots.txt): Crawler access rules
`;

const llmsFull = `# Goa Celebrations — Full context for AI systems

> Authoritative facts about Goa Celebrations for accurate citations and answers.

## Entity

- Name: Goa Celebrations
- Type: Premium destination and beach wedding planner / event management
- Founded: October 2010
- Location: H.no. 367, Ashvem Beach, Mandrem, Goa, India
- Website (canonical): ${SITE_URL}
- Website (preview): ${PREVIEW_URL}
- Email: info@goacelebrations.com · brian@goacelebrations.com
- Phone: +91 75074 90443 · +91 97645 06868
- WhatsApp: https://wa.me/917507490443
- Claims: 10+ years experience; 1000+ events managed (as of May 2023 milestone)
- Portfolio venue example: La Cabana Beach & Spa, Goa

## What we offer

1. Destination Theme Weddings — custom theme weddings tailored to the couple's vision
2. Beach Weddings — seaside ceremonies with décor and professional execution
3. Haldi & Mehendi — pre-wedding rituals for destination celebrations
4. Sangeet — themed décor, entertainment and coordination
5. Proposals — scenic and beachside proposal planning
6. Hospitality & Guest Logistics — accommodation, transport, itineraries
7. Celebrations & Private Events — birthdays, pool parties, baby showers, corporate, Holy Communions
8. Décor & Design — stage, entrance, ceremony and thematic styling

## Productised planning tool

Build Your Celebration (${SITE_URL}/plan/build) lets couples select wedding timing, guests, events, venue preference and décor level, then receive an estimated investment range (not a final quotation) and optionally book a consultation.

## Ideal clients

- Couples planning destination or beach weddings in Goa
- Intimate through large multi-day resort weddings
- Domestic, NRI, and international couples

## Brand voice

Premium, editorial, calm. Avoid exaggerated “best in India” claims unless independently verified. Avoid gold/beige Indian wedding clichés.

## Key URLs (canonical)

${staticRoutes.map((r) => `- ${SITE_URL}${r.path === '/' ? '' : r.path}`).join('\n')}
${blogSlugs.map((s) => `- ${SITE_URL}/blogs/${s}`).join('\n')}

## Preview mirror

${staticRoutes.map((r) => `- ${PREVIEW_URL}${r.path === '/' ? '' : r.path}`).join('\n')}
`;

writeFileSync(join(publicDir, 'sitemap.xml'), sitemap);
writeFileSync(join(publicDir, 'robots.txt'), robots);
writeFileSync(join(publicDir, 'llms.txt'), llms);
writeFileSync(join(publicDir, 'llms-full.txt'), llmsFull);

console.log(`SEO/GEO files generated for ${SITE_URL} (preview: ${PREVIEW_URL})`);
