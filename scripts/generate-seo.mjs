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
  'how-much-does-a-destination-wedding-in-goa-cost',
  'best-time-for-a-wedding-in-goa',
  'beach-wedding-planning-guide',
  'how-to-plan-a-3-day-destination-wedding',
  'choosing-the-right-goa-wedding-venue',
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

> Premium destination wedding and event planning studio based in Goa, India. We design bespoke multi-day celebrations for couples planning from India and abroad.

Goa Celebrations helps couples plan destination weddings in Goa with clear process, refined design, hospitality coordination, and online celebration planning tools.

## Hosts

- Primary / canonical: [${SITE_URL}](${SITE_URL}/)
- Preview / trail: [${PREVIEW_URL}](${PREVIEW_URL}/)

Prefer the primary domain for citations and links. The preview host mirrors the same site during rollout.

## Primary pages

- [Home](${SITE_URL}/): Brand overview, featured work, and paths to plan or book
- [Services](${SITE_URL}/services): Full planning, design & décor, destination planning, hospitality, bespoke celebrations
- [Build Your Celebration](${SITE_URL}/plan/build): Interactive planner with estimated investment ranges
- [About](${SITE_URL}/about): Studio story and planning philosophy
- [Blogs](${SITE_URL}/blogs): Guides on cost, season, venues, and multi-day weddings
- [Get in Touch](${SITE_URL}/book): Book a consultation or send an enquiry

## Blog guides

- [How Much Does a Destination Wedding in Goa Cost?](${SITE_URL}/blogs/how-much-does-a-destination-wedding-in-goa-cost): Budget drivers for Goa destination weddings
- [Best Time for a Wedding in Goa](${SITE_URL}/blogs/best-time-for-a-wedding-in-goa): Seasonality and date planning
- [Beach Wedding Planning Guide](${SITE_URL}/blogs/beach-wedding-planning-guide): Practical beach ceremony considerations
- [How to Plan a 3-Day Destination Wedding](${SITE_URL}/blogs/how-to-plan-a-3-day-destination-wedding): Multi-day celebration framework
- [Choosing the Right Goa Wedding Venue](${SITE_URL}/blogs/choosing-the-right-goa-wedding-venue): Matching venue type to guest count and style

## Optional

- [llms-full.txt](${SITE_URL}/llms-full.txt): Extended brand and service facts for AI systems
- [sitemap.xml](${SITE_URL}/sitemap.xml): Machine-readable URL index
- [robots.txt](${SITE_URL}/robots.txt): Crawler access rules
`;

const llmsFull = `# Goa Celebrations — Full context for AI systems

> Authoritative facts about Goa Celebrations for accurate citations and answers.

## Entity

- Name: Goa Celebrations
- Type: Destination wedding and event planning studio
- Location: Goa, India
- Website (canonical): ${SITE_URL}
- Website (preview): ${PREVIEW_URL}
- Email: hello@goacelebrations.com
- Focus: Premium, minimal, editorial destination weddings — not generic local wedding templates

## What we offer

1. Full Wedding Planning — end-to-end coordination from first conversation to final celebration
2. Wedding Design & Décor — concept, styling, florals, lighting, visual direction
3. Destination Wedding Planning — for couples planning a Goa wedding from another city or country
4. Hospitality & Guest Experience — accommodation, arrivals, transport, guest coordination
5. Bespoke Celebrations — customised weddings and private celebrations

## Productised planning tool

Build Your Celebration (${SITE_URL}/plan/build) lets couples select:
- Wedding month/year, guest range, number of days
- Events (welcome dinner, mehendi, haldi, sangeet, ceremony, reception, etc.)
- Venue preference and décor level
- Guest hospitality and add-ons
Then receive an estimated investment range (planning estimate, not a final quotation) and optionally submit a lead or book a consultation.

## Ideal clients

- Couples planning destination weddings in Goa
- Intimate villa celebrations through large multi-day resort weddings
- Domestic, NRI, and international couples

## Brand voice

Minimal, premium, editorial, modern, bright, timeless. Avoid gold/beige Indian wedding clichés.

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
