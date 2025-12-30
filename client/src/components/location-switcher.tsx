import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface ServiceLocationCombination {
  service: string;
  serviceSlug: string;
  location: string;
  locationSlug: string;
  description: string;
  price: string;
  image: string;
}
import poolCleaningImage from "@assets/generated_images/Pool_cleaning_service_action_c0c38e72.png";
import poolMaintenanceImage from "@assets/generated_images/Pool_technician_servicing_equipment_6d67d1ac.png";
import chemicalBalancingImage from "@assets/generated_images/Chemical_balancing_pool_service_acff1d51.png";
import equipmentRepairsImage from "@assets/generated_images/Pool_equipment_repair_service_e8879cfa.png";
import weeklyServiceImage from "@assets/generated_images/Weekly_pool_maintenance_service_3a580d5a.png";
import emergencyRepairsImage from "@assets/generated_images/Emergency_pool_repair_response_3ce742d1.png";

export default function LocationSwitcher() {
  const [selectedRegion, setSelectedRegion] = useState("Sydney");

  const locations = useQuery(api.locations.getAll);
  const services = useQuery(api.services.getAll);

  const filteredLocations = locations?.filter(location => location.region === selectedRegion) || [];
  const regions = Array.from(new Set(locations?.map(location => location.region) || []));

  const serviceImages = [poolCleaningImage, poolMaintenanceImage, chemicalBalancingImage, equipmentRepairsImage];

  // Create dynamic service-location combinations based on selected region
  const getFilteredCombinations = (): ServiceLocationCombination[] => {
    if (!services || !filteredLocations) return [];

    const combinations: ServiceLocationCombination[] = [];
    filteredLocations.forEach(location => {
      services.forEach((service, index) => {
        combinations.push({
          service: service.name,
          serviceSlug: service.slug,
          location: location.name.replace(`${selectedRegion} `, ''), // Remove region prefix for cleaner display
          locationSlug: location.slug,
          description: `${service.description.substring(0, 100)}...`,
          price: `From $${service.basePrice}`,
          image: serviceImages[index % serviceImages.length]
        });
      });
    });

    return combinations.slice(0, 6); // Limit to 6 combinations for display
  };

  const serviceLocationCombinations = getFilteredCombinations();

  return (
    <section id="locations" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-professional-dark mb-4" data-testid="text-locations-title">
            Pool Services Across NSW
          </h2>
          <p className="text-xl text-gray-600" data-testid="text-locations-description">
            Comprehensive pool maintenance solutions tailored to your local area
          </p>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-2 shadow-lg">
            {regions.map((region) => (
              <Button
                key={region}
                variant={selectedRegion === region ? "default" : "ghost"}
                className={selectedRegion === region 
                  ? "bg-pool-blue text-white" 
                  : "text-professional-dark hover:bg-gray-100"
                }
                onClick={() => setSelectedRegion(region)}
                data-testid={`button-region-${region.toLowerCase()}`}
              >
                {region}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Location-First Display */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLocations.map((location, locationIndex) => (
            <Card 
              key={location._id} 
              className="hover:shadow-xl transition-all duration-300 border-2 hover:border-pool-blue"
              data-testid={`card-location-${location.slug}`}
            >
              <CardContent className="p-6">
                {/* Location Header */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-pool-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-map-marker-alt text-white text-xl"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-professional-dark mb-2">
                    {location.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {location.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-1 mb-4">
                    {location.suburbs?.slice(0, 3).map((suburb, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {suburb}
                      </span>
                    ))}
                    {location.suburbs && location.suburbs.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        +{location.suburbs.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Available Services in This Location */}
                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-professional-dark text-center mb-3">
                    Available Services:
                  </h4>
                  {services?.slice(0, 4).map((service) => (
                    <div key={service._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800">{service.name}</div>
                        <div className="text-sm text-gray-600">From ${service.basePrice}</div>
                      </div>
                      <Link href={`/services/${service.slug}/${location.slug}`}>
                        <Button 
                          size="sm"
                          variant="ghost" 
                          className="text-pool-blue hover:text-pool-blue/80 p-2"
                        >
                          <i className="fas fa-arrow-right text-sm"></i>
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Location Actions */}
                <div className="space-y-3">
                  <Link href={`/${location.slug}`}>
                    <Button 
                      className="w-full bg-pool-blue text-white hover:bg-pool-blue/90"
                      data-testid={`button-view-location-${location.slug}`}
                    >
                      View All {location.name} Services
                    </Button>
                  </Link>
                  <Button 
                    variant="outline"
                    className="w-full border-pool-blue text-pool-blue hover:bg-pool-blue hover:text-white"
                    data-testid={`button-quote-location-${location.slug}`}
                  >
                    Get Quote for {location.name.split(' ').pop()}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
