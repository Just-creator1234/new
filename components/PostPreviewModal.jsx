// // components/PostPreviewModal.jsx
// "use client";

// export default function PostPreviewModal({ onClose, post }) {
//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg max-w-3xl max-h-[90vh] overflow-y-auto">
//         <button
//           onClick={onClose}
//           className="float-right text-2xl leading-none"
//         >
//           &times;
//         </button>

//         {post.coverImageUrl && (
//           <img
//             src={post.coverImageUrl}
//             alt={post.altText || ""}
//             className="w-full h-64 object-cover rounded mb-4"
//           />
//         )}

//         <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
//         {post.subtitle && (
//           <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
//             {post.subtitle}
//           </p>
//         )}

//         <div className="mb-4 space-x-2">
//           {post.categories.map((c) => (
//             <span
//               key={c.id}
//               className="inline-block px-2 py-1 rounded text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
//             >
//               {c.name}
//             </span>
//           ))}
//           {post.tags.map((t) => (
//             <span
//               key={t.id}
//               className="inline-block px-2 py-1 rounded text-xs bg-neutral-100 dark:bg-neutral-700"
//             >
//               {t.name}
//             </span>
//           ))}
//         </div>

//         <div
//           className="prose dark:prose-invert max-w-none"
//           dangerouslySetInnerHTML={{ __html: post.content }}
//         />

//         <div className="mt-6 text-sm text-neutral-500 dark:text-neutral-400">
//           <p>Excerpt: {post.excerpt}</p>
//         </div>
//       </div>
//     </div>
//   );

// }

// components/PostPreviewModal.jsx
"use client";

export default function PostPreviewModal({ onClose, post }) {
  /* Helper to safely render HTML */
  const safeHtml = (html) => ({ __html: html || "" });

  const {
    title,
    subtitle,
    excerpt,
    content,
    coverImageUrl,
    altText,
    categories = [],
    tags = [],
    difficulty,
    language,
    series,
    seriesOrder,
    videoUrl,
    audioUrl,
    gallery = [],
  } = post || {};

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-sm px-6 py-3 flex justify-between items-center z-10 border-b">
          <h2 className="font-bold text-lg">Preview</h2>
          <button
            onClick={onClose}
            className="text-2xl leading-none text-neutral-500 hover:text-neutral-800"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Cover */}
          {coverImageUrl && (
            <img
              src={coverImageUrl}
              alt={altText || "Cover image"}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          )}

          {/* Title + subtitle */}
          <header>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight break-words whitespace-normal">
              {title || "Untitled Post"}
            </h1>
            {subtitle && (
              <p className="mt-2 text-xl text-neutral-600">{subtitle}</p>
            )}
          </header>

          {/* Taxonomies */}
          {(categories.length > 0 || tags.length > 0) && (
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <span
                  key={c.id}
                  className="inline-block px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  {c.name}
                </span>
              ))}
              {tags.map((t) => (
                <span
                  key={t.id}
                  className="inline-block px-3 py-1 rounded-full text-sm bg-neutral-100 text-neutral-800"
                >
                  {t.name}
                </span>
              ))}
            </div>
          )}

          {/* Optional meta */}
          <div className="text-sm text-neutral-500">
            {series && (
              <p>
                Part {seriesOrder || 1} of{" "}
                <span className="font-medium">{series}</span>
              </p>
            )}
            {difficulty && (
              <p className="capitalize">Difficulty: {difficulty}</p>
            )}
            {language && <p>Language: {language}</p>}
          </div>

          {/* Main content */}
          <article
            className="prose max-w-none"
            dangerouslySetInnerHTML={safeHtml(content)}
          />

          {/* Gallery */}
          {gallery.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold mb-2">Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {gallery.map((file, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(file)}
                    alt={`Gallery ${idx + 1}`}
                    className="rounded object-cover aspect-square"
                  />
                ))}
              </div>
            </section>
          )}

          {/* Video */}
          {videoUrl && (
            <section>
              <h3 className="text-lg font-semibold mb-2">Video</h3>
              <div className="aspect-video">
                <iframe
                  src={videoUrl}
                  title="Post video"
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                />
              </div>
            </section>
          )}

          {/* Audio */}
          {audioUrl && (
            <section>
              <h3 className="text-lg font-semibold mb-2">Audio</h3>
              <audio controls src={audioUrl} className="w-full rounded-lg" />
            </section>
          )}

          {/* Excerpt */}
          {excerpt && (
            <footer className="pt-6 border-t">
              <h4 className="font-semibold mb-1">Excerpt</h4>
              <p className="text-neutral-600 italic">{excerpt}</p>
            </footer>
          )}
        </div>
      </div>
    </div>
  );
}
