// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Eye,
//   Grid,
//   List,
//   Flame,
//   Play,
//   TrendingUp,
//   ImageOff,
//   Clock,
//   BookOpen,
//   MessageCircle,
//   ChevronDown,
// } from "lucide-react";
// import Link from "next/link";
// import {
//   getPostsByCategory,
//   getAllCategories,
//   getPopularPostsByCategory,
//   getTrendingPostsByCategory,
// } from "@/app/actions/catpost";

// export default function CategoryClient({ slug }) {
//   const categoryId = slug || "all";
//   const [viewMode, setViewMode] = useState("grid");
//   const [sortBy, setSortBy] = useState("latest");
//   const [articles, setArticles] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     (async () => {
//       try {
//         setLoading(true);
//         const allCats = await getAllCategories();
//         setCategories([
//           { id: "all", name: "All News", color: "gray" },
//           ...allCats.filter((c) => c.slug !== "breaking"),
//         ]);

//         let posts;
//         switch (sortBy) {
//           case "latest":
//             posts = await getPostsByCategory(categoryId, "latest");
//             break;
//           case "popular":
//             posts = await getPopularPostsByCategory(categoryId);
//             break;
//           case "trending":
//             posts = await getTrendingPostsByCategory(categoryId);
//             break;
//           default:
//             posts = await getPostsByCategory(categoryId);
//         }

//         setArticles(posts);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [categoryId, sortBy]);

//   const CategoryTag = ({ type, children, isBreaking }) => {
//     const categoryClasses = {
//       breaking: "bg-gradient-to-r from-red-500 to-pink-500 text-white",
//       politics: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
//       tech: "bg-gradient-to-r from-purple-500 to-indigo-500 text-white",
//       sports: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white",
//       business: "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
//       world: "bg-gradient-to-r from-gray-500 to-slate-500 text-white",
//     };

//     return (
//       <span
//         className={`inline-block px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
//           isBreaking
//             ? categoryClasses.breaking
//             : categoryClasses[type] ||
//               "bg-gradient-to-r from-gray-500 to-slate-500 text-white"
//         }`}
//       >
//         {children}
//       </span>
//     );
//   };

//   const ArticleCard = ({ article }) => (
//     <Link className="group" href={`/${article.slug}`}>
//       <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/20 hover:-translate-y-1">
//         {article.image ? (
//           <div className="aspect-video relative overflow-hidden">
//             <img
//               src={article.image}
//               alt={article.title}
//               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
//             <div className="absolute top-4 left-4">
//               <CategoryTag
//                 type={article.categoryName.toLowerCase()}
//                 isBreaking={article.isBreaking}
//               >
//                 {article.isBreaking ? "BREAKING" : article.categoryName}
//               </CategoryTag>
//             </div>
//           </div>
//         ) : (
//           <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
//             <ImageOff className="w-8 h-8 text-gray-400" />
//           </div>
//         )}
//         <div className="p-6">
//           <div className="flex items-center space-x-3 mb-3 text-sm text-gray-500">
//             <div className="flex items-center">
//               <Clock className="w-4 h-4 mr-1" />
//               <span>{article.publishedAt}</span>
//             </div>
//             <div className="flex items-center">
//               <BookOpen className="w-4 h-4 mr-1" />
//               <span>{article.readTime}</span>
//             </div>
//           </div>
//           <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
//             {article.title}
//           </h3>
//           <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
//                 {article.author.name.charAt(0)}
//               </div>
//               <span className="text-sm font-medium text-gray-700">
//                 {article.author.name}
//               </span>
//             </div>
//             <div className="flex items-center space-x-4 text-gray-500">
//               <div className="flex items-center space-x-1 text-sm">
//                 <Eye className="h-4 w-4" />
//                 <span>{article.views.toLocaleString()}</span>
//               </div>
//               <div className="flex items-center space-x-1 text-sm">
//                 <MessageCircle className="h-4 w-4" />
//                 <span>{article.commentCount}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );

