// app/actions/publishPost.js (updated)

"use server";

import prisma from "@/lib/prisma";

export async function publishPost(id, scheduleDate = null) {
  if (!id) {
    throw new Error("No post ID provided");
  }

  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) {
    throw new Error("Post not found");
  }

  let updateData = {};

  if (scheduleDate) {
    // Schedule for future publishing
    updateData = {
      status: "SCHEDULED",
      published: false,
      publishDate: scheduleDate,
      publishedAt: null,
    };
  } else {
    // Publish immediately
    updateData = {
      status: "PUBLISHED",
      published: true,
      publishedAt: new Date(),
      publishDate: new Date(), // Set publishDate to now for immediate publishing
    };
  }

  const updatedPost = await prisma.post.update({
    where: { id },
    data: updateData,
  });

  return updatedPost;
}
