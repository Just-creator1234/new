import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import Image from "next/image";
import {
  Calendar,
  ImageOff,
  User,
  Tag,
  Clock,
  ArrowLeft,
  Edit3,
  Eye,
} from "lucide-react";
import Link from "next/link";

import PublishButton from "./PublishButton";

export const dynamic = "force-dynamic"; // always fetch latest

export default async function DraftPostPage({ params }) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      categories: true,
      tags: true,
      author: true,
    },
  });

  if (!post || post.status !== "DRAFT") {
    notFound();
  }

  const readingTime = Math.ceil(
    post.content.replace(/<[^>]*>/g, "").split(" ").length / 200
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Navigation */}
      <nav className="sticky top-0 bg-white border-b border-gray-200 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/My-blogs"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all duration-200 group"
            >
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span className="font-medium">Back to Dashboard</span>
            </Link>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <Link
                href={`/Blogs/edit/${post.slug}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                <Edit3 size={16} />
                <span className="hidden sm:inline">Edit</span>
              </Link>
              <PublishButton post={post} />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Enhanced Header Section */}
        <header className="mb-12">
          {/* Status and Meta Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-accent-100 text-accent-800 border border-accent-200">
                <span className="w-2 h-2 bg-accent-500 rounded-full mr-2 animate-pulse"></span>
                DRAFT
              </span>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Eye size={14} />
                <span>Preview Mode</span>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              Last updated{" "}
              {format(
                new Date(post.updatedAt || post.createdAt),
                "MMM d, yyyy 'at' h:mm a"
              )}
            </div>
          </div>

          {/* Title and Excerpt */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight break-words">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-4xl">
                {post.excerpt}
              </p>
            )}
          </div>

          {/* Enhanced Meta Information */}
          <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md">
                <User size={14} className="text-white" />
              </div>
              <span className="font-medium text-gray-900">
                {post.author?.name ?? "Unknown Author"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-gray-400" />
              <span>
                Created {format(new Date(post.createdAt), "MMM d, yyyy")}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={14} className="text-gray-400" />
              <span>{readingTime} min read</span>
            </div>
          </div>

          {/* Categories */}
          {post.categories.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.categories.map((category, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-200 hover:bg-primary-100 transition-colors"
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Featured Image */}
        {post.coverImage ? (
          <div className="mb-12">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gray-100">
              <Image
                src={post.coverImage}
                alt={post.altText || post.title}
                width={1200}
                height={600}
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105 rounded-2xl"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </div>
        ) : (
          <div className="mb-12">
            <div className="flex items-center justify-center h-64 rounded-2xl shadow-2xl bg-gray-100 border border-dashed border-gray-300">
              <div className="text-center">
                <ImageOff className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No cover image</p>
              </div>
            </div>
          </div>
        )}

        {/* Article Content */}
        <article className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
          <div className="p-6 sm:p-8 lg:p-12">
            <div
              className="prose prose-lg max-w-none break-words whitespace-normal
             prose-headings:text-gray-900 
             prose-p:text-gray-700 
             prose-a:text-primary-600
             prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>

        {/* Tags Section */}
        {post.tags.length > 0 && (
          <div className="mb-8 p-6 sm:p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Tag size={18} className="text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Tags</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-gray-50 hover:bg-gray-100 text-gray-800 transition-colors cursor-pointer border border-gray-200 hover:border-gray-300"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Draft Actions */}
        <div className="bg-gradient-to-r from-accent-50 to-accent-100 rounded-2xl border border-accent-200 p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-accent-900 mb-2">
                Ready to Publish?
              </h3>
              <p className="text-accent-800 text-sm leading-relaxed">
                This post is currently in draft mode and not visible to the
                public. You can continue editing or publish it to make it live.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
              <Link
                href={`/Blogs/edit/${post.slug}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-800 rounded-lg transition-colors font-medium border border-gray-200 hover:border-gray-300 shadow-sm"
              >
                <Edit3 size={16} />
                Continue Editing
              </Link>
              <PublishButton post={post} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
