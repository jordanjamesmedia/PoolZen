import SeoHead from "@/components/seo-head";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProgressTracker from "@/components/progress-tracker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Target, Zap, Search } from "lucide-react";

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-clean-white">
      <SeoHead 
        title="PoolZen SEO Progress Tracker - Page Creation Goals & Analytics"
        description="Track our progress building comprehensive SEO pages for PoolZen pool services across Sydney, Newcastle, and Illawarra regions. Monitor page creation goals and SEO coverage."
        canonical="/progress"
      />
      
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-pool-blue via-professional-dark to-pool-blue">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <BarChart3 className="h-12 w-12 text-yellow-400" />
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              SEO Progress Tracker
            </h1>
          </div>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Monitor our comprehensive page creation strategy for maximum search engine coverage 
            across all pool services and locations in NSW.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Target className="h-4 w-4 mr-2" />
              Goal-Driven Development
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Search className="h-4 w-4 mr-2" />
              SEO Optimization
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              Real-time Tracking
            </Badge>
          </div>
        </div>
      </section>

      {/* Progress Tracker */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ProgressTracker />
        </div>
      </section>

      {/* SEO Strategy Explanation */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-2xl">
                  <Search className="h-6 w-6 text-pool-blue" />
                  <span>Our SEO Strategy</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-professional-dark">
                    Comprehensive Local SEO Coverage
                  </h3>
                  <p className="text-gray-600 mb-4">
                    We're building a complete matrix of SEO-optimized pages to capture every possible 
                    search query related to pool services in NSW. This systematic approach ensures 
                    maximum visibility across all target markets.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-fresh-mint/10 rounded-lg">
                    <h4 className="font-semibold text-professional-dark mb-2">Regional Pages</h4>
                    <p className="text-sm text-gray-600">
                      Broad geographic targeting for major regions like Sydney North Shore, 
                      Newcastle, and Illawarra.
                    </p>
                  </div>
                  <div className="text-center p-4 bg-pool-blue/10 rounded-lg">
                    <h4 className="font-semibold text-professional-dark mb-2">Service Matrix</h4>
                    <p className="text-sm text-gray-600">
                      Every service (Pool Cleaning, Maintenance, etc.) gets dedicated pages 
                      for each location for targeted SEO.
                    </p>
                  </div>
                  <div className="text-center p-4 bg-sunshine-yellow/10 rounded-lg">
                    <h4 className="font-semibold text-professional-dark mb-2">Suburb Focus</h4>
                    <p className="text-sm text-gray-600">
                      Hyper-local pages for individual suburbs to capture 
                      "pool cleaning near me" searches.
                    </p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-xl font-semibold mb-3 text-professional-dark">
                    Expected SEO Results
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Higher search rankings for local queries</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Increased organic traffic from each region</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Better conversion from location-specific pages</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Comprehensive keyword coverage</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Reduced competition for long-tail searches</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Enhanced local business authority</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}