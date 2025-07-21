// "use client";

// import { useEffect, useState, useTransition } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import NewsletterSignup from "@/components/NewsletterSignup";
// import {
//   Search,
//   ArrowRight,
//   User,
//   Clock,
//   Share2,
//   Heart,
//   MessageCircle,
//   ImageOff,
//   Menu,
//   Bell,
//   TrendingUp,
//   Globe,
//   Play,
//   Eye,
//   ThumbsUp,
//   Filter,
//   X,
//   Flame,
// } from "lucide-react";

// // Server actions
// import {
//   getAllPublishedPosts,
//   getTrendingPosts,
//   getPopularPosts,
// } from "@/app/actions/getPosts";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import BreakingNewsSlider from "@/components/BreakingNewsSlider";

// // Mock data with standardized viewCount (number instead of string)
// const mockPosts = [
//   {
//     id: 1,
//     title: "Major Earthquake Strikes Pacific Region – Evacuations Underway",
//     excerpt:
//       "A 7.8 magnitude earthquake has triggered tsunami warnings across the Pacific.",
//     author: { name: "Maria Rodriguez" },
//     createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
//     coverImage: "/earthquake.jpg",
//     categories: [{ name: "breaking", slug: "breaking" }],
//     tags: [],
//     viewCount: 24500,
//     slug: "earthquake-strikes-pacific",
//     breaking: true,
//   },
//   // ... other mock posts with viewCount as numbers
// ];

// export default function Homepage() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [currentBreakingIndex, setCurrentBreakingIndex] = useState(0);
//   const [isPending, startTransition] = useTransition();
//   const [trendingPosts, setTrendingPosts] = useState([]);
//   const [popularPosts, setPopularPosts] = useState([]);

//   /* ---------- Utility Functions ---------- */
//   const getTimeAgo = (dateString) => {
//     const now = new Date();
//     const postDate = new Date(dateString);
//     const diffInMinutes = Math.floor((now - postDate) / (1000 * 60));

//     if (diffInMinutes < 1) return "Just now";
//     if (diffInMinutes < 60) return `${diffInMinutes} min ago`;

//     const diffInHours = Math.floor(diffInMinutes / 60);
//     if (diffInHours < 24)
//       return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;

//     const diffInDays = Math.floor(diffInHours / 24);
//     return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
//   };

//   const getReadTime = (content) => {
//     const wordCount =
//       typeof content === "string" ? content.split(" ").length : 300;
//     return `${Math.ceil(wordCount / 200)} min read`;
//   };

//   const getCategoryColor = (categoryName) => {
//     const colors = {
//       politics: "bg-blue-50 text-blue-600 border-blue-200",
//       tech: "bg-purple-50 text-purple-600 border-purple-200",
//       sports: "bg-green-50 text-green-600 border-green-200",
//       business: "bg-yellow-50 text-yellow-600 border-yellow-200",
//       world: "bg-gray-50 text-gray-600 border-gray-200",
//       breaking: "bg-red-50 text-red-600 border-red-200",
//     };
//     return colors[categoryName] || "bg-gray-50 text-gray-600 border-gray-200";
//   };

//   /* ---------- Data Fetching ---------- */
//   useEffect(() => {
//     startTransition(async () => {
//       try {
//         const [publishedPosts, trending, popular] = await Promise.all([
//           getAllPublishedPosts(),
//           getTrendingPosts(),
//           getPopularPosts(),
//         ]);

//         // Process all data with consistent formatting
//         const postsData = normalizePostData(publishedPosts) || mockPosts;
//         const trendingData =
//           normalizePostData(trending) || sortByViews(postsData).slice(0, 5);
//         const popularData = normalizePostData(popular) || trendingData;

//         setPosts(postsData);
//         setTrendingPosts(trendingData);
//         setPopularPosts(popularData);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//         setPosts(mockPosts);
//         setTrendingPosts(sortByViews(mockPosts).slice(0, 5));
//         setPopularPosts(sortByViews(mockPosts).slice(0, 5));
//       } finally {
//         setLoading(false);
//       }
//     });
//   }, []);

