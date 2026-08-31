import { useEffect } from 'react';
import { absoluteOgImage, absoluteUrl, shareOrigin, SITE } from '../../config/site';
import { titleWithBrand, type PageSeo } from '../../seo/pageMeta';

function setMetaByName(name: string, content: string) {
  let el = document.head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setMetaByProperty(property: string, content: string) {
  let el = document.head.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setJsonLd(id: string, data: unknown) {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

interface SeoProps extends PageSeo {
  jsonLd?: unknown | unknown[];
}

export function Seo({
  title,
  description,
  path,
  image,
  type = 'website',
  noindex = false,
  article,
  jsonLd,
}: SeoProps) {
  useEffect(() => {
    const fullTitle = titleWithBrand(title);
    const origin = shareOrigin();
    const canonical = absoluteUrl(path, SITE.url);
    const pageUrl = absoluteUrl(path, origin);

    const customImage = image?.startsWith('http') ? image : undefined;
    const jpgPath = SITE.ogImagePath.replace(/\.png$/i, '.jpg');
    const ogImage =
      customImage || absoluteOgImage(jpgPath, origin) || absoluteOgImage(undefined, origin);

    document.title = fullTitle;
    document.documentElement.lang = SITE.language;

    setMetaByName('description', description);
    setMetaByName(
      'robots',
      noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    );
    setMetaByName('googlebot', noindex ? 'noindex, nofollow' : 'index, follow');
    setMetaByName('author', SITE.name);
    setMetaByName('geo.region', 'IN-GA');
    setMetaByName('geo.placename', 'Goa');
    setMetaByName('language', SITE.language);

    setLink('canonical', canonical);

    setMetaByProperty('og:type', type);
    setMetaByProperty('og:site_name', SITE.name);
    setMetaByProperty('og:locale', SITE.locale);
    setMetaByProperty('og:title', fullTitle);
    setMetaByProperty('og:description', description);
    setMetaByProperty('og:url', pageUrl);
    setMetaByProperty('og:image', ogImage);
    setMetaByProperty('og:image:secure_url', ogImage);
    setMetaByProperty(
      'og:image:type',
      customImage ? 'image/jpeg' : ogImage.endsWith('.png') ? 'image/png' : 'image/jpeg',
    );
    setMetaByProperty('og:image:width', String(SITE.ogImageWidth));
    setMetaByProperty('og:image:height', String(SITE.ogImageHeight));
    setMetaByProperty('og:image:alt', `${fullTitle} — ${SITE.tagline}`);

    setMetaByName('twitter:card', 'summary_large_image');
    setMetaByName('twitter:title', fullTitle);
    setMetaByName('twitter:description', description);
    setMetaByName('twitter:image', ogImage);
    setMetaByName('twitter:image:alt', `${fullTitle} — ${SITE.tagline}`);

    if (type === 'article' && article) {
      if (article.publishedTime) {
        setMetaByProperty('article:published_time', article.publishedTime);
      }
      if (article.modifiedTime) {
        setMetaByProperty('article:modified_time', article.modifiedTime);
      }
      if (article.author) {
        setMetaByProperty('article:author', article.author);
      }
      if (article.section) {
        setMetaByProperty('article:section', article.section);
      }
    }

    if (jsonLd) {
      const payload = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      setJsonLd('page-jsonld', payload.length === 1 ? payload[0] : payload);
    }
  }, [title, description, path, image, type, noindex, article, jsonLd]);

  return null;
}
