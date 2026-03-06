"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Play, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchYouTubeVideos } from "@/api/Users";

/* ================= SWIPER CSS ================= */
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function SocialShots() {
  const dispatch = useDispatch<AppDispatch>();

  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /* ================= REDUX DATA ================= */
  const youtubeVideos = useSelector(
    (state: RootState) => state.user.youtubeShort || []
  );

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        await dispatch(fetchYouTubeVideos({}));
      } catch (err) {
        console.error("Error fetching YouTube videos:", err);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, [dispatch]);

  /* ================= FIX: EXTRACT VIDEO IDS CORRECTLY ================= */
  const videos = youtubeVideos.map((video: any) => {
    return video?.id?.videoId || video?.videoId || video?.id;
  });

  return (
    <div className="w-full bg-gray-50 py-16 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* ================= HEADER ================= */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Social <span className="text-[#FF5635]">Shots</span>
          </h2>
          <p className="text-gray-500 mt-2">
            Latest highlights from our community
          </p>
        </div>

        {/* ================= CUSTOM SWIPER STYLES ================= */}
        <style>{`
          /* Ensure the swiper container allows side cards to be seen */
          .youtube-swiper { 
            padding-bottom: 60px !important; 
            overflow: visible !important; 
          }
          
          .youtube-swiper .swiper-slide { 
            transition: all 0.5s ease; 
            opacity: 0.4; 
            transform: scale(0.85); 
          }
          
          .youtube-swiper .swiper-slide-active { 
            opacity: 1; 
            transform: scale(1); 
          }

          /* Pagination Dots Fix */
          .youtube-swiper .swiper-pagination {
            bottom: 0px !important;
          }
          
          .youtube-swiper .swiper-pagination-bullet-active {
            background: #ff5635 !important;
            width: 20px !important;
            border-radius: 5px !important;
          }
        `}</style>

        {/* ================= SWIPER ================= */}
        {videos?.length > 0 ? (
          <Swiper
            className="youtube-swiper"
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            slidesPerView={1.3} /* 1.3 ensures the peek on mobile */
            spaceBetween={10}
            centeredSlides={true}
            loop={true}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3.5, spaceBetween: 30 },
            }}
          >
            {videos?.map((id: string, index: number) => (
              <SwiperSlide key={`${id}-${index}`}>
                <div
                  onClick={() => setActiveVideo(id)}
                  className="relative w-full aspect-[9/16] max-h-[550px] bg-white rounded-3xl overflow-hidden shadow-lg cursor-pointer group border border-gray-200"
                >
                  {/* Thumbnail */}
                  <img
                    src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
                    onError={(e: any) => {
                      e.target.onerror = null;
                      e.target.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
                    }}
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
        ) : loading ? (
          /* ================= SKELETON ================= */
          <div className="flex gap-4 justify-center">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-[280px] aspect-[9/16] bg-gray-200 animate-pulse rounded-3xl hidden sm:block first:block"
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No videos available</p>
        )}
      </div>

      {/* ================= VIDEO MODAL ================= */}
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
              className="relative w-full max-w-[380px] aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl"
            >
              <button
                className="absolute top-4 right-4 z-50 text-white bg-black/20 p-2 rounded-full hover:bg-white/10"
                onClick={() => setActiveVideo(null)}
              >
                <X size={24} />
              </button>

              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </motion.div>

            {/* Click Outside Close */}
            <div
              className="absolute inset-0 -z-10"
              onClick={() => setActiveVideo(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}