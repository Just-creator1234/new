// "use client";
// import React from "react";
// import ViewTracker from "@/components/ViewTracker";
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
//   Eye,
//   ThumbsUp,
//   Calendar,
//   Award,
//   ExternalLink,
// } from "lucide-react";

// const ArticlePageClient = ({ article, relatedArticles }) => {
//   const CategoryTag = ({ type, children }) => {
//     const categoryClasses = {
//       breaking: "bg-red-50 text-red-600 border-red-200",
//       politics: "bg-blue-50 text-blue-600 border-blue-200",
//       tech: "bg-purple-50 text-purple-600 border-purple-200",
//       sports: "bg-green-50 text-green-600 border-green-200",
//       business: "bg-yellow-50 text-yellow-600 border-yellow-200",
//       world: "bg-gray-50 text-gray-600 border-gray-200",
//     };

//     return (
//       <span
//         className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${categoryClasses[type]}`}
//       >
//         {children}
//       </span>
//     );
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   if (!article) return null;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <ViewTracker postId={article.id} />
//       {/* Header */}

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <article className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
//             {/* Article Header */}
//             <div className="p-6">
//               <div className="flex items-center space-x-4 mb-4">
//                 <CategoryTag type={article.category}>
//                   {article.category.toUpperCase()}
//                 </CategoryTag>
//                 <div className="flex items-center text-sm text-gray-500">
//                   <Clock className="h-4 w-4 mr-1" />
//                   <span>{formatDate(article.publishedAt)}</span>
//                 </div>
//                 <div className="flex items-center text-sm text-gray-500">
//                   <Eye className="h-4 w-4 mr-1" />
//                   <span>{article.views}</span>
//                 </div>
//               </div>

//               <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//                 {article.title}
//               </h1>

//               <div className="flex items-center justify-between mb-8">
//                 <div className="flex items-center space-x-2">
//                   <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
//                     <Heart className="h-5 w-5" />
//                   </button>
//                   <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
//                     <Bookmark className="h-5 w-5" />
//                   </button>
//                   <button className="p-2 text-gray-400 hover:text-green-500 transition-colors">
//                     <Share2 className="h-5 w-5" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="w-full h-64 md:h-96 bg-gray-200 relative">
//               {article.coverImage && (
//                 <img
//                   src={article.coverImage}
//                   alt={article.altText || article.title}
//                   className="w-full h-full object-cover"
//                 />
//               )}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
//             </div>

//             <div className="p-6">
//               <div
//                 className="prose max-w-none"
//                 dangerouslySetInnerHTML={{
//                   __html: article.content?.html || article.content,
//                 }}
//               />

//               <div className="mt-12 pt-6 border-t border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-4">
//                     <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
//                       <ThumbsUp className="h-5 w-5" />
//                       <span>{article.likes} Likes</span>
//                     </button>
//                   </div>
//                   <div className="text-sm text-gray-500">
//                     {article.readTime}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </article>

//           {/* Sidebar */}
//           <aside className="space-y-6">
//             <div className="bg-white rounded-lg shadow-sm">
//               <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4">
//                 <h3 className="text-lg font-semibold">About the Author</h3>
//               </div>

//               <div className="p-6">
//                 <div className="flex gap-4 mb-6">
//                   <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-full w-16 h-16 flex items-center justify-center">
//                     <User className="text-white h-7 w-7" />
//                   </div>
//                   <div>
//                     <h4 className="text-lg font-semibold mb-1">
//                       {article.author.name}
//                     </h4>
//                     <p className="text-sm text-gray-600">
//                       {article.author.bio}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4 mb-6">
//                   <div className="bg-gray-50 p-3 rounded-lg text-center">
//                     <div className="flex justify-center items-center mb-1">
//                       <Calendar className="text-blue-600 h-4 w-4 mr-1" />
//                       <span className="text-xs text-gray-500">JOINED</span>
//                     </div>
//                     <p className="text-sm font-semibold">2019</p>
//                   </div>
//                   <div className="bg-gray-50 p-3 rounded-lg text-center">
//                     <div className="flex justify-center items-center mb-1">
//                       <Award className="text-purple-600 h-4 w-4 mr-1" />
//                       <span className="text-xs text-gray-500">ARTICLES</span>
//                     </div>
//                     <p className="text-sm font-semibold">250+</p>
//                   </div>
//                 </div>

