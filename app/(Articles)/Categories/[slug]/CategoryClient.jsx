"use client";
import React, { useState, useEffect } from "react";
import { Eye, Grid, List, Flame, Play, TrendingUp } from "lucide-react";

// 1️⃣  Import the server actions
import {
  getPostsByCategory,
  getAllCategories,
  getTrendingPosts,
} from "@/app/actions/catpost";

const CategoryClient = ({ slug }) => {
  const categoryId = slug || "all";
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("latest");
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* 2️⃣  Single useEffect that calls the server actions */
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        /* all categories (without breaking) */
        const allCats = await getAllCategories();
        setCategories([
          { id: "all", name: "All News", color: "gray" },
          ...allCats.filter((c) => c.slug !== "breaking"),
        ]);

        /* posts for current category */
        const posts =
          categoryId === "all"
            ? await getPostsByCategory() // optional: no filter
            : await getPostsByCategory(categoryId);
        setArticles(posts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [categoryId]);

  /* sort helpers */
  const sortedArticles = [...articles].sort((a, b) => {
    if (sortBy === "latest") return new Date(b.date) - new Date(a.date);
    if (sortBy === "popular") return b.views - a.views;
    return 0;
  });

  /* simple card */
  const ArticleCard = ({ article }) => (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={article.image}
        alt={article.title}
        className="w-full aspect-video object-cover"
      />
      <div className="p-4">
        <div className="flex items-center space-x-2 text-xs">
          <span
            className={`px-2 py-0.5 rounded-full border
              ${
                article.isBreaking
                  ? "bg-red-50 text-red-600"
                  : "bg-gray-100 text-gray-600"
              }`}
          >
            {article.isBreaking ? "BREAKING" : article.categoryName}
          </span>
          <span className="text-gray-500">{article.readTime}</span>
        </div>
        <h3 className="mt-2 text-lg font-semibold">{article.title}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {article.excerpt}
        </p>
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>By {article.author.name}</span>
          <span>{article.views.toLocaleString()} views</span>
        </div>
      </div>
    </div>
  );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-2 border-blue-600 rounded-full" />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Error: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">
            {categories.find((c) => c.id === categoryId)?.name || "All News"}
          </h1>
          <div className="mt-4 flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded px-3 py-1 text-sm"
            >
              <option value="latest">Latest</option>
              <option value="popular">Popular</option>
            </select>
            <div className="flex space-x-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1 rounded ${
                  viewMode === "grid" ? "bg-gray-200" : ""
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1 rounded ${
                  viewMode === "list" ? "bg-gray-200" : ""
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Articles */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {sortedArticles.length ? (
          <div
            className={`gap-6 ${
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "space-y-4"
            }`}
          >
            {sortedArticles.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No articles here yet.</p>
        )}
      </main>
    </div>
  );
};

export default CategoryClient;
