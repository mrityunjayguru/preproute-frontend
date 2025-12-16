"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

/* ✅ REQUIRED SWIPER CSS */
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const videos = [
  "3fZxrn-A7HQ",
  "3fZxrn-A7HQ",
  "3fZxrn-A7HQ",
  "3fZxrn-A7HQ",
];

export default function YouTubeCarousel() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <>
      {/* ================== CAROUSEL ================== */}
      <div className="w-full flex justify-center bg-gray-100 py-12">
        <style>
          {`
          .youtube-swiper {
            width: 100%;
            padding-bottom: 40px;
          }

          .youtube-swiper .swiper-slide {
            display: flex;
            justify-content: center;
          }

          .youtube-swiper .swiper-button-prev,
          .youtube-swiper .swiper-button-next {
            width: 40px !important;
            height: 40px !important;
            color: #374151 !important;
            display:none!important;
          }

          .youtube-swiper .swiper-button-prev::after,
          .youtube-swiper .swiper-button-next::after {
            font-size: 16px !important;
            font-weight: bold !important;
            display:none;
          }

          .youtube-swiper .swiper-pagination-bullet {
            background: #9ca3af !important;
            opacity: 1 !important;
          }

          .youtube-swiper .swiper-pagination-bullet-active {
            background: #FF5635 !important;
            width: 24px !important;
            border-radius: 9999px !important;
          }
          `}
        </style>

        <div className="max-w-6xl w-full px-4">
          <Swiper
            className="youtube-swiper"
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={3}
            spaceBetween={24}
            centeredSlides
            loop
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {videos.map((id, index) => (
              <SwiperSlide key={index}>
                {/* Thumbnail Card */}
                <div
                  className="relative bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-[360px] cursor-pointer group"
                  onClick={() => setActiveVideo(id)}
                >
                  <img
                    src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                    alt="Video Thumbnail"
                    className="w-full h-[220px] object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition group-hover:bg-black/60">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-xl font-bold text-black">
                      ▶
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* ================== VIDEO POPUP ================== */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="relative w-[90%] max-w-3xl bg-black rounded-xl overflow-hidden animate-scaleIn">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-white text-2xl z-10"
              onClick={() => setActiveVideo(null)}
            >
              ✕
            </button>

            <iframe
              className="w-full h-[450px]"
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
