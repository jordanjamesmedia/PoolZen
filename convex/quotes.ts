import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("quotes")
      .order("desc")
      .collect();
  },
});

export const getByLocation = query({
  args: { locationId: v.id("locations") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("quotes")
      .withIndex("by_location", (q) => q.eq("locationId", args.locationId))
      .collect();
  },
});

export const create = mutation({
  args: {
    customerName: v.string(),
    email: v.string(),
    phone: v.string(),
    locationId: v.id("locations"),
    serviceId: v.id("services"),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const estimatedValue = Math.floor(Math.random() * 200) + 100; // Random estimate between 100-300
    return await ctx.db.insert("quotes", {
      ...args,
      status: "pending",
      estimatedValue,
      createdAt: Date.now(),
    });
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("quotes"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, status } = args;
    if (!["pending", "completed", "cancelled"].includes(status)) {
      throw new Error("Invalid status");
    }
    await ctx.db.patch(id, { status });
    return await ctx.db.get(id);
  },
});
