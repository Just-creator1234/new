"use client";
import React from "react";

const LoadingComponent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-lg flex flex-col items-center max-w-md w-full">
        {/* Logo and Brand Section */}
        <div className="flex items-center mb-6">
          <div className="relative">
            <img
              src="/logo.png"
              alt="AfricShowbizz Logo"
              width={60}
              height={60}
              className="object-cover animate-pulse"
            />
            {/* Spinning ring around logo */}
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-amber-500 animate-spin"></div>
          </div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent ml-3">
            AfricShowbizz
          </h2>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed text-center mb-8">
          Your premier destination for African entertainment news, celebrity
          updates, and showbiz stories from across the continent.
        </p>

        {/* Loading Animation */}
        <div className="flex flex-col items-center space-y-4">
          {/* Progress Bar */}
          <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-full animate-pulse"></div>
          </div>

          {/* Bouncing Dots */}
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce"></div>
            <div
              className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-3 h-3 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.3s" }}
            ></div>
          </div>

          {/* Loading Text */}
          <p className="text-sm text-gray-500 animate-pulse">
            Loading amazing content...
          </p>
        </div>

        {/* Pulsing Ring Effect */}
        <div className="mt-6 relative">
          <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-ping opacity-20"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingComponent;
