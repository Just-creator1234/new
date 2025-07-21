"use client";

import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { getPosts } from "@/app/actions/blogpost";
import { publishPost } from "@/app/actions/publishPost";
import BlogItem from "@/components/BlogItem";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Eye,
  Edit3,
  ImageOff,
  Plus,
  Search,
  Calendar,
  User,
  Send,
  Clock,
  BookOpen,
  TrendingUp,
  Grid,
  List,
  SortAsc,
  SortDesc,
  Loader2,
  LogOut,
} from "lucide-react";

export default function MyBlogsPage() {
  const { data: session } = useSession();
  const [filter, setFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(new Set());
  const router = useRouter();

  /* ---------- fetch posts for logged-in writer ---------- */
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getPosts(filter === "ALL" ? undefined : filter);
      setPosts(data);
    } catch (error) {
      toast.error("Failed to load posts");
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [filter]);

  /* ---------- publish helpers ---------- */
  const handlePublishSingle = async (id) => {
    setPublishing((s) => new Set(s).add(id));
    try {
      const result = await publishPost(id);
      toast.success(`Published post: ${result.title}`);
      fetchPosts();
    } catch (error) {
      toast.error("Failed to publish post");
      console.error(error);
    } finally {
      setPublishing((s) => {
        const n = new Set(s);
        n.delete(id);
        return n;
      });
    }
  };

  const handlePublishAllScheduled = async () => {
    try {
      setLoading(true);
      const scheduledPosts = posts.filter((p) => p.status === "SCHEDULED");

      if (scheduledPosts.length === 0) {
        toast.success("No scheduled posts to publish");
        return;
      }

      for (const post of scheduledPosts) {
        await handlePublishSingle(post.id);
      }
      toast.success(`Published ${scheduledPosts.length} scheduled posts`);
    } catch (error) {
      toast.error("Failed to publish scheduled posts");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- derived data ---------- */
  const statusCounts = useMemo(
    () => ({
      ALL: posts.length,
      DRAFT: posts.filter((p) => p.status === "DRAFT").length,
      PUBLISHED: posts.filter((p) => p.status === "PUBLISHED").length,
      SCHEDULED: posts.filter((p) => p.status === "SCHEDULED").length,
    }),
    [posts]
  );

  const filteredSorted = useMemo(() => {
    let out = posts.filter((p) => {
      const matchesFilter = filter === "ALL" || p.status === filter;
      const matchesSearch =
        p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags?.some((tag) =>
          tag.name?.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        p.categories?.some((category) =>
          category.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      return matchesFilter && matchesSearch;
    });
    const dir = sortOrder === "asc" ? 1 : -1;
    return out.sort((a, b) => {
      let av = a[sortBy];
      let bv = b[sortBy];

      // Handle author sorting
      if (sortBy === "author") {
        av = a.author?.name || "";
        bv = b.author?.name || "";
      }

      if (sortBy === "title") return av.localeCompare(bv) * dir;
      return (new Date(av) - new Date(bv)) * dir;
    });
  }, [posts, filter, searchTerm, sortBy, sortOrder]);

  /* ---------- ui helpers ---------- */
  const getStatusColor = (status) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-100 text-green-800 border-green-200";
      case "DRAFT":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "SCHEDULED":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  /* ---------- loading skeleton ---------- */
  if (!session) {
    router.push("/signin");
  }

  const LoadingSkeleton = () => (
    <div className="space-y-6">
      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded w-12 animate-pulse"></div>
              </div>
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Skeleton */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="h-10 bg-gray-200 rounded-lg w-full max-w-md animate-pulse"></div>
          <div className="flex gap-2">
            <div className="h-10 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-200">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>

      {/* Posts Skeleton */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`bg-white rounded-lg border border-gray-200 ${
              viewMode === "grid" ? "flex flex-col" : "p-6"
            }`}
          >
            {viewMode === "grid" ? (
              <>
                <div className="h-48 bg-gray-200 rounded-t-lg animate-pulse"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-14 animate-pulse"></div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex gap-6">
                <div className="w-32 h-20 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="flex gap-4">
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* === Header === */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Welcome back, {session.user.name?.split(" ")[0]}
                </h1>
                <p className="text-sm text-gray-500">
                  {statusCounts.ALL} {statusCounts.ALL === 1 ? "post" : "posts"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href="/Create-Article"
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium shadow-sm"
              >
                <Plus size={16} />
                <span>New Post</span>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
              >
                <LogOut size={16} />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {/* === Stats cards === */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-sm transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Total Posts
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                      {statusCounts.ALL}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-sm transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Published
                    </p>
                    <p className="text-2xl font-bold text-green-600 mt-2">
                      {statusCounts.PUBLISHED}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-sm transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Drafts
                    </p>
                    <p className="text-2xl font-bold text-yellow-600 mt-2">
                      {statusCounts.DRAFT}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Edit3 className="w-5 h-5 text-yellow-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-sm transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Scheduled
                    </p>
                    <p className="text-2xl font-bold text-purple-600 mt-2">
                      {statusCounts.SCHEDULED}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* === Controls === */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search posts, authors, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                {/* View and Sort Controls */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 ${
                        viewMode === "grid"
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Grid size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 ${
                        viewMode === "list"
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <List size={16} />
                    </button>
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="createdAt">Created Date</option>
                    <option value="updatedAt">Updated Date</option>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                  </select>

                  <button
                    onClick={() =>
                      setSortOrder((o) => (o === "asc" ? "desc" : "asc"))
                    }
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    {sortOrder === "asc" ? (
                      <SortAsc size={16} />
                    ) : (
                      <SortDesc size={16} />
                    )}
                  </button>
                </div>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-200">
                {["ALL", "DRAFT", "PUBLISHED", "SCHEDULED"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilter(s)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg border ${
                      filter === s
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {s}
                    <span className="ml-2 text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                      {statusCounts[s]}
                    </span>
                  </button>
                ))}
                {filter === "SCHEDULED" && statusCounts.SCHEDULED > 0 && (
                  <button
                    onClick={handlePublishAllScheduled}
                    disabled={loading}
                    className="ml-auto px-4 py-2 text-sm font-medium bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    {loading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Send size={16} />
                    )}
                    Publish All Scheduled
                  </button>
                )}
              </div>
            </div>

            {/* === Posts === */}
            {filteredSorted.length ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredSorted.map((post) => (
                  <article
                    key={post.id}
                    className={`bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all ${
                      viewMode === "list"
                        ? "flex items-center gap-6 p-6"
                        : "flex flex-col"
                    }`}
                  >
                    {/* Cover Image */}
                    {post.coverImage ? (
                      <div
                        className={`relative overflow-hidden ${
                          viewMode === "grid"
                            ? "aspect-[16/9] w-full"
                            : "w-32 h-20 flex-shrink-0 rounded-lg"
                        }`}
                      >
                        <Image
                          src={post.coverImage}
                          alt={post.altText || "cover"}
                          fill
                          className="object-cover"
                          sizes={viewMode === "grid" ? "100vw" : "8rem"}
                        />
                      </div>
                    ) : (
                      <div
                        className={`${
                          viewMode === "grid"
                            ? "aspect-[16/9] w-full"
                            : "w-32 h-20 flex-shrink-0"
                        } flex items-center justify-center border border-dashed border-gray-300 bg-gray-50 rounded-lg`}
                      >
                        <ImageOff className="w-6 h-6 text-gray-400" />
                      </div>
                    )}

                    {/* Content */}
                    <div
                      className={`flex flex-col flex-1 ${
                        viewMode === "grid" ? "p-6" : "min-w-0"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h2 className="font-semibold text-lg text-gray-900 line-clamp-2 break-words">
                          {post.title}
                        </h2>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ml-3 ${getStatusColor(
                            post.status
                          )}`}
                        >
                          {post.status}
                        </span>
                      </div>

                      {post.excerpt && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 break-words">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="flex items-center text-xs text-gray-500 mb-4">
                        <User size={12} className="mr-1" />
                        <span>{post.author?.name}</span>
                        <span className="mx-2">•</span>
                        <Calendar size={12} className="mr-1" />
                        <span>{formatDate(post.createdAt)}</span>
                        {post.readingTime > 0 && (
                          <>
                            <span className="mx-2">•</span>
                            <Clock size={12} className="mr-1" />
                            <span>{post.readingTime} min read</span>
                          </>
                        )}
                      </div>

                      {(post.categories?.length > 0 ||
                        post.tags?.length > 0) && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {post.categories?.slice(0, 2).map((category, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md"
                            >
                              {category.name}
                            </span>
                          ))}
                          {post.tags?.slice(0, 2).map((tag, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md"
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center space-x-3 mt-auto pt-3 border-t border-gray-200">
                        <Link
                          href={
                            post.status === "DRAFT"
                              ? `/draft/${post.slug}`
                              : `/${post.slug}`
                          }
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View post"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link
                          href={`/edit/${post.slug}`}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit post"
                        >
                          <Edit3 size={16} />
                        </Link>
                        {post.status === "SCHEDULED" && (
                          <button
                            onClick={() => handlePublishSingle(post.id)}
                            disabled={publishing.has(post.id)}
                            className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Publish now"
                          >
                            {publishing.has(post.id) ? (
                              <Loader2 size={16} className="animate-spin" />
                            ) : (
                              <Send size={16} />
                            )}
                          </button>
                        )}
                        <BlogItem post={post} onPostUpdated={fetchPosts} />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No posts found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || filter !== "ALL"
                    ? "Try adjusting your search or filter."
                    : "Get started by creating your first post."}
                </p>
                <Link
                  href="/Create-Article"
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
                >
                  <Plus size={16} />
                  <span>Create your first post</span>
                </Link>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
