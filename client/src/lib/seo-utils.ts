import { Service, Location } from "@/types/convex";

export function generateSeoTitle(service?: Service, location?: Location): string {
  if (service && location) {
    return `${service.name} ${location.name} | Professional Pool Services | PoolZen`;
  }
  if (service) {
    return `${service.name} Services | PoolZen Pool Maintenance`;
  }
  if (location) {
    return `Pool Services ${location.name} | PoolZen Professional Maintenance`;
  }
  return "PoolZen | Professional Pool Maintenance Services Sydney, Newcastle & Illawarra";
}

export function generateSeoDescription(service?: Service, location?: Location): string {
  if (service && location) {
    return `Professional ${service.name.toLowerCase()} services in ${location.name}. ${service.shortDescription}. Licensed technicians, competitive pricing, same-day service available. Call now for a free quote.`;
  }
  if (service) {
    return `Expert ${service.name.toLowerCase()} services across Sydney, Newcastle & Illawarra. ${service.shortDescription}. Fully licensed and insured pool maintenance professionals.`;
  }
  if (location) {
    return `Complete pool maintenance services in ${location.name}. Pool cleaning, maintenance, chemical balancing & equipment repairs. Licensed professionals serving ${location.suburbs?.slice(0, 3).join(', ')} and surrounding areas.`;
  }
  return "Professional pool maintenance services across Sydney, Newcastle & Illawarra regions. Pool cleaning, maintenance, chemical balancing & equipment repairs. Licensed technicians, competitive pricing.";
}

export function generateSeoKeywords(service?: Service, location?: Location): string {
  const baseKeywords = ["pool maintenance", "pool cleaning", "pool services", "pool repair", "chemical balancing"];
  const serviceKeywords = service ? [service.name.toLowerCase(), service.slug.replace('-', ' ')] : [];
  const locationKeywords = location ? [
    location.name.toLowerCase(),
    location.region.toLowerCase(),
    ...(location.suburbs?.slice(0, 5).map(suburb => suburb.toLowerCase()) || [])
  ] : ["sydney", "newcastle", "illawarra"];

  return [...baseKeywords, ...serviceKeywords, ...locationKeywords].join(', ');
}

export function generateCanonicalUrl(service?: Service, location?: Location): string {
  const baseUrl = import.meta.env.VITE_BASE_URL || window.location.origin;
  
  if (service && location) {
    return `${baseUrl}/services/${service.slug}/${location.slug}`;
  }
  
  return baseUrl;
}

export function generateStructuredData(service?: Service, location?: Location) {
  const baseData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "PoolZen Pool Services",
    "description": "Professional pool maintenance services across Sydney, Newcastle & Illawarra regions",
    "url": import.meta.env.VITE_BASE_URL || window.location.origin,
    "telephone": "1300-766-593",
    "email": "info@poolzen.com.au",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AU",
      "addressRegion": "NSW"
    },
    "openingHours": "Mo-Fr 07:00-18:00,Sa 08:00-16:00",
    "priceRange": "$$",
    "areaServed": [
      {
        "@type": "City",
        "name": "Sydney"
      },
      {
        "@type": "City", 
        "name": "Newcastle"
      },
      {
        "@type": "City",
        "name": "Wollongong"
      }
    ]
  };

  if (service) {
    return {
      ...baseData,
      "@type": "Service",
      "serviceType": service.name,
      "description": service.description,
      "offers": {
        "@type": "Offer",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": service.basePrice,
          "priceCurrency": "AUD",
          "unitText": service.priceUnit
        }
      }
    };
  }

  return baseData;
}
