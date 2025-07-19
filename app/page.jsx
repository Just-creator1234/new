// 'use client';

// import { useEffect, useState } from 'react';
// import {
//   Search,
//   ArrowRight,
//   User,
//   Clock,
//   Share2,
//   Heart,
//   MessageCircle,
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
// } from 'lucide-react';

// const API = '/api/posts';

// export default function Homepage() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [mobileOpen, setMobileOpen] = useState(false);

//   /* ---------- fetch real posts ---------- */
//   useEffect(() => {
//     fetch(API)
//       .then((r) => r.json())
//       .then(setPosts)
//       .catch(() => {
//         // fallback to mock if API not ready
//         setPosts(mockPosts);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   /* ---------- helpers ---------- */
//   const byCat = (cat) => posts.filter((p) => p.category === cat);
//   const visible =
//     activeCategory === 'all'
//       ? posts
//       : byCat(activeCategory);

//   const breaking = visible.find((p) => p.category === 'breaking');
//   const featured = visible.slice(0, 2);
//   const latest = visible.slice(2);

//   const trending = [...posts]
//     .sort((a, b) => parseInt(b.views) - parseInt(a.views))
//     .slice(0, 5);

//   const popular = [...posts]
//     .filter((p) => p.time.includes('hour') || p.time.includes('min'))
//     .sort((a, b) => parseInt(b.views) - parseInt(a.views))
//     .slice(0, 5);

//   /* ---------- UI components ---------- */
//   const categories = [
//     'all',
//     'breaking',
//     'politics',
//     'tech',
//     'sports',
//     'business',
//     'world',
//     'health',
//     'science',
//     'entertainment',
//   ];

//   const CategoryTag = ({ type, children }) => {
//     const cls = {
//       breaking: 'bg-red-50 text-red-600 border-red-200',
//       politics: 'bg-blue-50 text-blue-600 border-blue-200',
//       tech: 'bg-purple-50 text-purple-600 border-purple-200',
//       sports: 'bg-green-50 text-green-600 border-green-200',
//       business: 'bg-yellow-50 text-yellow-600 border-yellow-200',
//       world: 'bg-gray-50 text-gray-600 border-gray-200',
//       health: 'bg-pink-50 text-pink-600 border-pink-200',
//       science: 'bg-cyan-50 text-cyan-600 border-cyan-200',
//       entertainment: 'bg-indigo-50 text-indigo-600 border-indigo-200',
//     };
//     return (
//       <span
//         className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${cls[type]}`}
//       >
//         {children}
//       </span>
//     );
//   };

//   const Skeleton = ({ className = '' }) => (
//     <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
//   );

//   const NewsCard = ({ article, size = 'medium' }) => {
//     if (size === 'large') {
//       return (
//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           <div className="aspect-video bg-gray-200 relative">
//             <img
//               src={article.image}
//               alt={article.title}
//               className="object-cover w-full h-full"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
//             <div className="absolute bottom-4 left-4">
//               <CategoryTag type={article.category}>
//                 {article.category.toUpperCase()}
//               </CategoryTag>
//             </div>
//           </div>
//           <div className="p-6">
//             <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
//               <Clock className="h-4 w-4" />
//               <span>{article.time}</span>
//             </div>
//             <h2 className="text-2xl font-bold mb-3">{article.title}</h2>
//             <p className="text-gray-600 mb-4">{article.excerpt}</p>
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-2">
//                 <User className="h-4 w-4" />
//                 <span className="text-sm font-medium">{article.author}</span>
//               </div>
//               <div className="flex space-x-2">
//                 <Heart className="h-4 w-4 text-gray-400 hover:text-red-500 cursor-pointer" />
//                 <Share2 className="h-4 w-4 text-gray-400 hover:text-blue-500 cursor-pointer" />
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     if (size === 'medium') {
//       return (
//         <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//           <img
//             src={article.image}
//             alt={article.title}
//             className="aspect-video object-cover"
//           />
//           <div className="p-4">
//             <div className="flex items-center space-x-2 mb-2">
//               <CategoryTag type={article.category}>
//                 {article.category.toUpperCase()}
//               </CategoryTag>
//               <span className="text-sm text-gray-500">{article.time}</span>
//             </div>
//             <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
//             <p className="text-sm text-gray-600 mb-3">{article.excerpt}</p>
//             <div className="flex items-center justify-between text-xs text-gray-500">
//               <span>By {article.author}</span>
//               <span>{article.views} views • {article.readTime}</span>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="bg-white rounded-lg p-4 flex items-center space-x-4">
//         <img
//           src={article.image}
//           alt={article.title}
//           className="w-16 h-16 rounded object-cover"
//         />
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center space-x-2 mb-1">
//             <CategoryTag type={article.category}>
//               {article.category.toUpperCase()}
//             </CategoryTag>
//             <span className="text-xs text-gray-500">{article.time}</span>
//           </div>
//           <h4 className="text-sm font-semibold">{article.title}</h4>
//           <p className="text-xs text-gray-600 truncate">{article.excerpt}</p>
//         </div>
//       </div>
//     );
//   };

//   /* ---------- render ---------- */
//   if (loading)
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <Skeleton className="h-16 w-full mb-6" />
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           <div className="lg:col-span-3 space-y-4">
//             <Skeleton className="h-64 w-full" />
//             <Skeleton className="h-40 w-full" />
//             <Skeleton className="h-40 w-full" />
//           </div>
//           <div className="space-y-4">
//             <Skeleton className="h-48 w-full" />
//             <Skeleton className="h-48 w-full" />
//           </div>
//         </div>
//       </div>
//     );

//   /* ---------- page ---------- */
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white border-b sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
//           <div className="font-bold text-blue-600 text-xl">SpeedyNews</div>
//           <div className="flex items-center space-x-4">
//             <Search className="h-5 w-5 text-gray-500" />
//             <Bell className="h-5 w-5 text-gray-500" />
//             <Menu
//               className="h-6 w-6 text-gray-500 md:hidden"
//               onClick={() => setMobileOpen(!mobileOpen)}
//             />
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* Main */}
//         <div className="lg:col-span-3 space-y-6">
//           {/* Breaking */}
//           {breaking && (
//             <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
//               <TrendingUp className="h-5 w-5 text-red-600 mr-3" />
//               <div>
//                 <h3 className="font-semibold text-red-800">BREAKING</h3>
//                 <p className="text-sm text-red-700">{breaking.title}</p>
//               </div>
//             </div>
//           )}

