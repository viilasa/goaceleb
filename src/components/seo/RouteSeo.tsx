import { useLocation } from 'react-router-dom';
import { Seo } from './Seo';
import { faqs } from '../../data/brand';
import { getArticleBySlug } from '../../data/journal';
import { absoluteUrl, SITE } from '../../config/site';
import {
  breadcrumbJsonLd,
  organizationJsonLd,
  resolveSeo,
  websiteJsonLd,
} from '../../seo/pageMeta';

export function RouteSeo() {
  const { pathname } = useLocation();
  const base = resolveSeo(pathname);

  if (pathname.startsWith('/blogs/')) {
    const slug = pathname.replace('/blogs/', '');
    const article = getArticleBySlug(slug);
    if (article) {
      const articleLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt,
        image: [article.coverImage],
        datePublished: article.date,
        dateModified: article.date,
        author: {
          '@type': 'Organization',
          name: SITE.name,
          url: SITE.url,
        },
        publisher: {
          '@type': 'Organization',
          name: SITE.name,
          logo: {
            '@type': 'ImageObject',
            url: absoluteUrl('/favicon.svg'),
          },
        },
        mainEntityOfPage: absoluteUrl(`/blogs/${article.slug}`),
        articleSection: article.category,
        inLanguage: SITE.language,
      };

      return (
        <Seo
          title={article.title}
          description={article.excerpt}
          path={`/blogs/${article.slug}`}
          image={article.coverImage}
          type="article"
          article={{
            publishedTime: article.date,
            modifiedTime: article.date,
            author: SITE.name,
            section: article.category,
          }}
          jsonLd={[
            organizationJsonLd(),
            websiteJsonLd(),
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Blogs', path: '/blogs' },
              { name: article.title, path: `/blogs/${article.slug}` },
            ]),
            articleLd,
          ]}
        />
      );
    }
  }

  const crumbs = [{ name: 'Home', path: '/' }];
  if (pathname !== '/') {
    crumbs.push({ name: base.title.split('|')[0].trim(), path: base.path });
  }

  const faqLd =
    pathname === '/'
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <Seo
      {...base}
      jsonLd={[
        organizationJsonLd(),
        websiteJsonLd(),
        breadcrumbJsonLd(crumbs),
        ...(faqLd ? [faqLd] : []),
      ]}
    />
  );
}