//   const CompactArticleCard = ({ article }) => (
//     <Link className="group" href={`/${article.slug}`}>
//       <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 hover:bg-white/90">
//         <div className="flex items-center space-x-4">
//           <div className="w-20 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex-shrink-0 overflow-hidden relative">
//             {article.image ? (
//               <img
//                 src={article.image}
//                 alt={article.title}
//                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center">
//                 <ImageOff className="w-6 h-6 text-gray-400" />
//               </div>
//             )}
//             <div className="absolute top-1 left-1">
//               <CategoryTag
//                 type={article.categoryName.toLowerCase()}
//                 isBreaking={article.isBreaking}
//                 small
//               >
//                 {article.isBreaking ? "BREAKING" : article.categoryName}
//               </CategoryTag>
//             </div>
//           </div>
//           <div className="flex-1 min-w-0">
//             <h4 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
//               {article.title}
//             </h4>
//             <div className="flex items-center space-x-3 text-xs text-gray-500">
//               <div className="flex items-center">
//                 <Clock className="w-3 h-3 mr-1" />
//                 <span>{article.publishedAt}</span>
//               </div>
//               <div className="flex items-center">
//                 <BookOpen className="w-3 h-3 mr-1" />
//                 <span>{article.readTime}</span>
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center space-x-2 text-xs text-gray-500">
//             <Eye className="h-3 w-3" />
//             <span>{article.views.toLocaleString()}</span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="flex flex-col items-center">
//           <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
//           <p className="text-gray-600">Loading articles...</p>
//         </div>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md text-center">
//           <h3 className="text-lg font-semibold text-red-600 mb-2">Error</h3>
//           <p className="text-red-500">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-md transition-all"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//       {/* Header */}
//       <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-10 border-b border-neutral-200/50">
//         <div className="max-w-7xl mx-auto px-6 py-6">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               {categories.find((c) => c.id === categoryId)?.name || "All News"}
//             </h1>

//             <div className="flex items-center justify-between gap-4">
//               <div className="relative">
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="appearance-none bg-white/70 backdrop-blur-md border border-neutral-300 rounded-xl px-4 py-2 pr-10 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:shadow-md transition-all"
//                 >
//                   <option value="latest">Latest</option>
//                   <option value="popular">Most Popular</option>
//                   <option value="trending">Trending</option>
//                 </select>
//                 <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                   <ChevronDown className="h-4 w-4 text-gray-400" />
//                 </div>
//               </div>