//           {/* Category filter */}
//           <div className="flex items-center space-x-2 overflow-x-auto pb-2">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setActiveCategory(cat)}
//                 className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
//                   activeCategory === cat
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 {cat === 'all' ? 'All News' : cat}
//               </button>
//             ))}
//           </div>

//           {/* Featured */}
//           {featured.length > 0 && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {featured.map((a) => (
//                 <NewsCard key={a.id} article={a} size="medium" />
//               ))}
//             </div>
//           )}

//           {/* Latest */}
//           {latest.length > 0 && (
//             <div>
//               <h2 className="text-xl font-bold mb-3">Latest</h2>
//               <div className="space-y-3">
//                 {latest.map((a) => (
//                   <NewsCard key={a.id} article={a} size="compact" />
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-6">
//           <div className="bg-white rounded-lg p-4 shadow">
//             <h3 className="font-semibold mb-3">Trending</h3>
//             <div className="space-y-3">
//               {trending.map((a, idx) => (
//                 <div key={a.id} className="text-sm">
//                   <span className="font-bold">{idx + 1}.</span> {a.title}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-white rounded-lg p-4 shadow">
//             <h3 className="font-semibold mb-3">Popular</h3>
//             <div className="space-y-3">
//               {popular.map((a) => (
//                 <div key={a.id} className="text-sm">
//                   <span className="font-medium">{a.title}</span>
//                   <div className="text-xs text-gray-500">{a.views} views</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// /* ---------- fallback mock data ---------- */
// const mockPosts = [
//   {
//     id: 1,
//     category: 'breaking',
//     title: 'Major Earthquake Strikes Pacific Region – Evacuations Underway',
//     excerpt: 'A 7.8 magnitude earthquake has triggered tsunami warnings.',
//     author: 'Maria Rodriguez',
//     time: '15 min ago',
//     image: '/earthquake.jpg',
//     views: '24.5k',
//     readTime: '4 min read',
//   },
//   {
//     id: 2,
//     category: 'politics',
//     title: 'Global Summit Addresses Climate Change Policies',
//     excerpt: 'World leaders gather to negotiate new emissions targets.',
//     author: 'James Wilson',
//     time: '2 hours ago',
//     image: '/summit.jpg',
//     views: '8.2k',
//     readTime: '5 min read',
//   },
//   {
//     id: 3,
//     category: 'tech',
//     title: 'Tech Giant Unveils Revolutionary AI Assistant',
//     excerpt: 'New AI platform promises to transform technology interaction.',
//     author: 'Sarah Chen',
//     time: '3 hours ago',
//     image: '/ai.jpg',
//     views: '12.7k',
//     readTime: '3 min read',
//   },
// ];

"use client";

import { useEffect, useState, useTransition } from "react";
import {
  Search,
  ArrowRight,
  User,
  Clock,
  Share2,
  Heart,
  MessageCircle,
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
} from "lucide-react";

// Import the server action
import { getPosts } from "@/app/actions/getPosts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BreakingNewsSlider from "@/components/BreakingNewsSlider";

