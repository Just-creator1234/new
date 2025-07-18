// app/actions/getPosts.js
"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function getPosts(status) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  return prisma.post.findMany({
    where: {
      authorId: session.user.id,
      ...(status && { status }),
    },
    orderBy: { createdAt: "desc" },
    include: { categories: true, tags: true, author: true },
  });
}
