"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import STUDENTREAD from "@/assets/vectors/Illustration.svg";
import IMG1 from "@/assets/images/blogs/Rectangle322.png";
import IMG2 from "@/assets/images/blogs/Rectangle339.png";
import IMG3 from "@/assets/images/blogs/Rectangle340.png";
import SocialMedia from "@/app/Component/Home/_componets/social-media";

import FOOTERLOGO from "@/assets/vectors/footer-logo.svg";
import { useSelector } from "react-redux";
import { formatDateTime } from "@/Common/ComonDate";
import BlogCarousel from "./BlogCarousel";

// Mock blog data - same as in the main blog page
const blogPosts = [
  {
    id: 1,
    title: "Top Study Strategies to Boost Your Mock Exam Scores on PrepRoute",
    date: "25/12/2025",
    image: IMG1,
  },
  {
    id: 2,
    title: "How to Build a Smart Exam Preparation Routine That Actually Works",
    date: "25/12/2025",
    image: IMG2,
  },
  {
    id: 3,
    title: "Understanding Your Mock Test Analytics: A Simple Guide for Success",
    date: "25/12/2025",
    image: IMG3,
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

const SingleBlog = () => {
  const data = useSelector((state: any) => state?.blog?.Blog || []);

  const params = useParams();
  const id = params?.id;
  const post = data.find((p: any) => p._id === id);
  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-poppins text-[#FF5635] mb-4">
            Blog Post Not Found
          </h2>
          <Link href="/blog" className="text-gray-600 hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Generate related posts (excluding current one, take first 2)
  const relatedPosts = blogPosts.filter((p: any) => p.id !== id).slice(0, 2);

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 sm:px-8 md:px-12 lg:px-28  py-4">
        {/* Header Section */}
        <div className="bg-[#E8F4F8] rounded-lg px-8 py-4 mb-8 text-center flex justify-between items-center gap-5">
          <div />
          <div />
          <div className="max-w-4xl text-center">
            <p className="text-sm text-gray-700 font-dm-sans">
              Posted On : {formatDateTime(post.createdAt)}
            </p>
            <h1 className="text-[#FF5635] text-2xl md:text-3xl font-medium font-poppins mb-2">
              {post.title}
            </h1>
          </div>
          <div className="">
            <div className="hidden md:block">
              <Image src={STUDENTREAD} alt="student" className="w-48 h-auto" />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className=" md:mt-12 max-w-5xl mx-auto">
          {/* Featured Image */}
          <div className="relative w-full h-[200px] md:h-[300px] lg:h-[300px] rounded-2xl overflow-hidden mb-10">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${post.image}`}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Blog Text Content */}
          <div className="prose prose-lg max-w-none font-dm-sans text-[#333333] space-y-6">
            <div dangerouslySetInnerHTML={{ __html: post.description }} />
          </div>
        </div>

        {/* Related Posts Section */}
        <div className="">
        <BlogCarousel data={data} />
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

export default SingleBlog;
