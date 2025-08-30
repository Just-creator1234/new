// app/actions/subscribeNewsletter.js
"use server";

import prisma from "@/lib/prisma";
import crypto from "crypto";
import { sendVerificationEmail } from "./sendVerificationEmail";

export async function subscribeNewsletter(rawEmail) {
  try {
    const email = rawEmail.trim().toLowerCase();
    if (!email || !email.includes("@")) {
      return { success: false, error: "Invalid email address" };
    }

    // 1. Check if the address is already in the DB
    const existing = await prisma.newsletterSubscription.findUnique({
      where: { email },
    });

    // 2. Already verified → tell the user
    if (existing?.verified) {
      return { success: false, error: "You have already subscribed." };
    }

    // Add rate limiting
    if (existing && existing.createdAt > new Date(Date.now() - 5 * 60 * 1000)) {
      return { success: false, error: "Please wait before trying again" };
    }

    // 3. Not verified (or doesn’t exist) → issue/re-issue token & send mail
    const token = crypto.randomBytes(32).toString("hex");

    await prisma.newsletterSubscription.upsert({
      where: { email },
      update: { token },
      create: { email, token },
    });

    await sendVerificationEmail(email);
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Server error" };
  }
}
