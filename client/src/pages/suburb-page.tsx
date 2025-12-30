import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
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
import { MapPin, Phone, Star, Clock, Shield, Award, CheckCircle } from "lucide-react";
import LocationPage from "./location-page";

interface SuburbPageProps {
  suburbSlug: string;
  fallbackToLocation?: boolean;
}

export default function SuburbPage({ suburbSlug, fallbackToLocation = false }: SuburbPageProps) {
  // Try to fetch suburb first
  const suburb = useQuery(api.suburbs.getBySlug, suburbSlug ? { slug: suburbSlug } : "skip");
  const suburbLoading = suburb === undefined;

  // If suburb is not found and fallback is enabled, try location
  const location = useQuery(
    api.locations.getBySlug,
    suburbSlug && fallbackToLocation && !suburb && !suburbLoading ? { slug: suburbSlug } : "skip"
  );
  const locationLoading = location === undefined && fallbackToLocation && !suburb && !suburbLoading;

  // Get all locations to find the parent
  const allLocations = useQuery(api.locations.getAll);
  const parentLocation = allLocations?.find(loc => loc._id === suburb?.parentLocationId);

  if (suburbLoading || locationLoading) {
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

  // If no suburb found but location found, fallback to location page
  if (!suburb && location && fallbackToLocation) {
    return <LocationPage />;
  }

  // If nothing found
  if (!suburb) {
    return (
      <div className="min-h-screen bg-clean-white">
        <Header />
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-professional-dark mb-4">
                Page Not Found
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                The area you're looking for doesn't exist.
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
    { label: suburb.region, href: parentLocation ? `/${parentLocation.slug}` : undefined },
    { label: suburb.name }
  ];

  const suburbServices = [
    "Pool Cleaning & Maintenance",
    "Chemical Balancing & Testing", 
    "Equipment Repairs & Servicing",
    "Emergency Pool Services",
    "Pool Equipment Installation",
    "Water Quality Management"
  ];

  const localBenefits = [
    `Local ${suburb.name} technicians`,
    "Same-day service available",
    "Familiar with local conditions",
    "Competitive pricing",
    "Community-focused service"
  ];

  const generateSuburbTitle = () => {
    return `Pool Services ${suburb.name} | Professional Pool Maintenance ${suburb.region} | PoolZen`;
  };

  const generateSuburbDescription = () => {
    return `Professional pool services in ${suburb.name}, ${suburb.region}. Expert pool cleaning, maintenance, and repairs with same-day service. Call 1300 POOL ZEN for a free quote.`;
  };

  const generateSuburbKeywords = () => {
    return [
      `pool services ${suburb.name.toLowerCase()}`,
      `pool cleaning ${suburb.name.toLowerCase()}`,
      `pool maintenance ${suburb.name.toLowerCase()}`,
      `pool repairs ${suburb.name.toLowerCase()}`,
      `pool services ${suburb.region.toLowerCase()}`,
      `pool technician ${suburb.name.toLowerCase()}`,
      `swimming pool maintenance ${suburb.name.toLowerCase()}`
    ].join(", ");
  };

  // Create location-like schema for suburb
  const suburbAsLocation = {
    _id: suburb._id as any,
    _creationTime: suburb._creationTime,
    name: suburb.name,
    slug: suburb.slug,
    region: suburb.region,
    description: suburb.description,
    suburbs: [suburb.name],
    active: suburb.active
  };

  return (
    <div className="min-h-screen bg-clean-white">
      <SeoHead
        title={generateSuburbTitle()}
        description={generateSuburbDescription()}
        keywords={generateSuburbKeywords()}
        canonical={`https://poolzen.com.au/${suburb.slug}`}
      />
      <LocalSchema location={suburbAsLocation} />
      
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16 lg:py-24" style={{ backgroundColor: '#1d4ed8' }}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <MapPin className="h-6 w-6 text-yellow-400" />
              <span className="text-yellow-400 font-semibold text-lg">
                Proudly Serving {suburb.name}
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6" style={{ color: '#ffffff' }}>
              Pool Services in{" "}
              <span className="text-yellow-400">{suburb.name}</span>
            </h1>
            
            <p className="text-xl lg:text-2xl mb-8" style={{ color: '#ffffff' }}>
              {suburb.description}
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

      {/* Local Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-pool-blue mb-2">50+</div>
              <div className="text-gray-600">Local Pools Maintained</div>
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
              <div className="text-3xl font-bold text-pool-blue mb-2">Local</div>
              <div className="text-gray-600">Technicians</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-professional-dark mb-4">
              Professional Pool Services in {suburb.name}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From routine maintenance to emergency repairs, we provide complete pool care solutions 
              for residential and commercial properties in {suburb.name}, {suburb.region}.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-professional-dark mb-6">
                Our {suburb.name} Pool Services
              </h3>
              <div className="space-y-4">
                {suburbServices.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-trust-green flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-professional-dark mb-6">
                Why Choose PoolZen in {suburb.name}?
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

      {/* Local Area Info */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-professional-dark mb-4">
              Serving {suburb.name} and Surrounding Areas
            </h2>
            <p className="text-xl text-gray-600">
              Professional pool maintenance services across {suburb.region}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <MapPin className="h-12 w-12 text-pool-blue mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-professional-dark mb-4">{suburb.name}, {suburb.region}</h3>
                <p className="text-gray-600 mb-4">
                  We know {suburb.name} well and understand the unique challenges of maintaining pools in this area. 
                  Our local technicians are familiar with water conditions, weather patterns, and common issues.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-8">
                  <div className="text-center">
                    <Clock className="h-8 w-8 text-pool-blue mx-auto mb-2" />
                    <h4 className="font-semibold">Fast Response</h4>
                    <p className="text-sm text-gray-600">Same-day service available</p>
                  </div>
                  <div className="text-center">
                    <Shield className="h-8 w-8 text-pool-blue mx-auto mb-2" />
                    <h4 className="font-semibold">Fully Insured</h4>
                    <p className="text-sm text-gray-600">Complete protection</p>
                  </div>
                  <div className="text-center">
                    <Award className="h-8 w-8 text-pool-blue mx-auto mb-2" />
                    <h4 className="font-semibold">Local Experts</h4>
                    <p className="text-sm text-gray-600">Know your area</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Need service in a nearby area? We also serve the entire {suburb.region} region.
            </p>
            <Button className="bg-pool-blue text-white hover:bg-pool-blue/90">
              Check Service Areas
            </Button>
          </div>
        </div>
      </section>

      <ServiceGrid locationSlug={parentLocation?.slug || suburb.slug} locationName={suburb.name} />
      <TrustIndicators />
      <FAQSection locationName={suburb.name} />
      <ContactForm />
      <Footer />
    </div>
  );
}