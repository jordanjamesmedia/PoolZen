import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Star } from "lucide-react";

interface ServiceArea {
  region: string;
  locations: {
    name: string;
    slug: string;
    suburbs: string[];
    isActive: boolean;
  }[];
}

export default function ServiceAreaMap() {
  const serviceAreas: ServiceArea[] = [
    {
      region: "Sydney Metropolitan",
      locations: [
        {
          name: "Sydney North Shore",
          slug: "sydney-north-shore",
          suburbs: ["Mosman", "Neutral Bay", "Chatswood", "Lane Cove", "Willoughby", "Artarmon", "Cremorne"],
          isActive: true
        },
        {
          name: "Sydney Eastern Suburbs", 
          slug: "sydney-eastern-suburbs",
          suburbs: ["Bondi", "Double Bay", "Paddington", "Woollahra", "Rose Bay", "Vaucluse", "Coogee"],
          isActive: true
        },
        {
          name: "Sydney Inner West",
          slug: "sydney-inner-west",
          suburbs: ["Leichhardt", "Balmain", "Newtown", "Glebe", "Marrickville", "Dulwich Hill", "Annandale"],
          isActive: true
        },
        {
          name: "Sydney South",
          slug: "sydney-south",
          suburbs: ["Cronulla", "Miranda", "Hurstville", "Kogarah", "Brighton-Le-Sands", "Sans Souci", "Caringbah"],
          isActive: true
        },
        {
          name: "Sydney West",
          slug: "sydney-west", 
          suburbs: ["Parramatta", "Blacktown", "Penrith", "Castle Hill", "Baulkham Hills", "Ryde", "Homebush"],
          isActive: true
        }
      ]
    },
    {
      region: "Newcastle & Hunter Valley",
      locations: [
        {
          name: "Newcastle",
          slug: "newcastle",
          suburbs: ["Newcastle", "Lake Macquarie", "Port Stephens", "Cessnock", "Maitland", "Raymond Terrace", "Wallsend"],
          isActive: true
        }
      ]
    },
    {
      region: "Illawarra & South Coast",
      locations: [
        {
          name: "Illawarra",
          slug: "illawarra",
          suburbs: ["Wollongong", "Shellharbour", "Kiama", "Port Kembla", "Dapto", "Corrimal", "Thirroul"],
          isActive: true
        }
      ]
    }
  ];

  return (
    <section className="py-16 bg-white" id="service-areas" data-testid="service-area-map">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-professional-dark mb-4" data-testid="service-areas-title">
            Our Service Areas Across NSW
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="service-areas-description">
            Professional pool services available throughout Sydney, Newcastle, and Illawarra regions. 
            Same-day emergency service available in most areas.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {serviceAreas.map((area, areaIndex) => (
            <Card key={areaIndex} className="shadow-lg hover:shadow-xl transition-shadow" data-testid={`service-area-${areaIndex}`}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-pool-blue rounded-full flex items-center justify-center mr-3">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-professional-dark" data-testid={`region-title-${areaIndex}`}>
                    {area.region}
                  </h3>
                </div>

                <div className="space-y-4">
                  {area.locations.map((location, locationIndex) => (
                    <div key={locationIndex} className="border-l-4 border-fresh-mint pl-4" data-testid={`location-${areaIndex}-${locationIndex}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-professional-dark" data-testid={`location-name-${areaIndex}-${locationIndex}`}>
                          {location.name}
                        </h4>
                        {location.isActive && (
                          <Badge variant="outline" className="text-trust-green border-trust-green">
                            Active
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {location.suburbs.slice(0, 4).map((suburb, suburbIndex) => (
                          <Badge key={suburbIndex} variant="secondary" className="text-xs">
                            {suburb}
                          </Badge>
                        ))}
                        {location.suburbs.length > 4 && (
                          <Badge variant="secondary" className="text-xs">
                            +{location.suburbs.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="bg-pool-blue rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4" data-testid="service-areas-cta-title">
            Not Sure If We Service Your Area?
          </h3>
          <p className="text-blue-100 mb-6 text-lg" data-testid="service-areas-cta-description">
            We're constantly expanding our service areas. Contact us to check availability in your suburb.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-yellow-400" />
              <div>
                <div className="font-semibold text-yellow-400" data-testid="service-areas-phone">1300 POOL ZEN</div>
                <div className="text-sm text-blue-200">Call now for instant quote</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Star className="h-5 w-5 text-yellow-400" />
              <div>
                <div className="font-semibold text-yellow-400" data-testid="service-areas-rating">4.9/5 Rating</div>
                <div className="text-sm text-blue-200">From 247+ reviews</div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <a 
              href="#contact" 
              className="inline-flex items-center bg-white text-pool-blue px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              data-testid="service-areas-contact-button"
            >
              Get Free Quote Today
            </a>
          </div>
        </div>

        {/* Schema markup for service areas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ServiceArea",
              "name": "PoolZen Pool Services Coverage Area",
              "serviceArea": serviceAreas.flatMap(area => 
                area.locations.map(location => ({
                  "@type": "City",
                  "name": location.name,
                  "addressRegion": "NSW",
                  "addressCountry": "AU"
                }))
              )
            })
          }}
        />
      </div>
    </section>
  );
}