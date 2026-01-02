"use client";
import React from "react";
import BlogForm from "./BlogForm";

const BlogHeader: React.FC = () => {
  return (
     <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 mb-8">
      <div className="flex flex-col gap-6">
        <div className="bg-[#F0F9FF] rounded-lg px-8 py-6 text-start font-poppins font-medium">
          <h1 className="text-[#FF5635] text-2xl f font-poppins">
            Exam Setup{" "}
            <span className="text-black text-lg">
              <span className="text-[#005EB6]"> | </span>
              Create Oprator
            </span>
          </h1>
        </div>
        <BlogForm />
      </div>
    </div>
  );
};

export default BlogHeader;
