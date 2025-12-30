import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center space-x-2" data-testid="link-home">
            <div className="w-10 h-10 bg-pool-blue rounded-full flex items-center justify-center">
              <i className="fas fa-swimming-pool text-white text-lg"></i>
            </div>
            <span className="text-2xl font-bold text-pool-blue">PoolZen</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-professional-dark hover:text-pool-blue transition-colors" data-testid="link-services">
              Services
            </a>
            <a href="#locations" className="text-professional-dark hover:text-pool-blue transition-colors" data-testid="link-locations">
              Service Areas
            </a>
            <Link href="/about" className="text-professional-dark hover:text-pool-blue transition-colors" data-testid="link-about">
              About
            </Link>
            <Link href="/progress" className="text-professional-dark hover:text-pool-blue transition-colors" data-testid="link-progress">
              Progress
            </Link>
            <Link href="/contact" className="text-professional-dark hover:text-pool-blue transition-colors" data-testid="link-contact">
              Contact
            </Link>
            <Link href="/admin" className="text-professional-dark hover:text-pool-blue transition-colors text-sm" data-testid="link-admin">
              Admin
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4 text-pool-blue" />
              <span className="font-semibold text-gray-700" data-testid="text-phone">1300 POOL ZEN</span>
            </div>
            <Button className="bg-pool-blue text-white hover:bg-pool-blue/90" data-testid="button-quote">
              Get Quote
            </Button>
          </div>
          
          <button 
            className="md:hidden text-professional-dark"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="button-menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <a href="#services" className="text-professional-dark hover:text-pool-blue transition-colors" data-testid="link-mobile-services">
                Services
              </a>
              <a href="#locations" className="text-professional-dark hover:text-pool-blue transition-colors" data-testid="link-mobile-locations">
                Service Areas
              </a>
              <Link href="/about" className="text-professional-dark hover:text-pool-blue transition-colors" data-testid="link-mobile-about">
                About
              </Link>
              <Link href="/progress" className="text-professional-dark hover:text-pool-blue transition-colors" data-testid="link-mobile-progress">
                Progress
              </Link>
              <Link href="/contact" className="text-professional-dark hover:text-pool-blue transition-colors" data-testid="link-mobile-contact">
                Contact
              </Link>
              <Link href="/admin" className="text-professional-dark hover:text-pool-blue transition-colors text-sm" data-testid="link-mobile-admin">
                Admin
              </Link>
              <div className="pt-2 border-t">
                <span className="font-semibold text-pool-blue" data-testid="text-mobile-phone">1300 POOL ZEN</span>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
