"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRef, useState } from "react";
import Blogs from "@/components/Blogs";

export default function CreateBlog() {
  const generateUploadUrl = useMutation(api.blogs.generateUploadUrl);
  const createBlog = useMutation(api.blogs.createBlog);
  const blogs = useQuery(api.blogs.getCurrentUserBlogs);

  const imageInput = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const onSubmit = async (e: any) => {
    e?.preventDefault();
    try {
      // Step 1: Get a short-lived upload URL
      const postUrl: any = await generateUploadUrl();
      // Step 2: POST the file to the URL
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": selectedImage!.type },
        body: selectedImage,
      });
      const { storageId } = await result.json();

      createBlog({ description, title, image: storageId });

      setSelectedImage(null);
      imageInput.current!.value = "";
    } catch (error) {
      console.log("error :", error);
    }
  };

  return (
    <div className='space-y-8 flex justify-center items-center flex-col w-full'>
      <div className='w-full space-y-8'>
        <h3 className='text-4xl font-bold'>Add Blog :</h3>
        <form onSubmit={onSubmit} className='text-black w-full'>
          <div className='mb-4 w-full'>
            <input
              type='text'
              onChange={(e) => setTitle(e?.target.value)}
              value={title}
              placeholder='Title...'
              required
              className='py-2 px-4 focus:outline-0 focus:ring-0 text-white placeholder:text-gray-400 bg-gray-700 border-none rounded w-full'
            />
          </div>
          <div className='mb-4 w-full'>
            <textarea
              value={description}
              rows={6}
              required
              onChange={(e) => setDescription(e?.target.value)}
              className='py-2 px-4 focus:outline-0 focus:ring-0 text-white placeholder:text-gray-400 bg-gray-700 border-none rounded w-full resize-none'
              placeholder='Description...'
            ></textarea>
          </div>
          <div className='mb-4 w-full'>
            <input
              type='file'
              accept='image/*'
              ref={imageInput}
              required
              className='text-white'
              onChange={(event) => setSelectedImage(event.target.files![0])}
              disabled={selectedImage !== null}
            />
          </div>

          <button
            className='bg-blue-500 text-white font-bold hover:opacity-90 rounded px-6 py-2.5'
            type='submit'
          >
            Add Blog
          </button>
        </form>
      </div>

      <div className='space-y-8 w-full'>
        <h3 className='text-2xl font-bold'>Your Blogs :</h3>
        {blogs === undefined ? (
          <div>Loading...</div>
        ) : (
          <Blogs blogs={blogs as any} />
        )}
      </div>
    </div>
  );
}
