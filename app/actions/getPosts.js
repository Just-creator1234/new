// // app/actions/getPosts.js
// "use server";

// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/auth";
// import prisma from "@/lib/prisma";

// export async function getPosts(status) {
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.id) throw new Error("Unauthorized");

//   return prisma.post.findMany({
//     where: {
//       authorId: session.user.id,
//       ...(status && { status }),
//     },
//     orderBy: { createdAt: "desc" },
//     include: { categories: true, tags: true, author: true },
//   });
// }

// app/actions/getPosts.js

// "use server";

// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/auth";
// import prisma from "@/lib/prisma";

// // Helper function to format time ago
// function formatTimeAgo(date) {
//   const now = new Date();
//   const diffInMinutes = Math.floor((now - date) / (1000 * 60));

//   if (diffInMinutes < 1) return "Just now";
//   if (diffInMinutes < 60) return `${diffInMinutes} min ago`;

//   const diffInHours = Math.floor(diffInMinutes / 60);
//   if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;

//   const diffInDays = Math.floor(diffInHours / 24);
//   if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;

//   const diffInWeeks = Math.floor(diffInDays / 7);
//   if (diffInWeeks < 4) return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;

//   const diffInMonths = Math.floor(diffInDays / 30);
//   return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
// }

// // Helper function to calculate read time from Tiptap JSON content
// function calculateReadTime(content) {
//   try {
//     // If content is a string, parse it
//     const jsonContent = typeof content === 'string' ? JSON.parse(content) : content;

//     // Extract text from Tiptap JSON structure
//     function extractTextFromNode(node) {
//       let text = '';

//       if (node.type === 'text') {
//         text += node.text || '';
//       }

//       if (node.content && Array.isArray(node.content)) {
//         node.content.forEach(child => {
//           text += extractTextFromNode(child);
//         });
//       }

//       return text;
//     }

//     const fullText = extractTextFromNode(jsonContent);
//     const wordCount = fullText.split(/\s+/).filter(word => word.length > 0).length;
//     const minutes = Math.ceil(wordCount / 200); // 200 words per minute average

//     return `${minutes} min read`;
//   } catch (error) {
//     return "3 min read"; // fallback
//   }
// }

// // Helper function to format view count
// function formatViewCount(viewCount) {
//   if (viewCount < 1000) return viewCount.toString();
//   if (viewCount < 1000000) return `${(viewCount / 1000).toFixed(1)}k`;
//   return `${(viewCount / 1000000).toFixed(1)}M`;
// }

// export async function getPosts(status) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session?.user?.id) {
//       return { success: false, error: "Unauthorized" };
//     }

//     const posts = await prisma.post.findMany({
//       where: {
//         authorId: session.user.id,
//         published: true, // Only get published posts for homepage
//         ...(status && { status }),
//       },
//       orderBy: { createdAt: "desc" },
//       include: {
//         categories: true,
//         tags: true,
//         author: true
//       },
//     });

//     // Transform the data to match homepage component expectations
//     const transformedPosts = posts.map(post => ({
//       id: post.id,
//       title: post.title,
//       excerpt: post.excerpt || post.subtitle || "No excerpt available",
//       category: post.categories[0]?.name?.toLowerCase() || 'general',
//       author: post.author.name || post.author.email || 'Anonymous',
//       time: formatTimeAgo(post.createdAt),
//       image: post.coverImage || '/api/placeholder/400/300', // fallback image
//       views: formatViewCount(post.viewCount || Math.floor(Math.random() * 10000)), // Use actual viewCount or generate random for demo
//       readTime: calculateReadTime(post.content),
//     }));

//     return { success: true, data: transformedPosts };
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     return { success: false, error: error.message };
//   }
// }

// // Optional: Add a separate function to get all published posts (for public homepage)
// export async function getPublishedPosts() {
//   try {
//     const posts = await prisma.post.findMany({
//       where: {
//         published: true,
//         status: "PUBLISHED"
//       },
//       orderBy: { createdAt: "desc" },
//       include: {
//         categories: true,
//         tags: true,
//         author: true
//       },
//     });

//     // Transform the data to match homepage component expectations
//     const transformedPosts = posts.map(post => ({
//       id: post.id,
//       title: post.title,
//       excerpt: post.excerpt || post.subtitle || "No excerpt available",
//       category: post.categories[0]?.name?.toLowerCase() || 'general',
//       author: post.author.name || post.author.email || 'Anonymous',
//       time: formatTimeAgo(post.createdAt),
//       image: post.coverImage || '/api/placeholder/400/300', // fallback image
//       views: formatViewCount(post.viewCount || Math.floor(Math.random() * 10000)),
//       readTime: calculateReadTime(post.content),
//     }));

//     return { success: true, data: transformedPosts };
//   } catch (error) {
//     console.error("Error fetching published posts:", error);
//     return { success: false, error: error.message };
//   }
// }

// app/actions/getPosts.js
"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function getPosts(options = {}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  return prisma.post.findMany({
    where: {
      authorId: session.user.id,
      published: true,
      status: "PUBLISHED",
      ...(options.status && { status: options.status }), // Optional status filter
      ...(options.breaking && { breaking: true }), // New breaking news filter
    },
    orderBy: [
      // This should be a top-level array, not nested
      { breaking: "desc" },
      { createdAt: "desc" },
    ],
    include: {
      categories: true,
      tags: true,
      author: true,
    },
  });
}

// Alternative version if you want to be more flexible with the filtering
export async function getPublishedPosts() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  return prisma.post.findMany({
    where: {
      authorId: session.user.id,
      published: true,
      status: "PUBLISHED",
    },
    orderBy: { createdAt: "desc" },
    include: { categories: true, tags: true, author: true },
  });
}

// If you want to handle scheduled posts that should be published
export async function getPublishedPostsWithScheduled() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const now = new Date();

  return prisma.post.findMany({
    where: {
      authorId: session.user.id,
      published: true,
      OR: [
        { status: "PUBLISHED" },
        {
          status: "SCHEDULED",
          publishDate: { lte: now }, // Include scheduled posts whose publish date has passed
        },
      ],
    },
    orderBy: { createdAt: "desc" },
    include: { categories: true, tags: true, author: true },
  });
}
