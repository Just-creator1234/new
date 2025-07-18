// "use client";

// import Image from "next/image";
// import { useSession, signOut } from "next-auth/react";
// import { useState, useEffect, useMemo } from "react";
// import Link from "next/link";
// import { getPosts } from "@/app/actions/getPosts";
// import { publishPost } from "@/app/actions/publishPost";
// import BlogItem from "@/components/BlogItem";

// import {
//   Eye,
//   Edit3,
//   ImageOff,
//   Plus,
//   Search,
//   Calendar,
//   User,
//   Send,
//   Clock,
//   BookOpen,
//   TrendingUp,
//   Grid,
//   List,
//   SortAsc,
//   SortDesc,
//   Loader2,
//   LogOut,
// } from "lucide-react";

// export default function MyBlogsPage() {
//   const { data: session } = useSession();
//   const [filter, setFilter] = useState("ALL");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [posts, setPosts] = useState([]);
//   const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
//   const [sortBy, setSortBy] = useState("createdAt");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [loading, setLoading] = useState(false);
//   const [publishing, setPublishing] = useState(new Set());

//   /* ---------- fetch posts for logged-in writer ---------- */
//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       const data = await getPosts(filter === "ALL" ? undefined : filter);
//       setPosts(data);
//     } catch {
//       /* ignore */
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchPosts();
//   }, [filter]);

//   /* ---------- publish helpers ---------- */
//   const handlePublishSingle = async (id) => {
//     setPublishing((s) => new Set(s).add(id));
//     try {
//       await publishPost(id);
//       fetchPosts();
//     } finally {
//       setPublishing((s) => {
//         const n = new Set(s);
//         n.delete(id);
//         return n;
//       });
//     }
//   };

//   /* ---------- derived data ---------- */
//   const statusCounts = useMemo(
//     () => ({
//       ALL: posts.length,
//       DRAFT: posts.filter((p) => p.status === "DRAFT").length,
//       PUBLISHED: posts.filter((p) => p.status === "PUBLISHED").length,
//       SCHEDULED: posts.filter((p) => p.status === "SCHEDULED").length,
//     }),
//     [posts]
//   );

//   const filteredSorted = useMemo(() => {
//     let out = posts.filter((p) => {
//       const matchesFilter = filter === "ALL" || p.status === filter;
//       const matchesSearch =
//         p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         p.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
//       return matchesFilter && matchesSearch;
//     });
//     const dir = sortOrder === "asc" ? 1 : -1;
//     return out.sort((a, b) => {
//       let av = a[sortBy];
//       let bv = b[sortBy];
//       if (sortBy === "title") return av.localeCompare(bv) * dir;
//       return (new Date(av) - new Date(bv)) * dir;
//     });
//   }, [posts, filter, searchTerm, sortBy, sortOrder]);

//   /* ---------- ui helpers ---------- */
//   const badge = (s) => {
//     const map = {
//       PUBLISHED: "bg-emerald-50 text-emerald-700 border-emerald-200",
//       DRAFT: "bg-slate-50 text-slate-700 border-slate-200",
//       SCHEDULED: "bg-amber-50 text-amber-700 border-amber-200",
//     };
//     return map[s] || "bg-gray-50 text-gray-700 border-gray-200";
//   };
//   const formatDate = (d) =>
//     new Date(d).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });

