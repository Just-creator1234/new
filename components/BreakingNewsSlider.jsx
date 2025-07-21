"use client";

import { useEffect } from "react";
import {
  ArrowRight,
  Clock,
  Flame,
  User,
  ChevronLeft,
  ChevronRight,
  ImageOff,
} from "lucide-react";

const BreakingNewsSlider = ({
  breakingNews,
  getTimeAgo,
  currentIndex,
  setCurrentIndex,
}) => {
  // Remove the local currentSlide state since we're using the prop

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === breakingNews.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? breakingNews.length - 1 : prev - 1
    );
  };

  // Auto-advance slides
  useEffect(() => {
    if (breakingNews.length > 1) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [breakingNews.length, currentIndex]); // Add currentIndex to dependencies

  return (
    <div className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-200">
      {/* Slider container */}
      <div className="relative h-full" style={{ minHeight: "400px" }}>
        {breakingNews.map((news, index) => (
          <div
            key={news.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex // Use currentIndex instead of currentSlide
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Image with gradient overlay */}
            {/* <img
              src={news.coverImage}
              alt={news.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/default-news.jpg";
              }}
            /> */}

            {news.coverImage ? (
              <img
                src={news.coverImage}
                alt={news.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/default-news.jpg";
                }}
              />
            ) : (
              <div className="w-full h-96 flex items-center justify-center border border-dashed border-gray-300 bg-gray-50">
                <ImageOff className="w-10 h-10 text-gray-400" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            {/* Breaking news badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full flex items-center">
                <Flame className="h-3 w-3 mr-1" />
                BREAKING
              </span>
            </div>

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="h-4 w-4 text-gray-200" />
                <span className="text-sm text-gray-200">
                  {getTimeAgo(news.createdAt)}
                </span>
                <span className="text-sm text-gray-200">
                  {news.viewCount || "0"} views
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-3 line-clamp-2">
                {news.title}
              </h2>

              <p className="text-gray-200 mb-4 line-clamp-2">{news.excerpt}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-white">
                    {news.author?.name || "Unknown"}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <a
                    href={`/${news.slug}`}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-full transition flex items-center"
                  >
                    Read full story <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {breakingNews.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Pagination indicators */}
      {breakingNews.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {breakingNews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)} // Use setCurrentIndex
              className={`h-2 w-2 rounded-full transition ${
                index === currentIndex // Use currentIndex
                  ? "bg-white w-4"
                  : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BreakingNewsSlider;
