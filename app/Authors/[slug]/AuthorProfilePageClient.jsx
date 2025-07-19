/* app/(Authors)/[slug]/AuthorProfilePageClient.jsx */
"use client";
import React, { useState } from "react";
import {
  Search,
  User,
  Clock,
  Share2,
  Heart,
  MessageCircle,
  Menu,
  Bell,
  Bookmark,
  Eye,
  ThumbsUp,
  Globe,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";

const CategoryTag = ({ type, children }) => {
  const categoryClasses = {
    breaking: "bg-red-50 text-red-600 border-red-200",
    politics: "bg-blue-50 text-blue-600 border-blue-200",
    tech: "bg-purple-50 text-purple-600 border-purple-200",
    sports: "bg-green-50 text-green-600 border-green-200",
    business: "bg-yellow-50 text-yellow-600 border-yellow-200",
    world: "bg-gray-50 text-gray-600 border-gray-200",
  };
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${categoryClasses[type]}`}
    >
      {children}
    </span>
  );
};

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function AuthorProfilePageClient({
  author,
  articles,
  popularArticles,
}) {
  const [activeTab, setActiveTab] = useState("articles");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-blue-600">SpeedyNews</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Search className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Bell className="h-5 w-5" />
              </button>
              <button className="md:hidden p-2 text-gray-500 hover:text-gray-700">
                <Menu className="h-5 w-5" />
              </button>
              <button className="hidden md:flex items-center space-x-1 text-sm font-medium text-gray-700">
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar */}
          <div className="space-y-6">
            {/* Author Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="h-12 w-12 text-gray-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{author.name}</h2>
                <p className="text-gray-600 mt-1">{author.role}</p>
                <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 text-sm font-medium">
                  Follow
                </button>
              </div>

              <div className="mt-6">
                <p className="text-gray-700">{author.bio}</p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <Globe className="h-4 w-4 mr-1" />
                  <span>Joined {formatDate(author.joinDate)}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Connect</h3>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-400 hover:text-blue-400">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-700">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-600">
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Statistics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(author.stats).map(([key, val]) => (
                  <div key={key} className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{val}</div>
                    <div className="text-xs text-gray-500 capitalize">{key}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Articles */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Popular Articles
              </h3>
              <div className="space-y-4">
                {popularArticles.map((art) => (
                  <div key={art.id} className="group">
                    <div className="flex space-x-3">
                      <div
                        className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg"
                        style={{
                          backgroundImage: `url(${art.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                      <div>
                        <CategoryTag type={art.category}>
                          {art.category.toUpperCase()}
                        </CategoryTag>
                        <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 mt-1 line-clamp-2">
                          {art.title}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                          <span>{formatDate(art.date)}</span>
                          <span>{art.readTime} read</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  {["articles", "saved", "about"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-6 text-sm font-medium capitalize ${
                        activeTab === tab
                          ? "border-b-2 border-blue-500 text-blue-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {activeTab === "articles" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles.map((art) => (
                  <div
                    key={art.id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all"
                  >
                    <div
                      className="aspect-video bg-gray-200"
                      style={{
                        backgroundImage: `url(${art.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <div className="p-5">
                      <div className="flex items-center space-x-2 mb-2">
                        <CategoryTag type={art.category}>
                          {art.category.toUpperCase()}
                        </CategoryTag>
                        <span className="text-xs text-gray-500">
                          {formatDate(art.date)}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600">
                        {art.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {art.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-2">
                          <Eye className="h-3 w-3" />
                          <span>{art.views}</span>
                          <ThumbsUp className="h-3 w-3" />
                          <span>{art.likes}</span>
                        </div>
                        <span>{art.readTime} read</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "saved" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Saved Articles
                </h3>
                <p className="text-gray-600">Articles you've saved will appear here.</p>
              </div>
            )}

            {activeTab === "about" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  About {author.name}
                </h3>
                <div className="prose max-w-none text-gray-700 space-y-4">
                  <p>{author.bio}</p>
                  <p>
                    {author.name} specializes in making complex technological
                    concepts accessible. Her work has been featured in numerous
                    publications and she speaks regularly at tech conferences.
                  </p>
                  <h4 className="font-medium">Contact</h4>
                  <ul className="space-y-1 text-sm">
                    <li>Email: {author.social.email}</li>
                    <li>Twitter: {author.social.twitter}</li>
                    <li>LinkedIn: {author.social.linkedin}</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2024 SpeedyNews. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}