//   /* ---------- loading skeleton ---------- */
//   if (!session) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-50">
//         <div className="text-center">
//           <div className="w-12 h-12 mx-auto mb-4 bg-gray-200 rounded-full animate-pulse"></div>
//           <p className="text-gray-600 font-medium">Access denied</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50/50">
//       {/* === Header === */}
//       <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 sticky top-0 z-10">
//         <div className="max-w-6xl mx-auto px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center space-x-4">
//               <div>
//                 <h1 className="text-lg font-semibold text-gray-900 tracking-tight">
//                   Welcome back, {session.user.name?.split(" ")[0]}
//                 </h1>
//                 <p className="text-sm text-gray-500 mt-0.5">
//                   {statusCounts.ALL} {statusCounts.ALL === 1 ? "post" : "posts"}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-3">
//               <Link
//                 href="/Blogs/Create-Blogs"
//                 className="inline-flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-sm font-medium"
//               >
//                 <Plus size={16} />
//                 <span>New Post</span>
//               </Link>
//               <button
//                 onClick={() => signOut({ callbackUrl: "/" })}
//                 className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-sm"
//               >
//                 <LogOut size={16} />
//                 <span>Sign out</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
//         {/* === Stats cards === */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           {Object.entries(statusCounts).map(([key, count]) => (
//             <div
//               key={key}
//               className="group bg-white rounded-xl border border-gray-200/60 p-6 hover:border-gray-300 transition-all duration-200 hover:shadow-sm"
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
//                     {key}
//                   </p>
//                   <p className="text-3xl font-bold text-gray-900 mt-2">
//                     {count}
//                   </p>
//                 </div>
//                 <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
//                   <BookOpen className="w-5 h-5 text-gray-600" />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* === Controls === */}
//         <div className="bg-white rounded-xl border border-gray-200/60 p-6 mb-8">
//           <div className="flex flex-col lg:flex-row gap-6">
//             {/* Search */}
//             <div className="relative flex-1 max-w-md">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search posts..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 text-sm"
//               />
//             </div>

//             {/* View and Sort Controls */}
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center bg-gray-100 rounded-lg p-1">
//                 <button
//                   onClick={() => setViewMode("grid")}
//                   className={`p-2 rounded-md transition-all duration-200 ${
//                     viewMode === "grid"
//                       ? "bg-white shadow-sm text-gray-900"
//                       : "text-gray-600 hover:text-gray-900"
//                   }`}
//                 >
//                   <Grid size={16} />
//                 </button>
//                 <button
//                   onClick={() => setViewMode("list")}
//                   className={`p-2 rounded-md transition-all duration-200 ${
//                     viewMode === "list"
//                       ? "bg-white shadow-sm text-gray-900"
//                       : "text-gray-600 hover:text-gray-900"
//                   }`}
//                 >
//                   <List size={16} />
//                 </button>
//               </div>

//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
//               >
//                 <option value="createdAt">Date Created</option>
//                 <option value="title">Title</option>
//               </select>

//               <button
//                 onClick={() =>
//                   setSortOrder((o) => (o === "asc" ? "desc" : "asc"))
//                 }
//                 className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
//               >
//                 {sortOrder === "asc" ? (
//                   <SortAsc size={16} />
//                 ) : (
//                   <SortDesc size={16} />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Status Filter Tabs */}
//           <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-200/60">
//             {["ALL", "DRAFT", "PUBLISHED", "SCHEDULED"].map((s) => (
//               <button
//                 key={s}
//                 onClick={() => setFilter(s)}
//                 className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
//                   filter === s
//                     ? "bg-gray-900 text-white shadow-sm"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {s}
//               </button>
//             ))}
//             {filter === "SCHEDULED" && statusCounts.SCHEDULED > 0 && (
//               <button
//                 onClick={async () => {
//                   for (const p of posts.filter((x) => x.status === "SCHEDULED"))
//                     await handlePublishSingle(p.id);
//                 }}
//                 className="ml-auto px-4 py-2 text-sm font-medium bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200"
//               >
//                 Publish All Scheduled
//               </button>
//             )}
//           </div>
//         </div>

