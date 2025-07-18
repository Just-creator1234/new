// app/api/dev/publish-now/route.js or route.ts (based on your setup)

import prisma from "@/lib/prisma"; // adjust if needed

export async function POST(req) {
  try {
    const body = await req.json();
    const { posts } = body;

    if (!posts || !Array.isArray(posts)) {
      return new Response(JSON.stringify({ error: "Invalid posts data" }), {
        status: 400,
      });
    }

    const idsToPublish = posts.map((post) => post.id);

    await prisma.post.updateMany({
      where: {
        id: { in: idsToPublish },
        status: "SCHEDULED",
      },
      data: {
        status: "PUBLISHED",
        publishedAt: new Date(),
      },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Failed to publish scheduled posts:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
