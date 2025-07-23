// "use client";
// import React, { useState } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import Link from "next/link";
// import {
//   Search,
//   User,
//   Clock,
//   Share2,
//   Heart,
//   MessageCircle,
//   Menu,
//   Bell,
//   ImageOff,
//   Bookmark,
//   Eye,
//   ThumbsUp,
//   Globe,
//   Twitter,
//   Linkedin,
//   Mail,
// } from "lucide-react";
// import Image from "next/image";

// const CategoryTag = ({ type, children }) => {
//   const categoryClasses = {
//     breaking: "bg-red-50 text-red-600 border-red-200",
//     politics: "bg-blue-50 text-blue-600 border-blue-200",
//     tech: "bg-purple-50 text-purple-600 border-purple-200",
//     sports: "bg-green-50 text-green-600 border-green-200",
//     business: "bg-yellow-50 text-yellow-600 border-yellow-200",
//     world: "bg-gray-50 text-gray-600 border-gray-200",
//   };
//   return (
//     <span
//       className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${categoryClasses[type]}`}
//     >
//       {children}
//     </span>
//   );
// };

// const formatDate = (dateString) =>
//   new Date(dateString).toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

// // fallback read-time helper
// const calcReadTime = (text) =>
//   text
//     ? `${Math.max(1, Math.ceil(text.split(/\s+/).length / 200))} min`
//     : "1 min";

// export default function AuthorProfilePageClient({
//   author,
//   articles,
//   popularArticles,
// }) {
//   const [activeTab, setActiveTab] = useState("articles");

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left sidebar */}
//           <div className="space-y-6">
//             {/* Author Card */}
//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <div className="text-center">
//                 <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
//                   {author.avatar ? (
//                     <Image
//                       src={author.avatar}
//                       alt={author.name}
//                       width={96}
//                       height={96}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <User className="h-12 w-12 text-gray-600" />
//                   )}
//                 </div>

//                 <h2 className="text-2xl font-bold text-gray-900">
//                   {author.name}
//                 </h2>
//                 <p className="text-gray-600 mt-1">{author.role}</p>

//                 {author.specialties?.length > 0 && (
//                   <div className="mt-3 flex flex-wrap justify-center gap-1">
//                     {author.specialties.map((t) => (
//                       <CategoryTag key={t} type="tech">
//                         {t}
//                       </CategoryTag>
//                     ))}
//                   </div>
//                 )}

//                 <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 text-sm font-medium">
//                   Follow
//                 </button>
//               </div>

//               <div className="mt-6">
//                 <p className="text-gray-700">{author.bio}</p>
//                 <div className="mt-4 flex items-center text-sm text-gray-500">
//                   <Globe className="h-4 w-4 mr-1" />
//                   <span>Joined {formatDate(author.joinDate)}</span>
//                 </div>
//               </div>

//               <div className="mt-6 pt-6 border-t border-gray-200">
//                 <h3 className="text-sm font-medium text-gray-900 mb-3">
//                   Connect
//                 </h3>
//                 <div className="flex space-x-3 justify-center">
//                   {author.social?.twitter && (
//                     <a
//                       href={author.social.twitter}
//                       className="text-gray-400 hover:text-blue-400"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <Twitter className="h-5 w-5" />
//                     </a>
//                   )}
//                   {author.social?.linkedin && (
//                     <a
//                       href={author.social.linkedin}
//                       className="text-gray-400 hover:text-blue-700"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <Linkedin className="h-5 w-5" />
//                     </a>
//                   )}
//                   <a
//                     href={`mailto:${author.social?.email}`}
//                     className="text-gray-400 hover:text-gray-600"
//                   >
//                     <Mail className="h-5 w-5" />
//                   </a>
//                 </div>
//               </div>
//             </div>

