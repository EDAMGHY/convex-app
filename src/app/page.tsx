"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useStoreUserEffect } from "@/hooks";
import Blogs from "@/components/Blogs";

export default function Home() {
  useStoreUserEffect();
  const blogs = useQuery(api.blogs.getBlogs);

  return (
    <div className='space-y-8'>
      <h1 className='text-4xl font-bold'>Blogs Listing :</h1>
      {blogs === undefined ? (
        <div>Loading...</div>
      ) : (
        <Blogs blogs={blogs as any} />
      )}
    </div>
  );
}
