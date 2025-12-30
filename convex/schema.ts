import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    username: v.string(),
    password: v.string(),
  }).index("by_username", ["username"]),

  services: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    shortDescription: v.string(),
    basePrice: v.number(),
    priceUnit: v.string(),
    icon: v.string(),
    category: v.string(),
  }).index("by_slug", ["slug"]),

  locations: defineTable({
    name: v.string(),
    slug: v.string(),
    region: v.string(),
    description: v.string(),
    suburbs: v.optional(v.array(v.string())),
    active: v.boolean(),
  }).index("by_slug", ["slug"]),

  suburbs: defineTable({
    name: v.string(),
    slug: v.string(),
    region: v.string(),
    parentLocationId: v.id("locations"),
    description: v.string(),
    postcode: v.optional(v.string()),
    active: v.boolean(),
  })
    .index("by_slug", ["slug"])
    .index("by_location", ["parentLocationId"]),

  quotes: defineTable({
    customerName: v.string(),
    email: v.string(),
    phone: v.string(),
    locationId: v.id("locations"),
    serviceId: v.id("services"),
    message: v.optional(v.string()),
    status: v.string(),
    estimatedValue: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_location", ["locationId"])
    .index("by_status", ["status"])
    .index("by_created", ["createdAt"]),
});
