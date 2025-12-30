import { Service, Location } from "@/types/convex";

// SEO Configuration based on Ahrefs keyword research
const SEO_CONFIG = {
  siteName: "PoolZen",
  baseUrl: "https://pool-zen.vercel.app",
  phone: "1300 766 593",
  phoneFormatted: "1300 POOL ZEN",
  email: "info@poolzen.com.au",
  regions: ["Sydney", "Newcastle", "Illawarra"],
  
  // High-value keywords from Ahrefs research (AU market)
  primaryKeywords: [
    "pool service near me",           // SV: 700, KD: 7
    "swimming pool maintenance",      // SV: 350, KD: 8
    "pool maintenance sydney",        // SV: 100, KD: 7
    "pool cleaning sydney",           // SV: 100, KD: 22
    "pool equipment repair",          // SV: 60, KD: 0
  ],
  
  // Long-tail keywords for specific pages
  locationKeywords: {
    sydney: ["pool maintenance sydney", "pool cleaning sydney", "pool service sydney", "pool cleaner sydney"],
    newcastle: ["pool maintenance newcastle", "pool cleaning newcastle", "pool service newcastle"],
    illawarra: ["pool maintenance wollongong", "pool cleaning illawarra", "pool service wollongong"],
  },
  
  serviceKeywords: {
    "pool-cleaning": ["pool cleaning service", "pool cleaning near me", "swimming pool cleaning", "pool cleaning companies"],
    "pool-maintenance": ["pool maintenance service", "swimming pool maintenance", "pool maintenance near me", "pool maintenance cost"],
    "chemical-balancing": ["pool chemical balancing", "pool water testing", "pool chemical service", "pool water treatment"],
    "equipment-repairs": ["pool equipment repair", "pool pump repair", "pool filter repair", "pool heater repair"],
  }
};

/**
 * Generate SEO-optimized title based on Ahrefs keyword research
 */
export function generateSeoTitle(service?: Service, location?: Location, suburb?: string): string {
  const { siteName } = SEO_CONFIG;
  
  if (service && location) {
    // Service + Location pages (highest SEO value)
    return `${service.name} ${location.name} | From $${service.basePrice} | ${siteName}`;
  }
  
  if (service && suburb) {
    // Service + Suburb pages
    return `${service.name} ${suburb} | Professional Pool Services | ${siteName}`;
  }
  
  if (service) {
    // Service-only pages
    return `${service.name} Services Sydney | Expert Pool Care | ${siteName}`;
  }
  
  if (location) {
    // Location pages - target "pool maintenance [location]" keyword
    return `Pool Maintenance ${location.name} | Cleaning & Repairs | ${siteName}`;
  }
  
  if (suburb) {
    // Suburb pages
    return `Pool Services ${suburb} | Local Pool Maintenance | ${siteName}`;
  }
  
  // Homepage - target primary keywords
  return `Pool Cleaning & Maintenance Sydney | Same Day Service | ${siteName}`;
}

/**
 * Generate SEO-optimized description (155-160 chars optimal)
 */
export function generateSeoDescription(service?: Service, location?: Location, suburb?: string): string {
  if (service && location) {
    return `Professional ${service.name.toLowerCase()} in ${location.name}. ${service.shortDescription}. Licensed technicians, from $${service.basePrice}/${service.priceUnit}. Same-day service available. Call ${SEO_CONFIG.phoneFormatted}!`;
  }
  
  if (service && suburb) {
    return `Expert ${service.name.toLowerCase()} services in ${suburb}. ${service.shortDescription}. Fully licensed & insured pool technicians. Free quotes available!`;
  }
  
  if (service) {
    return `Professional ${service.name.toLowerCase()} across Sydney, Newcastle & Illawarra. ${service.shortDescription}. Licensed technicians, competitive pricing. Get a free quote today!`;
  }
  
  if (location) {
    const suburbList = location.suburbs?.slice(0, 3).join(', ') || '';
    return `Expert pool maintenance & cleaning in ${location.name}. Serving ${suburbList} & surrounds. Licensed technicians, same-day service. Call ${SEO_CONFIG.phoneFormatted} for free quote!`;
  }
  
  if (suburb) {
    return `Local pool cleaning & maintenance in ${suburb}. Professional technicians, competitive rates, same-day service available. Call ${SEO_CONFIG.phoneFormatted} for a free quote!`;
  }
  
  // Homepage - optimized for primary keywords
  return `Sydney's trusted pool maintenance experts. Professional pool cleaning, chemical balancing & equipment repairs across Sydney, Newcastle & Illawarra. Same-day service. Call ${SEO_CONFIG.phoneFormatted}!`;
}

/**
 * Generate keyword-rich meta keywords
 */