//               <div className="flex space-x-1 bg-neutral-100/50 p-1 rounded-xl backdrop-blur-md">
//                 <button
//                   onClick={() => setViewMode("grid")}
//                   className={`p-2 rounded-lg transition-all ${
//                     viewMode === "grid"
//                       ? "bg-white shadow-sm text-blue-600"
//                       : "text-neutral-500 hover:text-neutral-700"
//                   }`}
//                 >
//                   <Grid size={18} />
//                 </button>
//                 <button
//                   onClick={() => setViewMode("list")}
//                   className={`p-2 rounded-lg transition-all ${
//                     viewMode === "list"
//                       ? "bg-white shadow-sm text-purple-600"
//                       : "text-neutral-500 hover:text-neutral-700"
//                   }`}
//                 >
//                   <List size={18} />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Category Navigation */}
//           <div className="mt-6 overflow-x-auto">
//             <div className="flex space-x-2 pb-2">
//               {categories.map((category) => (
//                 <Link
//                   key={category.id}
//                   href={`/Categories/${category.slug}`}
//                   className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
//                     categoryId === category.id
//                       ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
//                       : "bg-white/70 hover:bg-white text-gray-700 hover:text-blue-600"
//                   }`}
//                 >
//                   {category.name}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Articles */}
//       <main className="max-w-7xl mx-auto px-6 py-8">
//         {articles.length ? (
//           viewMode === "grid" ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {articles.map((a) => (
//                 <ArticleCard key={a.id} article={a} />
//               ))}
//             </div>
//           ) : (
//             <div className="space-y-3">
//               {articles.map((a) => (
//                 <CompactArticleCard key={a.id} article={a} />
//               ))}
//             </div>
//           )
//         ) : (
//           <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 shadow-sm">
//             <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <BookOpen className="w-8 h-8 text-gray-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               No articles found
//             </h3>
//             <p className="text-gray-600 max-w-md mx-auto">
//               There are currently no articles in this category. Check back later
//               for updates.
//             </p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

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
  Clock,
  BookOpen,
  MessageCircle,
  ChevronDown,
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
  }, [categoryId, sortBy]);

  const CategoryTag = ({ type, children, isBreaking }) => {
    const categoryClasses = {
      breaking: "bg-gradient-to-r from-red-500 to-pink-500 text-white",
      politics: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
      tech: "bg-gradient-to-r from-purple-500 to-indigo-500 text-white",
      sports: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white",
      business: "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
      world: "bg-gradient-to-r from-gray-500 to-slate-500 text-white",
    };

    return (
      <span
        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
          isBreaking
            ? categoryClasses.breaking
            : categoryClasses[type] ||
              "bg-gradient-to-r from-gray-500 to-slate-500 text-white"
        }`}
      >
        {children}
      </span>
    );
  };

  const ArticleCard = ({ article }) => (
    <Link className="group" href={`/${article.slug}`}>
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/20 hover:-translate-y-1">
        {article.image ? (
          <div className="aspect-video relative overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute top-4 left-4">
              <CategoryTag
                type={article.categoryName.toLowerCase()}
                isBreaking={article.isBreaking}
              >
                {article.isBreaking ? "BREAKING" : article.categoryName}
              </CategoryTag>
            </div>
          </div>
        ) : (
          <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <ImageOff className="w-8 h-8 text-gray-400" />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-3 text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{article.publishedAt}</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              <span>{article.readTime}</span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
            {article.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {article.author.name.charAt(0)}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {article.author.name}
              </span>
            </div>
            <div className="flex items-center space-x-4 text-gray-500">
              <div className="flex items-center space-x-1 text-sm">
                <Eye className="h-4 w-4" />
                <span>{article.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1 text-sm">
                <MessageCircle className="h-4 w-4" />
                <span>{article.commentCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  const CompactArticleCard = ({ article }) => (
    <Link className="group" href={`/${article.slug}`}>
      <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 hover:bg-white/90">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex-shrink-0 overflow-hidden relative">
            {article.image ? (
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageOff className="w-6 h-6 text-gray-400" />
              </div>
            )}
            <div className="absolute top-1 left-1">
              <CategoryTag
                type={article.categoryName.toLowerCase()}
                isBreaking={article.isBreaking}
                small
              >
                {article.isBreaking ? "BREAKING" : article.categoryName}
              </CategoryTag>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {article.title}
            </h4>
            <div className="flex items-center space-x-3 text-xs text-gray-500">
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                <span>{article.publishedAt}</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="w-3 h-3 mr-1" />
                <span>{article.readTime}</span>
              </div>
            </div>
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
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading articles...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md text-center">
          <h3 className="text-lg font-semibold text-red-600 mb-2">Error</h3>
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-md transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header - Simplified without navigation */}
      <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-10 border-b border-neutral-200/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {categories.find((c) => c.id === categoryId)?.name || "All News"}
            </h1>

            <div className="flex items-center justify-between gap-4">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white/70 backdrop-blur-md border border-neutral-300 rounded-xl px-4 py-2 pr-10 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:shadow-md transition-all"
                >
                  <option value="latest">Latest</option>
                  <option value="popular">Most Popular</option>
                  <option value="trending">Trending</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="flex space-x-1 bg-neutral-100/50 p-1 rounded-xl backdrop-blur-md">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "list"
                      ? "bg-white shadow-sm text-purple-600"
                      : "text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Articles */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {articles.length ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {articles.map((a) => (
                <CompactArticleCard key={a.id} article={a} />
              ))}
            </div>
          )
        ) : (
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 shadow-sm">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No articles found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              There are currently no articles in this category. Check back later
              for updates.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