//             {/* Stats */}
//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <h3 className="text-sm font-medium text-gray-900 mb-4">
//                 Statistics
//               </h3>
//               <div className="grid grid-cols-2 gap-4">
//                 {Object.entries(author.stats).map(([key, val]) => (
//                   <div key={key} className="text-center">
//                     <div className="text-2xl font-bold text-blue-600">
//                       {val}
//                     </div>
//                     <div className="text-xs text-gray-500 capitalize">
//                       {key}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Popular Articles */}
//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <h3 className="text-sm font-medium text-gray-900 mb-4">
//                 Popular Articles
//               </h3>
//               <div className="space-y-4">
//                 {popularArticles.map((art) => (
//                   <div key={art.id} className="group">
//                     <div className="flex space-x-3">
//                       {art.coverImage ? (
//                         <div
//                           className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg"
//                           style={{
//                             backgroundImage: `url(${art.coverImage})`,
//                             backgroundSize: "cover",
//                             backgroundPosition: "center",
//                           }}
//                         />
//                       ) : (
//                         <div className="aspect-video flex items-center justify-center border border-dashed border-gray-300 bg-gray-50">
//                           <ImageOff className="w-8 h-8 text-gray-400" />
//                         </div>
//                       )}
//                       <div>
//                         <CategoryTag
//                           type={art.categories?.[0]?.name ?? "general"}
//                         >
//                           {(
//                             art.categories?.[0]?.name ?? "general"
//                           ).toUpperCase()}
//                         </CategoryTag>
//                         <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 mt-1 line-clamp-2">
//                           {art.title}
//                         </h4>
//                         <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
//                           <span>{formatDate(art.createdAt)}</span>
//                           <span>{calcReadTime(art.excerpt)} read</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Main content */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Tabs */}
//             <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//               <div className="border-b border-gray-200">
//                 <nav className="flex -mb-px">
//                   {["articles", "about"].map((tab) => (
//                     <button
//                       key={tab}
//                       onClick={() => setActiveTab(tab)}
//                       className={`py-4 px-6 text-sm font-medium capitalize ${
//                         activeTab === tab
//                           ? "border-b-2 border-blue-500 text-blue-600"
//                           : "text-gray-500 hover:text-gray-700"
//                       }`}
//                     >
//                       {tab}
//                     </button>
//                   ))}
//                 </nav>
//               </div>
//             </div>

