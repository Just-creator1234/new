// app/api/newsletter/verify/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Token missing" },
        { status: 400 }
      );
    }

    const sub = await prisma.newsletterSubscription.findUnique({
      where: { token },
    });
    if (!sub) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    await prisma.newsletterSubscription.update({
      where: { token },
      data: { verified: true, token: null },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
