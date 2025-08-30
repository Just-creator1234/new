// app/api/newsletter/unsubscribe/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    // Delete the subscriber
    await prisma.newsletterSubscription.delete({
      where: { email: email.toLowerCase() },
    });

    return NextResponse.json({
      success: true,
      message: "Successfully unsubscribed",
    });
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json(
      { success: false, error: "Unsubscribe failed" },
      { status: 500 }
    );
  }
}
