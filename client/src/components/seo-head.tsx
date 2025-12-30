import { useEffect } from 'react';

interface SeoHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  structuredData?: object | object[];
}

const BASE_URL = 'https://pool-zen.vercel.app';

export default function SeoHead({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = `${BASE_URL}/og-image.jpg`,
  ogType = 'website',
  noindex = false,
  structuredData
}: SeoHeadProps) {
  useEffect(() => {
    // Set document title (optimized for search - keep under 60 chars for full display)
    document.title = title.length > 60 ? title.substring(0, 57) + '...' : title;

    // Helper to set or create meta tag
    const setMetaTag = (selector: string, content: string, attribute: 'name' | 'property' = 'name') => {
      let meta = document.querySelector(selector) as HTMLMetaElement;
      if (meta) {
        meta.content = content;
      } else {
        meta = document.createElement('meta');
        if (attribute === 'property') {
          meta.setAttribute('property', selector.replace('meta[property="', '').replace('"]', ''));
        } else {
          meta.name = selector.replace('meta[name="', '').replace('"]', '');
        }
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    // Set meta description (optimal: 150-160 characters)
    const truncatedDescription = description.length > 160 
      ? description.substring(0, 157) + '...' 
      : description;
    setMetaTag('meta[name="description"]', truncatedDescription);

    // Set meta keywords
    if (keywords) {
      setMetaTag('meta[name="keywords"]', keywords);
    }

    // Set robots meta
    const robotsContent = noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    setMetaTag('meta[name="robots"]', robotsContent);

    // Set canonical URL
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (link) {
        link.href = canonical;
      } else {
        link = document.createElement('link');
        link.rel = 'canonical';
        link.href = canonical;
        document.head.appendChild(link);
      }
    }

    // Open Graph tags
    setMetaTag('meta[property="og:title"]', ogTitle || title, 'property');
    setMetaTag('meta[property="og:description"]', ogDescription || truncatedDescription, 'property');
    setMetaTag('meta[property="og:type"]', ogType, 'property');
    setMetaTag('meta[property="og:image"]', ogImage, 'property');
    setMetaTag('meta[property="og:image:width"]', '1200', 'property');
    setMetaTag('meta[property="og:image:height"]', '630', 'property');
    setMetaTag('meta[property="og:locale"]', 'en_AU', 'property');
    setMetaTag('meta[property="og:site_name"]', 'PoolZen Pool Services', 'property');
    if (canonical) {
      setMetaTag('meta[property="og:url"]', canonical, 'property');
    }

    // Twitter Card tags
    setMetaTag('meta[name="twitter:card"]', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', ogTitle || title);
    setMetaTag('meta[name="twitter:description"]', ogDescription || truncatedDescription);
    setMetaTag('meta[name="twitter:image"]', ogImage);
    if (canonical) {
      setMetaTag('meta[name="twitter:url"]', canonical);
    }

    // Add structured data if provided
    if (structuredData) {
      // Remove existing structured data scripts (except the base ones in index.html)
      document.querySelectorAll('script[data-seo-structured]').forEach(el => el.remove());
      
      const dataArray = Array.isArray(structuredData) ? structuredData : [structuredData];
      dataArray.forEach((data, index) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo-structured', `schema-${index}`);
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
      });
    }

    // Cleanup function
    return () => {
      document.querySelectorAll('script[data-seo-structured]').forEach(el => el.remove());
    };
  }, [title, description, keywords, canonical, ogTitle, ogDescription, ogImage, ogType, noindex, structuredData]);

  return null;
}
