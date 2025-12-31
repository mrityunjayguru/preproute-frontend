"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import STUDENTREAD from "@/assets/vectors/Illustration.svg";
import IMG1 from "@/assets/images/blogs/Rectangle322.png";
import IMG2 from "@/assets/images/blogs/Rectangle339.png";

// Mock related posts
const relatedPosts = [
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
];

const SingleBlog = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 sm:px-8 md:px-12 lg:px-28 mx-auto py-8">
        
        {/* Header Section */}
        <div className="bg-[#E8F4F8] rounded-2xl relative overflow-hidden px-6 py-10 md:px-12 md:py-16 flex flex-col md:flex-row items-center justify-center md:justify-between text-center md:text-left">
          <div className="relative z-10 w-full flex flex-col items-center">
            <p className="text-sm text-[#585859] font-dm-sans mb-3 font-medium">
              Posted On: 25/12/2025
            </p>
            <h1 className="text-[#FF5635] text-2xl md:text-3xl lg:text-4xl font-medium font-poppins leading-snug max-w-3xl text-center">
              How to Build a Smart Exam Preparation Routine That Actually Works
            </h1>
          </div>
          
          {/* Illustration - Absolute positioned to right as per design implication or flex */}
          {/* Based on the screenshot, the illustration is on the right side. 
              However, the text is centered in the screenshot. 
              Let's look at the screenshot again.
              The text "How to Build..." is centered.
              The illustration is on the right.
              "Posted On" is above the title, centered.
          */}
          <div className="hidden md:block absolute right-0 bottom-0 w-48 lg:w-64">
             <Image src={STUDENTREAD} alt="Student Reading" className="object-contain" />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="mt-8 md:mt-12 max-w-5xl mx-auto">
          {/* Featured Image */}
          <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden mb-10">
            <Image
              src={IMG2}
              alt="Students studying"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Blog Text Content */}
          <div className="prose prose-lg max-w-none font-dm-sans text-[#585859] space-y-6">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a
              fermentum lectus. Suspendisse potenti. Donec ac lorem at libero
              viverra aliquet. Vivamus non ultrices odio. Cras auctor, ligula id
              fermentum tincidunt, sapien arcu convallis ipsum, in feugiat lorem
              elit a justo. Sed sodales, lorem nec malesuada aliquet, orci nisl
              feugiat enim, a tincidunt lorem ipsum non massa.
            </p>
            
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a
              fermentum lectus. Suspendisse potenti. Donec ac lorem at libero
              viverra aliquet. Vivamus non ultrices odio. Cras auctor, ligula id
              fermentum tincidunt, sapien arcu convallis ipsum, in feugiat lorem
              elit a justo. Sed sodales, lorem nec malesuada aliquet, orci nisl
              feugiat enim, a tincidunt lorem ipsum non massa.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a
              fermentum lectus. Suspendisse potenti. Donec ac lorem at libero
              viverra aliquet. Vivamus non ultrices odio. Cras auctor, ligula id
              fermentum tincidunt, sapien arcu convallis ipsum, in feugiat lorem
              elit a justo. Sed sodales, lorem nec malesuada aliquet, orci nisl
              feugiat enim, a tincidunt lorem ipsum non massa.
            </p>
          </div>
        </div>

        {/* Related Posts Section */}
        <div className="mt-16 md:mt-24 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((post) => (
              <Link key={post.id} href={`/blog/single-blog`}>
                <div className="group cursor-pointer">
                  {/* Image */}
                  <div className="relative rounded-2xl w-full h-56 md:h-64 overflow-hidden mb-4">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Content */}
                  <div>
                    <p className="text-sm text-black font-dm-sans mb-1 font-medium">
                      Posted On: {post.date}
                    </p>
                    <h3 className="text-lg md:text-xl font-normal font-poppins text-[#FF5635] group-hover:underline">
                      {post.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
