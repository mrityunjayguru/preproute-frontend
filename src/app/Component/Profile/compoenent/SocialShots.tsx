"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, Play } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchYouTubeVideos } from "@/api/Users";

function SocialShots() {
  const dispatch = useDispatch<AppDispatch>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const youtubeVideos = useSelector(
    (state: RootState) => state.user.youtubeShort || []
  );

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        await dispatch(fetchYouTubeVideos({}));
      } catch (err) {
        console.error("Error fetching YouTube videos:", err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [dispatch]);

  /* =========================
     AUTO-SLIDE: Single Card
  ========================== */
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || youtubeVideos.length === 0) return;

    const autoScroll = setInterval(() => {
      const { scrollLeft, offsetWidth, scrollWidth } = scrollContainer;
      
      // Calculate the exact width of one scroll "page"
      // Since we use snap-center/start, we scroll by the container width
      const scrollStep = offsetWidth; 

      if (scrollLeft + offsetWidth >= scrollWidth - 10) {
        scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollContainer.scrollBy({ left: scrollStep, behavior: "smooth" });
      }
    }, 4000);

    return () => clearInterval(autoScroll);
  }, [youtubeVideos]);

  const getVideoId = (video: any) => {
    return video?.id?.videoId || video?.videoId || video?.id;
  };

  return (
    <div className="mx-auto px-4 py-12 max-w-7xl">
      {/* HEADER */}
      <div className="mb-8 px-2">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 font-poppins">
          Social <span className="text-[#FF5635]">Shots</span>
        </h2>
        <p className="text-gray-500 mt-1">Check out our latest highlights</p>
      </div>

      {/* SCROLL CONTAINER */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-10 scrollbar-hide snap-x snap-mandatory scroll-smooth"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {youtubeVideos.length > 0 ? (
          youtubeVideos.map((video: any) => {
            const videoId = getVideoId(video);
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
            const fallbackUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

            return (
              <div
                key={videoId}
                onClick={() => setSelectedVideo(videoId)}
                className="group relative 
                           min-w-[90%] sm:min-w-[320px] 
                           snap-center first:ml-[5%] last:mr-[5%] sm:first:ml-0 sm:last:mr-0
                           aspect-[9/16] bg-gray-200 rounded-[2.5rem] overflow-hidden cursor-pointer 
                           transition-all duration-500 shadow-lg"
              >
                {/* Thumbnail */}
                <img
                  src={thumbnailUrl}
                  alt={video?.snippet?.title || "YouTube Short"}
                  loading="lazy"
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src = fallbackUrl;
                  }}
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="text-white fill-white w-8 h-8" />
                  </div>
                </div>

                {/* Title */}
                <div className="absolute bottom-0 p-6 w-full">
                  <p className="text-white font-semibold text-sm line-clamp-2 leading-snug">
                    {video?.snippet?.title}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          /* SKELETON */
          [1, 2, 3].map((i) => (
            <div key={i} className="min-w-[90%] sm:min-w-[320px] aspect-[9/16] bg-gray-100 rounded-[2.5rem] animate-pulse" />
          ))
        )}
      </div>

      {/* MODAL */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={() => setSelectedVideo(null)} />
          <div className="relative w-full max-w-[400px] aspect-[9/16] bg-black rounded-3xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full"
            >
              <X size={24} />
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SocialShots;