export function generateSeoKeywords(service?: Service, location?: Location, suburb?: string): string {
  const baseKeywords = [
    "pool service near me",
    "swimming pool maintenance", 
    "pool cleaning",
    "pool maintenance",
    "pool repair"
  ];
  
  const serviceKeywords = service 
    ? SEO_CONFIG.serviceKeywords[service.slug as keyof typeof SEO_CONFIG.serviceKeywords] || [service.name.toLowerCase()]
    : [];
    
  const locationKeywords: string[] = [];
  
  if (location) {
    const regionKey = location.region.toLowerCase() as keyof typeof SEO_CONFIG.locationKeywords;
    locationKeywords.push(
      ...(SEO_CONFIG.locationKeywords[regionKey] || []),
      location.name.toLowerCase(),
      `pool service ${location.name.toLowerCase()}`,
      ...(location.suburbs?.slice(0, 5).map(s => s.toLowerCase()) || [])
    );
  }
  
  if (suburb) {
    locationKeywords.push(
      suburb.toLowerCase(),
      `pool cleaning ${suburb.toLowerCase()}`,
      `pool maintenance ${suburb.toLowerCase()}`,
      `pool service ${suburb.toLowerCase()}`
    );
  }
  
  // Deduplicate and join
  const allKeywords = [...new Set([...baseKeywords, ...serviceKeywords, ...locationKeywords])];
  return allKeywords.slice(0, 15).join(', ');
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(service?: Service, location?: Location, suburb?: string): string {
  const { baseUrl } = SEO_CONFIG;
  
  if (service && location) {
    return `${baseUrl}/services/${service.slug}/${location.slug}`;
  }
  
  if (location) {
    return `${baseUrl}/${location.slug}`;
  }
  
  if (suburb) {
    return `${baseUrl}/${suburb.toLowerCase().replace(/\s+/g, '-')}`;
  }
  
  return baseUrl;
}

/**
 * Generate Open Graph data
 */
export function generateOpenGraphData(service?: Service, location?: Location, suburb?: string) {
  return {
    title: generateSeoTitle(service, location, suburb),
    description: generateSeoDescription(service, location, suburb),
    url: generateCanonicalUrl(service, location, suburb),
    siteName: SEO_CONFIG.siteName,
    type: 'website',
    locale: 'en_AU',
    image: `${SEO_CONFIG.baseUrl}/og-image.jpg`,
    imageWidth: 1200,
    imageHeight: 630,
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

/**
 * Generate FAQ structured data for rich snippets
 */
export function generateFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Generate Service structured data
 */
export function generateServiceSchema(service: Service, location?: Location) {
  const { baseUrl, siteName, phone } = SEO_CONFIG;
  
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": location ? `${service.name} in ${location.name}` : service.name,
    "description": service.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": `${siteName} Pool Services`,
      "telephone": phone,
      "url": baseUrl
    },
    "areaServed": location ? {
      "@type": "City",
      "name": location.name,
      "addressRegion": "NSW",
      "addressCountry": "AU"
    } : SEO_CONFIG.regions.map(region => ({
      "@type": "City",
      "name": region,
      "addressRegion": "NSW",
      "addressCountry": "AU"
    })),
    "offers": {
      "@type": "Offer",
      "price": service.basePrice.toString(),
      "priceCurrency": "AUD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": service.basePrice.toString(),
        "priceCurrency": "AUD",
        "unitText": `per ${service.priceUnit}`
      },
      "availability": "https://schema.org/InStock"
    },
    "serviceType": service.category,
    "category": "Pool Services"
  };
}

/**
 * Generate LocalBusiness structured data
 */
export function generateLocalBusinessSchema(location?: Location) {
  const { baseUrl, siteName, phone, email } = SEO_CONFIG;
  
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": baseUrl,
    "name": `${siteName} Pool Services`,
    "alternateName": siteName,
    "description": "Professional pool maintenance, cleaning, and repair services across Sydney, Newcastle, and Illawarra regions. Licensed technicians, same-day service available.",
    "url": baseUrl,
    "telephone": phone,
    "email": email,
    "logo": `${baseUrl}/logo.png`,
    "image": `${baseUrl}/og-image.jpg`,
    "priceRange": "$79-$149",
    "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer", "EFTPOS"],
    "currenciesAccepted": "AUD",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "16:00"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Sydney, NSW",
      "addressLocality": "Sydney",
      "addressRegion": "NSW",
      "postalCode": "2000",
      "addressCountry": "AU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -33.8688,
      "longitude": 151.2093
    },
    "areaServed": location ? [{
      "@type": "City",
      "name": location.name,
      "addressRegion": "NSW",
      "addressCountry": "AU"
    }] : SEO_CONFIG.regions.map(region => ({
      "@type": "City",
      "name": region,
      "addressRegion": "NSW",
      "addressCountry": "AU"
    })),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Pool Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Pool Cleaning",
            "description": "Regular pool cleaning, skimming, vacuuming, and maintenance"
          },
          "price": "99",
          "priceCurrency": "AUD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Pool Maintenance",
            "description": "Comprehensive pool equipment maintenance and optimization"
          },
          "price": "149",
          "priceCurrency": "AUD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Chemical Balancing",
            "description": "Water testing and chemical balancing for safe swimming"
          },
          "price": "79",
          "priceCurrency": "AUD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Equipment Repairs",
            "description": "Pool equipment repair and replacement services"
          },
          "price": "120",
          "priceCurrency": "AUD"
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "500",
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      "https://www.facebook.com/poolzen",
      "https://www.instagram.com/poolzen"
    ]
  };
}

export { SEO_CONFIG };
