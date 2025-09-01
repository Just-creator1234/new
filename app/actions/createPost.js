// "use server";
// import prisma from "@/lib/prisma";
// import { revalidatePath } from "next/cache";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/auth";
// import slugify from "slugify";

// async function createUniqueSlug(base) {
//   let slug = slugify(base, { lower: true, strict: true });
//   let counter = 1;
//   while (await prisma.post.findUnique({ where: { slug } })) {
//     slug = `${slug}-${counter++}`;
//   }
//   return slug;
// }

// export async function createPost(formData) {
//   const session = await getServerSession(authOptions);

//   console.log(session.user.id, "gggggggggggg");
//   if (!session?.user?.id) {
//     throw new Error("Unauthorized");
//   }
//   const data = Object.fromEntries(formData.entries());
//   const uniqueSlug = await createUniqueSlug(data.title);

//   // --- basic fields ---
//   const post = await prisma.post.create({
//     data: {
//       title: data.title,
//       slug: uniqueSlug,
//       content: data.content,
//       excerpt: data.excerpt,
//       status: data.status,
//       breaking: data.breaking === "true",
//       published: data.status === "PUBLISHED",
//       publishDate: data.publishDate ? new Date(data.publishDate) : null,

//       coverImage: data.coverImage || null,
//       altText: data.altText || null,

//       metaTitle: data.metaTitle || null,
//       metaDescription: data.metaDescription || null,
//       focusKeyword: data.focusKeyword || null,
//       ogTitle: data.ogTitle || null,
//       ogDescription: data.ogDescription || null,
//       ogImage: data.ogImage || null,
//       twitterCard: data.twitterCard || "summary_large_image",

//       subtitle: data.subtitle || null,
//       difficulty: data.difficulty || "beginner",
//       language: data.language || "en",
//       series: data.series || null,
//       seriesOrder: Number(data.seriesOrder) || 1,
//       visibility: data.visibility || "public",
//       password: data.password || null,
//       allowComments: data.allowComments !== "false",
//       allowSharing: data.allowSharing !== "false",
//       featured: data.featured === "true",
//       sticky: data.sticky === "true",
//       coAuthors: data.coAuthors ? JSON.parse(data.coAuthors) : [],
//       editorNotes: data.editorNotes || null,
//       targetKeywords: data.targetKeywords
//         ? JSON.parse(data.targetKeywords)
//         : [],
//       customFields: data.customFields ? JSON.parse(data.customFields) : {},
//       videoUrl: data.videoUrl || null,
//       audioUrl: data.audioUrl || null,

//       authorId: session.user.id,
//     },
//   });

//   // --- connect fixed categories ---
//   const categoryIds = JSON.parse(data.categories || "[]");
//   for (const id of categoryIds) {
//     await prisma.post.update({
//       where: { id: post.id },
//       data: { categories: { connect: { id } } },
//     });
//   }

//   // --- connect / create tags ---
//   const tagNames = JSON.parse(data.tags || "[]");
//   for (const name of tagNames) {
//     const tag = await prisma.tag.upsert({
//       where: { name },
//       update: {},
//       create: { name, slug: name.toLowerCase().replace(/\s+/g, "-") },
//     });
//     await prisma.post.update({
//       where: { id: post.id },
//       data: { tags: { connect: { id: tag.id } } },
//     });
//   }

//   revalidatePath("/Blogs");
//   return { success: true, message: "Post created!", post };
// }

"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import slugify from "slugify";

// Helper function for safe JSON parsing
function safeJsonParse(str, defaultValue = []) {
  try {
    return str ? JSON.parse(str) : defaultValue;
  } catch {
    return defaultValue;
  }
}

async function createUniqueSlug(base) {
  let slug = slugify(base, { lower: true, strict: true });
  let counter = 1;
  while (await prisma.post.findUnique({ where: { slug } })) {
    slug = `${slug}-${counter++}`;
  }
  return slug;
}

