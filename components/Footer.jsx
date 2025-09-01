"use client";

import React from "react";

const Footer = () => {
  const categories = [
    { id: "all", name: "All News" },
    { id: "politics", name: "Politics" },
    { id: "tech", name: "Technology" },
    { id: "sports", name: "Sports" },
    { id: "business", name: "Business" },
    { id: "world", name: "World" },
    { id: "health", name: "Health" },
    { id: "science", name: "Science" },
    { id: "entertainment", name: "Entertainment" },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 border-t border-gray-200/50 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg flex flex-col items-center">
            <div className="flex items-center mb-3">
              <img
                src="/logo.png"
                alt="AfricShowbizz Logo"
                width={60}
                height={60}
                className="object-cover  "
              />
              <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                AfricShowbizz
              </h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed text-center">
              Your premier destination for African entertainment news, celebrity
              updates, and showbiz stories from across the continent.
            </p>
          </div>
          {/* Categories Column */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center">
              <span className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-2"></span>
              Categories
            </h4>
            <ul className="space-y-3">
              {categories
                .filter((c) => c.id !== "all")
                .map((category) => (
                  <li key={category.id}>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group"
                      onClick={(e) => {
                        e.preventDefault();
                        // setActiveCategory(category.id);
                      }}
                    >
                      <span className="w-2 h-2 bg-gray-300 rounded-full mr-2 group-hover:bg-blue-500 transition-colors duration-200"></span>
                      {category.name}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center">
              <span className="w-4 h-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mr-2"></span>
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-gray-300 rounded-full mr-2 group-hover:bg-blue-500 transition-colors duration-200"></span>
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-gray-300 rounded-full mr-2 group-hover:bg-blue-500 transition-colors duration-200"></span>
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-gray-300 rounded-full mr-2 group-hover:bg-blue-500 transition-colors duration-200"></span>
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-gray-300 rounded-full mr-2 group-hover:bg-blue-500 transition-colors duration-200"></span>
                  Advertise
                </a>
              </li>
            </ul>
          </div>

          {/* Get In Touch Column */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center">
              <span className="w-4 h-4 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full mr-2"></span>
              Get In Touch
            </h4>

            <div className="space-y-4">
              {/* Credentials */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100/50">
                <div className="flex items-center mb-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  <span className="text-xs font-medium text-blue-700">
                    Trusted by 2M+ readers
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                  <span className="text-xs font-medium text-blue-700">
                    Award-winning journalism
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  <span className="text-xs font-medium text-blue-700">
                    24/7 breaking news
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-700">
                      Email Us
                    </p>
                    <p className="text-xs text-gray-500">news@speedynews.com</p>
                  </div>
                </div>

                <div className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-700">Call Us</p>
                    <p className="text-xs text-gray-500">+1 (555) 123-NEWS</p>
                  </div>
                </div>

                <div className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-700">
                      Visit Us
                    </p>
                    <p className="text-xs text-gray-500">
                      123 News Plaza, Media City
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Contact Button */}
              <button className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center group">
                <span>Send us a tip</span>
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-gray-200/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-500 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} SpeedyNews. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-xs text-gray-500 hover:text-blue-600 transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-xs text-gray-500 hover:text-blue-600 transition-colors duration-200"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-xs text-gray-500 hover:text-blue-600 transition-colors duration-200"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
