// app/actions/publishScheduledPosts.js

"use server";

import prisma from "@/lib/prisma";

export async function publishScheduledPosts() {
  try {
    const now = new Date();

    // Find all scheduled posts where publishDate is in the past
    const scheduledPosts = await prisma.post.findMany({
      where: {
        status: "SCHEDULED",
        publishDate: {
          lte: now,
        },
        published: false,
      },
    });

    const results = {
      processed: 0,
      published: [],
      errors: [],
    };

    // Publish each scheduled post
    for (const post of scheduledPosts) {
      try {
        const updatedPost = await prisma.post.update({
          where: { id: post.id },
          data: {
            status: "PUBLISHED",
            published: true,
            publishedAt: new Date(),
            // Use the scheduled publishDate as the actual published date
            publishDate: post.publishDate,
          },
        });

        results.published.push(updatedPost.id);
        results.processed++;
      } catch (error) {
        results.errors.push({
          postId: post.id,
          error: error.message,
        });
      }
    }

    return results;
  } catch (error) {
    console.error("Error publishing scheduled posts:", error);
    throw new Error("Failed to process scheduled posts");
  }
}
