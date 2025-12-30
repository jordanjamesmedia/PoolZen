import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import SeoHead from "@/components/seo-head";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Users, 
  MapPin, 
  Wrench, 
  MessageSquare, 
  BarChart3, 
  Calendar,
  Phone,
  Mail,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  Search,
  Download
} from "lucide-react";
import { Quote, Service, Location, Suburb } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

interface AdminStats {
  totalQuotes: number;
  pendingQuotes: number;
  completedQuotes: number;
  totalServices: number;
  totalLocations: number;
  totalSuburbs: number;
  thisMonthQuotes: number;
  averageQuoteValue: number;
}

interface QuoteWithDetails extends Quote {
  locationName?: string;
  serviceName?: string;
}

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [quoteFilter, setQuoteFilter] = useState<"all" | "pending" | "completed">("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all data
  const { data: services } = useQuery<Service[]>({ queryKey: ["/api/services"] });
  const { data: locations } = useQuery<Location[]>({ queryKey: ["/api/locations"] });
  const { data: suburbs } = useQuery<Suburb[]>({ queryKey: ["/api/suburbs"] });
  const { data: quotes } = useQuery<Quote[]>({ queryKey: ["/api/quotes"] });

  // Calculate admin stats
  const adminStats: AdminStats = {
    totalQuotes: quotes?.length || 0,
    pendingQuotes: quotes?.filter(q => q.status === 'pending').length || 0,
    completedQuotes: quotes?.filter(q => q.status === 'completed').length || 0,
    totalServices: services?.length || 0,
    totalLocations: locations?.length || 0,
    totalSuburbs: suburbs?.length || 0,
    thisMonthQuotes: quotes?.filter(q => {
      const quoteDate = new Date(q.createdAt);
      const now = new Date();
      return quoteDate.getMonth() === now.getMonth() && quoteDate.getFullYear() === now.getFullYear();
    }).length || 0,
    averageQuoteValue: quotes?.length ? Math.round(quotes.reduce((sum, q) => sum + (q.estimatedValue || 150), 0) / quotes.length) : 0
  };

  // Enhanced quotes with location and service details
  const quotesWithDetails: QuoteWithDetails[] = (quotes || []).map(quote => ({
    ...quote,
    locationName: locations?.find(loc => loc.id === quote.locationId)?.name || 'Unknown',
    serviceName: services?.find(svc => svc.id === quote.serviceId)?.name || 'General Service'
  }));

  // Filter quotes based on selected filter and search
  const filteredQuotes = quotesWithDetails.filter(quote => {
    const matchesFilter = quoteFilter === 'all' || quote.status === quoteFilter;
    const matchesSearch = searchTerm === '' || 
      quote.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.locationName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.serviceName?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Update quote status mutation
  const updateQuoteStatus = useMutation({
    mutationFn: async ({ quoteId, status }: { quoteId: string, status: string }) => {
      return await apiRequest(`/api/quotes/${quoteId}/status`, 'PUT', { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quotes"] });
    }
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SeoHead 
        title="PoolZen Admin Dashboard - Manage Services, Locations & Quotes"
        description="Admin dashboard for managing PoolZen pool services, locations, customer quotes and business analytics."
        canonical="/admin"
      />
      
      <Header />
      
      {/* Admin Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-professional-dark flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-pool-blue" />
                PoolZen Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Manage your pool services business</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-green-600 border-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                System Online
              </Badge>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="quotes" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Quotes ({adminStats.totalQuotes})
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              Services
            </TabsTrigger>
            <TabsTrigger value="locations" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Locations
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Quotes</p>
                      <p className="text-3xl font-bold text-professional-dark">{adminStats.totalQuotes}</p>
                    </div>
                    <MessageSquare className="h-8 w-8 text-pool-blue" />
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <span className="text-green-600">+{adminStats.thisMonthQuotes}</span>
                    <span className="text-gray-600 ml-1">this month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending Quotes</p>
                      <p className="text-3xl font-bold text-yellow-600">{adminStats.pendingQuotes}</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-500" />
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <span className="text-gray-600">Awaiting response</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Average Quote</p>
                      <p className="text-3xl font-bold text-green-600">${adminStats.averageQuoteValue}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <span className="text-gray-600">Per service request</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Service Areas</p>
                      <p className="text-3xl font-bold text-pool-blue">{adminStats.totalLocations}</p>
                    </div>
                    <MapPin className="h-8 w-8 text-pool-blue" />
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <span className="text-gray-600">{adminStats.totalSuburbs} suburbs covered</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Quote Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredQuotes.slice(0, 5).map((quote) => (
                    <div key={quote.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-semibold">{quote.customerName}</span>
                          <Badge className={getStatusColor(quote.status)}>
                            {quote.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          {quote.serviceName} in {quote.locationName} • {formatDate(quote.createdAt)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-pool-blue">${quote.estimatedValue || 150}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quotes Management Tab */}
          <TabsContent value="quotes" className="space-y-6">
            {/* Quote Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-gray-500" />
                      <Label>Filter:</Label>
                    </div>
                    <div className="flex gap-2">
                      {['all', 'pending', 'completed'].map((filter) => (
                        <Button
                          key={filter}
                          variant={quoteFilter === filter ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setQuoteFilter(filter as any)}
                          className={quoteFilter === filter ? 'bg-pool-blue' : ''}
                        >
                          {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search quotes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quotes List */}
            <div className="grid gap-4">
              {filteredQuotes.map((quote) => (
                <Card key={quote.id}>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{quote.customerName}</h3>
                          <Badge className={getStatusColor(quote.status)}>
                            {quote.status}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3" />
                            {quote.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3" />
                            {quote.phone}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            {formatDate(quote.createdAt)}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-2">
                          <div className="font-medium">{quote.serviceName}</div>
                          <div className="text-sm text-gray-600">{quote.locationName}</div>
                        </div>
                        <div className="text-sm">
                          <div className="font-medium text-pool-blue mb-1">Estimated: ${quote.estimatedValue || 150}</div>
                          {quote.message && (
                            <div className="bg-gray-50 p-3 rounded text-xs">
                              <strong>Message:</strong> {quote.message.substring(0, 100)}...
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {quote.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => updateQuoteStatus.mutate({ quoteId: quote.id, status: 'completed' })}
                              disabled={updateQuoteStatus.isPending}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Mark Complete
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-200 text-red-600 hover:bg-red-50"
                              onClick={() => updateQuoteStatus.mutate({ quoteId: quote.id, status: 'cancelled' })}
                              disabled={updateQuoteStatus.isPending}
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Cancel
                            </Button>
                          </>
                        )}
                        <Button variant="outline" size="sm">
                          Contact Customer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredQuotes.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No quotes found</h3>
                  <p className="text-gray-600">No quotes match your current filters.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services?.map((service) => (
                <Card key={service.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{service.shortDescription}</p>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600">Active</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Base Price:</span>
                        <span className="font-semibold">${service.basePrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Price Unit:</span>
                        <span className="font-medium">{service.priceUnit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Category:</span>
                        <span className="font-medium">{service.category}</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <Button variant="outline" size="sm" className="w-full">
                        Edit Service
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Locations Tab */}
          <TabsContent value="locations">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations?.map((location) => (
                <Card key={location.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{location.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{location.description}</p>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {location.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Region:</span>
                        <span className="font-semibold">{location.region}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Suburbs:</span>
                        <span className="font-medium">{location.suburbs?.length || 0}</span>
                      </div>
                    </div>
                    {location.suburbs && location.suburbs.length > 0 && (
                      <div className="mt-3">
                        <div className="text-xs text-gray-500 mb-2">Sample suburbs:</div>
                        <div className="flex flex-wrap gap-1">
                          {location.suburbs.slice(0, 3).map((suburb, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {suburb}
                            </Badge>
                          ))}
                          {location.suburbs.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{location.suburbs.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="mt-4 pt-4 border-t">
                      <Button variant="outline" size="sm" className="w-full">
                        Edit Location
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}