//         {/* === Posts === */}
//         {loading ? (
//           <div className="text-center py-16">
//             <Loader2 className="w-8 h-8 mx-auto mb-4 text-gray-400 animate-spin" />
//             <p className="text-gray-500">Loading posts...</p>
//           </div>
//         ) : filteredSorted.length ? (
//           <div
//             className={
//               viewMode === "grid"
//                 ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//                 : "space-y-4"
//             }
//           >
//             {filteredSorted.map((post) => (
//               <article
//                 key={post.id}
//                 className={`group bg-white rounded-xl border border-gray-200/60 overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all duration-300 ${
//                   viewMode === "list"
//                     ? "flex items-center gap-6 p-6"
//                     : "flex flex-col"
//                 }`}
//               >
//                 {/* Cover Image */}
//                 {post.coverImage && (
//                   <div
//                     className={`relative overflow-hidden ${
//                       viewMode === "grid"
//                         ? "aspect-[16/9] w-full"
//                         : "w-20 h-20 flex-shrink-0 rounded-lg"
//                     }`}
//                   >
//                     <Image
//                       src={post.coverImage}
//                       alt={post.altText || "cover"}
//                       fill
//                       className="object-cover group-hover:scale-105 transition-transform duration-300"
//                     />
//                   </div>
//                 )}

//                 {/* Content */}
//                 <div
//                   className={`flex flex-col flex-1 ${
//                     viewMode === "grid" ? "p-6" : "min-w-0"
//                   }`}
//                 >
//                   <div className="flex items-start justify-between mb-3">
//                     <h2 className="font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-gray-700 transition-colors">
//                       {post.title}
//                     </h2>
//                     <span
//                       className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ml-3 flex-shrink-0 ${badge(
//                         post.status
//                       )}`}
//                     >
//                       {post.status}
//                     </span>
//                   </div>

//                   <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                     {post.excerpt}
//                   </p>

