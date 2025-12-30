import { Link } from "wouter";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const services = useQuery(api.services.getAll);
  const locations = useQuery(api.locations.getAll);

  const sydneyLocations = locations?.filter(location => location.region === "Sydney") || [];
  const otherLocations = locations?.filter(location => location.region !== "Sydney") || [];

  return (
    <footer className="bg-professional-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4" data-testid="link-footer-home">
              <div className="w-8 h-8 bg-pool-blue rounded-full flex items-center justify-center">
                <i className="fas fa-swimming-pool text-white"></i>
              </div>
              <span className="text-xl font-bold">PoolZen</span>
            </Link>
            <p className="text-gray-300 mb-4" data-testid="text-footer-description">
              Professional pool maintenance services across Sydney, Newcastle, and Illawarra regions.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-pool-blue cursor-pointer hover:text-blue-400" data-testid="icon-facebook" />
              <Instagram className="h-5 w-5 text-pool-blue cursor-pointer hover:text-blue-400" data-testid="icon-instagram" />
              <Linkedin className="h-5 w-5 text-pool-blue cursor-pointer hover:text-blue-400" data-testid="icon-linkedin" />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4" data-testid="text-services-footer-title">Services</h3>
            <ul className="space-y-2 text-gray-300">
              {services?.map((service) => (
                <li key={service._id}>
                  <Link 
                    href={`/services/${service.slug}/sydney-north-shore`}
                    className="hover:text-white transition-colors"
                    data-testid={`link-footer-service-${service.slug}`}
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4" data-testid="text-areas-footer-title">Service Areas</h3>
            <ul className="space-y-2 text-gray-300">
              {sydneyLocations.slice(0, 5).map((location) => (
                <li key={location._id}>
                  <Link
                    href={`/services/pool-cleaning/${location.slug}`}
                    className="hover:text-white transition-colors"
                    data-testid={`link-footer-location-${location.slug}`}
                  >
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4" data-testid="text-contact-footer-title">Contact Info</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center space-x-2">
                <i className="fas fa-phone text-pool-blue"></i>
                <span data-testid="text-footer-phone">1300 POOL ZEN</span>
              </li>
              <li className="flex items-center space-x-2">
                <i className="fas fa-envelope text-pool-blue"></i>
                <span data-testid="text-footer-email">info@poolzen.com.au</span>
              </li>
              <li className="flex items-center space-x-2">
                <i className="fas fa-clock text-pool-blue"></i>
                <span data-testid="text-footer-hours">Mon-Sat: 7AM-6PM</span>
              </li>
              <li className="flex items-center space-x-2">
                <i className="fas fa-shield-alt text-trust-green"></i>
                <span data-testid="text-footer-licensed">Fully Licensed & Insured</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* SEO-friendly service-location combinations */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <h3 className="text-lg font-bold mb-4 text-center" data-testid="text-seo-title">
            Complete Pool Services Coverage
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-300">
            <div>
              <h4 className="font-semibold text-white mb-2" data-testid="text-sydney-services-title">
                Sydney Pool Services
              </h4>
              <ul className="space-y-1">
                {services?.map((service) => (
                  <li key={service._id}>
                    <Link 
                      href={`/services/${service.slug}/sydney-north-shore`}
                      className="hover:text-white"
                      data-testid={`link-seo-sydney-${service.slug}`}
                    >
                      {service.name} Sydney
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2" data-testid="text-newcastle-services-title">
                Newcastle Pool Services
              </h4>
              <ul className="space-y-1">
                {services?.map((service) => (
                  <li key={service._id}>
                    <Link 
                      href={`/services/${service.slug}/newcastle`}
                      className="hover:text-white"
                      data-testid={`link-seo-newcastle-${service.slug}`}
                    >
                      {service.name} Newcastle
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2" data-testid="text-illawarra-services-title">
                Illawarra Pool Services
              </h4>
              <ul className="space-y-1">
                {services?.map((service) => (
                  <li key={service._id}>
                    <Link 
                      href={`/services/${service.slug}/illawarra`}
                      className="hover:text-white"
                      data-testid={`link-seo-illawarra-${service.slug}`}
                    >
                      {service.name} Illawarra
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p data-testid="text-copyright">
            &copy; 2024 PoolZen Pool Services. All rights reserved. | ABN: 12 345 678 901 | Licensed Pool Maintenance Contractor
          </p>
        </div>
      </div>
    </footer>
  );
}
