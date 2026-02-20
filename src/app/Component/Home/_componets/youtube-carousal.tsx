"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Play, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { fetchYouTubeVideos } from "@/api/Users";
/* ================= SWIPER CSS ================= */
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function YouTubeCarousel() {
  const dispatch = useDispatch<AppDispatch>();
  const [videos, setVideos] = useState<any[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const swiperRef = useRef<any>(null);

  const youtubeSort = useSelector((state: any) => state?.user?.youtubeShort);

  useEffect(() => {
    const getData = async () => {
      try {
        await dispatch(fetchYouTubeVideos({}));
      } catch (err) {
        console.error("Error fetching YouTube videos:", err);
      }
    };
    getData();
  }, [dispatch]);

  useEffect(() => {
    if (youtubeSort?.success && youtubeSort?.videos) {
      const videoIds = youtubeSort.videos.map(
        (video: any) => video.id?.videoId || video.id,
      );
      setVideos(videoIds);
    }
  }, [youtubeSort]);

  return (
    <>
      <div className="w-full bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Social <span className="text-[#FF5635]">Shots</span>
            </h2>
            <p className="text-gray-500 mt-2">
              Latest highlights from our community
            </p>
          </div>

          <style>{`
            .youtube-swiper { padding-bottom: 60px !important; }
            .youtube-swiper .swiper-slide { 
              transition: all 0.5s ease; 
              opacity: 0.4; 
              transform: scale(0.8); 
            }
            .youtube-swiper .swiper-slide-active { 
              opacity: 1; 
              transform: scale(1); 
            }
            .youtube-swiper .swiper-pagination-bullet-active {
              background: #ff5635 !important;
              width: 20px !important;
              border-radius: 5px !important;
            }
          `}</style>

          {videos.length > 0 ? (
            <Swiper
              className="youtube-swiper"
              modules={[Navigation, Pagination, Autoplay]}
              autoplay={{
                delay: 2000, // 2 seconds
                disableOnInteraction: false, // keeps running after swipe
                pauseOnMouseEnter: false, // keeps running even on hover
              }}
              slidesPerView={1.5}
              spaceBetween={10}
              centeredSlides={true}
              loop={true}
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3.5, spaceBetween: 30 },
              }}
            >
              {videos.map((id, index) => (
                <SwiperSlide key={id}>
                  <div
                    onClick={() => setActiveVideo(id)}
                    className="relative w-full aspect-[9/16] max-h-[550px] bg-white rounded-3xl overflow-hidden shadow-lg cursor-pointer group border border-gray-200"
                  >
                    {/* Thumbnail */}
                    <img
                      src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
                      onError={(e: any) =>
                        (e.target.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`)
                      }
                      alt="Thumbnail"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Play Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 transform transition-all group-hover:scale-110 group-hover:bg-[#FF5635]/80">
                        <Play
                          fill="white"
                          className="text-white ml-1"
                          size={28}
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="flex gap-6 justify-center">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-[280px] aspect-[9/16] bg-gray-200 animate-pulse rounded-3xl"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-[380px] aspect-[9/16] bg-black rounded-3xl overflow-hidden"
            >
              <button
                className="absolute top-4 right-4 z-50 text-white bg-black/20 p-2 rounded-full hover:bg-white/10"
                onClick={() => setActiveVideo(null)}
              >
                <X size={24} />
              </button>
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </motion.div>
            <div
              className="absolute inset-0 -z-10"
              onClick={() => setActiveVideo(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
