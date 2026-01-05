"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import STUDENTREAD from "@/assets/vectors/Illustration.svg";

import IMG1 from "@/assets/images/blogs/Rectangle322.png";
import IMG2 from "@/assets/images/blogs/Rectangle339.png";
import IMG3 from "@/assets/images/blogs/Rectangle340.png";
import SocialMedia from "../Component/Home/_componets/social-media";

import FOOTERLOGO from "@/assets/vectors/footer-logo.svg";
import { getblog } from "@/api/Blog";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { formatDateTime } from "@/Common/ComonDate";
// Mock blog data - replace with actual data from API
const blogPosts = [
  {
    id: 1,
    title: "Top Study Strategies to Boost Your Mock Exam Scores on PrepRoute",
    date: "25/12/2025",
    image: IMG1, // Library image
  },
  {
    id: 2,
    title: "How to Build a Smart Exam Preparation Routine That Actually Works",
    date: "25/12/2025",
    image: IMG2, // Students with laptops
  },
  {
    id: 3,
    title: "Understanding Your Mock Test Analytics: A Simple Guide for Success",
    date: "25/12/2025",
    image: IMG3, // Classroom image
  },
  {
    id: 4,
    title: "Top Study Strategies to Boost Your Mock Exam Scores on PrepRoute",
    date: "25/12/2025",
    image: IMG1,
  },
  {
    id: 5,
    title: "How to Build a Smart Exam Preparation Routine That Actually Works",
    date: "25/12/2025",
    image: IMG2,
  },
  {
    id: 6,
    title: "Understanding Your Mock Test Analytics: A Simple Guide for Success",
    date: "25/12/2025",
    image: IMG3,
  },
];

const BlogPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: any) => state?.blog?.Blog || []);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const fetchBlog = async () => {
    await dispatch(getblog({}));
  };

  useEffect(() => {
    fetchBlog();
  }, []);
  return (
    <div>
      <div className="min-h-screen bg-white px-6 sm:px-8 md:px-12 lg:px-28">
        <div className="mx-auto">
          {/* Header Section */}
          <div className="relative bg-[#E8F4F8] rounded-lg px-8 py-3 mb-12 flex justify-between items-center">
            <div className="">
              <h1 className="text-[#FF5635] text-2xl md:text-3xl font-medium font-poppins mb-2">
                Blog & Insights
              </h1>
              <p className="text-md text-gray-700 font-dm-sans max-w-xl">
                Explore practical tips, smart strategies, and exam insights
                designed to strengthen your preparation.
              </p>
            </div>
            <div className="hidden md:block">
              <Image src={STUDENTREAD} alt="student" className="w-48 h-auto" />
            </div>

            {/* Overlapping Search Bar */}
            <div className="absolute bottom-8 left-1/2 md:left-auto md:right-8 -translate-x-1/2 md:translate-x-0 translate-y-1/2 w-[90%] md:w-96 bg-white rounded-full flex items-center px-4 py-3 border border-gray-100">
              <Search className="w-5 h-5 text-gray-400 mr-2" />
              <input
                className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {data.map((post: any) => (
              <Link 
                key={post._id}
                href={`/blog/single-blog/${post._id}`}
                className="group hover:underline-none"
              >
                <div className="cursor-pointer">
                  {/* Blog Image */}
                  <div className="relative rounded-lg w-full h-48 md:h-60 overflow-hidden  transition-shadow duration-300 group-hover:shadow-md">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${post.image}`}
                      alt={post.title}
                      fill
                      className="object-contain transition-transform duration-300"
                      
                    />
                  </div>

                  <div className=" mt-4">
                    {/* Date */}
                    <p className="text-sm text-black font-dm-sans">
                      Posted On: {formatDateTime(post.createdAt)}
                    </p>

                    {/* Title */}
                    <h3 className="text-lg md:text-lg font-normal font-poppins text-[#FF5635] line-clamp-2 ">
                      {post.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#585859] font-dm-sans text-lg">
                No blog posts found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>
      <section className=" bg-[#FF5635] text-white px-6 sm:px-10 lg:px-12 xl:px-16 mt-16 py-2 sm:py-5 lg:py-6 xl:py-8">
        <div className="mx-auto flex flex-col md:flex-row items-center md:items-center justify-between gap-8 px-6 sm:px-8 md:px-12 lg:px-28">
          <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
            {/* Logo */}
            <div className="w-[130px] sm:w-[160px] lg:w-[200px]">
              <Image
                src={FOOTERLOGO}
                alt="preproute-logo"
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start gap-3">
            <SocialMedia />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