//   // Helper functions
//   const normalizePostData = (data) => {
//     if (Array.isArray(data)) return data;
//     if (data?.success && Array.isArray(data.data)) return data.data;
//     if (data?.data && Array.isArray(data.data)) return data.data;
//     return null;
//   };

//   const sortByViews = (posts) => {
//     return [...posts].sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
//   };

//   /* ---------- Data Processing ---------- */
//   const hasCategory = (post, categorySlug) => {
//     return post.categories?.some(
//       (cat) =>
//         cat.slug === categorySlug ||
//         cat.name.toLowerCase() === categorySlug.toLowerCase()
//     );
//   };

//   const getPostsByCategory = (categorySlug) => {
//     return categorySlug === "all"
//       ? posts
//       : posts.filter((post) => hasCategory(post, categorySlug));
//   };

//   // Derived state
//   const breakingNews = posts.filter((post) => post.breaking);
//   const latestNews = [...posts].sort(
//     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//   );
//   const categoryPosts = getPostsByCategory(activeCategory);
//   const featuredArticles = categoryPosts.slice(0, 2);
//   const latestArticles = categoryPosts.slice(2);

//   /* ---------- Render ---------- */
//   if (loading || isPending) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           {/* Loading skeletons */}
//           <div className="h-16 w-full mb-6 bg-gray-200 rounded animate-pulse" />
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//             <div className="lg:col-span-3 space-y-4">
//               <div className="h-64 w-full bg-gray-200 rounded animate-pulse" />
//               <div className="h-40 w-full bg-gray-200 rounded animate-pulse" />
//               <div className="h-40 w-full bg-gray-200 rounded animate-pulse" />
//             </div>
//             <div className="space-y-4">
//               <div className="h-48 w-full bg-gray-200 rounded animate-pulse" />
//               <div className="h-48 w-full bg-gray-200 rounded animate-pulse" />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       <main className="max-w-7xl mx-auto px-2 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* Main Content - 3/4 width */}
//         <div className="lg:col-span-3 space-y-6">
//           {/* Breaking News Banner */}
//           {breakingNews.length > 0 && (
//             <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
//               <TrendingUp className="h-5 w-5 text-red-600 mr-3" />
//               <div>
//                 <h3 className="font-semibold text-red-800">BREAKING</h3>
//                 <p className="text-sm text-red-700">
//                   {breakingNews[currentBreakingIndex].title}
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Hero Section */}
//           {breakingNews.length > 0 ? (
//             <BreakingNewsSlider
//               breakingNews={breakingNews}
//               getTimeAgo={getTimeAgo}
//               currentIndex={currentBreakingIndex}
//               setCurrentIndex={setCurrentBreakingIndex}
//             />
//           ) : (
//             latestNews[0] && (
//               <Link href={`/${latestNews[0].slug}`} className="block">
//                 <div className="relative rounded-lg overflow-hidden">
//                   {latestNews[0].coverImage && (
//                     <Image
//                       src={latestNews[0].coverImage}
//                       alt={latestNews[0].title}
//                       className="w-full h-96 object-cover"
//                       priority={true} // Correct boolean usage for Next.js Image
//                       width={800} // Required
//                       height={400} // Required
//                     />
//                   )}
//                   <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
//                     <div className="flex items-center space-x-2 mb-2">
//                       {latestNews[0].categories?.[0] && (
//                         <span
//                           className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(
//                             latestNews[0].categories[0].name
//                           )}`}
//                         >
//                           {latestNews[0].categories[0].name.toUpperCase()}
//                         </span>
//                       )}
//                       <span className="text-sm text-white">
//                         {getTimeAgo(latestNews[0].createdAt)}
//                       </span>
//                     </div>
//                     <h2 className="text-2xl font-bold text-white mb-2">
//                       {latestNews[0].title}
//                     </h2>
//                     <p className="text-white line-clamp-2">
//                       {latestNews[0].excerpt}
//                     </p>
//                   </div>
//                 </div>
//               </Link>
//             )
//           )}

