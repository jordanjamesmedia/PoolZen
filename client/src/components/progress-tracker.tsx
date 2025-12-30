import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Location, Service, Suburb } from "@shared/schema";
import { Target, CheckCircle, MapPin, Wrench, Building } from "lucide-react";

interface PageCount {
  current: number;
  total: number;
  percentage: number;
}

interface ProgressStats {
  locationPages: PageCount;
  serviceLocationPages: PageCount;
  suburbPages: PageCount;
  totalPages: PageCount;
}

export default function ProgressTracker() {
  const { data: locations } = useQuery<Location[]>({
    queryKey: ["/api/locations"]
  });

  const { data: services } = useQuery<Service[]>({
    queryKey: ["/api/services"]
  });

  const { data: suburbs } = useQuery<Suburb[]>({
    queryKey: ["/api/suburbs"]
  });

  if (!locations || !services || !suburbs) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-pool-blue" />
            <span>Loading Progress...</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate page goals and current progress
  const locationCount = locations.length;
  const serviceCount = services.length;
  const suburbCount = suburbs.length;

  // Page calculations
  const locationPages = {
    current: locationCount,
    total: locationCount,
    percentage: 100
  };

  const serviceLocationPages = {
    current: locationCount * serviceCount, // All combinations exist
    total: locationCount * serviceCount,
    percentage: 100
  };

  const suburbPages = {
    current: suburbCount,
    total: suburbCount,
    percentage: 100
  };

  const totalPages = {
    current: locationPages.current + serviceLocationPages.current + suburbPages.current,
    total: locationPages.total + serviceLocationPages.total + suburbPages.total,
    percentage: Math.round((
      (locationPages.current + serviceLocationPages.current + suburbPages.current) /
      (locationPages.total + serviceLocationPages.total + suburbPages.total)
    ) * 100)
  };

  const stats: ProgressStats = {
    locationPages,
    serviceLocationPages,
    suburbPages,
    totalPages
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card className="border-2 border-pool-blue">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="h-6 w-6 text-pool-blue" />
              <span className="text-2xl">PoolZen SEO Page Goals</span>
            </div>
            <Badge variant={stats.totalPages.percentage === 100 ? "default" : "secondary"} className="text-lg px-3 py-1">
              {stats.totalPages.percentage === 100 ? "COMPLETE!" : "IN PROGRESS"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-3xl font-bold">
              <span className="text-pool-blue">
                {stats.totalPages.current} / {stats.totalPages.total}
              </span>
              <span className="text-2xl text-gray-600">
                {stats.totalPages.percentage}%
              </span>
            </div>
            <Progress 
              value={stats.totalPages.percentage} 
              className="h-4"
            />
            <p className="text-gray-600 text-center text-lg">
              Total SEO-optimized pages created for maximum search coverage
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Breakdown */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Location Pages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-fresh-mint" />
              <span>Location Pages</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-fresh-mint">
                  {stats.locationPages.current}
                </div>
                <div className="text-gray-600">of {stats.locationPages.total} locations</div>
              </div>
              <Progress value={stats.locationPages.percentage} className="h-3" />
              <div className="flex items-center justify-center space-x-1 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="font-medium">Sydney, Newcastle, Illawarra</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service-Location Combinations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wrench className="h-5 w-5 text-pool-blue" />
              <span>Service × Location</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-pool-blue">
                  {stats.serviceLocationPages.current}
                </div>
                <div className="text-gray-600">
                  {serviceCount} services × {locationCount} locations
                </div>
              </div>
              <Progress value={stats.serviceLocationPages.percentage} className="h-3" />
              <div className="flex items-center justify-center space-x-1 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="font-medium">Complete Matrix Coverage</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Suburb Pages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-5 w-5 text-sunshine-yellow" />
              <span>Suburb Pages</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-sunshine-yellow">
                  {stats.suburbPages.current}
                </div>
                <div className="text-gray-600">individual suburbs</div>
              </div>
              <Progress value={stats.suburbPages.percentage} className="h-3" />
              <div className="flex items-center justify-center space-x-1 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="font-medium">Hyper-Local SEO</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Page Types Summary */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle>SEO Strategy Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-professional-dark">Page Types Created:</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>📍 Region landing pages</span>
                  <Badge variant="outline">{locationCount} pages</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>🔧 Service-location combinations</span>
                  <Badge variant="outline">{serviceLocationPages.current} pages</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>🏘️ Individual suburb pages</span>
                  <Badge variant="outline">{suburbCount} pages</Badge>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-professional-dark">SEO Coverage:</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Geographic targeting across 3 regions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Service-specific local SEO</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Suburb-level search optimization</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Complete location-service matrix</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}