//                 <div className="mb-6">
//                   <p className="text-xs text-gray-500 uppercase mb-3">
//                     Expertise
//                   </p>
//                   <div className="flex flex-wrap gap-2">
//                     {article.tags?.map((tag) => (
//                       <span
//                         key={tag.name}
//                         className="bg-blue-100 text-blue-700 px-2.5 py-1 text-xs rounded-full"
//                       >
//                         {tag.name}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <button className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 text-sm font-medium flex justify-center items-center">
//                     <User className="h-4 w-4 mr-2" />
//                     Follow Author
//                   </button>
//                   <button className="w-full border border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-50 text-sm font-medium flex justify-center items-center">
//                     <ExternalLink className="h-4 w-4 mr-2" />
//                     View All Articles
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
//               <div className="space-y-4">
//                 {relatedArticles?.map((item) => (
//                   <div key={item.id} className="group">
//                     <div className="flex space-x-3">
//                       <div
//                         className="flex-shrink-0 w-20 h-16 bg-gray-200 rounded-lg"
//                         style={{
//                           backgroundImage: `url(${item.imageUrl})`,
//                           backgroundSize: "cover",
//                           backgroundPosition: "center",
//                         }}
//                       />
//                       <div>
//                         <CategoryTag type={item.category}>
//                           {item.category.toUpperCase()}
//                         </CategoryTag>
//                         <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 mt-1 line-clamp-2">
//                           {item.title}
//                         </h4>
//                         <p className="text-xs text-gray-500 mt-1">
//                           {item.readTime}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-blue-50 rounded-lg shadow-sm p-6">
//               <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
//               <p className="text-sm text-gray-600 mb-4">
//                 Get the latest tech news delivered to your inbox
//               </p>
//               <div className="space-y-3">
//                 <input
//                   type="email"
//                   placeholder="Your email address"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                 />
//                 <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-sm font-medium">
//                   Subscribe
//                 </button>
//               </div>
//             </div>
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
  Globe,
  Bookmark,
  ImageOff,
  Eye,
  ThumbsUp,
  Calendar,
  Award,
  ExternalLink,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
  Play,
  Pause,
  Volume2,
  ChevronUp,
  TrendingUp,
  Star,
  Users,
  MoreHorizontal,
} from "lucide-react";

