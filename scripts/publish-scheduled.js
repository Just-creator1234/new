// scripts/publish-scheduled.js
require("dotenv").config({ path: ".env.local" });

const { PrismaClient } = require("@prisma/client");

async function publishScheduledPosts() {
  const prisma = new PrismaClient();

  try {
    const now = new Date();

    const scheduledPosts = await prisma.post.findMany({
      where: {
        status: "SCHEDULED",
        publishDate: { lte: now },
        published: false,
      },
    });

    const results = {
      processed: 0,
      published: [],
      errors: [],
    };

    for (const post of scheduledPosts) {
      try {
        const updatedPost = await prisma.post.update({
          where: { id: post.id },
          data: {
            status: "PUBLISHED",
            published: true,
            publishedAt: new Date(),
            publishDate: post.publishDate,
          },
        });

        results.published.push(updatedPost.id);
        results.processed++;
        console.log(`✅ Published post: ${updatedPost.id}`);
      } catch (error) {
        results.errors.push({ postId: post.id, error: error.message });
        console.error(`❌ Error publishing post ${post.id}:`, error.message);
      }
    }

    return results;
  } catch (error) {
    console.error("Error in scheduled posts check:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  try {
    console.log("🚀 Starting scheduled posts check...");
    console.log("Current time:", new Date().toISOString());

    const result = await publishScheduledPosts();

    console.log("✅ Completed scheduled posts check");
    console.log(
      `📊 Processed: ${result.processed}, Published: ${result.published.length}, Errors: ${result.errors.length}`
    );

    if (result.published.length > 0) {
      console.log("📢 Published IDs:", result.published);
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Fatal error:", error);
    process.exit(1);
  }
}

main();
