"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Play } from "lucide-react";
import { fetchYouTubeVideos } from "@/Utils/YoutubeSort";

/* ================= SWIPER CSS ================= */
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function YouTubeCarousel() {
  const [videos, setVideos] = useState<string[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const swiperRef = useRef<any>(null);

  // ================= FETCH YOUTUBE DATA =================
  const getData = async () => {
    try {
      const response = await fetchYouTubeVideos();

      // If API returns { items: [...] }
      const items = response?.items || response;

      const videoIds = items
        ?.filter((item: any) => item.id?.videoId)
        .map((item: any) => item.id.videoId);

      setVideos(videoIds || []);
    } catch (err) {
      console.error("Error fetching YouTube videos:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {/* ================= CAROUSEL ================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full flex justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden"
      >
        <style>{`
          .youtube-swiper {
            width: 100%;
            padding-bottom: 40px;
          }

          .youtube-swiper .swiper-slide {
            display: flex;
            justify-content: center;
            transition: transform 0.3s ease, opacity 0.3s ease;
            opacity: 0.8;
            transform: scale(0.95);
          }

          .youtube-swiper .swiper-slide-active {
            opacity: 1;
            transform: scale(1);
          }

          .youtube-swiper .swiper-button-prev,
          .youtube-swiper .swiper-button-next {
            display: none !important;
          }

          .youtube-swiper .swiper-pagination-bullet {
            background: #9ca3af !important;
            opacity: 1 !important;
          }

          .youtube-swiper .swiper-pagination-bullet-active {
            background: #ff5635 !important;
            width: 24px !important;
            border-radius: 9999px !important;
          }
        `}</style>

        <div className="w-full max-w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16">
          <div className="container">
            <Swiper
              className="youtube-swiper"
              modules={[Navigation, Pagination]}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              slidesPerView={3}
              spaceBetween={24}
              centeredSlides
              loop
              pagination={{ clickable: true }}
              breakpoints={{
                0: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {videos.map((id, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative bg-white rounded-[24px] shadow-lg overflow-hidden 
                               w-full cursor-pointer group"
                    onClick={() => setActiveVideo(id)}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-full aspect-video">
                      <img
                        loading="lazy"
                        decoding="async"
                        src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                        alt="YouTube Thumbnail"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition group-hover:bg-black/60">
                      <div className="w-16 h-16 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center text-xl font-bold text-black">
                        <Play fill="black" />
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </motion.div>

      {/* ================= VIDEO POPUP ================= */}
      {activeVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
        >
          <motion.div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-white text-2xl z-10"
              onClick={() => setActiveVideo(null)}
            >
              ✕
            </button>

            {/* Video */}
            <div className="relative w-full aspect-video">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
