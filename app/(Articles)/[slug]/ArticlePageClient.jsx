// "use client";
// import React, { useState } from "react";
// import ViewTracker from "@/components/ViewTracker";
// import Head from "next/head";
// import { usePostLikes } from "@/hook/usePostLikes"; // new file below
// import NewsletterSignup from "@/components/NewsletterSignup";
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
//   Globe,
//   Bookmark,
//   ImageOff,
//   Eye,
//   ThumbsUp,
//   Calendar,
//   Award,
//   ExternalLink,
//   Twitter,
//   Facebook,
//   Linkedin,
//   Copy,
//   Play,
//   Pause,
//   Volume2,
//   ChevronUp,
//   TrendingUp,
//   Star,
//   Users,
//   MoreHorizontal,
// } from "lucide-react";

// const ArticlePageClient = ({ article, relatedArticles }) => {
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [showShareMenu, setShowShareMenu] = useState(false);
//   const { likes, isLiked, toggleLike } = usePostLikes({
//     slug: article.slug,
//     initialLikes: article.likes || 0,
//     initialLiked: article.initialLiked || false, // hydrate from server
//   });

//   const CategoryTag = ({ type, children, size = "md" }) => {
//     const categoryClasses = {
//       breaking: "bg-red-500 text-white",
//       politics: "bg-blue-500 text-white",
//       tech: "bg-purple-500 text-white",
//       sports: "bg-green-500 text-white",
//       business: "bg-amber-500 text-white",
//       world: "bg-slate-600 text-white",
//     };

//     const sizeClasses = {
//       sm: "px-2.5 py-1 text-xs",
//       md: "px-3 py-1.5 text-sm",
//     };

//     return (
//       <span
//         className={`inline-block rounded-full font-semibold uppercase tracking-wide ${categoryClasses[type]} ${sizeClasses[size]}`}
//       >
//         {children}
//       </span>
//     );
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

//     if (diffInHours < 24) {
//       return `${diffInHours}h ago`;
//     }

//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   const handleShare = (platform) => {
//     setShowShareMenu(false);
//     // Share logic would go here
//   };

//   if (!article)
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-2xl font-medium text-gray-500">
//             Article not found
//           </div>
//           <a
//             href="/"
//             className="mt-4 inline-block text-blue-600 hover:underline"
//           >
//             Back to home
//           </a>
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-white">
//       <ViewTracker postId={article.id} />
//       <Head>
//         {/* ---------- Core meta ---------- */}
//         <title>{article.title}</title>
//         <meta
//           name="description"
//           content={article.metaDescription || article.excerpt || ""}
//         />

//         {/* ---------- Open-Graph / Facebook ---------- */}
//         <meta property="og:title" content={article.ogTitle || article.title} />
//         <meta
//           property="og:description"
//           content={article.ogDescription || article.excerpt || ""}
//         />
//         <meta
//           property="og:image"
//           content={article.ogImage || article.coverImage || ""}
//         />
//         <meta property="og:type" content="article" />
//         <meta
//           property="og:url"
//           content={typeof window !== "undefined" ? window.location.href : ""}
//         />

//         {/* ---------- Twitter ---------- */}
//         <meta
//           name="twitter:card"
//           content={article.twitterCard || "summary_large_image"}
//         />
//         <meta name="twitter:title" content={article.ogTitle || article.title} />
//         <meta
//           name="twitter:description"
//           content={article.ogDescription || article.excerpt || ""}
//         />
//         <meta
//           name="twitter:image"
//           content={article.ogImage || article.coverImage || ""}
//         />

