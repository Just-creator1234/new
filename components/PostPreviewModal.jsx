// components/PostPreviewModal.jsx
"use client";

export default function PostPreviewModal({ onClose, post }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg max-w-3xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="float-right text-2xl leading-none"
        >
          &times;
        </button>

        {post.coverImageUrl && (
          <img
            src={post.coverImageUrl}
            alt={post.altText || ""}
            className="w-full h-64 object-cover rounded mb-4"
          />
        )}

        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        {post.subtitle && (
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
            {post.subtitle}
          </p>
        )}

        <div className="mb-4 space-x-2">
          {post.categories.map((c) => (
            <span
              key={c.id}
              className="inline-block px-2 py-1 rounded text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
            >
              {c.name}
            </span>
          ))}
          {post.tags.map((t) => (
            <span
              key={t.id}
              className="inline-block px-2 py-1 rounded text-xs bg-neutral-100 dark:bg-neutral-700"
            >
              {t.name}
            </span>
          ))}
        </div>

        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-6 text-sm text-neutral-500 dark:text-neutral-400">
          <p>Excerpt: {post.excerpt}</p>
        </div>
      </div>
    </div>
  );
}