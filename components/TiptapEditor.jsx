"use client";

import { useCallback, useRef, useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import {
  FiBold,
  FiItalic,
  FiUnderline,
  FiType,
  FiList,
  FiMinus,
  FiCornerUpLeft,
  FiCornerUpRight,
  FiLink,
  FiImage,
} from "react-icons/fi";
import { FaListOl, FaQuoteRight } from "react-icons/fa";
import { BsCodeSlash } from "react-icons/bs";

export default function TiptapEditor({
  content = "",
  onChange = () => {},
  placeholder = "Write something amazing...",
  className = "",
  uploadImage,
}) {
  const fileInput = useRef(null);

  const handleUpload =
    uploadImage ||
    (async (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2] } }),
      Placeholder.configure({ placeholder }),
      Image.configure({ inline: true, allowBase64: true }),
      Link.configure({ openOnClick: false }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && content !== undefined && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  const addImageByURL = () => {
    const url = window.prompt("Enter image URL:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const addImageFile = useCallback(
    async (file) => {
      if (!editor) return;
      try {
        const url = await handleUpload(file);
        editor.chain().focus().setImage({ src: url }).run();
      } catch (e) {
        console.error("Image upload failed", e);
      }
    },
    [editor, handleUpload]
  );

  const setLink = () => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href;
    const url = window.prompt("URL", prev);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) addImageFile(file);
    e.target.value = "";
  };

  const handleDropPaste = useCallback(
    (e) => {
      const files =
        "dataTransfer" in e ? e.dataTransfer?.files : e.clipboardData?.files;
      if (!files || !editor) return;
      [...files].forEach((file) => {
        if (file.type.startsWith("image/")) {
          e.preventDefault();
          addImageFile(file);
        }
      });
    },
    [addImageFile, editor]
  );

  useEffect(() => {
    document.addEventListener("drop", handleDropPaste);
    document.addEventListener("paste", handleDropPaste);
    return () => {
      document.removeEventListener("drop", handleDropPaste);
      document.removeEventListener("paste", handleDropPaste);
    };
  }, [handleDropPaste]);

  if (!editor) return null;

  return (
    <div className="rounded-lg bg-white dark:bg-gray-800 w-full h-full flex flex-col">
      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />

      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 rounded-t-lg flex-shrink-0">
        <ToolbarButton editor={editor} action="bold" icon={<FiBold />} />
        <ToolbarButton editor={editor} action="italic" icon={<FiItalic />} />
        <ToolbarButton
          editor={editor}
          action="underline"
          icon={<FiUnderline />}
        />
        <Divider />
        <ToolbarButton
          editor={editor}
          action="heading"
          icon={<FiType />}
          options={{ level: 2 }}
        />
        <ToolbarButton editor={editor} action="bulletList" icon={<FiList />} />
        <ToolbarButton
          editor={editor}
          action="orderedList"
          icon={<FaListOl />}
        />
        <Divider />
        <ToolbarButton
          editor={editor}
          action="blockquote"
          icon={<FaQuoteRight />}
        />
        <ToolbarButton
          editor={editor}
          action="codeBlock"
          icon={<BsCodeSlash />}
        />
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          title="Horizontal Rule"
        >
          <FiMinus />
        </button>
        <Divider />
        <button
          onClick={setLink}
          className={`p-2 rounded-md ${
            editor.isActive("link")
              ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          }`}
          title="Link"
        >
          <FiLink />
        </button>
        <button
          onClick={() => {
            const choice = window.prompt(
              "Enter image URL or leave empty to upload from computer:"
            );
            if (choice === null) return;
            if (choice.trim()) {
              editor.chain().focus().setImage({ src: choice }).run();
            } else {
              fileInput.current?.click();
            }
          }}
          className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          title="Image"
        >
          <FiImage />
        </button>
        <Divider />
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className={`p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 ${
            !editor.can().undo() ? "opacity-50 cursor-not-allowed" : ""
          }`}
          title="Undo"
        >
          <FiCornerUpLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className={`p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 ${
            !editor.can().redo() ? "opacity-50 cursor-not-allowed" : ""
          }`}
          title="Redo"
        >
          <FiCornerUpRight />
        </button>
      </div>

      <div className="relative">
        <EditorContent editor={editor} className={`w-full ${className}`} />

        <style jsx global>{`
          .ProseMirror {
            width: 100% !important;
            min-height: 400px !important;
            padding: 1rem !important;
            outline: none !important;
            border: none !important;
            box-shadow: none !important;
            font-size: 16px;
            line-height: 1.6;
            color: #374151;
            background-color: transparent;
          }

          .dark .ProseMirror {
            color: #f3f4f6;
          }

          .ProseMirror:focus {
            outline: none !important;
            border: none !important;
            box-shadow: none !important;
          }

          .ProseMirror p.is-editor-empty:first-child::before {
            color: #9ca3af;
            content: attr(data-placeholder);
            float: left;
            height: 0;
            pointer-events: none;
          }

          .dark .ProseMirror p.is-editor-empty:first-child::before {
            color: #6b7280;
          }

          .ProseMirror h2 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-top: 1.5rem;
            margin-bottom: 0.5rem;
          }

          .ProseMirror ul,
          .ProseMirror ol {
            padding-left: 1.5rem;
            margin: 0.5rem 0;
          }

          .ProseMirror blockquote {
            border-left: 4px solid #d1d5db;
            padding-left: 1rem;
            margin: 1rem 0;
            color: #6b7280;
          }

          .dark .ProseMirror blockquote {
            border-left-color: #4b5563;
            color: #9ca3af;
          }

          .ProseMirror pre {
            background-color: #f3f4f6;
            border-radius: 0.5rem;
            padding: 1rem;
            margin: 1rem 0;
            overflow-x: auto;
          }

          .dark .ProseMirror pre {
            background-color: #1f2937;
          }

          .ProseMirror code {
            background-color: #f3f4f6;
            padding: 0.2rem 0.4rem;
            border-radius: 0.25rem;
            font-size: 0.875rem;
          }

          .dark .ProseMirror code {
            background-color: #374151;
          }

          .ProseMirror a {
            color: #2563eb;
            text-decoration: underline;
          }

          .dark .ProseMirror a {
            color: #60a5fa;
          }

          .ProseMirror hr {
            border: none;
            border-top: 2px solid #e5e7eb;
            margin: 1.5rem 0;
          }

          .dark .ProseMirror hr {
            border-top-color: #4b5563;
          }

          .ProseMirror img {
            max-width: 100%;
            height: auto;
            border-radius: 0.5rem;
          }
        `}</style>
      </div>
    </div>
  );
}

function ToolbarButton({ editor, action, icon, options = {} }) {
  const isActive = editor.isActive(action, options);
  return (
    <button
      onClick={() =>
        editor.chain().focus()[`toggle${capitalize(action)}`](options).run()
      }
      className={`p-2 rounded-md ${
        isActive
          ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200"
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
      }`}
      title={capitalize(action)}
    >
      {icon}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-1" />;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