//           {/* Category Filter */}
//           <div className="sticky top-16 z-10 bg-white/95 backdrop-blur-sm py-2 border-b border-gray-200">
//             <div className="flex items-center space-x-2 overflow-x-auto pb-2">
//               {["all", "politics", "tech", "sports", "business", "world"].map(
//                 (cat) => (
//                   <button
//                     key={cat}
//                     onClick={() => setActiveCategory(cat)}
//                     className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 ${
//                       activeCategory === cat
//                         ? "bg-blue-600 text-white"
//                         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                     }`}
//                   >
//                     {cat === "all"
//                       ? "All News"
//                       : cat.charAt(0).toUpperCase() + cat.slice(1)}
//                   </button>
//                 )
//               )}
//             </div>
//           </div>
//           {/* Featured Articles */}
//           {featuredArticles.length > 0 && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {featuredArticles.map((article) => (
//                 <ArticleCard
//                   key={article.id}
//                   article={article}
//                   getCategoryColor={getCategoryColor}
//                   getTimeAgo={getTimeAgo}
//                   getReadTime={getReadTime}
//                 />
//               ))}
//             </div>
//           )}

//           {/* Latest Articles */}
//           {latestArticles.length > 0 && (
//             <div>
//               <div className="flex items-center justify-between mb-3">
//                 <h2 className="text-xl font-bold">
//                   Latest{" "}
//                   {activeCategory !== "all" &&
//                     activeCategory.charAt(0).toUpperCase() +
//                       activeCategory.slice(1)}
//                 </h2>

//                 {activeCategory !== "all" && (
//                   <Link
//                     href={`/Categories/${activeCategory}`}
//                     className="flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline"
//                   >
//                     See more {activeCategory}
//                     <ArrowRight className="ml-1 h-4 w-4" />
//                   </Link>
//                 )}
//               </div>
//               <div className="space-y-3">
//                 {latestArticles.map((article) => (
//                   <ArticleListItem
//                     key={article.id}
//                     article={article}
//                     getCategoryColor={getCategoryColor}
//                     getTimeAgo={getTimeAgo}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}

//           {categoryPosts.length === 0 && (
//             <div className="text-center py-12">
//               <p className="text-gray-500">
//                 No articles found in this category.
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Sidebar - 1/4 width */}
//         <div className="space-y-6">
//           <TrendingSection
//             posts={trendingPosts}
//             getCategoryColor={getCategoryColor}
//           />
//           <PopularSection posts={popularPosts} getTimeAgo={getTimeAgo} />

//           <NewsletterSignup />
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// // Componentized article cards
// const ArticleCard = ({
//   article,
//   getCategoryColor,
//   getTimeAgo,
//   getReadTime,
// }) => (
//   <Link href={`/${article.slug}`} className="group">
//     <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
//       {article.coverImage ? (
//         <img
//           src={article.coverImage}
//           alt={article.title}
//           className="aspect-video object-cover w-full group-hover:opacity-90 transition-opacity"
//         />
//       ) : (
//         <div className="aspect-video flex items-center justify-center border border-dashed border-gray-300 bg-gray-50">
//           <ImageOff className="w-8 h-8 text-gray-400" />
//         </div>
//       )}
//       <div className="p-4">
//         <div className="flex items-center space-x-2 mb-2">
//           {article.categories?.[0] && (
//             <span
//               className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(
//                 article.categories[0].name
//               )}`}
//             >
//               {article.categories[0].name.toUpperCase()}
//             </span>
//           )}
//           <span className="text-sm text-gray-500">
//             {getTimeAgo(article.createdAt)}
//           </span>
//         </div>
//         <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
//           {article.title}
//         </h3>
//         <p className="text-sm text-gray-600 mb-3 line-clamp-2">
//           {article.excerpt}
//         </p>
//         <div className="flex items-center justify-between text-xs text-gray-500">
//           <span>By {article.author?.name || "Unknown"}</span>
//           <span>
//             {article.viewCount?.toLocaleString() || "0"} views •{" "}
//             {getReadTime(article.content)}
//           </span>
//         </div>
//       </div>
//     </div>
//   </Link>
// );

