import { Id } from "../../../convex/_generated/dataModel";

// These types map to the Convex schema
export interface Service {
  _id: Id<"services">;
  _creationTime: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  basePrice: number;
  priceUnit: string;
  icon: string;
  category: string;
}

export interface Location {
  _id: Id<"locations">;
  _creationTime: number;
  name: string;
  slug: string;
  region: string;
  description: string;
  suburbs?: string[];
  active: boolean;
}

export interface Suburb {
  _id: Id<"suburbs">;
  _creationTime: number;
  name: string;
  slug: string;
  region: string;
  parentLocationId: Id<"locations">;
  description: string;
  postcode?: string;
  active: boolean;
}

export interface Quote {
  _id: Id<"quotes">;
  _creationTime: number;
  customerName: string;
  email: string;
  phone: string;
  locationId: Id<"locations">;
  serviceId: Id<"services">;
  message?: string;
  status: string;
  estimatedValue?: number;
  createdAt: number;
}

// For backward compatibility with existing components
// that expect 'id' instead of '_id'
export function normalizeService(service: Service): Service & { id: string } {
  return { ...service, id: service._id };
}

export function normalizeLocation(location: Location): Location & { id: string } {
  return { ...location, id: location._id };
}

export function normalizeSuburb(suburb: Suburb): Suburb & { id: string } {
  return { ...suburb, id: suburb._id };
}

export function normalizeQuote(quote: Quote): Quote & { id: string } {
  return { ...quote, id: quote._id };
}
