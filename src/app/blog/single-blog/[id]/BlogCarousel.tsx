"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

/* Swiper styles */
import "swiper/css";
import "swiper/css/pagination";
import { formatDateTime } from "@/Common/ComonDate";

interface BlogPost {
  _id: string;
  title: string;
  image: string;
  createdAt: string;
}

interface Props {
  data: BlogPost[];
}

export default function BlogCarousel({ data }: Props) {
  return (
    <div className="mt-16 md:mt-24 max-w-5xl mx-auto px-4">
      <Swiper
        modules={[Pagination]}
        spaceBetween={24}
        pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
        }}
        className="mt-4"
      >
        {data.map((post) => (
          <SwiperSlide key={post._id}>
            <Link
              href={`/blog/single-blog/${post._id}`}
              className="hover:no-underline"
            >
              <div className="group cursor-pointer">
                {/* Image */}
                <div className="relative rounded-lg w-full h-48 md:h-60 overflow-hidden  transition-shadow duration-300 group-hover:shadow-md">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${post.image}`}
                    alt={post.title}
                    fill
                    className="object-contain transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="mt-3">
                  <p className="text-sm text-black font-dm-sans mb-1 font-medium">
                    Posted On: {formatDateTime(post.createdAt)}
                  </p>
                  <h3 className="text-lg md:text-xl font-normal font-poppins text-[#FF5635] group-hover:underline">
                    {post.title}
                  </h3>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
