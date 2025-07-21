import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim();
    if (!q || q.length < 2)
      return NextResponse.json({ posts: [], writers: [], categories: [] });

    // Split query into words – require ALL of them to match (AND)
    const words = q.split(/\s+/);

    const wherePosts = {
      published: true,
      AND: words.map((w) => ({
        title: { contains: w, mode: "insensitive" },
      })),
    };

    const whereWriters = {
      role: { in: ["WRITER", "ADMIN"] },
      AND: words.map((w) => ({
        OR: [
          { name: { contains: w, mode: "insensitive" } },
          { email: { contains: w, mode: "insensitive" } },
        ],
      })),
    };

    const whereCategories = {
      AND: words.map((w) => ({
        name: { contains: w, mode: "insensitive" },
      })),
    };

    const [posts, writersRaw, categories] = await Promise.all([
      prisma.post.findMany({
        where: wherePosts,
        select: { id: true, title: true, slug: true },
        take: 10,
      }),
      prisma.user.findMany({
        where: whereWriters,
        select: {
          id: true,
          name: true,
          slug: true,
          profile: { select: { avatar: true } },
        },
        take: 6,
      }),
      prisma.category.findMany({
        where: whereCategories,
        select: { id: true, name: true, slug: true },
        take: 6,
      }),
    ]);

    // Flatten avatar
    const writers = writersRaw.map((w) => ({
      ...w,
      avatar: w.profile?.avatar ?? null,
    }));

    return NextResponse.json({ posts, writers, categories });
  } catch (err) {
    console.error("Search error:", err);
    return NextResponse.json(
      { error: "Server error", posts: [], writers: [], categories: [] },
      { status: 500 }
    );
  }
}