//         {/* ---------- Google News / Schema ---------- */}
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify({
//               "@context": "https://schema.org",
//               url: "https://yoursite.com/logo.png",
//               headline: article.title,
//               description: article.metaDescription || article.excerpt,
//               image: article.coverImage,
//               datePublished: article.publishedAt,
//               dateModified: article.updatedAt || article.publishedAt,
//               author: {
//                 "@type": "Person",
//                 name: article.author?.name || "Staff Writer",
//               },
//               publisher: {
//                 "@type": "Organization",
//                 name: "YourNews", // ← change to your actual site name
//                 logo: {
//                   "@type": "ImageObject",
//                   url: "https://yoursite.com/logo.png", // ← change to your logo URL
//                 },
//               },
//               keywords: article.tags?.map((t) => t.name).join(", "),
//             }),
//           }}
//         />
//       </Head>

//       {/* Breadcrumb */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//         <div className="flex items-center text-sm text-gray-500 space-x-2">
//           <a href="#" className="hover:text-gray-700">
//             Home
//           </a>
//           <span>/</span>
//           <a href="#" className="hover:text-gray-700">
//             Technology
//           </a>
//           <span>/</span>
//           <span className="text-gray-900">Article</span>
//         </div>
//       </div>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//           {/* Main Article */}
//           <article className="lg:col-span-8">
//             <div className="bg-white">
//               {/* Article Header */}
//               <header className="mb-8">
//                 <div className="flex items-center space-x-4 mb-6">
//                   <CategoryTag type={article.category} size="md">
//                     {article.category}
//                   </CategoryTag>
//                   {article.breaking && (
//                     <span className="text-red-600 text-sm font-medium flex items-center">
//                       <TrendingUp className="h-4 w-4 mr-1" />
//                       Breaking
//                     </span>
//                   )}
//                 </div>

//                 <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight break-words whitespace-normal">
//                   {article.title}
//                 </h1>

//                 {/* Article Meta */}
//                 <div className="flex items-center justify-between py-6 border-y border-gray-100">
//                   <div className="flex items-center space-x-6">
//                     <div className="flex items-center space-x-3">
//                       <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-full w-12 h-12 flex items-center justify-center">
//                         <User className="text-white h-7 w-7" />
//                       </div>
//                       <div>
//                         <h3 className="font-semibold text-gray-900">
//                           {article.author?.name || "Unknown Author"}
//                         </h3>
//                         <div className="flex items-center space-x-4 text-sm text-gray-500">
//                           <span className="flex items-center">
//                             <Clock className="h-3 w-3 mr-1" />
//                             {formatDate(article.publishedAt)}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-center space-x-2">
//                     <span className="text-sm text-gray-500 flex items-center">
//                       <Eye className="h-4 w-4 mr-1" />
//                       {article.views || "0"}
//                     </span>
//                     <span className="text-sm text-gray-500">•</span>
//                     <span className="text-sm text-gray-500">
//                       {article.readTime || "5 min read"}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Action Bar */}
//                 <div className="flex items-center justify-between py-4">
//                   <div className="flex items-center space-x-1">
//                     <button
//                       onClick={toggleLike}
//                       className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
//                         isLiked
//                           ? "bg-red-50 text-red-600 border border-red-200"
//                           : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
//                       }`}
//                     >
//                       <Heart
//                         className={`h-4 w-4 transition-colors ${
//                           isLiked
//                             ? "fill-red-600 text-red-600"
//                             : "fill-none text-gray-400"
//                         }`}
//                       />
//                       <span className="text-sm font-medium">{likes}</span>
//                     </button>

//                     <button
//                       onClick={() => setIsBookmarked(!isBookmarked)}
//                       className={`p-2 rounded-full transition-all ${
//                         isBookmarked
//                           ? "bg-blue-50 text-blue-600 border border-blue-200"
//                           : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
//                       }`}
//                     >
//                       <Bookmark
//                         className={`h-4 w-4 ${
//                           isBookmarked ? "fill-current" : ""
//                         }`}
//                       />
//                     </button>

//                     <div className="relative">
//                       <button
//                         onClick={() => setShowShareMenu(!showShareMenu)}
//                         className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200 transition-all"
//                       >
//                         <Share2 className="h-4 w-4" />
//                       </button>

//                       {showShareMenu && (
//                         <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
//                           <button
//                             onClick={() => handleShare("twitter")}
//                             className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
//                           >
//                             <Twitter className="h-4 w-4" />
//                             <span>Twitter</span>
//                           </button>
//                           <button
//                             onClick={() => handleShare("facebook")}
//                             className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
//                           >
//                             <Facebook className="h-4 w-4" />
//                             <span>Facebook</span>
//                           </button>
//                           <button
//                             onClick={() => handleShare("linkedin")}
//                             className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
//                           >
//                             <Linkedin className="h-4 w-4" />
//                             <span>LinkedIn</span>
//                           </button>
//                           <button
//                             onClick={() => handleShare("copy")}
//                             className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
//                           >
//                             <Copy className="h-4 w-4" />
//                             <span>Copy Link</span>
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Audio Player */}
//                   <div className="flex items-center space-x-3 break-words whitespace-normal">
//                     <button
//                       onClick={() => setIsPlaying(!isPlaying)}
//                       className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
//                     >
//                       {isPlaying ? (
//                         <Pause className="h-4 w-4" />
//                       ) : (
//                         <Play className="h-4 w-4" />
//                       )}
//                       <Volume2 className="h-4 w-4" />
//                       <span>Listen</span>
//                     </button>
//                   </div>
//                 </div>
//               </header>

//               {/* Featured Image */}
//               {article.coverImage && (
//                 <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
//                   <img
//                     src={article.coverImage}
//                     alt={article.altText || article.title}
//                     className="w-full h-96 object-cover"
//                   />
//                 </div>
//               )}

//               {/* Article Content */}
//               <div className="prose prose-lg max-w-none break-words whitespace-normal">
//                 <style jsx global>{`
//                   .prose {
//                     font-family: "Georgia", serif;
//                   }
//                   .prose .lead {
//                     font-size: 1.25rem;
//                     line-height: 1.7;
//                     color: #374151;
//                     font-weight: 400;
//                     margin-bottom: 2rem;
//                     border-left: 4px solid #3b82f6;
//                     padding-left: 1.5rem;
//                     font-style: italic;
//                   }
//                   .prose h2 {
//                     font-size: 1.875rem;
//                     font-weight: 700;
//                     color: #111827;
//                     margin-top: 3rem;
//                     margin-bottom: 1.5rem;
//                     border-bottom: 2px solid #e5e7eb;
//                     padding-bottom: 0.5rem;
//                   }
//                   .prose p {
//                     font-size: 1.125rem;
//                     line-height: 1.8;
//                     color: #374151;
//                     margin-bottom: 1.5rem;
//                   }
//                   .prose .highlight-quote {
//                     background: linear-gradient(
//                       135deg,
//                       #667eea 0%,
//                       #764ba2 100%
//                     );
//                     color: white;
//                     padding: 2rem;
//                     border-radius: 1rem;
//                     font-size: 1.25rem;
//                     font-style: italic;
//                     text-align: center;
//                     margin: 2.5rem 0;
//                     position: relative;
//                   }
//                   .prose .highlight-quote::before {
//                     content: '"';
//                     font-size: 4rem;
//                     position: absolute;
//                     top: -0.5rem;
//                     left: 1rem;
//                     opacity: 0.5;
//                   }
//                 `}</style>
//                 <div
//                   dangerouslySetInnerHTML={{
//                     __html: article.content?.html || article.content,
//                   }}
//                 />
//               </div>

//               {/* Tags */}
//               {article.tags?.length > 0 && (
//                 <div className="mt-12 pt-8 border-t border-gray-100">
//                   <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
//                     Tags
//                   </h4>
//                   <div className="flex flex-wrap gap-2">
//                     {article.tags.map((tag) => (
//                       <span
//                         key={tag.name}
//                         className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors"
//                       >
//                         #{tag.name.replace(/\s+/g, "")}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Author Bio */}
//               <div className="mt-12 pt-8 border-t border-gray-100">
//                 <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8">
//                   <div className="flex items-start space-x-6">
//                     <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-full w-20 h-20 flex items-center justify-center">
//                       <User className="text-white h-7 w-7" />
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="text-xl font-bold text-gray-900">
//                         {article.author?.name || "Unknown Author"}
//                       </h3>
//                       <p className="text-gray-600 mb-4 leading-relaxed">
//                         {article.author?.bio || "No bio available"}
//                       </p>
//                       <div className="flex items-center space-x-4">
//                         <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
//                           Follow
//                         </button>
//                         <button className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
//                           View Articles
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </article>

//           {/* Sidebar */}
//           <aside className="lg:col-span-4 space-y-8">
//             {/* Trending Now */}
//             <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm sticky top-24">
//               <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
//                 <h3 className="text-lg font-bold text-white flex items-center">
//                   <TrendingUp className="h-5 w-5 mr-2" />
//                   Trending Now
//                 </h3>
//               </div>
//               <div className="p-6 space-y-4">
//                 {relatedArticles?.slice(0, 3).map((item, index) => (
//                   <div
//                     key={index}
//                     className="flex items-start space-x-3 group cursor-pointer"
//                   >
//                     <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
//                       {index + 1}
//                     </div>
//                     <div className="flex-1">
//                       <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
//                         {item.title}
//                       </h4>
//                       <div className="flex items-center space-x-2 mt-1">
//                         <CategoryTag type={item.category || "tech"} size="sm">
//                           {item.category || "Tech"}
//                         </CategoryTag>
//                         <span className="text-xs text-gray-500">
//                           • {item.readTime || "5 min read"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Related Articles */}
//             {relatedArticles?.length > 0 && (
//               <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
//                 <div className="px-6 py-4 border-b border-gray-100">
//                   <h3 className="text-lg font-bold text-gray-900">
//                     Related Articles
//                   </h3>
//                 </div>
//                 <div className="p-6 space-y-6">
//                   {relatedArticles.map((item) => (
//                     <article key={item.id} className="group cursor-pointer">
//                       <div className="flex space-x-4">
//                         <div className="flex-shrink-0 w-24 h-18 rounded-lg overflow-hidden bg-gray-200">
//                           {item.coverImage && (
//                             <img
//                               src={item.coverImage}
//                               alt={item.title}
//                               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
//                             />
//                           )}
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <CategoryTag type={item.category || "tech"} size="sm">
//                             {item.category || "Tech"}
//                           </CategoryTag>
//                           <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mt-2 line-clamp-2 leading-snug">
//                             {item.title}
//                           </h4>
//                           <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
//                             <span>{formatDate(item.publishedAt)}</span>
//                             <span>•</span>
//                             <span>{item.readTime || "5 min read"}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </article>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Newsletter Signup */}
//             <NewsletterSignup />
//             {/* Back to Top */}
//             <button
//               onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//               className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
//             >
//               <ChevronUp className="h-4 w-4" />
//               <span>Back to Top</span>
//             </button>
//           </aside>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ArticlePageClient;

"use client";
import React, { useState } from "react";
import ViewTracker from "@/components/ViewTracker";
import Head from "next/head";
import { usePostLikes } from "@/hook/usePostLikes";
import NewsletterSignup from "@/components/NewsletterSignup";
import TrendingSection from "@/components/TrendingSection";
import {
  User,
  Clock,
  Share2,
  Heart,
  MessageCircle,
  Bookmark,
  ImageOff,
  Eye,
  Play,
  Pause,
  Volume2,
  ChevronUp,
  TrendingUp,
  BookOpen,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
} from "lucide-react";

const ArticlePageClient = ({ article, relatedArticles }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const { likes, isLiked, toggleLike } = usePostLikes({
    slug: article.slug,
    initialLikes: article.likes || 0,
    initialLiked: article.initialLiked || false,
  });

  const CategoryTag = ({ type, children, isBreaking = false, size = "md" }) => {
    const categoryClasses = {
      breaking: "bg-gradient-to-r from-red-500 to-pink-500 text-white",
      politics: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
      tech: "bg-gradient-to-r from-purple-500 to-indigo-500 text-white",
      sports: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white",
      business: "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
      world: "bg-gradient-to-r from-gray-500 to-slate-500 text-white",
    };

    const sizeClasses = {
      sm: "px-2.5 py-1 text-xs",
      md: "px-3 py-1.5 text-sm",
    };

    return (
      <span
        className={`inline-block rounded-full font-semibold uppercase tracking-wide shadow-sm ${
          isBreaking
            ? categoryClasses.breaking
            : categoryClasses[type] || categoryClasses.world
        } ${sizeClasses[size]}`}
      >
        {children}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleShare = (platform) => {
    setShowShareMenu(false);
    // Share logic would go here
  };

  if (!article)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 max-w-md text-center border border-white/20 shadow-xl">
          <div className="text-2xl font-bold text-gray-700 mb-4">
            Article not found
          </div>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-md transition-all"
          >
            Back to home
          </a>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <ViewTracker postId={article.id} />
      <Head>
        {/* ---------- Core meta ---------- */}
        <title>{article.title}</title>
        <meta
          name="description"
          content={article.metaDescription || article.excerpt || ""}
        />

        {/* ---------- Open-Graph / Facebook ---------- */}
        <meta property="og:title" content={article.ogTitle || article.title} />
        <meta
          property="og:description"
          content={article.ogDescription || article.excerpt || ""}
        />
        <meta
          property="og:image"
          content={article.ogImage || article.coverImage || ""}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={typeof window !== "undefined" ? window.location.href : ""}
        />

        {/* ---------- Twitter ---------- */}
        <meta
          name="twitter:card"
          content={article.twitterCard || "summary_large_image"}
        />
        <meta name="twitter:title" content={article.ogTitle || article.title} />
        <meta
          name="twitter:description"
          content={article.ogDescription || article.excerpt || ""}
        />
        <meta
          name="twitter:image"
          content={article.ogImage || article.coverImage || ""}
        />

        {/* ---------- Google News / Schema ---------- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              headline: article.title,
              description: article.metaDescription || article.excerpt,
              image: article.coverImage,
              datePublished: article.publishedAt,
              dateModified: article.updatedAt || article.publishedAt,
              author: {
                "@type": "Person",
                name: article.author?.name || "Staff Writer",
              },
              publisher: {
                "@type": "Organization",
                name: "YourNews", // ← change to your actual site name
                logo: {
                  "@type": "ImageObject",
                  url: "https://yoursite.com/logo.png", // ← change to your logo URL
                },
              },
              keywords: article.tags?.map((t) => t.name).join(", "),
            }),
          }}
        />
      </Head>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center text-sm text-gray-500 space-x-2">
          <a href="/" className="hover:text-gray-700 transition-colors">
            Home
          </a>
          <span>/</span>
          <a
            href={`/category/${article.category?.toLowerCase()}`}
            className="hover:text-gray-700 transition-colors"
          >
            {article.category}
          </a>
          <span>/</span>
          <span className="text-gray-900 font-medium">{article.title}</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Article */}
          <article className="lg:col-span-8">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              {/* Article Header */}
              <header className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <CategoryTag
                    type={article.category?.toLowerCase()}
                    isBreaking={article.isBreaking}
                  >
                    {article.isBreaking ? "BREAKING" : article.category}
                  </CategoryTag>
                  {article.isBreaking && (
                    <div className="flex items-center text-sm font-medium bg-gradient-to-r from-red-500/10 to-pink-500/10 text-red-600 px-3 py-1 rounded-full">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Breaking
                    </div>
                  )}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                  {article.title}
                </h1>

                {/* Article Meta */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between py-6 border-y border-gray-100/50 gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-12 h-12 flex items-center justify-center shadow-sm">
                        <User className="text-white h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {article.author?.name || "Unknown Author"}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatDate(article.publishedAt)}
                          </span>
                          <span className="flex items-center">
                            <BookOpen className="h-3 w-3 mr-1" />
                            {article.readTime || "5 min read"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500 flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {article.views?.toLocaleString() || "0"}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {article.commentCount?.toLocaleString() || "0"}
                    </span>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={toggleLike}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                        isLiked
                          ? "bg-gradient-to-r from-red-500/10 to-pink-500/10 text-red-600"
                          : "bg-gray-100/50 hover:bg-gray-100 text-gray-600"
                      }`}
                    >
                      <Heart
                        className={`h-5 w-5 transition-colors ${
                          isLiked
                            ? "fill-red-600 text-red-600"
                            : "fill-none text-gray-500"
                        }`}
                      />
                      <span className="text-sm font-medium">{likes}</span>
                    </button>

                    <button
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`p-2 rounded-xl transition-all ${
                        isBookmarked
                          ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600"
                          : "bg-gray-100/50 hover:bg-gray-100 text-gray-600"
                      }`}
                    >
                      <Bookmark
                        className={`h-5 w-5 ${
                          isBookmarked ? "fill-blue-600 text-blue-600" : ""
                        }`}
                      />
                    </button>

                    <div className="relative">
                      <button
                        onClick={() => setShowShareMenu(!showShareMenu)}
                        className="p-2 rounded-xl bg-gray-100/50 hover:bg-gray-100 text-gray-600 transition-all"
                      >
                        <Share2 className="h-5 w-5" />
                      </button>

                      {showShareMenu && (
                        <div className="absolute top-full left-0 mt-2 bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 py-2 z-10 w-48">
                          <button
                            onClick={() => handleShare("twitter")}
                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/50 w-full text-left transition-colors"
                          >
                            <Twitter className="h-4 w-4 text-blue-400" />
                            <span>Twitter</span>
                          </button>
                          <button
                            onClick={() => handleShare("facebook")}
                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/50 w-full text-left transition-colors"
                          >
                            <Facebook className="h-4 w-4 text-blue-600" />
                            <span>Facebook</span>
                          </button>
                          <button
                            onClick={() => handleShare("linkedin")}
                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/50 w-full text-left transition-colors"
                          >
                            <Linkedin className="h-4 w-4 text-blue-700" />
                            <span>LinkedIn</span>
                          </button>
                          <button
                            onClick={() => handleShare("copy")}
                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/50 w-full text-left transition-colors"
                          >
                            <Copy className="h-4 w-4 text-gray-500" />
                            <span>Copy Link</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Audio Player */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        isPlaying
                          ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600"
                          : "bg-gray-100/50 hover:bg-gray-100 text-gray-600"
                      }`}
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                      <Volume2 className="h-5 w-5" />
                      <span>Listen</span>
                    </button>
                  </div>
                </div>
              </header>

              {/* Featured Image */}
              {article.coverImage && (
                <div className="relative aspect-video w-full overflow-hidden">
                  <img
                    src={article.coverImage}
                    alt={article.altText || article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              )}

              {/* Article Content */}
              <div className="p-8">
                <div className="prose prose-lg max-w-none">
                  <style jsx global>{`
                    .prose {
                      font-family: "Georgia", serif;
                    }
                    .prose .lead {
                      font-size: 1.25rem;
                      line-height: 1.7;
                      color: #374151;
                      font-weight: 400;
                      margin-bottom: 2rem;
                      border-left: 4px solid #3b82f6;
                      padding-left: 1.5rem;
                      font-style: italic;
                    }
                    .prose h2 {
                      font-size: 1.875rem;
                      font-weight: 700;
                      color: #111827;
                      margin-top: 3rem;
                      margin-bottom: 1.5rem;
                      border-bottom: 2px solid #e5e7eb;
                      padding-bottom: 0.5rem;
                    }
                    .prose h3 {
                      font-size: 1.5rem;
                      font-weight: 600;
                      color: #111827;
                      margin-top: 2.5rem;
                      margin-bottom: 1rem;
                    }
                    .prose p {
                      font-size: 1.125rem;
                      line-height: 1.8;
                      color: #374151;
                      margin-bottom: 1.5rem;
                    }
                    .prose a {
                      color: #3b82f6;
                      text-decoration: underline;
                    }
                    .prose img {
                      border-radius: 0.75rem;
                      margin: 2rem 0;
                    }
                    .prose blockquote {
                      background: linear-gradient(
                        135deg,
                        rgba(102, 126, 234, 0.1) 0%,
                        rgba(118, 75, 162, 0.1) 100%
                      );
                      border-left: 4px solid #3b82f6;
                      padding: 1.5rem;
                      border-radius: 0.5rem;
                      font-style: italic;
                      margin: 2rem 0;
                    }
                    .prose ul,
                    .prose ol {
                      margin-bottom: 1.5rem;
                    }
                    .prose li {
                      margin-bottom: 0.5rem;
                    }
                  `}</style>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: article.content?.html || article.content,
                    }}
                  />
                </div>

                {/* Tags */}
                {article.tags?.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-gray-100/50">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <a
                          key={tag.name}
                          href={`/tag/${tag.name}`}
                          className="bg-gray-100/50 text-gray-700 px-3 py-1.5 rounded-full text-sm hover:bg-gray-200 transition-colors"
                        >
                          #{tag.name.replace(/\s+/g, "")}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Author Bio */}
                <div className="mt-12 pt-8 border-t border-gray-100/50">
                  <div className="bg-gradient-to-br from-gray-50/50 to-blue-50/50 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-start space-x-6">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-20 h-20 flex items-center justify-center shadow-sm">
                        <User className="text-white h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">
                          {article.author?.name || "Unknown Author"}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {article.author?.bio || "No bio available"}
                        </p>
                        <div className="flex items-center space-x-3">
                          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:shadow-md transition-all">
                            Follow
                          </button>
                          <button className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-100/50 transition-colors">
                            View Articles
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6 sticky top-6">
            {/* Trending Now */}

            <TrendingSection
              articles={relatedArticles}
              sticky={false}
              className="mb-6"
            />
            {/* Related Articles */}
            {relatedArticles?.length > 0 && (
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl border border-white/20">
                <div className="px-6 py-4 border-b border-gray-100/50">
                  <h3 className="text-lg font-bold text-gray-900">
                    Related Articles
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  {relatedArticles.slice(0, 4).map((item) => (
                    <a
                      key={item.id}
                      href={`/${item.slug}`}
                      className="group block"
                    >
                      <div className="flex space-x-4">
                        <div className="flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative">
                          {item.coverImage ? (
                            <img
                              src={item.coverImage}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageOff className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <CategoryTag
                            type={item.category?.toLowerCase() || "tech"}
                            size="sm"
                          >
                            {item.category || "Tech"}
                          </CategoryTag>
                          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mt-2 line-clamp-2 leading-snug">
                            {item.title}
                          </h4>
                          <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                            <span>{formatDate(item.publishedAt)}</span>
                            <span>•</span>
                            <span>{item.readTime || "5 min read"}</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter Signup */}
            <NewsletterSignup />

            {/* Back to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-full bg-gradient-to-r from-gray-100/50 to-gray-200/50 hover:from-gray-200/50 hover:to-gray-300/50 text-gray-700 py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center space-x-2 border border-white/20 shadow-sm"
            >
              <ChevronUp className="h-4 w-4" />
              <span>Back to Top</span>
            </button>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default ArticlePageClient;
