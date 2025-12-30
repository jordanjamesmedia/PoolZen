import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

// Services
export function useServices() {
  return useQuery(api.services.getAll);
}

export function useServiceBySlug(slug: string) {
  return useQuery(api.services.getBySlug, { slug });
}

// Locations
export function useLocations() {
  return useQuery(api.locations.getAll);
}

export function useLocationBySlug(slug: string) {
  return useQuery(api.locations.getBySlug, { slug });
}

// Suburbs
export function useSuburbs() {
  return useQuery(api.suburbs.getAll);
}

export function useSuburbBySlug(slug: string) {
  return useQuery(api.suburbs.getBySlug, { slug });
}

export function useSuburbsByLocation(locationId: Id<"locations"> | undefined) {
  return useQuery(
    api.suburbs.getByLocation,
    locationId ? { locationId } : "skip"
  );
}

// Quotes
export function useQuotes() {
  return useQuery(api.quotes.getAll);
}

export function useCreateQuote() {
  return useMutation(api.quotes.create);
}

export function useUpdateQuoteStatus() {
  return useMutation(api.quotes.updateStatus);
}

// Seed
export function useSeedDatabase() {
  return useMutation(api.seed.seedDatabase);
}
