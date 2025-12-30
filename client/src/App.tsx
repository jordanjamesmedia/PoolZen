import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import ServiceLocation from "@/pages/service-location";
import LocationPage from "@/pages/location-page";
import SuburbPage from "@/pages/suburb-page";
import ContactPage from "./pages/contact";
import AboutPage from "./pages/about";
import ProgressPage from "@/pages/progress";
import AdminPage from "@/pages/admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/progress" component={ProgressPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/services/:serviceSlug/:locationSlug" component={ServiceLocation} />
      <Route path="/:locationSlug" component={({ params }) => {
        // Check if it's a location slug or suburb slug
        const locationSlug = params?.locationSlug;
        
        // Try suburb first (more specific), then location
        return <SuburbPage suburbSlug={locationSlug} fallbackToLocation={true} />;
      }} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
