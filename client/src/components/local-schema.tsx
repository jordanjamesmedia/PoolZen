import { type Service, type Location } from "@shared/schema";

interface LocalSchemaProps {
  service?: Service;
  location?: Location;
}

export default function LocalSchema({ service, location }: LocalSchemaProps) {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://poolzen.com.au",
    "name": "PoolZen Pool Services",
    "alternateName": "PoolZen",
    "description": "Professional pool maintenance, cleaning, and repair services across Sydney, Newcastle, and Illawarra regions. Licensed technicians, same-day service available.",
    "url": "https://poolzen.com.au",
    "telephone": "1300766593",
    "email": "info@poolzen.com.au",
    "logo": "https://poolzen.com.au/logo.png",
    "image": "https://poolzen.com.au/images/poolzen-hero.jpg",
    "priceRange": "$79-$149",
    "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
    "currenciesAccepted": "AUD",
    "openingHours": [
      "Mo-Fr 07:00-18:00",
      "Sa 08:00-16:00"
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": -33.8688,
        "longitude": 151.2093
      },
      "geoRadius": "100000"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Sydney",
        "addressRegion": "NSW",
        "addressCountry": "AU"
      },
      {
        "@type": "City", 
        "name": "Newcastle",
        "addressRegion": "NSW",
        "addressCountry": "AU"
      },
      {
        "@type": "City",
        "name": "Wollongong", 
        "addressRegion": "NSW",
        "addressCountry": "AU"
      }
    ],
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
          "priceCurrency": "AUD",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "99",
            "priceCurrency": "AUD",
            "unitText": "per visit"
          }
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
      "reviewCount": "247",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Sarah M."
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Excellent service! The team is professional, reliable, and my pool has never looked better. Highly recommend PoolZen for all pool maintenance needs."
      }
    ]
  };

  // Add service-specific schema if service is provided
  if (service && location) {
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `${service.name} in ${location.name}`,
      "description": service.description,
      "provider": {
        "@type": "LocalBusiness",
        "name": "PoolZen Pool Services",
        "telephone": "1300766593",
        "url": "https://poolzen.com.au"
      },
      "areaServed": {
        "@type": "City",
        "name": location.name,
        "addressRegion": "NSW", 
        "addressCountry": "AU"
      },
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
        "availability": "https://schema.org/InStock",
        "validFrom": new Date().toISOString().split('T')[0]
      },
      "serviceType": service.category,
      "category": "Pool Services"
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(baseSchema) }}
        />
        <script
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      </>
    );
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(baseSchema) }}
    />
  );
}