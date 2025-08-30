// app/actions/sendNewsletter.js
"use server";

import prisma from "@/lib/prisma";
import { renderEmailTemplate } from "./renderEmailTemplate";
import { sendBulkEmail } from "./sendBulkEmail";

export async function sendDailyNewsletter() {
  try {
    // 1. Get yesterday's published posts
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const recentPosts = await prisma.post.findMany({
      where: {
        published: true,
        publishDate: {
          gte: yesterday,
          lt: new Date(),
        },
      },
      include: {
        categories: true,
        tags: true,
        author: {
          select: { name: true },
        },
      },
    });

    if (recentPosts.length === 0) {
      console.log("No new posts for newsletter");
      return { sent: false, message: "No new content" };
    }

    // 2. Get all verified subscribers
    const subscribers = await prisma.newsletterSubscription.findMany({
      where: { verified: true },
      select: { email: true },
    });

    if (subscribers.length === 0) {
      console.log("No subscribers to send to");
      return { sent: false, message: "No subscribers" };
    }

    // 3. Render email content
    const emailHtml = await renderEmailTemplate(recentPosts, subscribers.email);
    const subject = `Daily Digest: ${recentPosts.length} new ${
      recentPosts.length === 1 ? "article" : "articles"
    }`;

    // 4. Send to all subscribers
    const results = await sendBulkEmail(
      subscribers.map((sub) => sub.email),
      subject,
      emailHtml
    );

    return {
      sent: true,
      posts: recentPosts.length,
      subscribers: subscribers.length,
      results,
    };
  } catch (error) {
    console.error("Newsletter sending failed:", error);
    return { sent: false, error: error.message };
  }
}
