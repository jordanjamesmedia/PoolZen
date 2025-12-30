import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  serviceName?: string;
  locationName?: string;
}

export default function FAQSection({ serviceName, locationName }: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const getLocationSpecificFAQs = (): FAQItem[] => {
    const locationFAQs: FAQItem[] = [
      {
        question: `How often should I have my pool cleaned in ${locationName || 'Sydney'}?`,
        answer: `In ${locationName || 'Sydney'}, we recommend weekly pool cleaning during swimming season (October-April) and fortnightly during cooler months. The frequency may vary based on pool usage, surrounding vegetation, and weather conditions.`
      },
      {
        question: `What are your service areas in ${locationName || 'Sydney'}?`,
        answer: `We provide comprehensive pool services throughout ${locationName || 'Sydney'} and surrounding suburbs. Our technicians are familiar with local pool conditions and regulations specific to the area.`
      },
      {
        question: `Do you offer same-day pool service in ${locationName || 'Sydney'}?`,
        answer: `Yes! We offer same-day emergency pool services in ${locationName || 'Sydney'} for urgent issues like green water, equipment failures, or pre-event cleanings. Contact us before 2 PM for same-day availability.`
      }
    ];

    if (serviceName) {
      const serviceSpecificFAQs: FAQItem[] = [
        {
          question: `What's included in your ${serviceName.toLowerCase()} service?`,
          answer: serviceName === 'Pool Cleaning' 
            ? 'Our pool cleaning service includes skimming debris, vacuuming, brushing walls and steps, emptying skimmer and pump baskets, testing water chemistry, and a visual equipment check.'
            : serviceName === 'Pool Maintenance'
            ? 'Our maintenance service includes equipment inspection, filter cleaning/replacement, pump basket cleaning, water testing and balancing, equipment lubrication, and system optimization.'
            : serviceName === 'Chemical Balancing'
            ? 'Chemical balancing includes comprehensive water testing, pH adjustment, sanitizer level optimization, alkalinity balancing, calcium hardness adjustment, and shock treatment if needed.'
            : 'Equipment repairs include diagnosis, genuine parts replacement, system testing, warranty coverage, and follow-up checks to ensure optimal performance.'
        },
        {
          question: `How much does ${serviceName.toLowerCase()} cost in ${locationName || 'Sydney'}?`,
          answer: `${serviceName} pricing varies based on pool size, condition, and specific requirements. We offer competitive rates with transparent pricing. Contact us for a personalized quote based on your pool's needs.`
        }
      ];
      return [...serviceSpecificFAQs, ...locationFAQs];
    }

    const generalFAQs: FAQItem[] = [
      {
        question: "What pool services do you offer?",
        answer: "We offer comprehensive pool services including regular cleaning, maintenance, chemical balancing, equipment repairs, and emergency services. All our technicians are licensed and insured."
      },
      {
        question: "Are your technicians licensed and insured?",
        answer: "Yes, all our pool technicians are fully licensed, insured, and undergo regular training to stay current with industry best practices and safety standards."
      },
      {
        question: "Do you provide your own chemicals and equipment?",
        answer: "Yes, we bring all necessary chemicals, equipment, and tools to every service visit. We use only high-quality, pool-safe chemicals and professional-grade equipment."
      },
      {
        question: "What if I'm not satisfied with the service?",
        answer: "We offer a 100% satisfaction guarantee. If you're not completely happy with our service, we'll return to address any concerns at no additional charge."
      },
      ...locationFAQs
    ];

    return generalFAQs;
  };

  const faqs = getLocationSpecificFAQs();

  return (
    <section className="py-16 bg-gray-50" data-testid="faq-section">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-professional-dark text-center mb-4" data-testid="faq-title">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-center mb-12 text-lg" data-testid="faq-subtitle">
            Get answers to common questions about our pool services
            {serviceName && ` and ${serviceName.toLowerCase()}`}
            {locationName && ` in ${locationName}`}
          </p>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="shadow-sm" data-testid={`faq-item-${index}`}>
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    data-testid={`faq-question-${index}`}
                  >
                    <h3 className="text-lg font-semibold text-professional-dark pr-4">
                      {faq.question}
                    </h3>
                    {openItems.includes(index) ? (
                      <ChevronUp className="h-5 w-5 text-pool-blue flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {openItems.includes(index) && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-700 leading-relaxed" data-testid={`faq-answer-${index}`}>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Still have questions? We're here to help!
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center bg-pool-blue text-white px-6 py-3 rounded-lg hover:bg-pool-blue/90 transition-colors font-medium"
              data-testid="faq-contact-button"
            >
              Contact Us Today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}