// const ArticleListItem = ({ article, getCategoryColor, getTimeAgo }) => (
//   <Link href={`/${article.slug}`} className="group">
//     <div className="bg-white rounded-lg p-4 flex items-center space-x-4 hover:shadow-md transition-shadow">
//       {article.coverImage ? (
//         <img
//           src={article.coverImage}
//           alt={article.title}
//           className="w-16 h-16 rounded object-cover flex-shrink-0"
//         />
//       ) : (
//         <div className="w-16 h-16 rounded flex items-center justify-center border border-dashed border-gray-300 bg-gray-50 flex-shrink-0">
//           <ImageOff className="w-5 h-5 text-gray-400" />
//         </div>
//       )}
//       <div className="flex-1 min-w-0">
//         <div className="flex items-center space-x-2 mb-1">
//           {article.categories?.[0] && (
//             <span
//               className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(
//                 article.categories[0].name
//               )}`}
//             >
//               {article.categories[0].name.toUpperCase()}
//             </span>
//           )}
//           <span className="text-xs text-gray-500">
//             {getTimeAgo(article.createdAt)}
//           </span>
//         </div>
//         <h4 className="text-sm font-semibold mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
//           {article.title}
//         </h4>
//         <p className="text-xs text-gray-600 line-clamp-1">{article.excerpt}</p>
//       </div>
//     </div>
//   </Link>
// );

// const TrendingSection = ({ posts, getCategoryColor }) => (
//   <div className="bg-white rounded-lg p-4 shadow">
//     <h3 className="font-semibold mb-3 flex items-center">
//       <Flame className="h-4 w-4 mr-2 text-orange-500" />
//       Trending
//     </h3>
//     <div className="space-y-3">
//       {posts.map((article, idx) => (
//         <div
//           key={article.id}
//           className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer"
//         >
//           <Link href={`/${article.slug}`} className="block">
//             <div className="flex items-start space-x-2">
//               <span className="font-bold text-gray-400 text-xs">
//                 {idx + 1}.
//               </span>
//               <div className="min-w-0">
//                 <p className="font-medium line-clamp-2 break-words whitespace-normal hover:text-blue-600 transition-colors">
//                   {article.title}
//                 </p>
//                 <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
//                   <span>
//                     {article.viewCount?.toLocaleString() || "0"} views
//                   </span>
//                   {article.categories?.[0] && (
//                     <span
//                       className={`px-1.5 py-0.5 rounded-full ${getCategoryColor(
//                         article.categories[0].name
//                       )}`}
//                     >
//                       {article.categories[0].name}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </Link>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// const PopularSection = ({ posts, getTimeAgo }) => (
//   <div className="bg-white rounded-lg p-4 shadow">
//     <h3 className="font-semibold mb-3 flex items-center">
//       <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
//       Popular Today
//     </h3>
//     <div className="space-y-3">
//       {posts.map((article) => (
//         <div
//           key={article.id}
//           className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer"
//         >
//           <Link href={`/${article.slug}`} className="block">
//             <p className="font-medium line-clamp-2 break-words whitespace-normal hover:text-blue-600 transition-colors">
//               {article.title}
//             </p>
//             <div className="text-xs text-gray-500 mt-1 flex items-center justify-between">
//               <span>{article.viewCount?.toLocaleString() || "0"} views</span>
//               <span>{getTimeAgo(article.createdAt)}</span>
//             </div>
//           </Link>
//         </div>
//       ))}
//     </div>
//   </div>
// );

"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import NewsletterSignup from "@/components/NewsletterSignup";
import {
  Search,
  ArrowRight,
  User,
  Clock,
  Share2,
  Heart,
  MessageCircle,
  ImageOff,
  Menu,
  Bell,
  TrendingUp,
  Globe,
  Play,
  Eye,
  ThumbsUp,
  Filter,
  X,
  Flame,
  BookOpen,
  Zap,
  Star,
} from "lucide-react";

// Server actions
import {
  getAllPublishedPosts,
  getTrendingPosts,
  getPopularPosts,
} from "@/app/actions/getPosts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BreakingNewsSlider from "@/components/BreakingNewsSlider";