//             {activeTab === "articles" && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {articles.map((art) => (
//                   <div
//                     key={art.id}
//                     className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all"
//                   >
//                     <div
//                       className="aspect-video bg-gray-200"
//                       style={{
//                         backgroundImage: `url(${art.coverImage})`,
//                         backgroundSize: "cover",
//                         backgroundPosition: "center",
//                       }}
//                     />
//                     <Link href={`/${art.slug}`}>
//                       <div className="p-5">
//                         <div className="flex items-center space-x-2 mb-2">
//                           <CategoryTag
//                             type={art.categories?.[0]?.name ?? "general"}
//                           >
//                             {(
//                               art.categories?.[0]?.name ?? "general"
//                             ).toUpperCase()}
//                           </CategoryTag>
//                           <span className="text-xs text-gray-500">
//                             {formatDate(art.createdAt)}
//                           </span>
//                         </div>
//                         <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600">
//                           {art.title}
//                         </h3>
//                         <p className="text-sm text-gray-600 mb-4 line-clamp-2">
//                           {art.excerpt}
//                         </p>
//                         <div className="flex items-center justify-between text-xs text-gray-500">
//                           <div className="flex items-center space-x-2">
//                             <Eye className="h-3 w-3" />
//                             <span>{art.viewCount}</span>
//                           </div>
//                           <span>{calcReadTime(art.excerpt)} read</span>
//                         </div>
//                       </div>
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {activeTab === "about" && (
//               <div className="bg-white rounded-xl shadow-sm p-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                   About {author.name}
//                 </h3>
//                 <div className="prose max-w-none text-gray-700 space-y-4">
//                   <p>{author.bio}</p>
//                   <h4 className="font-medium">Contact</h4>
//                   <ul className="space-y-1 text-sm">
//                     <li>Email: {author.social?.email}</li>
//                     {author.social?.twitter && (
//                       <li>Twitter: {author.social.twitter}</li>
//                     )}
//                     {author.social?.linkedin && (
//                       <li>LinkedIn: {author.social.linkedin}</li>
//                     )}
//                   </ul>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// "use client";
// import React, { useState } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import Link from "next/link";
// import Image from "next/image";
// import {
//   User,
//   Clock,
//   Share2,
//   Heart,
//   MessageCircle,
//   Eye,
//   Twitter,
//   Linkedin,
//   Mail,
//   BookOpen,
//   TrendingUp,
// } from "lucide-react";

// const CategoryTag = ({ type, children }) => {
//   const categoryClasses = {
//     breaking: "bg-gradient-to-r from-red-500 to-pink-500 text-white",
//     politics: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
//     tech: "bg-gradient-to-r from-purple-500 to-indigo-500 text-white",
//     sports: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white",
//     business: "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
//     world: "bg-gradient-to-r from-gray-500 to-slate-500 text-white",
//   };

//   return (
//     <span
//       className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide shadow-sm ${
//         categoryClasses[type] || categoryClasses.world
//       }`}
//     >
//       {children}
//     </span>
//   );
// };

// const formatDate = (dateString) =>
//   new Date(dateString).toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

// const calcReadTime = (text) =>
//   text
//     ? `${Math.max(1, Math.ceil(text.split(/\s+/).length / 200))} min`
//     : "1 min";

// export default function AuthorProfilePageClient({
//   author,
//   articles,
//   popularArticles,
// }) {
//   const [activeTab, setActiveTab] = useState("articles");

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//       <Navbar />
//       <main className="max-w-7xl mx-auto px-6 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left sidebar */}
//           <div className="space-y-6">
//             {/* Author Card */}
//             <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
//               <div className="text-center">
//                 <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
//                   {author.avatar ? (
//                     <Image
//                       src={author.avatar}
//                       alt={author.name}
//                       width={96}
//                       height={96}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <User className="h-12 w-12 text-white" />
//                   )}
//                 </div>

//                 <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                   {author.name}
//                 </h2>
//                 <p className="text-gray-600 mt-1">{author.role}</p>

//                 {author.specialties?.length > 0 && (
//                   <div className="mt-3 flex flex-wrap justify-center gap-2">
//                     {author.specialties.map((t) => (
//                       <CategoryTag key={t} type="tech">
//                         {t}
//                       </CategoryTag>
//                     ))}
//                   </div>
//                 )}

//                 <button className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-6 rounded-xl text-sm font-medium hover:shadow-md transition-all">
//                   Follow
//                 </button>
//               </div>

//               <div className="mt-6">
//                 <p className="text-gray-700">{author.bio}</p>
//                 <div className="mt-4 flex items-center text-sm text-gray-500">
//                   <Clock className="h-4 w-4 mr-1" />
//                   <span>Joined {formatDate(author.joinDate)}</span>
//                 </div>
//               </div>

//               <div className="mt-6 pt-6 border-t border-gray-200/50">
//                 <h3 className="text-sm font-medium text-gray-900 mb-3">
//                   Connect
//                 </h3>
//                 <div className="flex space-x-3 justify-center">
//                   {author.social?.twitter && (
//                     <a
//                       href={author.social.twitter}
//                       className="text-gray-500 hover:text-blue-400 transition-colors"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <Twitter className="h-5 w-5" />
//                     </a>
//                   )}
//                   {author.social?.linkedin && (
//                     <a
//                       href={author.social.linkedin}
//                       className="text-gray-500 hover:text-blue-700 transition-colors"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <Linkedin className="h-5 w-5" />
//                     </a>
//                   )}
//                   <a
//                     href={`mailto:${author.social?.email}`}
//                     className="text-gray-500 hover:text-gray-600 transition-colors"
//                   >
//                     <Mail className="h-5 w-5" />
//                   </a>
//                 </div>
//               </div>
//             </div>

//             {/* Stats */}
//             <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
//               <h3 className="text-sm font-medium text-gray-900 mb-4">
//                 Statistics
//               </h3>
//               <div className="grid grid-cols-2 gap-4">
//                 {author.stats &&
//                   Object.entries(author.stats).map(([key, val]) => (
//                     <div key={key} className="text-center">
//                       <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                         {val}
//                       </div>
//                       <div className="text-xs text-gray-500 capitalize">
//                         {key}
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             </div>

//             {/* Popular Articles */}
//             <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-sm font-medium text-gray-900">
//                   Popular Articles
//                 </h3>
//                 <TrendingUp className="h-5 w-5 text-purple-500" />
//               </div>
//               <div className="space-y-4">
//                 {popularArticles.map((art) => (
//                   <Link
//                     href={`/${art.slug}`}
//                     key={art.id}
//                     className="group block"
//                   >
//                     <div className="flex space-x-3 p-3 rounded-xl hover:bg-white/70 transition-all">
//                       {art.coverImage ? (
//                         <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
//                           <Image
//                             src={art.coverImage}
//                             alt={art.title}
//                             width={64}
//                             height={64}
//                             className="w-full h-full object-cover group-hover:scale-105 transition-transform"
//                           />
//                         </div>
//                       ) : (
//                         <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
//                           <ImageOff className="w-6 h-6 text-gray-400" />
//                         </div>
//                       )}
//                       <div className="min-w-0">
//                         <CategoryTag
//                           type={art.categories?.[0]?.name ?? "general"}
//                         >
//                           {(
//                             art.categories?.[0]?.name ?? "general"
//                           ).toUpperCase()}
//                         </CategoryTag>
//                         <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 mt-1 line-clamp-2 transition-colors">
//                           {art.title}
//                         </h4>
//                         <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
//                           <span>{formatDate(art.createdAt)}</span>
//                           <span>• {calcReadTime(art.excerpt)} read</span>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Main content */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Tabs */}
//             <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/20">
//               <div className="border-b border-gray-200/50">
//                 <nav className="flex -mb-px">
//                   {["articles", "about"].map((tab) => (
//                     <button
//                       key={tab}
//                       onClick={() => setActiveTab(tab)}
//                       className={`py-4 px-6 text-sm font-medium capitalize transition-colors ${
//                         activeTab === tab
//                           ? "border-b-2 border-blue-500 text-blue-600"
//                           : "text-gray-500 hover:text-gray-700"
//                       }`}
//                     >
//                       {tab}
//                     </button>
//                   ))}
//                 </nav>
//               </div>
//             </div>

//             {activeTab === "articles" && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {articles.map((art) => (
//                   <Link href={`/${art.slug}`} key={art.id} className="group">
//                     <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all">
//                       <div className="aspect-video relative overflow-hidden">
//                         {art.coverImage ? (
//                           <Image
//                             src={art.coverImage}
//                             alt={art.title}
//                             fill
//                             className="object-cover group-hover:scale-105 transition-transform"
//                           />
//                         ) : (
//                           <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
//                             <ImageOff className="w-10 h-10 text-gray-400" />
//                           </div>
//                         )}
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
//                       </div>
//                       <div className="p-5">
//                         <div className="flex items-center space-x-2 mb-2">
//                           <CategoryTag
//                             type={art.categories?.[0]?.name ?? "general"}
//                           >
//                             {(
//                               art.categories?.[0]?.name ?? "general"
//                             ).toUpperCase()}
//                           </CategoryTag>
//                           <span className="text-xs text-gray-500">
//                             {formatDate(art.createdAt)}
//                           </span>
//                         </div>
//                         <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
//                           {art.title}
//                         </h3>
//                         <p className="text-sm text-gray-600 mb-4 line-clamp-2">
//                           {art.excerpt}
//                         </p>
//                         <div className="flex items-center justify-between text-xs text-gray-500">
//                           <div className="flex items-center space-x-2">
//                             <Eye className="h-3 w-3" />
//                             <span>
//                               {art.viewCount?.toLocaleString() || "0"}
//                             </span>
//                           </div>
//                           <div className="flex items-center space-x-1">
//                             <BookOpen className="h-3 w-3" />
//                             <span>{calcReadTime(art.excerpt)} read</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             )}

//             {activeTab === "about" && (
//               <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                   About {author.name}
//                 </h3>
//                 <div className="prose max-w-none text-gray-700 space-y-4">
//                   <p>{author.bio}</p>
//                   <h4 className="font-medium">Contact</h4>
//                   <ul className="space-y-1 text-sm">
//                     <li>Email: {author.social?.email}</li>
//                     {author.social?.twitter && (
//                       <li>Twitter: {author.social.twitter}</li>
//                     )}
//                     {author.social?.linkedin && (
//                       <li>LinkedIn: {author.social.linkedin}</li>
//                     )}
//                   </ul>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }

"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  Clock,
  Share2,
  Heart,
  MessageCircle,
  Eye,
  Twitter,
  Linkedin,
  Mail,
  BookOpen,
  TrendingUp,
  ImageOff,
  Zap,
} from "lucide-react";

const CategoryTag = ({ type, children }) => {
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
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide shadow-sm ${
        categoryClasses[type] || categoryClasses.world
      }`}
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

const calcReadTime = (text) =>
  text
    ? `${Math.max(1, Math.ceil(text.split(/\s+/).length / 200))} min`
    : "1 min";

export default function AuthorProfilePageClient({
  author,
  articles,
  popularArticles,
}) {
  const [activeTab, setActiveTab] = useState("articles");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar */}
          <div className="space-y-6">
            {/* Author Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden shadow-lg">
                  {author.avatar ? (
                    <Image
                      src={author.avatar}
                      alt={author.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-12 w-12 text-white" />
                  )}
                </div>

                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {author.name}
                </h2>
                <p className="text-gray-600 mt-1">{author.role}</p>

                {author.specialties?.length > 0 && (
                  <div className="mt-3 flex flex-wrap justify-center gap-2">
                    {author.specialties.map((t) => (
                      <CategoryTag key={t} type="tech">
                        {t}
                      </CategoryTag>
                    ))}
                  </div>
                )}

                <button className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 px-6 rounded-xl text-sm font-medium hover:shadow-lg hover:scale-[1.02] transition-all">
                  Follow
                </button>
              </div>

              <div className="mt-6">
                <p className="text-gray-700">{author.bio}</p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Joined {formatDate(author.joinDate)}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200/50">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Connect
                </h3>
                <div className="flex space-x-3 justify-center">
                  {author.social?.twitter && (
                    <a
                      href={author.social.twitter}
                      className="text-gray-500 hover:text-blue-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {author.social?.linkedin && (
                    <a
                      href={author.social.linkedin}
                      className="text-gray-500 hover:text-blue-700 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  <a
                    href={`mailto:${author.social?.email}`}
                    className="text-gray-500 hover:text-gray-600 transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-5 w-5 text-blue-500" />
                <h3 className="text-sm font-medium text-gray-900">
                  Statistics
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {author.stats &&
                  Object.entries(author.stats).map(([key, val]) => (
                    <div
                      key={key}
                      className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-3 text-center border border-blue-100"
                    >
                      <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {val}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {key}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Popular Articles */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-500" />
                  <h3 className="text-sm font-medium text-gray-900">
                    Popular Articles
                  </h3>
                </div>
                <span className="text-xs bg-gradient-to-r from-purple-100 to-blue-100 text-purple-600 px-2 py-1 rounded-full">
                  Top {popularArticles.length}
                </span>
              </div>
              <div className="space-y-4">
                {popularArticles.map((art) => (
                  <Link
                    href={`/${art.slug}`}
                    key={art.id}
                    className="group block"
                  >
                    <div className="flex space-x-3 p-3 rounded-xl hover:bg-white/70 transition-all">
                      {art.coverImage ? (
                        <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 border-white/50 shadow-sm">
                          <Image
                            src={art.coverImage}
                            alt={art.title}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                      ) : (
                        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border-2 border-white/50">
                          <ImageOff className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <CategoryTag
                          type={art.categories?.[0]?.name ?? "general"}
                        >
                          {(
                            art.categories?.[0]?.name ?? "general"
                          ).toUpperCase()}
                        </CategoryTag>
                        <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 mt-1 line-clamp-2 transition-colors">
                          {art.title}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                          <span>{formatDate(art.createdAt)}</span>
                          <span>• {calcReadTime(art.excerpt)} read</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/20">
              <div className="border-b border-gray-200/50">
                <nav className="flex -mb-px">
                  {["articles", "about"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-6 text-sm font-medium capitalize transition-colors ${
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
                  <Link href={`/${art.slug}`} key={art.id} className="group">
                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all">
                      <div className="aspect-video relative overflow-hidden">
                        {art.coverImage ? (
                          <Image
                            src={art.coverImage}
                            alt={art.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                            <ImageOff className="w-10 h-10 text-gray-400" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center space-x-2 mb-2">
                          <CategoryTag
                            type={art.categories?.[0]?.name ?? "general"}
                          >
                            {(
                              art.categories?.[0]?.name ?? "general"
                            ).toUpperCase()}
                          </CategoryTag>
                          <span className="text-xs text-gray-500">
                            {formatDate(art.createdAt)}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {art.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {art.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-2">
                            <Eye className="h-3 w-3" />
                            <span>
                              {art.viewCount?.toLocaleString() || "0"}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <BookOpen className="h-3 w-3" />
                            <span>{calcReadTime(art.excerpt)} read</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {activeTab === "about" && (
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  About {author.name}
                </h3>
                <div className="prose max-w-none text-gray-700 space-y-4">
                  <p>{author.bio}</p>
                  <h4 className="font-medium text-gray-900">Contact</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      {author.social?.email || "Not provided"}
                    </li>
                    {author.social?.twitter && (
                      <li className="flex items-center gap-2">
                        <Twitter className="h-4 w-4 text-blue-400" />
                        <a
                          href={author.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {author.social.twitter.replace("https://", "")}
                        </a>
                      </li>
                    )}
                    {author.social?.linkedin && (
                      <li className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4 text-blue-600" />
                        <a
                          href={author.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {author.social.linkedin.replace("https://", "")}
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
