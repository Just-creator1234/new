import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (!slug) return NextResponse.json({ available: false });

  const exists = await prisma.post.findUnique({ where: { slug } });
  return NextResponse.json({ available: !exists });
}
