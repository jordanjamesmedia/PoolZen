import { Card, CardContent } from "@/components/ui/card";
import { Shield, Award, Handshake } from "lucide-react";
import cleanPoolImage from "@assets/generated_images/Clean_maintained_swimming_pool_174089b6.png";

const testimonials = [
  {
    id: 1,
    rating: 5,
    text: "PoolZen transformed our pool from green to crystal clear in just one visit. Their regular maintenance keeps it perfect year-round.",
    author: "Michael Chen",
    location: "Bondi Beach",
    initial: "M"
  },
  {
    id: 2,
    rating: 5,
    text: "Professional, reliable, and affordable. The team fixed our pump issue quickly and explained everything clearly.",
    author: "Sarah Williams", 
    location: "Manly",
    initial: "S"
  }
];

export default function TrustIndicators() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-professional-dark mb-6" data-testid="text-trust-title">
              Why Sydney Trusts PoolZen
            </h2>
            <p className="text-xl text-gray-600 mb-8" data-testid="text-trust-description">
              With over 10 years of experience and 500+ satisfied customers, we're Sydney's most trusted pool maintenance professionals.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-trust-green rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-professional-dark mb-2" data-testid="text-licensed-title">
                    Fully Licensed & Insured
                  </h3>
                  <p className="text-gray-600" data-testid="text-licensed-description">
                    Complete insurance coverage and proper licensing for your peace of mind.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-trust-green rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-professional-dark mb-2" data-testid="text-certified-title">
                    Certified Technicians
                  </h3>
                  <p className="text-gray-600" data-testid="text-certified-description">
                    Our team holds industry certifications and ongoing training.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-trust-green rounded-full flex items-center justify-center flex-shrink-0">
                  <Handshake className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-professional-dark mb-2" data-testid="text-guarantee-title">
                    100% Satisfaction Guarantee
                  </h3>
                  <p className="text-gray-600" data-testid="text-guarantee-description">
                    We stand behind our work with a complete satisfaction guarantee.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-gray-50" data-testid={`card-testimonial-${testimonial.id}`}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-500">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-xl">⭐</span>
                      ))}
                    </div>
                    <span className="text-gray-600 ml-2" data-testid={`text-rating-${testimonial.id}`}>
                      {testimonial.rating}.0
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4" data-testid={`text-testimonial-${testimonial.id}`}>
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-pool-blue rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.initial}
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold text-professional-dark" data-testid={`text-author-${testimonial.id}`}>
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-gray-600" data-testid={`text-location-${testimonial.id}`}>
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <img 
              src={cleanPoolImage} 
              alt="Clean, well-maintained swimming pool with crystal clear water" 
              className="rounded-xl shadow-lg w-full"
              data-testid="img-clean-pool"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
