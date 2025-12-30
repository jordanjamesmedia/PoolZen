import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRoute } from "wouter";
import SeoHead from "@/components/seo-head";
import Header from "@/components/header";
import Hero from "@/components/hero";
import ServiceGrid from "@/components/service-grid";
import TrustIndicators from "@/components/trust-indicators";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  generateSeoTitle, 
  generateSeoDescription, 
  generateSeoKeywords, 
  generateCanonicalUrl,
  generateServiceSchema,
  generateLocalBusinessSchema,
  generateBreadcrumbSchema
} from "@/lib/seo-utils";
import { CheckCircle, Clock, Shield, Star } from "lucide-react";
import Breadcrumb from "@/components/breadcrumb";
import FAQSection from "@/components/faq-section";
import LocalSchema from "@/components/local-schema";

export default function ServiceLocation() {
  const [, params] = useRoute("/services/:serviceSlug/:locationSlug");
  const { serviceSlug, locationSlug } = params || {};

  const service = useQuery(api.services.getBySlug, serviceSlug ? { slug: serviceSlug } : "skip");
  const location = useQuery(api.locations.getBySlug, locationSlug ? { slug: locationSlug } : "skip");
  const allSuburbs = useQuery(api.suburbs.getAll);
  const allLocations = useQuery(api.locations.getAll);

  const isLoading = service === undefined || location === undefined;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-clean-white">
        <Header />
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-300 rounded mb-4 w-3/4"></div>
              <div className="h-6 bg-gray-300 rounded mb-6 w-1/2"></div>
              <div className="h-40 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!service || !location) {
    return (
      <div className="min-h-screen bg-clean-white">
        <Header />
        <div className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-professional-dark mb-4">Service Not Found</h1>
            <p className="text-xl text-gray-600">The requested service or location could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  const whatsIncluded = [
    "Professional equipment and tools",
    "Licensed and insured technicians", 
    "Quality guarantee on all work",
    "Detailed service report",
    "Follow-up support and advice"
  ];

  const serviceProcess = [
    { step: 1, title: "Book Online or Call", description: "Schedule your service at a convenient time" },
    { step: 2, title: "Professional Assessment", description: "Our technician evaluates your pool's needs" },
    { step: 3, title: "Service Completion", description: "We complete the work to the highest standards" },
    { step: 4, title: "Quality Check", description: "Final inspection and customer satisfaction check" }
  ];

  const breadcrumbItems = [
    { label: "Services", href: "/#services" },
    { label: service.name, href: `/services/${service.slug}/sydney-north-shore` },
    { label: location.name }
  ];

  // Generate structured data for SEO
  const baseUrl = "https://pool-zen.vercel.app";
  const structuredData = [
    generateServiceSchema(service, location),
    generateLocalBusinessSchema(location),
    generateBreadcrumbSchema([
      { name: "Home", url: baseUrl },
      { name: "Services", url: `${baseUrl}/#services` },
      { name: service.name, url: `${baseUrl}/services/${service.slug}/sydney-north-shore` },
      { name: location.name, url: `${baseUrl}/services/${service.slug}/${location.slug}` }
    ])
  ];

  return (
    <div className="min-h-screen bg-clean-white">
      <SeoHead
        title={generateSeoTitle(service, location)}
        description={generateSeoDescription(service, location)}
        keywords={generateSeoKeywords(service, location)}
        canonical={generateCanonicalUrl(service, location)}
        structuredData={structuredData}
      />
      <LocalSchema service={service} location={location} />
      
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <Hero locationName={location.name} serviceName={service.name} />
      
      {/* Service Details Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Badge variant="secondary" className="bg-pool-blue text-white">
                  {service.category.toUpperCase()}
                </Badge>
                <Badge variant="outline">
                  {location.region}
                </Badge>
              </div>
              
              <h1 className="text-4xl font-bold text-professional-dark mb-6" data-testid="text-service-title">
                {service.name} in {location.name}
              </h1>
              
              <p className="text-xl text-gray-600 mb-8" data-testid="text-service-description">
                {service.description}
              </p>
              
              <div className="flex items-center space-x-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-pool-blue" data-testid="text-service-price">
                    ${service.basePrice}
                  </div>
                  <div className="text-sm text-gray-600">per {service.priceUnit}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center text-yellow-500 mb-1">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                  <div className="text-sm text-gray-600">4.9/5 Rating</div>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-trust-green" />
                  <span className="text-gray-700 font-medium">Same-day service available</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-trust-green" />
                  <span className="text-gray-700 font-medium">Fully licensed and insured</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-trust-green" />
                  <span className="text-gray-700 font-medium">100% satisfaction guarantee</span>
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="bg-pool-blue text-white hover:bg-pool-blue/90"
                data-testid="button-book-now"
              >
                Book {service.name} Now
              </Button>
            </div>
            
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-professional-dark mb-6" data-testid="text-whats-included">
                  What's Included
                </h3>
                <ul className="space-y-4">
                  {whatsIncluded.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-trust-green mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700" data-testid={`text-included-${index}`}>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-professional-dark mb-2" data-testid="text-coverage-areas">
                    Primary Areas in {location.name}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {location.suburbs?.slice(0, 6).map((suburb, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {suburb}
                      </Badge>
                    ))}
                    {(location.suburbs?.length || 0) > 6 && (
                      <Badge variant="outline" className="text-xs">
                        +{(location.suburbs?.length || 0) - 6} more areas
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Service Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-professional-dark text-center mb-12" data-testid="text-process-title">
            How Our Service Works
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceProcess.map((process) => (
              <Card key={process.step} className="text-center" data-testid={`card-process-${process.step}`}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-pool-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">{process.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-professional-dark mb-2" data-testid={`text-process-title-${process.step}`}>
                    {process.title}
                  </h3>
                  <p className="text-gray-700" data-testid={`text-process-description-${process.step}`}>
                    {process.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Comprehensive Suburb Coverage Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-professional-dark mb-4" data-testid="text-all-suburbs-title">
              {service.name} Coverage Areas - All Suburbs We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional {service.name.toLowerCase()} services available across all suburbs in Sydney, Newcastle, and Illawarra regions.
            </p>
          </div>

          {allLocations && allSuburbs && (() => {
            // Group suburbs by their parent locations
            type SuburbType = typeof allSuburbs[number];
            const suburbsByLocation = allLocations.reduce((acc, loc) => {
              const locationSuburbs = allSuburbs.filter(s => s.parentLocationId === loc._id);
              if (locationSuburbs.length > 0) {
                acc[loc.region] = acc[loc.region] || {};
                acc[loc.region][loc.name] = locationSuburbs;
              }
              return acc;
            }, {} as Record<string, Record<string, SuburbType[]>>);

            return (
              <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
                {Object.entries(suburbsByLocation).map(([region, locations]) => (
                  <div key={region} className="flex flex-col">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-professional-dark mb-2">
                        {region} Region
                      </h3>
                      <div className="w-20 h-1 bg-pool-blue mx-auto rounded-full"></div>
                    </div>
                    <div className="flex-1 space-y-4">
                      {Object.entries(locations).map(([locationName, suburbs]) => (
                        <Card key={locationName} className="hover:shadow-lg transition-all duration-300 border-l-4 border-pool-blue">
                          <CardContent className="p-6">
                            <div className="flex items-center mb-4">
                              <div className="w-3 h-3 bg-pool-blue rounded-full mr-3"></div>
                              <h4 className="text-lg font-bold text-professional-dark">{locationName}</h4>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-2 mb-4">
                              {suburbs.slice(0, 6).map((suburb) => (
                                <div key={suburb._id} className="flex items-center justify-between py-1.5 px-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                                  <a 
                                    href={`/${suburb.slug}`}
                                    className="text-gray-700 hover:text-pool-blue transition-colors font-medium text-sm flex-1"
                                    data-testid={`link-suburb-${suburb.slug}`}
                                  >
                                    {suburb.name}
                                  </a>
                                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200">
                                    ✓
                                  </Badge>
                                </div>
                              ))}
                              
                              {suburbs.length > 6 && (
                                <div className="text-center py-2">
                                  <span className="text-sm text-gray-500">
                                    +{suburbs.length - 6} more suburbs
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2">
                              <Button 
                                size="sm" 
                                className="flex-1 bg-pool-blue text-white hover:bg-pool-blue/90 text-xs"
                                data-testid={`button-quote-${locationName.toLowerCase().replace(/\s+/g, '-')}`}
                              >
                                Get Quote
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="flex-1 text-pool-blue border-pool-blue hover:bg-pool-blue hover:text-white text-xs"
                              >
                                View All
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}

          <div className="text-center mt-12 p-8 bg-gray-50 rounded-xl">
            <h3 className="text-xl font-bold text-professional-dark mb-4">
              Don't See Your Suburb Listed?
            </h3>
            <p className="text-gray-600 mb-6">
              We provide {service.name.toLowerCase()} services across all of NSW. 
              Contact us to check availability in your specific area.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-pool-blue text-white hover:bg-pool-blue/90">
                Check My Area
              </Button>
              <Button variant="outline" className="border-pool-blue text-pool-blue hover:bg-pool-blue hover:text-white">
                Call 1300 POOL ZEN
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ServiceGrid locationSlug={location.slug} locationName={location.name} />
      <TrustIndicators />
      <FAQSection serviceName={service.name} locationName={location.name} />
      <ContactForm />
      <Footer />
    </div>
  );
}