/* ---------- fallback mock data ---------- */
const mockPosts = [
  {
    id: 1,
    title: "Major Earthquake Strikes Pacific Region – Evacuations Underway",
    excerpt:
      "A 7.8 magnitude earthquake has triggered tsunami warnings across the Pacific.",
    author: { name: "Maria Rodriguez" },
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 min ago
    coverImage: "/earthquake.jpg",
    categories: [{ name: "breaking", slug: "breaking" }],
    tags: [],
    views: "24.5k",
    slug: "earthquake-strikes-pacific",
  },
  {
    id: 2,
    title: "Global Summit Addresses Climate Change Policies",
    excerpt:
      "World leaders gather to negotiate new emissions targets for the next decade.",
    author: { name: "James Wilson" },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    coverImage: "/summit.jpg",
    categories: [{ name: "politics", slug: "politics" }],
    tags: [],
    views: "8.2k",
    slug: "climate-summit-policies",
  },
  {
    id: 3,
    title: "Tech Giant Unveils Revolutionary AI Assistant",
    excerpt:
      "New AI platform promises to transform how we interact with technology.",
    author: { name: "Sarah Chen" },
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    coverImage: "/ai.jpg",
    categories: [{ name: "tech", slug: "tech" }],
    tags: [],
    views: "12.7k",
    slug: "ai-assistant-unveiled",
  },
  {
    id: 4,
    title: "Championship Finals Draw Record Crowds",
    excerpt:
      "Historic match breaks attendance records as fans pack the stadium.",
    author: { name: "Mike Johnson" },
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    coverImage: "/sports.jpg",
    categories: [{ name: "sports", slug: "sports" }],
    tags: [],
    views: "15.3k",
    slug: "championship-finals-record",
  },
  {
    id: 5,
    title: "Market Volatility Continues Amid Economic Uncertainty",
    excerpt:
      "Stock markets show mixed signals as investors await policy decisions.",
    author: { name: "David Brown" },
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    coverImage: "/market.jpg",
    categories: [{ name: "business", slug: "business" }],
    tags: [],
    views: "9.8k",
    slug: "market-volatility-continues",
  },
];

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentBreakingIndex, setCurrentBreakingIndex] = useState(0);
  const [isPending, startTransition] = useTransition();

  /* ---------- utility functions ---------- */
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
    // Rough calculation: 200 words per minute
    const wordCount =
      typeof content === "string" ? content.split(" ").length : 300;
    const minutes = Math.ceil(wordCount / 200);
    return `${minutes} min read`;
  };

  const getCategoryColor = (categoryName) => {
    const colors = {
      politics: "bg-blue-50 text-blue-600 border-blue-200",
      tech: "bg-purple-50 text-purple-600 border-purple-200",
      sports: "bg-green-50 text-green-600 border-green-200",
      business: "bg-yellow-50 text-yellow-600 border-yellow-200",
      world: "bg-gray-50 text-gray-600 border-gray-200",
      health: "bg-pink-50 text-pink-600 border-pink-200",
      science: "bg-cyan-50 text-cyan-600 border-cyan-200",
      entertainment: "bg-indigo-50 text-indigo-600 border-indigo-200",
    };
    return colors[categoryName] || "bg-gray-50 text-gray-600 border-gray-200";
  };

  /* ---------- fetch real posts ---------- */
  useEffect(() => {
    startTransition(async () => {
      try {
        const result = await getPosts();
        console.log(result, "Fetched posts");

        // Handle different response formats
        let postsData = [];
        if (Array.isArray(result)) {
          postsData = result;
        } else if (result.success && Array.isArray(result.data)) {
          postsData = result.data;
        } else if (result.data && Array.isArray(result.data)) {
          postsData = result.data;
        }

        if (postsData.length > 0) {
          setPosts(postsData);
        } else {
          console.log("No posts found, using mock data");
          setPosts(mockPosts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts(mockPosts);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  /* ---------- data processing ---------- */
  const hasCategory = (post, categorySlug) => {
    return (
      post.categories &&
      post.categories.some(
        (cat) =>
          cat.slug === categorySlug ||
          cat.name.toLowerCase() === categorySlug.toLowerCase()
      )
    );
  };

  const getPostsByCategory = (categorySlug) => {
    if (categorySlug === "all") return posts;
    return posts.filter((post) => hasCategory(post, categorySlug));
  };

  const breakingNews = posts.filter((post) => post.breaking);

  // Get posts for current category
  const categoryPosts = getPostsByCategory(activeCategory);

  // Featured articles: latest 2 from current category
  const featuredArticles = categoryPosts.slice(0, 2);

  // Latest articles: remaining posts from current category
  const latestArticles = categoryPosts.slice(2);

  // Trending: top viewed posts from all posts
  const trendingPosts = [...posts]
    .sort((a, b) => {
      const aViews = parseInt(a.views?.replace(/[^0-9]/g, "") || "0");
      const bViews = parseInt(b.views?.replace(/[^0-9]/g, "") || "0");
      return bViews - aViews;
    })
    .slice(0, 5);

  // Popular: recent posts with high views
  const popularPosts = [...posts]
    .filter((post) => {
      const timeAgo = getTimeAgo(post.createdAt);
      return timeAgo.includes("hour") || timeAgo.includes("min");
    })
    .sort((a, b) => {
      const aViews = parseInt(a.views?.replace(/[^0-9]/g, "") || "0");
      const bViews = parseInt(b.views?.replace(/[^0-9]/g, "") || "0");
      return bViews - aViews;
    })
    .slice(0, 5);

  /* ---------- categories ---------- */
  const categories = [
    "all",
    "politics",
    "tech",
    "sports",
    "business",
    "world",
    "health",
    "science",
    "entertainment",
  ];
  /* ---------- render loading state ---------- */
  if (loading || isPending) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="h-16 w-full mb-6 bg-gray-200 rounded animate-pulse" />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-4">
              <div className="h-64 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-40 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-40 w-full bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="space-y-4">
              <div className="h-48 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-48 w-full bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- main render ---------- */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Breaking News - Always shows breaking news regardless of category */}
          {breakingNews.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
              <TrendingUp className="h-5 w-5 text-red-600 mr-3" />
              <div>
                <h3 className="font-semibold text-red-800">BREAKING</h3>
                <p className="text-sm text-red-700">
                  {breakingNews[currentBreakingIndex].title}
                </p>
              </div>
            </div>
          )}
          {/* Breaking Visual – image + headline */}
          {breakingNews.length > 0 && (
            <BreakingNewsSlider
              breakingNews={breakingNews}
              getTimeAgo={getTimeAgo}
              currentIndex={currentBreakingIndex}
              setCurrentIndex={setCurrentBreakingIndex}
            />
          )}
          {/* Category Filter */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat === "all"
                  ? "All News"
                  : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Featured Articles - Latest 2 from selected category */}
          {featuredArticles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredArticles.map((article) => {
                const primaryCategory = article.categories?.[0];
                const timeAgo = getTimeAgo(article.createdAt);
                const readTime = getReadTime(article.content);

                return (
                  <div
                    key={article.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  >
                    {article.coverImage && (
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="aspect-video object-cover w-full"
                      />
                    )}
                    <div className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        {primaryCategory && (
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(
                              primaryCategory.name
                            )}`}
                          >
                            {primaryCategory.name.toUpperCase()}
                          </span>
                        )}
                        <span className="text-sm text-gray-500">{timeAgo}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>By {article.author?.name || "Unknown"}</span>
                        <span>
                          {article.views || "0"} views • {readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Latest Articles - Remaining posts from selected category */}
          {latestArticles.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-3">
                Latest{" "}
                {activeCategory !== "all"
                  ? activeCategory.charAt(0).toUpperCase() +
                    activeCategory.slice(1)
                  : "News"}
              </h2>
              <div className="space-y-3">
                {latestArticles.map((article) => {
                  const primaryCategory = article.categories?.[0];
                  const timeAgo = getTimeAgo(article.createdAt);

                  return (
                    <div
                      key={article.id}
                      className="bg-white rounded-lg p-4 flex items-center space-x-4 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      {article.coverImage && (
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="w-16 h-16 rounded object-cover flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          {primaryCategory && (
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(
                                primaryCategory.name
                              )}`}
                            >
                              {primaryCategory.name.toUpperCase()}
                            </span>
                          )}
                          <span className="text-xs text-gray-500">
                            {timeAgo}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold mb-1 line-clamp-2">
                          {article.title}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-1">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* No posts message */}
          {categoryPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No articles found in this category.
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Section */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h3 className="font-semibold mb-3 flex items-center">
              <Flame className="h-4 w-4 mr-2 text-orange-500" />
              Trending
            </h3>
            <div className="space-y-3">
              {trendingPosts.map((article, idx) => (
                <div
                  key={article.id}
                  className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer"
                >
                  <div className="flex items-start space-x-2">
                    <span className="font-bold text-gray-400 text-xs">
                      {idx + 1}.
                    </span>
                    <div>
                      <p className="font-medium line-clamp-2">
                        {article.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {article.views || "0"} views
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Section */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h3 className="font-semibold mb-3 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
              Popular Today
            </h3>
            <div className="space-y-3">
              {popularPosts.map((article) => (
                <div
                  key={article.id}
                  className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer"
                >
                  <p className="font-medium line-clamp-2">{article.title}</p>
                  <div className="text-xs text-gray-500 mt-1 flex items-center justify-between">
                    <span>{article.views || "0"} views</span>
                    <span>{getTimeAgo(article.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
