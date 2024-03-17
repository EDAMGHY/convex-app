import Image from "next/image";
import React from "react";

const Blogs = ({ blogs = [] }) => {
  if (blogs?.length === 0) {
    return (
      <div>
        <h2 className='text-center text-xl font-bold'>No Results...</h2>
      </div>
    );
  }

  return (
    <div className='grid-cols-1 md:grid-cols-2 gap-5 grid w-full'>
      {blogs?.map((item: any) => (
        <div
          key={item._id}
          className='rounded-md overflow-hidden border border-gray-600'
        >
          <div className='w-full flex items-start'>
            {item?.image && (
              <div className='relative w-2/5 aspect-square'>
                <Image
                  src={item.image}
                  alt={item.title}
                  className='w-full h-full object-cover rounded-br-md'
                  fill
                />
              </div>
            )}
            <div className='w-3/5 p-5'>
              {item.title && (
                <h2 className='text-2xl font-bold'>{item.title}</h2>
              )}
            </div>
          </div>

          {item.description && (
            <p className='p-4 text-base text-gray-400'>{item.description}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Blogs;
