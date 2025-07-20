// app/api/writer-profile/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  await prisma.userProfile.create({ data: body });
  return NextResponse.json({ ok: true });
}