import SeoHead from "@/components/seo-head";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ContactForm from "@/components/contact-form";
import Breadcrumb from "@/components/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const breadcrumbItems = [
    { label: "Contact Us" }
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      primary: "1300 POOL ZEN",
      secondary: "(1300 766 593)",
      description: "Available 7 days a week"
    },
    {
      icon: Mail,
      title: "Email Us",
      primary: "info@poolzen.com.au",
      secondary: "quotes@poolzen.com.au",
      description: "We'll respond within 2 hours"
    },
    {
      icon: MapPin,
      title: "Service Areas",
      primary: "Sydney • Newcastle • Illawarra",
      secondary: "49+ suburbs covered",
      description: "Professional pool services across NSW"
    }
  ];

  const businessHours = [
    { day: "Monday - Friday", hours: "7:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "8:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "8:00 AM - 2:00 PM" },
    { day: "Emergency Service", hours: "24/7 Available" }
  ];

  const officeLocations = [
    {
      region: "Sydney",
      address: "123 Harbour Street, Circular Quay NSW 2000",
      areas: "North Shore, Eastern Suburbs, Inner West, South, West"
    },
    {
      region: "Newcastle",
      address: "456 Hunter Street, Newcastle NSW 2300", 
      areas: "Newcastle, Lake Macquarie, Port Stephens, Cessnock"
    },
    {
      region: "Illawarra",
      address: "789 Crown Street, Wollongong NSW 2500",
      areas: "Wollongong, Shellharbour, Kiama, Port Kembla"
    }
  ];

  return (
    <div className="min-h-screen bg-clean-white">
      <SeoHead
        title="Contact PoolZen | Professional Pool Services NSW | Get Free Quote"
        description="Contact PoolZen for professional pool services across Sydney, Newcastle, and Illawarra. Call 1300 POOL ZEN or get a free quote online. Same-day service available."
        keywords="contact pool services, pool maintenance quote, pool cleaning NSW, emergency pool service, pool technician contact"
        canonical="https://poolzen.com.au/contact"
      />
      
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16" style={{ backgroundColor: '#1d4ed8' }}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#ffffff' }}>
              Get in Touch with{" "}
              <span className="text-yellow-400">PoolZen</span>
            </h1>
            <p className="text-xl mb-8" style={{ color: '#ffffff' }}>
              Ready to keep your pool sparkling clean? Contact our professional team for expert pool services across NSW.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 font-bold text-lg px-8 py-4"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call 1300 POOL ZEN
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white hover:bg-white hover:text-pool-blue font-bold text-lg px-8 py-4"
                style={{ color: '#ffffff' }}
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                <span style={{ color: '#ffffff' }}>Get Free Quote</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-professional-dark mb-4">
              Multiple Ways to Reach Us
            </h2>
            <p className="text-xl text-gray-600">
              Choose the contact method that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-pool-blue rounded-full flex items-center justify-center mx-auto mb-6">
                    <info.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-professional-dark mb-3">
                    {info.title}
                  </h3>
                  <p className="text-lg font-semibold text-pool-blue mb-1">
                    {info.primary}
                  </p>
                  <p className="text-gray-600 mb-3">
                    {info.secondary}
                  </p>
                  <p className="text-sm text-gray-500">
                    {info.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Business Hours & Locations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Business Hours */}
            <div>
              <div className="flex items-center mb-6">
                <Clock className="h-8 w-8 text-pool-blue mr-3" />
                <h2 className="text-2xl font-bold text-professional-dark">
                  Business Hours
                </h2>
              </div>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {businessHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                        <span className="font-medium text-gray-700">
                          {schedule.day}
                        </span>
                        <span className="text-pool-blue font-semibold">
                          {schedule.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-sm text-red-800">
                      <strong>Emergency Service:</strong> 24/7 emergency pool services available for urgent issues like equipment failures or water contamination.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Office Locations */}
            <div>
              <div className="flex items-center mb-6">
                <MapPin className="h-8 w-8 text-pool-blue mr-3" />
                <h2 className="text-2xl font-bold text-professional-dark">
                  Service Locations
                </h2>
              </div>
              <div className="space-y-6">
                {officeLocations.map((office, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-pool-blue mb-3">
                        {office.region} Region
                      </h3>
                      <p className="text-gray-700 mb-2">
                        <MapPin className="h-4 w-4 inline mr-2" />
                        {office.address}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Coverage Areas:</strong> {office.areas}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-professional-dark mb-4">
              Get Your Free Pool Service Quote
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fill out the form below and we'll get back to you within 2 hours with a personalized quote for your pool service needs.
            </p>
          </div>
        </div>
        <ContactForm />
      </section>

      <Footer />
    </div>
  );
}