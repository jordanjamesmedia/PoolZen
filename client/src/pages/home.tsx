import SeoHead from "@/components/seo-head";
import Header from "@/components/header";
import Hero from "@/components/hero";
import ServiceGrid from "@/components/service-grid";
import TrustIndicators from "@/components/trust-indicators";
import LocationSwitcher from "@/components/location-switcher";
import ServiceAreaMap from "@/components/service-area-map";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";
import FAQSection from "@/components/faq-section";
import LocalSchema from "@/components/local-schema";
import { generateSeoTitle, generateSeoDescription, generateSeoKeywords } from "@/lib/seo-utils";

export default function Home() {
  return (
    <div className="min-h-screen bg-clean-white">
      <SeoHead
        title={generateSeoTitle()}
        description={generateSeoDescription()}
        keywords={generateSeoKeywords()}
      />
      <LocalSchema />
      
      <Header />
      <Hero />
      <ServiceGrid />
      <TrustIndicators />
      <LocationSwitcher />
      <ServiceAreaMap />
      <FAQSection />
      <ContactForm />
      <Footer />
    </div>
  );
}
