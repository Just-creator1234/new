"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateUserProfile(formData) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const name = formData.get("name");
  const email = formData.get("email");
  const slug = formData.get("slug");

  try {
    // Check if email is already taken by another user
    if (email !== session.user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return { error: "Email already in use" };
      }
    }

    // Check if slug is already taken by another user
    if (slug !== session.user.slug) {
      const existingUser = await prisma.user.findUnique({
        where: { slug },
      });

      if (existingUser) {
        return { error: "Profile URL already in use" };
      }
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        email,
        slug,
      },
    });

    // Revalidate any cached pages
    revalidatePath("/account");

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Error updating user:", error);
    return { error: "Failed to update profile" };
  }
}

export async function changePassword(formData) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const currentPassword = formData.get("currentPassword");
  const newPassword = formData.get("newPassword");
  const confirmPassword = formData.get("confirmPassword");

  // Validate password match
  if (newPassword !== confirmPassword) {
    return { error: "New passwords don't match" };
  }

  try {
    // Get user with password
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        password: true,
      },
    });

    if (!user) {
      return { error: "User not found" };
    }

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, user.password);

    if (!isValid) {
      return { error: "Current password is incorrect" };
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        password: hashedPassword,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error changing password:", error);
    return { error: "Failed to change password" };
  }
}
