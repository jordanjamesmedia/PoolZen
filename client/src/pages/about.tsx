import SeoHead from "@/components/seo-head";
import Header from "@/components/header";
import Footer from "@/components/footer";
import TrustIndicators from "@/components/trust-indicators";
import ContactForm from "@/components/contact-form";
import Breadcrumb from "@/components/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Award, Users, Star, CheckCircle, Target, Heart, Zap } from "lucide-react";

export default function AboutPage() {
  const breadcrumbItems = [
    { label: "About Us" }
  ];

  const companyStats = [
    { number: "500+", label: "Pools Maintained" },
    { number: "10+", label: "Years Experience" },
    { number: "49+", label: "Suburbs Served" },
    { number: "4.9", label: "Star Rating" }
  ];

  const teamValues = [
    {
      icon: Shield,
      title: "Reliability",
      description: "We show up on time, every time, with professional equipment and a commitment to excellence."
    },
    {
      icon: Heart,
      title: "Customer Care",
      description: "Your pool is an investment. We treat it with the same care and attention we'd give our own."
    },
    {
      icon: Target,
      title: "Expertise",
      description: "Licensed technicians with years of experience in pool maintenance, repairs, and water chemistry."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We use the latest technology and techniques to provide efficient, effective pool services."
    }
  ];

  const services = [
    "Regular Pool Cleaning",
    "Chemical Balancing & Testing", 
    "Equipment Repairs & Servicing",
    "Pool Equipment Installation",
    "Emergency Pool Services",
    "Water Quality Management",
    "Pool Safety Inspections",
    "Seasonal Pool Preparation"
  ];

  const certifications = [
    "Licensed Pool Technicians",
    "Fully Insured & Bonded",
    "Chemical Safety Certified",
    "Equipment Manufacturer Trained",
    "First Aid & CPR Certified"
  ];

  return (
    <div className="min-h-screen bg-clean-white">
      <SeoHead
        title="About PoolZen | Professional Pool Services NSW | Licensed Pool Technicians"
        description="Learn about PoolZen's professional pool services across NSW. 10+ years experience, 500+ pools maintained, licensed technicians serving Sydney, Newcastle, and Illawarra."
        keywords="professional pool services NSW, licensed pool technicians, pool maintenance company, pool cleaning business, NSW pool services"
        canonical="https://poolzen.com.au/about"
      />
      
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16" style={{ backgroundColor: '#1d4ed8' }}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#ffffff' }}>
              About{" "}
              <span className="text-yellow-400">PoolZen</span>
            </h1>
            <p className="text-xl mb-8" style={{ color: '#ffffff' }}>
              Professional pool services across NSW since 2014. We're passionate about keeping your pool pristine, 
              safe, and ready for enjoyment year-round.
            </p>
            <Button 
              size="lg" 
              className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 font-bold text-lg px-8 py-4"
            >
              Get Your Free Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {companyStats.map((stat, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                <div className="text-4xl font-bold text-pool-blue mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-professional-dark mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  PoolZen was founded in 2014 with a simple mission: to provide reliable, professional pool services 
                  that give homeowners peace of mind and more time to enjoy their pools.
                </p>
                <p>
                  What started as a small local business in Sydney has grown into NSW's trusted pool service provider, 
                  serving over 500 pools across Sydney, Newcastle, and the Illawarra region.
                </p>
                <p>
                  Our team of licensed technicians combines years of experience with ongoing training on the latest 
                  pool technology and techniques. We believe every pool deserves expert care, whether it's a routine 
                  cleaning or an emergency repair.
                </p>
                <p>
                  Today, PoolZen is proud to be the go-to choice for homeowners who value reliability, 
                  expertise, and exceptional customer service.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-pool-blue rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Why Choose PoolZen?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                    <span>Licensed and insured technicians</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                    <span>Same-day service available</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                    <span>Transparent pricing with no hidden fees</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                    <span>100% satisfaction guarantee</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                    <span>Emergency services available 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-professional-dark mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do, from our first interaction with customers 
              to the ongoing care of your pool.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamValues.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-pool-blue rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-professional-dark mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-700">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services & Certifications */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Services */}
            <div>
              <h2 className="text-3xl font-bold text-professional-dark mb-8">
                Our Services
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-trust-green flex-shrink-0" />
                    <span className="font-medium text-gray-800">{service}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button className="bg-pool-blue text-white hover:bg-pool-blue/90">
                  View All Services
                </Button>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h2 className="text-3xl font-bold text-professional-dark mb-8">
                Certifications & Training
              </h2>
              <div className="space-y-6">
                {certifications.map((cert, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-trust-green rounded-full flex items-center justify-center">
                          <Award className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-professional-dark">
                            {cert}
                          </h3>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start space-x-3">
                  <Star className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-professional-dark mb-2">
                      Commitment to Excellence
                    </h3>
                    <p className="text-gray-700">
                      Our team participates in ongoing training programs to stay current with 
                      the latest pool technology, safety standards, and industry best practices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustIndicators />
      <ContactForm />
      <Footer />
    </div>
  );
}