export async function createPost(formData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const data = Object.fromEntries(formData.entries());
  const draftId = data.draftId;

  // Safe JSON parsing
  const categoryIds = safeJsonParse(data.categories, []);
  const tagNames = safeJsonParse(data.tags, []);
  const coAuthorsData = safeJsonParse(data.coAuthors, []);
  const targetKeywordsData = safeJsonParse(data.targetKeywords, []);
  const customFieldsData = safeJsonParse(data.customFields, {});

  // If we have a draftId, we're updating an existing post
  if (draftId) {
    try {
      // Verify user owns this post
      const existingPost = await prisma.post.findFirst({
        where: {
          id: draftId,
          authorId: session.user.id,
        },
      });

      if (!existingPost) {
        throw new Error("Post not found or unauthorized");
      }

      // Check if content actually changed to avoid unnecessary updates
      const hasContentChanged =
        existingPost.title !== data.title ||
        existingPost.content !== data.content ||
        existingPost.excerpt !== data.excerpt;

      if (!hasContentChanged) {
        // Just return existing post if no content changes
        return {
          success: true,
          message: "No changes detected",
          post: existingPost,
        };
      }

      // Update the existing post
      const post = await prisma.post.update({
        where: { id: draftId },
        data: {
          title: data.title,
          content: data.content,
          excerpt: data.excerpt,
          status: data.status,
          breaking: data.breaking === "true",
          published: data.status === "PUBLISHED",
          publishDate: data.publishDate ? new Date(data.publishDate) : null,
          coverImage: data.coverImage || null,
          altText: data.altText || null,
          metaTitle: data.metaTitle || null,
          metaDescription: data.metaDescription || null,
          focusKeyword: data.focusKeyword || null,
          ogTitle: data.ogTitle || null,
          ogDescription: data.ogDescription || null,
          ogImage: data.ogImage || null,
          twitterCard: data.twitterCard || "summary_large_image",
          subtitle: data.subtitle || null,
          difficulty: data.difficulty || "beginner",
          language: data.language || "en",
          series: data.series || null,
          seriesOrder: Number(data.seriesOrder) || 1,
          visibility: data.visibility || "public",
          password: data.password || null,
          allowComments: data.allowComments !== "false",
          allowSharing: data.allowSharing !== "false",
          featured: data.featured === "true",
          sticky: data.sticky === "true",
          coAuthors: coAuthorsData,
          editorNotes: data.editorNotes || null,
          targetKeywords: targetKeywordsData,
          customFields: customFieldsData,
          videoUrl: data.videoUrl || null,
          audioUrl: data.audioUrl || null,
        },
      });

      // Update categories (only set them, Prisma handles the diff)
      await prisma.post.update({
        where: { id: draftId },
        data: { categories: { set: categoryIds.map((id) => ({ id })) } },
      });

      // Update tags
      await prisma.post.update({
        where: { id: draftId },
        data: { tags: { set: [] } }, // Clear first
      });

      for (const name of tagNames) {
        const tag = await prisma.tag.upsert({
          where: { name },
          update: {},
          create: { name, slug: name.toLowerCase().replace(/\s+/g, "-") },
        });
        await prisma.post.update({
          where: { id: draftId },
          data: { tags: { connect: { id: tag.id } } },
        });
      }

      revalidatePath("/Blogs");
      return { success: true, message: "Draft updated!", post };
    } catch (error) {
      console.error("Error updating draft:", error);
      throw new Error("Failed to update draft");
    }
  }

  // Original create logic for new posts
  const uniqueSlug = await createUniqueSlug(data.title);
  const post = await prisma.post.create({
    data: {
      title: data.title,
      slug: uniqueSlug,
      content: data.content,
      excerpt: data.excerpt,
      status: data.status,
      breaking: data.breaking === "true",
      published: data.status === "PUBLISHED",
      publishDate: data.publishDate ? new Date(data.publishDate) : null,
      coverImage: data.coverImage || null,
      altText: data.altText || null,
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
      focusKeyword: data.focusKeyword || null,
      ogTitle: data.ogTitle || null,
      ogDescription: data.ogDescription || null,
      ogImage: data.ogImage || null,
      twitterCard: data.twitterCard || "summary_large_image",
      subtitle: data.subtitle || null,
      difficulty: data.difficulty || "beginner",
      language: data.language || "en",
      series: data.series || null,
      seriesOrder: Number(data.seriesOrder) || 1,
      visibility: data.visibility || "public",
      password: data.password || null,
      allowComments: data.allowComments !== "false",
      allowSharing: data.allowSharing !== "false",
      featured: data.featured === "true",
      sticky: data.sticky === "true",
      coAuthors: coAuthorsData,
      editorNotes: data.editorNotes || null,
      targetKeywords: targetKeywordsData,
      customFields: customFieldsData,
      videoUrl: data.videoUrl || null,
      audioUrl: data.audioUrl || null,
      authorId: session.user.id,
    },
  });

  // Connect categories
  await prisma.post.update({
    where: { id: post.id },
    data: { categories: { connect: categoryIds.map((id) => ({ id })) } },
  });

  // Connect tags
  for (const name of tagNames) {
    const tag = await prisma.tag.upsert({
      where: { name },
      update: {},
      create: { name, slug: name.toLowerCase().replace(/\s+/g, "-") },
    });
    await prisma.post.update({
      where: { id: post.id },
      data: { tags: { connect: { id: tag.id } } },
    });
  }

  console.log(post, "hghhggg")

  revalidatePath("/Blogs");
  return { success: true, message: "Post created!", post };
}
