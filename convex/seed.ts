import { mutation } from "./_generated/server";

// Seed data for services
const defaultServices = [
  {
    name: "Pool Cleaning",
    slug: "pool-cleaning",
    description: "Regular cleaning, skimming, vacuuming, and debris removal to keep your pool pristine and swim-ready all year round.",
    shortDescription: "Regular cleaning, skimming, vacuuming, and debris removal",
    basePrice: 99,
    priceUnit: "visit",
    icon: "fas fa-broom",
    category: "cleaning"
  },
  {
    name: "Pool Maintenance",
    slug: "pool-maintenance", 
    description: "Comprehensive maintenance including equipment checks, filter cleaning, system optimization, and preventive care.",
    shortDescription: "Equipment checks, filter cleaning, and system optimization",
    basePrice: 149,
    priceUnit: "visit",
    icon: "fas fa-wrench",
    category: "maintenance"
  },
  {
    name: "Chemical Balancing",
    slug: "chemical-balancing",
    description: "Expert water testing and chemical balancing for safe, clean swimming water with proper pH and sanitizer levels.",
    shortDescription: "Water testing and chemical balancing for safe swimming",
    basePrice: 79,
    priceUnit: "visit",
    icon: "fas fa-flask",
    category: "chemical"
  },
  {
    name: "Equipment Repairs",
    slug: "equipment-repairs",
    description: "Fast repairs for pumps, filters, heaters, automation systems, and all pool equipment with genuine parts.",
    shortDescription: "Fast repairs for pumps, filters, heaters, and automation",
    basePrice: 120,
    priceUnit: "call",
    icon: "fas fa-tools",
    category: "repair"
  }
];

// Seed data for locations
const defaultLocations = [
  {
    name: "Sydney North Shore",
    slug: "sydney-north-shore",
    region: "Sydney",
    description: "Professional pool services for North Shore residents including Mosman, Neutral Bay, Chatswood, and surrounding areas.",
    suburbs: ["Mosman", "Neutral Bay", "Chatswood", "Lane Cove", "Willoughby", "Artarmon", "Cremorne"],
    active: true
  },
  {
    name: "Sydney Eastern Suburbs", 
    slug: "sydney-eastern-suburbs",
    region: "Sydney",
    description: "Expert pool maintenance for Eastern Suburbs properties in Bondi, Double Bay, Paddington, and neighboring areas.",
    suburbs: ["Bondi", "Double Bay", "Paddington", "Woollahra", "Rose Bay", "Vaucluse", "Coogee"],
    active: true
  },
  {
    name: "Sydney Inner West",
    slug: "sydney-inner-west", 
    region: "Sydney",
    description: "Reliable pool services for Inner West homes in Leichhardt, Balmain, Newtown, and surrounding suburbs.",
    suburbs: ["Leichhardt", "Balmain", "Newtown", "Glebe", "Marrickville", "Dulwich Hill", "Annandale"],
    active: true
  },
  {
    name: "Sydney South",
    slug: "sydney-south",
    region: "Sydney", 
    description: "Complete pool maintenance solutions for South Sydney including Sutherland Shire and St George areas.",
    suburbs: ["Cronulla", "Miranda", "Hurstville", "Kogarah", "Brighton-Le-Sands", "Sans Souci", "Caringbah"],
    active: true
  },
  {
    name: "Sydney West",
    slug: "sydney-west",
    region: "Sydney",
    description: "Professional pool services for Western Sydney covering Parramatta, Blacktown, Penrith, and surrounding areas.",
    suburbs: ["Parramatta", "Blacktown", "Penrith", "Castle Hill", "Baulkham Hills", "Ryde", "Homebush"],
    active: true
  },
  {
    name: "Newcastle",
    slug: "newcastle",
    region: "Newcastle",
    description: "Expert pool maintenance services for Newcastle, Lake Macquarie, Port Stephens, and Hunter Valley regions.",
    suburbs: ["Newcastle", "Lake Macquarie", "Port Stephens", "Cessnock", "Maitland", "Raymond Terrace", "Wallsend"],
    active: true
  },
  {
    name: "Illawarra",
    slug: "illawarra",
    region: "Illawarra", 
    description: "Professional pool services for Wollongong, Shellharbour, Kiama, and Southern Highlands areas.",
    suburbs: ["Wollongong", "Shellharbour", "Kiama", "Port Kembla", "Dapto", "Corrimal", "Thirroul"],
    active: true
  }
];

const slugify = (text: string): string => {
  return text.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .trim();
};

export const seedDatabase = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if data already exists
    const existingServices = await ctx.db.query("services").first();
    if (existingServices) {
      return { message: "Database already seeded" };
    }

    // Insert services
    for (const service of defaultServices) {
      await ctx.db.insert("services", service);
    }

    // Insert locations and suburbs
    for (const location of defaultLocations) {
      const locationId = await ctx.db.insert("locations", {
        name: location.name,
        slug: location.slug,
        region: location.region,
        description: location.description,
        suburbs: location.suburbs,
        active: location.active,
      });

      // Create individual suburb entries
      if (location.suburbs) {
        for (const suburbName of location.suburbs) {
          await ctx.db.insert("suburbs", {
            name: suburbName,
            slug: slugify(suburbName),
            region: location.region,
            parentLocationId: locationId,
            description: `Professional pool services in ${suburbName}, ${location.region}. Expert pool cleaning, maintenance, and repairs with same-day service availability.`,
            active: true,
          });
        }
      }
    }

    return { message: "Database seeded successfully" };
  },
});