const ArticlePageClient = ({ article, relatedArticles }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(article?.likes || 0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const CategoryTag = ({ type, children, size = "md" }) => {
    const categoryClasses = {
      breaking: "bg-red-500 text-white",
      politics: "bg-blue-500 text-white",
      tech: "bg-purple-500 text-white",
      sports: "bg-green-500 text-white",
      business: "bg-amber-500 text-white",
      world: "bg-slate-600 text-white",
    };

    const sizeClasses = {
      sm: "px-2.5 py-1 text-xs",
      md: "px-3 py-1.5 text-sm",
    };

    return (
      <span
        className={`inline-block rounded-full font-semibold uppercase tracking-wide ${categoryClasses[type]} ${sizeClasses[size]}`}
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

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleShare = (platform) => {
    setShowShareMenu(false);
    // Share logic would go here
  };

  if (!article)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-medium text-gray-500">
            Article not found
          </div>
          <a
            href="/"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            Back to home
          </a>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-white">
      <ViewTracker postId={article.id} />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center text-sm text-gray-500 space-x-2">
          <a href="#" className="hover:text-gray-700">
            Home
          </a>
          <span>/</span>
          <a href="#" className="hover:text-gray-700">
            Technology
          </a>
          <span>/</span>
          <span className="text-gray-900">Article</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Article */}
          <article className="lg:col-span-8">
            <div className="bg-white">
              {/* Article Header */}
              <header className="mb-8">
                <div className="flex items-center space-x-4 mb-6">
                  <CategoryTag type={article.category} size="md">
                    {article.category}
                  </CategoryTag>
                  {article.breaking && (
                    <span className="text-red-600 text-sm font-medium flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Breaking
                    </span>
                  )}
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight break-words whitespace-normal">
                  {article.title}
                </h1>

                {/* Article Meta */}
                <div className="flex items-center justify-between py-6 border-y border-gray-100">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-full w-12 h-12 flex items-center justify-center">
                        <User className="text-white h-7 w-7" />
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
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {article.views || "0"}
                    </span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">
                      {article.readTime || "5 min read"}
                    </span>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={handleLike}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                        isLiked
                          ? "bg-red-50 text-red-600 border border-red-200"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      <Heart
                        className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`}
                      />
                      <span className="text-sm font-medium">{likes}</span>
                    </button>

                    <button
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`p-2 rounded-full transition-all ${
                        isBookmarked
                          ? "bg-blue-50 text-blue-600 border border-blue-200"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      <Bookmark
                        className={`h-4 w-4 ${
                          isBookmarked ? "fill-current" : ""
                        }`}
                      />
                    </button>

                    <div className="relative">
                      <button
                        onClick={() => setShowShareMenu(!showShareMenu)}
                        className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200 transition-all"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>

                      {showShareMenu && (
                        <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                          <button
                            onClick={() => handleShare("twitter")}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                          >
                            <Twitter className="h-4 w-4" />
                            <span>Twitter</span>
                          </button>
                          <button
                            onClick={() => handleShare("facebook")}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                          >
                            <Facebook className="h-4 w-4" />
                            <span>Facebook</span>
                          </button>
                          <button
                            onClick={() => handleShare("linkedin")}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                          >
                            <Linkedin className="h-4 w-4" />
                            <span>LinkedIn</span>
                          </button>
                          <button
                            onClick={() => handleShare("copy")}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                          >
                            <Copy className="h-4 w-4" />
                            <span>Copy Link</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Audio Player */}
                  <div className="flex items-center space-x-3 break-words whitespace-normal">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                      <Volume2 className="h-4 w-4" />
                      <span>Listen</span>
                    </button>
                  </div>
                </div>
              </header>

              {/* Featured Image */}
              {article.coverImage && (
                <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={article.coverImage}
                    alt={article.altText || article.title}
                    className="w-full h-96 object-cover"
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="prose prose-lg max-w-none break-words whitespace-normal">
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
                  .prose p {
                    font-size: 1.125rem;
                    line-height: 1.8;
                    color: #374151;
                    margin-bottom: 1.5rem;
                  }
                  .prose .highlight-quote {
                    background: linear-gradient(
                      135deg,
                      #667eea 0%,
                      #764ba2 100%
                    );
                    color: white;
                    padding: 2rem;
                    border-radius: 1rem;
                    font-size: 1.25rem;
                    font-style: italic;
                    text-align: center;
                    margin: 2.5rem 0;
                    position: relative;
                  }
                  .prose .highlight-quote::before {
                    content: '"';
                    font-size: 4rem;
                    position: absolute;
                    top: -0.5rem;
                    left: 1rem;
                    opacity: 0.5;
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
                <div className="mt-12 pt-8 border-t border-gray-100">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag.name}
                        className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors"
                      >
                        #{tag.name.replace(/\s+/g, "")}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Bio */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-full w-20 h-20 flex items-center justify-center">
                      <User className="text-white h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">
                        {article.author?.name || "Unknown Author"}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {article.author?.bio || "No bio available"}
                      </p>
                      <div className="flex items-center space-x-4">
                        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                          Follow
                        </button>
                        <button className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
                          View Articles
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Trending Now */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm sticky top-24">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                <h3 className="text-lg font-bold text-white flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Trending Now
                </h3>
              </div>
              <div className="p-6 space-y-4">
                {relatedArticles?.slice(0, 3).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 group cursor-pointer"
                  >
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {item.title}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <CategoryTag type={item.category || "tech"} size="sm">
                          {item.category || "Tech"}
                        </CategoryTag>
                        <span className="text-xs text-gray-500">
                          • {item.readTime || "5 min read"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Articles */}
            {relatedArticles?.length > 0 && (
              <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900">
                    Related Articles
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  {relatedArticles.map((item) => (
                    <article key={item.id} className="group cursor-pointer">
                      <div className="flex space-x-4">
                        <div className="flex-shrink-0 w-24 h-18 rounded-lg overflow-hidden bg-gray-200">
                          {item.coverImage && (
                            <img
                              src={item.coverImage}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <CategoryTag type={item.category || "tech"} size="sm">
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
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl text-white overflow-hidden">
              <div className="p-8">
                <h3 className="text-xl font-bold mb-2">Stay Ahead</h3>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  Get the latest tech insights and breaking news delivered to
                  your inbox every morning.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 placeholder-white/70 text-white focus:ring-2 focus:ring-white/50 focus:border-white/50"
                  />
                  <button className="w-full bg-white text-blue-600 py-3 px-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                    Subscribe Free
                  </button>
                  <p className="text-xs text-blue-100 text-center">
                    Join 50,000+ readers • Unsubscribe anytime
                  </p>
                </div>
              </div>
            </div>

            {/* Back to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
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
