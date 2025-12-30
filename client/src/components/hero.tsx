import { Button } from "@/components/ui/button";
import { MapPin, Shield, Award, Clock } from "lucide-react";
import heroImage from "@assets/generated_images/Pool_technician_servicing_equipment_6d67d1ac.png";

interface HeroProps {
  locationName?: string;
  serviceName?: string;
}

export default function Hero({ locationName = "Sydney & Surrounds", serviceName }: HeroProps) {
  const heroTitle = serviceName 
    ? `Professional ${serviceName} ${locationName}`
    : `Professional Pool Maintenance ${locationName}`;

  const heroDescription = serviceName
    ? `Expert ${serviceName.toLowerCase()} services in ${locationName}. Keep your pool crystal clear and swim-ready all year round.`
    : "Expert pool cleaning, chemical balancing, and equipment repairs. Keep your pool crystal clear and swim-ready all year round.";

  return (
    <section className="bg-blue-600 text-white py-16 lg:py-24" style={{ backgroundColor: '#1d4ed8' }}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-5 w-5 text-yellow-400" />
              <span className="text-yellow-400 font-semibold text-lg" data-testid="text-location">
                Serving {locationName}
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{ color: '#ffffff' }} data-testid="text-hero-title">
              {heroTitle.split(' ').map((word, index, array) => 
                index === array.length - 1 ? (
                  <span key={index} className="text-yellow-400">{word}</span>
                ) : (
                  <span key={index}>{word} </span>
                )
              )}
            </h1>
            <p className="text-xl mb-8 font-medium" style={{ color: '#ffffff' }} data-testid="text-hero-description">
              {heroDescription}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 font-bold text-lg px-8 py-4 shadow-lg"
                data-testid="button-free-quote"
              >
                Get Free Quote
              </Button>
              <button 
                className="border-2 border-white hover:bg-white hover:text-pool-blue font-bold text-lg px-8 py-4 rounded-md transition-colors bg-transparent shadow-lg min-h-[3.5rem]"
                style={{ color: '#ffffff', borderColor: '#ffffff', height: '56px' }}
                data-testid="button-view-services"
              >
                View Services
              </button>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-emerald-300" />
                <span className="font-medium" style={{ color: '#ffffff' }} data-testid="text-insured">Fully Insured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-emerald-300" />
                <span className="font-medium" style={{ color: '#ffffff' }} data-testid="text-licensed">Licensed Technicians</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-emerald-300" />
                <span className="font-medium" style={{ color: '#ffffff' }} data-testid="text-same-day">Same Day Service</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src={heroImage} 
              alt="Professional pool maintenance technician working on pool equipment" 
              className="rounded-xl shadow-2xl w-full"
              data-testid="img-hero"
            />
            
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-xl">
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-trust-green rounded-full border-2 border-white flex items-center justify-center">
                    <i className="fas fa-star text-white text-xs"></i>
                  </div>
                  <div className="w-8 h-8 bg-trust-green rounded-full border-2 border-white flex items-center justify-center">
                    <i className="fas fa-star text-white text-xs"></i>
                  </div>
                  <div className="w-8 h-8 bg-trust-green rounded-full border-2 border-white flex items-center justify-center">
                    <i className="fas fa-star text-white text-xs"></i>
                  </div>
                </div>
                <div>
                  <div className="font-bold text-professional-dark" data-testid="text-rating">4.9/5 Rating</div>
                  <div className="text-sm text-gray-600" data-testid="text-customers">500+ Happy Customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