//                   <div className="flex items-center text-xs text-gray-500 mb-4">
//                     <User size={12} className="mr-1" />
//                     <span>{post.author?.name}</span>
//                     <span className="mx-2">•</span>
//                     <span>{formatDate(post.createdAt)}</span>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex items-center space-x-3 mt-auto">
//                     <Link
//                       href={
//                         post.status === "DRAFT"
//                           ? `/Blogs/draft/${post.slug}`
//                           : `/Solarlink-Blogs/${post.slug}`
//                       }
//                       className="inline-flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors duration-200"
//                     >
//                       <Eye size={16} />
//                       <span className="text-sm">View</span>
//                     </Link>
//                     <Link
//                       href={`/Blogs/edit/${post.slug}`}
//                       className="inline-flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors duration-200"
//                     >
//                       <Edit3 size={16} />
//                       <span className="text-sm">Edit</span>
//                     </Link>
//                     {post.status === "SCHEDULED" && (
//                       <button
//                         onClick={() => handlePublishSingle(post.id)}
//                         disabled={publishing.has(post.id)}
//                         className="inline-flex items-center space-x-1 text-amber-600 hover:text-amber-700 transition-colors duration-200 disabled:opacity-50"
//                       >
//                         {publishing.has(post.id) ? (
//                           <Loader2 size={16} className="animate-spin" />
//                         ) : (
//                           <Send size={16} />
//                         )}
//                         <span className="text-sm">Publish</span>
//                       </button>
//                     )}
//                     <BlogItem post={post} onPostUpdated={fetchPosts} />
//                   </div>
//                 </div>
//               </article>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-16">
//             <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
//               <BookOpen className="w-8 h-8 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               No posts found
//             </h3>
//             <p className="text-gray-500 mb-6">
//               {searchTerm || filter !== "ALL"
//                 ? "Try adjusting your search or filter."
//                 : "Get started by creating your first post."}
//             </p>
//             <Link
//               href="/Blogs/Create-Blogs"
//               className="inline-flex items-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
//             >
//               <Plus size={16} />
//               <span>Create your first post</span>
//             </Link>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { getPosts } from "@/app/actions/getPosts";
import { publishPost } from "@/app/actions/publishPost";
import BlogItem from "@/components/BlogItem";

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

  /* ---------- fetch posts for logged-in writer ---------- */
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getPosts(filter === "ALL" ? undefined : filter);
      setPosts(data);
    } catch {
      /* ignore */
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
      await publishPost(id);
      fetchPosts();
    } finally {
      setPublishing((s) => {
        const n = new Set(s);
        n.delete(id);
        return n;
      });
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
        p.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
    const dir = sortOrder === "asc" ? 1 : -1;
    return out.sort((a, b) => {
      let av = a[sortBy];
      let bv = b[sortBy];
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
        return "bg-blue-100 text-blue-800 border-blue-200";
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
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 bg-gray-200 rounded-full animate-pulse"></div>
          <p className="text-gray-600 font-medium">Access denied</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* === Header === */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Welcome back, {session.user.name?.split(" ")[0]}
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  {statusCounts.ALL} {statusCounts.ALL === 1 ? "post" : "posts"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href="/Create-Article"
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
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

      <main className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
        {/* === Stats cards === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(statusCounts).map(([key, count]) => (
            <div
              key={key}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    {key}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {count}
                  </p>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-gray-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* === Controls === */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* View and Sort Controls */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === "list"
                      ? "bg-white shadow-sm text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
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
                <option value="createdAt">Date Created</option>
                <option value="title">Title</option>
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
                className={`px-4 py-2 text-sm font-medium rounded-lg ${
                  filter === s
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {s}
              </button>
            ))}
            {filter === "SCHEDULED" && statusCounts.SCHEDULED > 0 && (
              <button
                onClick={async () => {
                  for (const p of posts.filter((x) => x.status === "SCHEDULED"))
                    await handlePublishSingle(p.id);
                }}
                className="ml-auto px-4 py-2 text-sm font-medium bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
              >
                Publish All Scheduled
              </button>
            )}
          </div>
        </div>

        {/* === Posts === */}
        {loading ? (
          <div className="text-center py-16">
            <Loader2 className="w-8 h-8 mx-auto mb-4 text-gray-400 animate-spin" />
            <p className="text-gray-500">Loading posts...</p>
          </div>
        ) : filteredSorted.length ? (
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
                {post.coverImage && (
                  <div
                    className={`relative overflow-hidden ${
                      viewMode === "grid"
                        ? "aspect-[16/9] w-full"
                        : "w-20 h-20 flex-shrink-0 rounded-lg"
                    }`}
                  >
                    <Image
                      src={post.coverImage}
                      alt={post.altText || "cover"}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Content */}
                <div
                  className={`flex flex-col flex-1 ${
                    viewMode === "grid" ? "p-6" : "min-w-0"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="font-semibold text-lg text-gray-900 line-clamp-2">
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

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center text-xs text-gray-500 mb-4">
                    <User size={12} className="mr-1" />
                    <span>{post.author?.name}</span>
                    <span className="mx-2">•</span>
                    <span>{formatDate(post.createdAt)}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-3 mt-auto">
                    <Link
                      href={
                        post.status === "DRAFT"
                          ? `/Blogs/draft/${post.slug}`
                          : `/Solarlink-Blogs/${post.slug}`
                      }
                      className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                    >
                      <Eye size={16} />
                      <span className="text-sm">View</span>
                    </Link>
                    <Link
                      href={`/Blogs/edit/${post.slug}`}
                      className="inline-flex items-center space-x-1 text-green-600 hover:text-green-700"
                    >
                      <Edit3 size={16} />
                      <span className="text-sm">Edit</span>
                    </Link>
                    {post.status === "SCHEDULED" && (
                      <button
                        onClick={() => handlePublishSingle(post.id)}
                        disabled={publishing.has(post.id)}
                        className="inline-flex items-center space-x-1 text-orange-600 hover:text-orange-700 disabled:opacity-50"
                      >
                        {publishing.has(post.id) ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Send size={16} />
                        )}
                        <span className="text-sm">Publish</span>
                      </button>
                    )}
                    <BlogItem post={post} onPostUpdated={fetchPosts} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No posts found
            </h3>
            <p className="text-gray-500 mb-6">
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
      </main>
    </div>
  );
}
