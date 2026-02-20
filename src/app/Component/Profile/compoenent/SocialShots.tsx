import React, { useEffect, useState, useRef } from "react";
import { X, Play } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { fetchYouTubeVideos } from "@/api/Users";

function SocialShots() {
  const dispatch = useDispatch<AppDispatch>();
  const [videos, setVideos] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Get data from Redux Store
  const youtubeSort = useSelector((state: any) => state?.user?.youtubeShort);

  // 1. Initial Fetch
  useEffect(() => {
    const getData = async () => {
      try {
        const payload: any = {};
        await dispatch(fetchYouTubeVideos(payload));
      } catch (err) {
        console.error("Error fetching YouTube videos:", err);
      }
    };
    getData();
  }, [dispatch]);

  // 2. Sync local state when Redux store updates (The Fix)
  useEffect(() => {
    if (youtubeSort?.success && youtubeSort?.videos) {
      setVideos(youtubeSort.videos);
    }
  }, [youtubeSort]);

  // 3. Auto-Scroll Logic
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || videos.length === 0) return;

    const autoScroll = setInterval(() => {
      if (
        scrollContainer.scrollLeft + scrollContainer.offsetWidth >=
        scrollContainer.scrollWidth - 20
      ) {
        scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollContainer.scrollBy({ left: 300, behavior: "smooth" });
      }
    }, 3500);

    return () => clearInterval(autoScroll);
  }, [videos]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 font-poppins">
            Social <span className="text-[#FF5635]">Shots</span>
          </h2>
          <p className="text-gray-500 mt-1">
            Check out our latest vertical highlights
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-10 scrollbar-hide snap-x cursor-grab active:cursor-grabbing scroll-smooth"
      >
        {videos.length > 0
          ? videos.map((video) => {
              // Extract videoId correctly based on your API structure
              const videoId = video.id?.videoId || video.id;

              const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
              const fallbackUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

              return (
                <div
                  key={videoId}
                  onClick={() => setSelectedVideo(videoId)}
                  className="group relative min-w-[250px] md:min-w-[280px] aspect-[9/16] bg-gray-200 rounded-3xl overflow-hidden cursor-pointer snap-start transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                >
                  <img
                    src={thumbnailUrl}
                    alt={video.snippet?.title}
                    loading="lazy"
                    onError={(e: any) => {
                      e.target.onerror = null;
                      e.target.src = fallbackUrl;
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Play Button Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30">
                      <Play className="text-white fill-white w-8 h-8" />
                    </div>
                  </div>

                  {/* Title Information */}
                  <div className="absolute bottom-0 p-5 w-full">
                    <p className="text-white font-medium text-sm line-clamp-2 leading-relaxed">
                      {video.snippet?.title}
                    </p>
                  </div>
                </div>
              );
            })
          : /* Skeleton Loader */
            [1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="min-w-[250px] md:min-w-[280px] aspect-[9/16] bg-gray-100 rounded-3xl animate-pulse flex flex-col justify-end p-5 space-y-3"
              >
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
      </div>

      {/* Video Popup Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedVideo(null)}
          />

          <div className="relative w-full max-w-[400px] aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20 animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-10 right-4 z-10 p-2 bg-black/50 hover:bg-white/20 text-white rounded-full transition-colors"
            >
              <X size={24} />
            </button>

            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default SocialShots;