// Mock data with standardized viewCount (number instead of string)
const mockPosts = [
  {
    id: 1,
    title: "Major Earthquake Strikes Pacific Region – Evacuations Underway",
    excerpt:
      "A 7.8 magnitude earthquake has triggered tsunami warnings across the Pacific.",
    author: { name: "Maria Rodriguez" },
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    coverImage: "/earthquake.jpg",
    categories: [{ name: "breaking", slug: "breaking" }],
    tags: [],
    viewCount: 24500,
    slug: "earthquake-strikes-pacific",
    breaking: true,
  },
  // ... other mock posts with viewCount as numbers
];

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentBreakingIndex, setCurrentBreakingIndex] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);

  /* ---------- Utility Functions ---------- */
  const getTimeAgo = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInMinutes = Math.floor((now - postDate) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  };

  const getReadTime = (content) => {
    const wordCount =
      typeof content === "string" ? content.split(" ").length : 300;
    return `${Math.ceil(wordCount / 200)} min read`;
  };

  const getCategoryColor = (categoryName) => {
    const colors = {
      politics: "bg-gradient-to-r from-blue-600 to-blue-800 text-white",
      tech: "bg-gradient-to-r from-purple-600 to-indigo-600 text-white",
      sports: "bg-gradient-to-r from-green-600 to-emerald-600 text-white",
      business: "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
      world: "bg-gradient-to-r from-gray-600 to-gray-800 text-white",
      breaking: "bg-gradient-to-r from-red-600 to-pink-600 text-white",
    };
    return (
      colors[categoryName] ||
      "bg-gradient-to-r from-gray-600 to-gray-800 text-white"
    );
  };

  /* ---------- Data Fetching ---------- */
  useEffect(() => {
    startTransition(async () => {
      try {
        const [publishedPosts, trending, popular] = await Promise.all([
          getAllPublishedPosts(),
          getTrendingPosts(),
          getPopularPosts(),
        ]);

        // Process all data with consistent formatting
        const postsData = normalizePostData(publishedPosts) || mockPosts;
        const trendingData =
          normalizePostData(trending) || sortByViews(postsData).slice(0, 5);
        const popularData = normalizePostData(popular) || trendingData;

        setPosts(postsData);
        setTrendingPosts(trendingData);
        setPopularPosts(popularData);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts(mockPosts);
        setTrendingPosts(sortByViews(mockPosts).slice(0, 5));
        setPopularPosts(sortByViews(mockPosts).slice(0, 5));
      } finally {
        setLoading(false);
      }
    });
  }, []);

  // Helper functions
  const normalizePostData = (data) => {
    if (Array.isArray(data)) return data;
    if (data?.success && Array.isArray(data.data)) return data.data;
    if (data?.data && Array.isArray(data.data)) return data.data;
    return null;
  };

  const sortByViews = (posts) => {
    return [...posts].sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
  };

  /* ---------- Data Processing ---------- */
  const hasCategory = (post, categorySlug) => {
    return post.categories?.some(
      (cat) =>
        cat.slug === categorySlug ||
        cat.name.toLowerCase() === categorySlug.toLowerCase()
    );
  };

  const getPostsByCategory = (categorySlug) => {
    return categorySlug === "all"
      ? posts
      : posts.filter((post) => hasCategory(post, categorySlug));
  };

  // Derived state
  const breakingNews = posts.filter((post) => post.breaking);
  const latestNews = [...posts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const categoryPosts = getPostsByCategory(activeCategory);
  const featuredArticles = categoryPosts.slice(0, 2);
  const latestArticles = categoryPosts.slice(2);

  /* ---------- Render ---------- */
  if (loading || isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Loading skeletons */}
          <div className="h-16 w-full mb-6 bg-white/50 backdrop-blur-lg rounded-2xl animate-pulse" />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-4">
              <div className="h-64 w-full bg-white/50 backdrop-blur-lg rounded-2xl animate-pulse" />
              <div className="h-40 w-full bg-white/50 backdrop-blur-lg rounded-2xl animate-pulse" />
              <div className="h-40 w-full bg-white/50 backdrop-blur-lg rounded-2xl animate-pulse" />
            </div>
            <div className="space-y-4">
              <div className="h-48 w-full bg-white/50 backdrop-blur-lg rounded-2xl animate-pulse" />
              <div className="h-48 w-full bg-white/50 backdrop-blur-lg rounded-2xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content - 3/4 width */}
        <div className="lg:col-span-3 space-y-6">
          {/* Breaking News Banner */}
          {breakingNews.length > 0 && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 backdrop-blur-lg rounded-2xl p-4 flex items-center border border-red-200/50 shadow-sm">
              <Flame className="h-5 w-5 text-red-600 mr-3" />
              <div>
                <h3 className="font-semibold text-red-800">BREAKING NEWS</h3>
                <p className="text-sm text-red-700">
                  {breakingNews[currentBreakingIndex].title}
                </p>
              </div>
            </div>
          )}

          {/* Hero Section */}
          {breakingNews.length > 0 ? (
            <BreakingNewsSlider
              breakingNews={breakingNews}
              getTimeAgo={getTimeAgo}
              currentIndex={currentBreakingIndex}
              setCurrentIndex={setCurrentBreakingIndex}
            />
          ) : (
            latestNews[0] && (
              <Link href={`/${latestNews[0].slug}`} className="block group">
                <div className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                  {latestNews[0].coverImage && (
                    <Image
                      src={latestNews[0].coverImage}
                      alt={latestNews[0].title}
                      className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                      priority={true}
                      width={800}
                      height={400}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      {latestNews[0].categories?.[0] && (
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold shadow-md ${getCategoryColor(
                            latestNews[0].categories[0].name
                          )}`}
                        >
                          {latestNews[0].categories[0].name.toUpperCase()}
                        </span>
                      )}
                      <span className="text-sm text-white/80">
                        {getTimeAgo(latestNews[0].createdAt)}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {latestNews[0].title}
                    </h2>
                    <p className="text-white/90 line-clamp-2">
                      {latestNews[0].excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            )
          )}

          {/* Category Filter */}
          <div className="sticky top-16 z-10 bg-white/80 backdrop-blur-xl py-3 border-b border-gray-200/50 shadow-sm">
            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              {["all", "politics", "tech", "sports", "business", "world"].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all duration-200 ${
                      activeCategory === cat
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-gray-100/50 border border-gray-200/50"
                    }`}
                  >
                    {cat === "all"
                      ? "All News"
                      : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Featured Articles */}
          {featuredArticles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  getCategoryColor={getCategoryColor}
                  getTimeAgo={getTimeAgo}
                  getReadTime={getReadTime}
                />
              ))}
            </div>
          )}

          {/* Latest Articles */}
          {latestArticles.length > 0 && (
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Latest{" "}
                  {activeCategory !== "all" &&
                    activeCategory.charAt(0).toUpperCase() +
                      activeCategory.slice(1)}
                </h2>

                {activeCategory !== "all" && (
                  <Link
                    href={`/Categories/${activeCategory}`}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    See more {activeCategory}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                )}
              </div>
              <div className="space-y-4">
                {latestArticles.map((article) => (
                  <ArticleListItem
                    key={article.id}
                    article={article}
                    getCategoryColor={getCategoryColor}
                    getTimeAgo={getTimeAgo}
                  />
                ))}
              </div>
            </div>
          )}

          {categoryPosts.length === 0 && (
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 shadow-lg">
              <p className="text-gray-500">
                No articles found in this category.
              </p>
            </div>
          )}
        </div>

        {/* Sidebar - 1/4 width */}
        <div className="space-y-6">
          <TrendingSection
            posts={trendingPosts}
            getCategoryColor={getCategoryColor}
          />
          <PopularSection posts={popularPosts} getTimeAgo={getTimeAgo} />

          <NewsletterSignup />
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Componentized article cards
const ArticleCard = ({
  article,
  getCategoryColor,
  getTimeAgo,
  getReadTime,
}) => (
  <Link href={`/${article.slug}`} className="group">
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 border border-white/20">
      {/* Image Section */}
      {article.coverImage ? (
        <div className="relative aspect-video overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          {article.categories?.[0] && (
            <span
              className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold shadow-md ${getCategoryColor(
                article.categories[0].name
              )}`}
            >
              {article.categories[0].name.toUpperCase()}
            </span>
          )}
        </div>
      ) : (
        <div className="aspect-video flex items-center justify-center border border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100">
          <ImageOff className="w-10 h-10 text-gray-400" />
        </div>
      )}

      {/* Content Section */}
      <div className="p-5">
        <div className="flex items-center space-x-3 mb-3">
          <span className="text-xs text-gray-500 flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {getTimeAgo(article.createdAt)}
          </span>
          <span className="text-xs text-gray-500 flex items-center">
            <BookOpen className="w-3 h-3 mr-1" />
            {getReadTime(article.content)}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {article.title}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {article.excerpt}
        </p>

        {/* Author and Stats */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200/50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-medium text-gray-700">
              {article.author?.name || "Unknown"}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <span className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              {article.viewCount?.toLocaleString() || "0"}
            </span>
            <span className="flex items-center">
              <MessageCircle className="w-3 h-3 mr-1" />
              {article.commentCount?.toLocaleString() || "0"}
            </span>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

const ArticleListItem = ({ article, getCategoryColor, getTimeAgo }) => (
  <Link href={`/${article.slug}`} className="group">
    <div className="bg-white/70 backdrop-blur-md rounded-xl p-4 flex items-center space-x-4 hover:shadow-lg transition-all duration-300 border border-white/20 hover:-translate-y-0.5">
      {article.coverImage ? (
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-16 h-16 rounded-lg object-cover flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="w-16 h-16 rounded-lg flex items-center justify-center border border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0">
          <ImageOff className="w-5 h-5 text-gray-400" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          {article.categories?.[0] && (
            <span
              className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${getCategoryColor(
                article.categories[0].name
              )}`}
            >
              {article.categories[0].name.toUpperCase()}
            </span>
          )}
          <span className="text-xs text-gray-500">
            {getTimeAgo(article.createdAt)}
          </span>
        </div>
        <h4 className="text-sm font-semibold mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {article.title}
        </h4>
        <p className="text-xs text-gray-600 line-clamp-1">{article.excerpt}</p>
      </div>
    </div>
  </Link>
);

const TrendingSection = ({ posts, getCategoryColor }) => (
  <div className="bg-yellow-50 backdrop-blur-lg rounded-2xl p-5 border border-white/20 shadow-lg">
    <h3 className="font-semibold mb-4 flex items-center text-lg">
      <Flame className="h-5 w-5 mr-2 text-orange-500" />
      <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
        Trending Now
      </span>
    </h3>
    <div className="space-y-4">
      {posts.map((article, idx) => (
        <div
          key={article.id}
          className="bg-white/50 hover:bg-white/70 backdrop-blur-sm p-3 rounded-xl border border-white/30 transition-all duration-200 hover:shadow-md"
        >
          <Link href={`/${article.slug}`} className="block">
            <div className="flex items-start space-x-3">
              <span className="font-bold text-gray-400 text-xs mt-1">
                {idx + 1}.
              </span>
              <div className="min-w-0">
                <p className="font-medium line-clamp-2 break-words whitespace-normal hover:text-blue-600 transition-colors duration-200">
                  {article.title}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                  <span className="flex items-center">
                    <Eye className="w-3 h-3 mr-1" />
                    {article.viewCount?.toLocaleString() || "0"} views
                  </span>
                  {article.categories?.[0] && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${getCategoryColor(
                        article.categories[0].name
                      )}`}
                    >
                      {article.categories[0].name}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </div>
);

const PopularSection = ({ posts, getTimeAgo }) => (
  <div className="bg-purple-50 backdrop-blur-lg rounded-2xl p-5 border border-white/20 shadow-lg">
    <h3 className="font-semibold mb-4 flex items-center text-lg">
      <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Popular Today
      </span>
    </h3>
    <div className="space-y-4">
      {posts.map((article) => (
        <div
          key={article.id}
          className="bg-white/50 hover:bg-white/70 backdrop-blur-sm p-3 rounded-xl border border-white/30 transition-all duration-200 hover:shadow-md"
        >
          <Link href={`/${article.slug}`} className="block">
            <p className="font-medium line-clamp-2 break-words whitespace-normal hover:text-blue-600 transition-colors duration-200">
              {article.title}
            </p>
            <div className="text-xs text-gray-500 mt-2 flex items-center justify-between">
              <span className="flex items-center">
                <Eye className="w-3 h-3 mr-1" />
                {article.viewCount?.toLocaleString() || "0"} views
              </span>
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {getTimeAgo(article.createdAt)}
              </span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </div>
);
