import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRoute } from "wouter";
import SeoHead from "@/components/seo-head";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ServiceGrid from "@/components/service-grid";
import TrustIndicators from "@/components/trust-indicators";
import ContactForm from "@/components/contact-form";
import FAQSection from "@/components/faq-section";
import LocalSchema from "@/components/local-schema";
import Breadcrumb from "@/components/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Star, Clock, Shield, Award, CheckCircle, ArrowRight, Wrench } from "lucide-react";

export default function LocationPage() {
  const [, params] = useRoute("/:locationSlug");
  const { locationSlug } = params || {};

  const location = useQuery(api.locations.getBySlug, locationSlug ? { slug: locationSlug } : "skip");
  const services = useQuery(api.services.getAll);
  const isLoading = location === undefined;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-clean-white">
        <Header />
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-300 rounded mb-4 w-3/4"></div>
              <div className="h-6 bg-gray-300 rounded mb-2 w-full"></div>
              <div className="h-6 bg-gray-300 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="min-h-screen bg-clean-white">
        <Header />
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-professional-dark mb-4">
                Location Not Found
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                The location you're looking for doesn't exist.
              </p>
              <Button asChild>
                <a href="/">Return Home</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: location.name }
  ];

  const locationServices = [
    "Pool Cleaning & Maintenance",
    "Chemical Balancing & Testing", 
    "Equipment Repairs & Servicing",
    "Emergency Pool Services",
    "Pool Equipment Installation",
    "Water Quality Management"
  ];

  const localBenefits = [
    `Local ${location.region} technicians`,
    "Same-day service available",
    "Familiar with local pool conditions",
    "Competitive local pricing",
    "Community-focused service"
  ];

  const generateLocationTitle = () => {
    return `Pool Services ${location.name} | Professional Pool Maintenance ${location.region} | PoolZen`;
  };

  const generateLocationDescription = () => {
    return `Professional pool services in ${location.name}. Expert pool cleaning, maintenance, and repairs across ${location.suburbs?.slice(0,3).join(", ")} and surrounding ${location.region} areas. Same-day service available.`;
  };

  const generateLocationKeywords = () => {
    const baseKeywords = [
      `pool services ${location.name.toLowerCase()}`,
      `pool cleaning ${location.region.toLowerCase()}`,
      `pool maintenance ${location.name.toLowerCase()}`,
      `pool repairs ${location.region.toLowerCase()}`
    ];
    
    if (location.suburbs) {
      location.suburbs.forEach(suburb => {
        baseKeywords.push(`pool services ${suburb.toLowerCase()}`);
      });
    }
    
    return baseKeywords.join(", ");
  };

  return (
    <div className="min-h-screen bg-clean-white">
      <SeoHead
        title={generateLocationTitle()}
        description={generateLocationDescription()}
        keywords={generateLocationKeywords()}
        canonical={`https://poolzen.com.au/${location.slug}`}
      />
      <LocalSchema location={location} />
      
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16 lg:py-24" style={{ backgroundColor: '#1d4ed8' }}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <MapPin className="h-6 w-6 text-yellow-400" />
              <span className="text-yellow-400 font-semibold text-lg">
                Proudly Serving {location.name}
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6" style={{ color: '#ffffff' }}>
              Pool Services in{" "}
              <span className="text-yellow-400">{location.name}</span>
            </h1>
            
            <p className="text-xl lg:text-2xl mb-8" style={{ color: '#ffffff' }}>
              {location.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 font-bold text-lg px-8 py-4"
              >
                Get Free Quote
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white hover:bg-white hover:text-pool-blue font-bold text-lg px-8 py-4"
                style={{ color: '#ffffff' }}
              >
                Call 1300 POOL ZEN
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-emerald-300" />
                <span style={{ color: '#ffffff' }}>Fully Insured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-emerald-300" />
                <span style={{ color: '#ffffff' }}>Licensed Technicians</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-emerald-300" />
                <span style={{ color: '#ffffff' }}>Same Day Service</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span style={{ color: '#ffffff' }}>4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-pool-blue mb-2">500+</div>
              <div className="text-gray-600">Pools Maintained</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-fresh-mint mb-2">24hrs</div>
              <div className="text-gray-600">Average Response</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-sunshine-yellow mb-2">4.9★</div>
              <div className="text-gray-600">Customer Rating</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-pool-blue mb-2">10+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-professional-dark mb-4">
              Comprehensive Pool Services in {location.name}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From routine maintenance to emergency repairs, we provide complete pool care solutions 
              for residential and commercial properties across {location.region}.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-professional-dark mb-6">
                Our {location.name} Pool Services
              </h3>
              <div className="space-y-4">
                {locationServices.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-trust-green flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-professional-dark mb-6">
                Why Choose PoolZen in {location.region}?
              </h3>
              <div className="space-y-4">
                {localBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-fresh-mint flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Areas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-professional-dark mb-4">
              Areas We Serve in {location.name}
            </h2>
            <p className="text-xl text-gray-600">
              Professional pool services across all suburbs in {location.region}
            </p>
          </div>
          
          {location.suburbs && (
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {location.suburbs.map((suburb, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <MapPin className="h-6 w-6 text-pool-blue mx-auto mb-2" />
                      <h3 className="font-semibold text-professional-dark mb-1">{suburb}</h3>
                      <p className="text-sm text-gray-600">Pool Services Available</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Don't see your suburb listed? We serve the entire {location.region} region.
            </p>
            <Button className="bg-pool-blue text-white hover:bg-pool-blue/90">
              Check Service Availability
            </Button>
          </div>
        </div>
      </section>

      {/* All Services Available in This Location */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-professional-dark mb-4">
              Professional Pool Services in {location.name}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive range of pool services, all available in {location.name} and surrounding areas.
            </p>
          </div>

          {services && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <Card key={service._id} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-pool-blue">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-pool-blue rounded-full flex items-center justify-center mx-auto mb-4">
                        <Wrench className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-professional-dark mb-3">
                        {service.name}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {service.shortDescription}
                      </p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Starting from:</span>
                        <span className="font-bold text-pool-blue text-lg">
                          ${service.basePrice}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Per:</span>
                        <span className="font-medium text-gray-800">
                          {service.priceUnit}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button 
                        asChild
                        className="w-full bg-pool-blue text-white hover:bg-pool-blue/90"
                      >
                        <a href={`/services/${service.slug}/${location.slug}`}>
                          View {service.name} Details
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </a>
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="w-full border-pool-blue text-pool-blue hover:bg-pool-blue hover:text-white"
                      >
                        Get Free Quote
                      </Button>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Shield className="h-3 w-3" />
                          <span>Insured</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Award className="h-3 w-3" />
                          <span>Licensed</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>Same Day</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-professional-dark mb-4">
                Need a Custom Pool Service Package?
              </h3>
              <p className="text-gray-600 mb-6">
                We can combine multiple services for comprehensive pool care in {location.name}. 
                Contact us for a personalized quote.
              </p>
              <Button className="bg-pool-blue text-white hover:bg-pool-blue/90">
                Get Custom Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      <TrustIndicators />
      <FAQSection locationName={location.name} />
      <ContactForm />
      <Footer />
    </div>
  );
}