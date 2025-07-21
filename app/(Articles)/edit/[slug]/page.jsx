"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { updatePost, getPostBySlug } from "@/app/actions/editPost";
import { getAllCategories } from "@/app/actions/getCategories";
import { formatDistanceToNow } from "date-fns";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import toast from "react-hot-toast";
import PostPreviewModal from "@/components/PostPreviewModal";
import TiptapEditor from "@/components/TiptapEditor";
import Image from "next/image";
import { Flame } from "lucide-react";
import { useSession } from "next-auth/react";
import {
  FiEdit,
  FiEye,
  FiSave,
  FiSettings,
  FiCalendar,
  FiTag,
  FiFileText,
  FiClock,
  FiUser,
  FiGlobe,
  FiShare2,
  FiTrendingUp,
  FiImage,
} from "react-icons/fi";

const useDebounce = (fn, delay) => {
  const timer = useRef();
  return (...args) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => fn(...args), delay);
  };
};

export default function EditPostPage() {
  const router = useRouter();
  const { slug } = useParams();

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [showPreview, setShowPreview] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const { data: session } = useSession();

  const [categories, setCategories] = useState([]);
  const [post, setPost] = useState({
    title: "",
    subtitle: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    altText: "",
    tags: [],
    categories: [],
    status: "DRAFT",
    metaTitle: "",
    metaDescription: "",
    focusKeyword: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    twitterCard: "summary_large_image",
    canonicalUrl: "",
    targetKeywords: [],
    difficulty: "beginner",
    language: "en",
    series: "",
    seriesOrder: 1,
    visibility: "public",
    password: "",
    allowComments: true,
    allowSharing: true,
    featured: false,
    sticky: false,
    coAuthors: [],
    editorNotes: "",
    customFields: {},
    videoUrl: "",
    audioUrl: "",
    gallery: [],
    breaking: false,
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
    onDropAccepted: ([file]) => uploadCover(file),
  });

  const [coverProgress, setCoverProgress] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        setCategories(res);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    const fetchPost = async () => {
      setLoading(true);
      const data = await getPostBySlug(slug);

      if (data) {
        setPost({
          title: data.title || "",
          subtitle: data.subtitle || "",
          slug: data.slug || "",
          excerpt: data.excerpt || "",
          content: data.content || "",
          coverImage: data.coverImage || "",
          altText: data.altText || "",
          tags: data.tags?.map((t) => t.name) || [],
          categories: data.categories?.map((c) => c.slug) || [],
          status: data.status || "DRAFT",
          metaTitle: data.metaTitle || "",
          metaDescription: data.metaDescription || "",
          focusKeyword: data.focusKeyword || "",
          ogTitle: data.ogTitle || "",
          ogDescription: data.ogDescription || "",
          ogImage: data.ogImage || "",
          twitterCard: data.twitterCard || "summary_large_image",
          canonicalUrl: data.canonicalUrl || "",
          targetKeywords: data.targetKeywords || [],
          difficulty: data.difficulty || "beginner",
          language: data.language || "en",
          series: data.series || "",
          seriesOrder: data.seriesOrder || 1,
          visibility: data.visibility || "public",
          password: data.password || "",
          allowComments: data.allowComments ?? true,
          allowSharing: data.allowSharing ?? true,
          featured: data.featured || false,
          sticky: data.sticky || false,
          coAuthors: data.coAuthors || [],
          editorNotes: data.editorNotes || "",
          customFields: data.customFields || {},
          videoUrl: data.videoUrl || "",
          audioUrl: data.audioUrl || "",
          gallery: data.gallery || [],
          breaking: data.breaking || false,
        });
      }
      setLoading(false);
    };

    fetchCategories();
    fetchPost();
  }, [slug]);

  const uploadCover = async (file) => {
    setCoverProgress(0);
    const fd = new FormData();
    fd.append("image", file);
    try {
      const { data } = await axios.post("/api/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (p) =>
          setCoverProgress(Math.round((p.loaded / p.total) * 100)),
      });
      setPost((prev) => ({ ...prev, coverImage: data.url }));
      setValidationErrors((v) => ({ ...v, coverImage: undefined }));
    } catch {
      toast.error("Image upload failed");
    } finally {
      setCoverProgress(0);
    }
  };

  const removeImage = () => {
    setPost((prev) => ({ ...prev, coverImage: "" }));
  };

  const handleTagAdd = () => {
    const trimmed = post.newTag?.trim();
    if (trimmed && !post.tags.includes(trimmed)) {
      setPost((prev) => ({
        ...prev,
        tags: [...prev.tags, trimmed],
        newTag: "",
      }));
    }
  };

  const handleTagRemove = (tag) => {
    setPost((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const validate = () => {
    const errs = {};
    if (!post.title.trim()) errs.title = "Title is required";
    if (!post.content.trim()) errs.content = "Content is required";
    if (!post.excerpt.trim()) errs.excerpt = "Excerpt is required";
    if (post.categories.length === 0)
      errs.categories = "Pick at least one category";
    if (post.status === "SCHEDULED" && !post.publishDate)
      errs.publishDate = "Set a date";
    setValidationErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return toast.error("Fix errors before saving");
    setIsSubmitting(true);

    try {
      await updatePost(slug, post);
      toast.success("Post updated successfully!");
      setLastSaved(new Date());
      router.push("/My-blogs");
    } catch (error) {
      toast.error("Failed to update post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const wordCount = useMemo(
    () =>
      post.content
        .replace(/<[^>]*>/g, "")
        .split(/\s+/)
        .filter(Boolean).length,
    [post.content]
  );

  const readingTime = useMemo(() => Math.ceil(wordCount / 200), [wordCount]);

  const tabs = [
    { id: "content", label: "Content", icon: FiFileText },
    { id: "media", label: "Media", icon: FiImage },
    { id: "settings", label: "Settings", icon: FiSettings },
    { id: "seo", label: "SEO", icon: FiGlobe },
    { id: "social", label: "Social", icon: FiShare2 },
    { id: "advanced", label: "Advanced", icon: FiTrendingUp },
  ];

  if (!session) {
    router.push("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-12">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Edit Post</h1>
            {lastSaved && (
              <span className="text-xs text-gray-500">
                Last saved {formatDistanceToNow(lastSaved, { addSuffix: true })}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowPreview(true)}
              className="inline-flex items-center gap-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              <FiEye className="h-4 w-4" />
              Preview
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <FiSave className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 p-4 sm:p-6 lg:p-8">
        {/* Main area */}
        <div className="lg:col-span-3">
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1 pb-2 text-sm font-medium border-b-2 ${
                    activeTab === tab.id
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {activeTab === "content" && (
            <div className="space-y-6">
              <input
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                placeholder="Post title..."
                className={`w-full text-2xl font-bold p-3 rounded-lg border ${
                  validationErrors.title ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white`}
              />
              {validationErrors.title && (
                <p className="text-sm text-red-600">{validationErrors.title}</p>
              )}

              <input
                value={post.slug}
                onChange={(e) => setPost({ ...post, slug: e.target.value })}
                placeholder="url-slug"
                className={`w-full p-3 rounded-lg border ${
                  validationErrors.slug ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white`}
              />
              {validationErrors.slug && (
                <p className="text-sm text-red-600">{validationErrors.slug}</p>
              )}

              <TiptapEditor
                content={post.content}
                onChange={(html) => setPost({ ...post, content: html })}
                placeholder="Start writing..."
                className="min-h-[400px] bg-white rounded-lg border border-gray-300"
              />
              {validationErrors.content && (
                <p className="text-sm text-red-600">
                  {validationErrors.content}
                </p>
              )}

              <textarea
                value={post.excerpt}
                onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                placeholder="Excerpt (max 300 chars)"
                maxLength={300}
                className={`w-full p-3 rounded-lg border ${
                  validationErrors.excerpt
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white`}
                rows={4}
              />
              {validationErrors.excerpt && (
                <p className="text-sm text-red-600">
                  {validationErrors.excerpt}
                </p>
              )}
            </div>
          )}

          {activeTab === "media" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Cover image
              </h2>
              <div
                {...getRootProps()}
                className={`h-64 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer ${
                  isDragActive
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-300"
                } relative overflow-hidden`}
              >
                <input {...getInputProps()} />
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.altText || "cover"}
                    fill
                    className="object-cover rounded"
                  />
                ) : (
                  <div className="text-center p-4">
                    <FiImage className="mx-auto text-3xl text-gray-400" />
                    <p className="text-gray-500">Drag or click to upload</p>
                    <p className="text-xs text-gray-400 mt-1">Max 5MB</p>
                  </div>
                )}
              </div>
              {coverProgress > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-600 h-2 rounded-full"
                    style={{ width: `${coverProgress}%` }}
                  ></div>
                </div>
              )}
              {validationErrors.coverImage && (
                <p className="text-sm text-red-600">
                  {validationErrors.coverImage}
                </p>
              )}

              <input
                value={post.altText}
                onChange={(e) => setPost({ ...post, altText: e.target.value })}
                placeholder="Alt text for accessibility"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
              />

              <h3 className="text-lg font-semibold text-gray-900 mt-6">
                Gallery
              </h3>
              <div className="border border-gray-300 rounded-lg p-4 bg-white">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) =>
                    setPost({ ...post, gallery: Array.from(e.target.files) })
                  }
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-gray-100 file:text-gray-700
                    hover:file:bg-gray-200"
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mt-6">
                Video URL
              </h3>
              <input
                value={post.videoUrl}
                onChange={(e) => setPost({ ...post, videoUrl: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg mb-1 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
              />

              <h3 className="text-lg font-semibold text-gray-900 mt-6">
                Audio URL
              </h3>
              <input
                value={post.audioUrl}
                onChange={(e) => setPost({ ...post, audioUrl: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg mb-1 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
              />
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Status
                </label>
                <select
                  value={post.status}
                  onChange={(e) => setPost({ ...post, status: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="SCHEDULED">Scheduled</option>
                </select>
              </div>
              {post.status === "SCHEDULED" && (
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Publish Date
                  </label>
                  <input
                    type="datetime-local"
                    value={post.publishDate}
                    onChange={(e) =>
                      setPost({ ...post, publishDate: e.target.value })
                    }
                    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                  />
                </div>
              )}
            </div>
          )}

          {activeTab === "seo" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Meta Title
                </label>
                <input
                  value={post.metaTitle}
                  onChange={(e) =>
                    setPost({ ...post, metaTitle: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                  maxLength={60}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Meta Description
                </label>
                <textarea
                  value={post.metaDescription}
                  onChange={(e) =>
                    setPost({ ...post, metaDescription: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                  rows={3}
                  maxLength={160}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Focus Keyword
                </label>
                <input
                  value={post.focusKeyword}
                  onChange={(e) =>
                    setPost({ ...post, focusKeyword: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Canonical URL
                </label>
                <input
                  value={post.canonicalUrl}
                  onChange={(e) =>
                    setPost({ ...post, canonicalUrl: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Target Keywords
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    value={post.newTag}
                    onChange={(e) =>
                      setPost({ ...post, newTag: e.target.value })
                    }
                    onKeyDown={(e) => e.key === "Enter" && handleTagAdd()}
                    placeholder="Add keyword"
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                  />
                  <button
                    onClick={handleTagAdd}
                    className="px-2 py-1 text-sm bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {post.targetKeywords.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-gray-200 px-2 py-1 rounded-full flex items-center gap-1"
                    >
                      {t}
                      <button
                        onClick={() => handleTagRemove(t)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "social" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  OG Title
                </label>
                <input
                  value={post.ogTitle}
                  onChange={(e) =>
                    setPost({ ...post, ogTitle: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                  maxLength={60}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  OG Description
                </label>
                <textarea
                  value={post.ogDescription}
                  onChange={(e) =>
                    setPost({ ...post, ogDescription: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                  rows={3}
                  maxLength={160}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  OG Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file)
                      setPost({ ...post, ogImage: URL.createObjectURL(file) });
                  }}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-gray-100 file:text-gray-700
                    hover:file:bg-gray-200"
                />
                {post.ogImage && (
                  <div className="mt-2">
                    <img
                      src={post.ogImage}
                      alt=""
                      className="h-32 rounded-lg object-cover border border-gray-200"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Twitter Card
                </label>
                <select
                  value={post.twitterCard}
                  onChange={(e) =>
                    setPost({ ...post, twitterCard: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                >
                  <option value="summary">Summary</option>
                  <option value="summary_large_image">
                    Summary Large Image
                  </option>
                </select>
              </div>
            </div>
          )}

          {activeTab === "advanced" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Subtitle
                </label>
                <input
                  value={post.subtitle}
                  onChange={(e) =>
                    setPost({ ...post, subtitle: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Difficulty
                </label>
                <select
                  value={post.difficulty}
                  onChange={(e) =>
                    setPost({ ...post, difficulty: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Language
                </label>
                <input
                  value={post.language}
                  onChange={(e) =>
                    setPost({ ...post, language: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Series name
                </label>
                <input
                  value={post.series}
                  onChange={(e) => setPost({ ...post, series: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Order in series
                </label>
                <input
                  type="number"
                  value={post.seriesOrder}
                  onChange={(e) =>
                    setPost({ ...post, seriesOrder: Number(e.target.value) })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                />
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Stats */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-semibold mb-2 text-gray-900">Stats</h3>
            <div className="space-y-1 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Words</span>
                <span>{wordCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Read time</span>
                <span>{readingTime} min</span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <span className="capitalize">{post.status.toLowerCase()}</span>
              </div>
            </div>
          </div>

          {/* SEO Analyzer */}
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="font-semibold mb-2">SEO Analysis</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Title Score</span>
                <span className="text-green-600">85/100</span>
              </div>
              <div className="flex justify-between">
                <span>Content Score</span>
                <span className="text-green-600">78/100</span>
              </div>
              <div className="flex justify-between">
                <span>Readability</span>
                <span className="text-green-600">92/100</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="font-semibold mb-2">Categories</h3>
            <div className="space-y-1 text-sm mb-4">
              {categories.map((c) => (
                <label
                  key={c.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={post.categories.includes(c.slug)}
                    onChange={() =>
                      setPost((prev) => ({
                        ...prev,
                        categories: prev.categories.includes(c.slug)
                          ? prev.categories.filter((slug) => slug !== c.slug)
                          : [...prev.categories, c.slug],
                      }))
                    }
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  {c.name}
                </label>
              ))}
            </div>
            <div className="pt-2 border-t border-gray-200">
              <label className="flex items-center gap-2 cursor-pointer text-red-600 font-medium">
                <input
                  type="checkbox"
                  checked={post.breaking}
                  onChange={(e) =>
                    setPost({ ...post, breaking: e.target.checked })
                  }
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <Flame className="h-4 w-4" />
                Breaking News
              </label>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="font-semibold mb-2">Tags</h3>
            <div className="flex gap-2 mb-2">
              <input
                value={post.newTag}
                onChange={(e) => setPost({ ...post, newTag: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleTagAdd()}
                placeholder="Add tag"
                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
              />
              <button
                onClick={handleTagAdd}
                className="px-2 py-1 text-sm bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full flex items-center gap-1"
                >
                  {t}
                  <button
                    onClick={() => handleTagRemove(t)}
                    className="text-orange-600 hover:text-orange-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showPreview && (
        <PostPreviewModal
          onClose={() => setShowPreview(false)}
          post={{
            title: post.title,
            subtitle: post.subtitle,
            excerpt: post.excerpt,
            content: post.content,
            coverImageUrl: post.coverImage,
            altText: post.altText,
            categories: categories.filter((c) =>
              post.categories.includes(c.slug)
            ),
            tags: post.tags.map((t, i) => ({ id: String(i), name: t })),
            breaking: post.breaking,
          }}
        />
      )}
    </div>
  );
}
