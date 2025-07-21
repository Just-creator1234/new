"use client";
import React, { useState, useEffect } from "react";
import {
  Eye,
  Grid,
  List,
  Flame,
  Play,
  TrendingUp,
  ImageOff,
} from "lucide-react";
import Link from "next/link";
import {
  getPostsByCategory,
  getAllCategories,
  getPopularPostsByCategory,
  getTrendingPostsByCategory,
} from "@/app/actions/catpost";

export default function CategoryClient({ slug }) {
  const categoryId = slug || "all";
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("latest");
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const allCats = await getAllCategories();
        setCategories([
          { id: "all", name: "All News", color: "gray" },
          ...allCats.filter((c) => c.slug !== "breaking"),
        ]);

        let posts;
        switch (sortBy) {
          case "latest":
            posts = await getPostsByCategory(categoryId, "latest");
            break;
          case "popular":
            posts = await getPopularPostsByCategory(categoryId);
            break;
          case "trending":
            posts = await getTrendingPostsByCategory(categoryId);
            break;
          default:
            posts = await getPostsByCategory(categoryId);
        }

        setArticles(posts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [categoryId, sortBy]); // Added sortBy to dependency array

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
        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${
          categoryClasses[type] || "bg-gray-50 text-gray-600 border-gray-200"
        }`}
      >
        {children}
      </span>
    );
  };

  const ArticleCard = ({ article }) => (
    <Link className="group" href={`/${article.slug}`}>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            className="aspect-video object-cover w-full group-hover:opacity-90 transition-opacity"
          />
        ) : (
          <div className="aspect-video flex items-center justify-center border border-dashed border-gray-300 bg-gray-50">
            <ImageOff className="w-8 h-8 text-gray-400" />
          </div>
        )}
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            <CategoryTag type={article.categoryName.toLowerCase()}>
              {article.isBreaking ? "BREAKING" : article.categoryName}
            </CategoryTag>
            <span className="text-xs text-gray-500">{article.readTime}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
            {article.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="uppercase tracking-wide">
              By {article.author.name}
            </span>
            <div className="flex items-center space-x-2">
              <Eye className="h-3 w-3" />
              <span>{article.views.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  const CompactArticleCard = ({ article }) => (
    <Link className="group" href={`/${article.slug}`}>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
            {article.image ? (
              <img
                src={article.image}
                alt={article.title}
                className="aspect-video object-cover w-full group-hover:opacity-90 transition-opacity"
              />
            ) : (
              <div className="aspect-video flex items-center justify-center border border-dashed border-gray-300 bg-gray-50">
                <ImageOff className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <CategoryTag type={article.categoryName.toLowerCase()}>
                {article.isBreaking ? "BREAKING" : article.categoryName}
              </CategoryTag>
              <span className="text-xs text-gray-500">{article.readTime}</span>
            </div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
              {article.title}
            </h4>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <Eye className="h-3 w-3" />
            <span>{article.views.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-2 border-blue-600 rounded-full" />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-error-500">
        Error: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {categories.find((c) => c.id === categoryId)?.name || "All News"}
          </h1>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-neutral-300 rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="latest">Latest</option>
                  <option value="popular">Most Popular</option>
                  <option value="trending">Trending</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex space-x-1 bg-neutral-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md ${
                  viewMode === "grid"
                    ? "bg-white shadow-sm"
                    : "text-neutral-500"
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md ${
                  viewMode === "list"
                    ? "bg-white shadow-sm"
                    : "text-neutral-500"
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Articles */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {articles.length ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {articles.map((a) => (
                <CompactArticleCard key={a.id} article={a} />
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-500">
              No articles found in this category.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
