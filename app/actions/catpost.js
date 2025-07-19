"use server";

import prisma from "@/lib/prisma";

/* --------------------------------------------------
   1️⃣  Get posts for one category (or all)
-------------------------------------------------- */
export async function getPostsByCategory(slug) {
  try {
    const where = {
      published: true,
      status: "PUBLISHED",
      OR: [{ publishDate: { lte: new Date() } }, { publishDate: null }],
    };

    if (slug && slug !== "all") {
      where.categories = { some: { slug } };
    }

    const posts = await prisma.post.findMany({
      where,
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        content: true,
        coverImage: true,
        publishDate: true,
        createdAt: true,
        breaking: true,
        featured: true,
        videoUrl: true,
        metaTitle: true,
        metaDescription: true,
        categories: { select: { slug: true, name: true } },
        author: { select: { id: true, name: true } },
        tags: { select: { name: true } },
      },
      orderBy: [{ sticky: "desc" }, { publishDate: "desc" }],
    });

    return posts.map((post) => {
      const wordCount = countWordsFromContent(post.content);
      return {
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt || generateExcerpt(post.content, 150),
        category: post.categories[0]?.slug || "all",
        categoryName: post.categories[0]?.name || "General",
        author: { name: post.author.name || "Anonymous" },
        date: post.publishDate?.toISOString() || post.createdAt.toISOString(),
        views: 0, // no viewCount column yet
        readTime: calculateReadTime(wordCount),
        image: post.coverImage || "/default-article.jpg",
        videoUrl: post.videoUrl || null,
        isBreaking: post.breaking || false,
        isFeatured: post.featured || false,
        tags: post.tags.map((t) => t.name),
        ...(post.metaTitle && { metaTitle: post.metaTitle }),
        ...(post.metaDescription && { metaDescription: post.metaDescription }),
      };
    });
  } catch (err) {
    console.error("getPostsByCategory error:", err);
    throw new Error("Failed to fetch posts");
  }
}

/* --------------------------------------------------
   2️⃣  Get all categories (without breaking)
-------------------------------------------------- */
export async function getAllCategories() {
  try {
    const categories = await prisma.category.findMany({
      select: { id: true, slug: true, name: true, _count: { select: { posts: true } } },
      orderBy: { name: "asc" },
    });

    return categories.map((c) => ({
      id: c.slug,
      name: c.name,
      slug: c.slug,
      color: getCategoryColor(c.slug),
      count: c._count.posts,
    }));
  } catch (err) {
    console.error("getAllCategories error:", err);
    throw new Error("Failed to fetch categories");
  }
}

/* --------------------------------------------------
   3️⃣  Trending posts
-------------------------------------------------- */
export async function getTrendingPosts(limit = 5) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
        status: "PUBLISHED",
        publishDate: { lte: new Date() },
      },
      orderBy: [{ createdAt: "desc" }],
      take: limit,
      select: {
        id: true,
        title: true,
        createdAt: true,
        categories: { select: { slug: true } },
      },
    });

    return posts.map((p) => ({
      id: p.id,
      title: p.title,
      category: p.categories[0]?.slug || "all",
      views: 0,
      date: p.createdAt.toISOString(),
    }));
  } catch (err) {
    console.error("getTrendingPosts error:", err);
    return [];
  }
}

/* --------------------------------------------------
   Helpers
-------------------------------------------------- */
function countWordsFromContent(content) {
  if (!content) return 0;
  if (typeof content === "string") return content.split(/\s+/).length;
  if (typeof content === "object" && content.type === "doc")
    return countWordsFromProseMirror(content);
  return JSON.stringify(content).split(/\s+/).length;
}

function countWordsFromProseMirror(doc) {
  let words = 0;
  const walk = (node) => {
    if (node.text) words += node.text.split(/\s+/).length;
    if (node.content) node.content.forEach(walk);
  };
  if (doc.content) doc.content.forEach(walk);
  return words;
}

function generateExcerpt(content, len = 150) {
  if (!content) return "";
  const text = typeof content === "string" ? content : JSON.stringify(content);
  return text.slice(0, len) + (text.length > len ? "…" : "");
}

function calculateReadTime(wordCount) {
  const min = Math.ceil(wordCount / 200);
  return min <= 1 ? "1 min" : `${min} mins`;
}

function getCategoryColor(slug) {
  const map = {
    breaking: "red",
    politics: "blue",
    tech: "purple",
    sports: "green",
    business: "yellow",
    world: "gray",
    health: "pink",
    science: "cyan",
    entertainment: "indigo",
    default: "gray",
  };
  return map[slug] || map.default;
}