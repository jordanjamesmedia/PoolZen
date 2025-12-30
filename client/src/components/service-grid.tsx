import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface ServiceGridProps {
  locationSlug?: string;
  locationName?: string;
}

export default function ServiceGrid({ locationSlug, locationName = "Sydney" }: ServiceGridProps) {
  const services = useQuery(api.services.getAll);
  const locations = useQuery(api.locations.getAll);
  const isLoading = services === undefined;

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gray-300 rounded-full mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded mb-3"></div>
                  <div className="h-20 bg-gray-300 rounded mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const getServiceIcon = (iconClass: string) => {
    const iconMap: { [key: string]: string } = {
      "fas fa-broom": "🧽",
      "fas fa-wrench": "🔧", 
      "fas fa-flask": "⚗️",
      "fas fa-tools": "🛠️"
    };
    return iconMap[iconClass] || "🏊";
  };

  const getServiceColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      "cleaning": "bg-pool-blue hover:bg-pool-blue/90",
      "maintenance": "bg-fresh-mint hover:bg-fresh-mint/90",
      "chemical": "bg-orange-500 hover:bg-orange-600",
      "repair": "bg-red-500 hover:bg-red-600"
    };
    return colorMap[category] || "bg-pool-blue hover:bg-pool-blue/90";
  };

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-professional-dark mb-4" data-testid="text-services-title">
            Complete Pool Services in {locationName}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-services-description">
            Professional pool maintenance solutions for residential and commercial properties across Sydney, Newcastle, and Illawarra regions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services?.map((service) => (
            <Card 
              key={service.id} 
              className="hover:shadow-xl transition-shadow cursor-pointer group"
              data-testid={`card-service-${service.slug}`}
            >
              <CardContent className="p-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${getServiceColor(service.category)}`}>
                  <span className="text-white text-2xl">{getServiceIcon(service.icon)}</span>
                </div>
                <h3 className="text-xl font-bold text-professional-dark mb-3" data-testid={`text-service-name-${service.slug}`}>
                  {service.name} {locationName}
                </h3>
                <p className="text-gray-600 mb-4" data-testid={`text-service-description-${service.slug}`}>
                  {service.shortDescription}
                </p>
                <div className="text-pool-blue font-semibold mb-4" data-testid={`text-service-price-${service.slug}`}>
                  From ${service.basePrice}/{service.priceUnit}
                </div>
                <Link 
                  href={locationSlug ? `/services/${service.slug}/${locationSlug}` : `/services/${service.slug}/sydney-north-shore`}
                >
                  <Button 
                    className="w-full bg-pool-blue text-white hover:bg-pool-blue/90"
                    data-testid={`button-learn-more-${service.slug}`}
                  >
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Service Area Coverage */}
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-professional-dark mb-6 text-center" data-testid="text-coverage-title">
              Service Area Coverage
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-pool-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🏙️</span>
                </div>
                <h4 className="text-xl font-bold text-professional-dark mb-2" data-testid="text-sydney-region">Sydney Region</h4>
                <p className="text-gray-600" data-testid="text-sydney-areas">North Shore, Eastern Suburbs, Inner West, South Sydney, Western Sydney</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-fresh-mint rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🗺️</span>
                </div>
                <h4 className="text-xl font-bold text-professional-dark mb-2" data-testid="text-newcastle-region">Newcastle</h4>
                <p className="text-gray-600" data-testid="text-newcastle-areas">Newcastle, Lake Macquarie, Port Stephens, Hunter Valley</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">⛰️</span>
                </div>
                <h4 className="text-xl font-bold text-professional-dark mb-2" data-testid="text-illawarra-region">Illawarra</h4>
                <p className="text-gray-600" data-testid="text-illawarra-areas">Wollongong, Shellharbour, Kiama, Southern Highlands</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
