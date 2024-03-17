import { mutation } from "./_generated/server";
import { v } from "convex/values";

import { query } from "./_generated/server";

export const getBlogs = query({
  args: {},
  handler: async (ctx) => {
    let blogs: any[] = await ctx.db.query("blogs").collect();
    console.log("blogs", blogs);
    return Promise.all(
      blogs.map(async (blog: { image: any }) => ({
        ...blog,
        image: await ctx.storage.getUrl(blog.image),
      }))
    );
  },
});

export const getCurrentUserBlogs = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier))
      .unique();

    if (!user) {
      return [];
    }

    let blogs: any = await ctx.db
      .query("blogs")
      .filter((q) => q.eq(q.field("user"), user._id))
      .collect();

    return Promise.all(
      blogs.map(async (blog: { image: any }) => ({
        ...blog,
        image: await ctx.storage.getUrl(blog.image),
      }))
    );
  },
});

export const createBlog = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    image: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      console.log("Called storeUser without authentication present");
      return {};
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier))
      .unique();

    if (!user) {
      console.log("User not logged in");
      return {};
    }

    const blog = await ctx.db.insert("blogs", {
      title: args.title,
      description: args.description,
      image: args.image,
      user: user._id,
    });
    return blog;
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    console.log("Called storeUser without authentication present");
    return {};
  }

  const user = await ctx.db
    .query("users")
    .filter((q) => q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier))
    .unique();

  if (!user) {
    console.log("User not logged in");
    return {};
  }
  return await ctx.storage.generateUploadUrl();
});
