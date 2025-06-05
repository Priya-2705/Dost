"use client";

import { useState } from "react";
import MarkdownEditorStub from "@/components/MarkdownEditorStub";
import MicroIdeaCard from "@/components/MicroIdeaCard";
import PostCard from "@/components/PostCard";

export default function CreatePage() {
  const [postType, setPostType] = useState<"micro" | "long">("micro");
  const [preview, setPreview] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-2xl font-bold text-[#096B68]">Create a Post</h1>

      {/* Post Type Slider */}
      <div className="flex items-center gap-4 justify-center">
        <span className={`text-sm font-medium ${postType === "micro" ? "text-[#096B68]" : "text-gray-400"}`}>
          Micro Post
        </span>
        <div
          className="w-16 h-8 bg-[#90D1CA] rounded-full flex items-center cursor-pointer px-1"
          onClick={() => setPostType(postType === "micro" ? "long" : "micro")}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${
              postType === "long" ? "translate-x-8" : "translate-x-0"
            }`}
          />
        </div>
        <span className={`text-sm font-medium ${postType === "long" ? "text-[#096B68]" : "text-gray-400"}`}>
          Long Post
        </span>
      </div>

      {/* Editor Area */}
      {!preview && (
        <>
          {postType === "micro" ? (
            <textarea
              rows={6}
              maxLength={200}
              placeholder="Type your micro idea here..."
              className="w-full border border-[#90D1CA] p-4 rounded text-gray-700"
              onChange={() => {}}
            />
          ) : (
            <MarkdownEditorStub />
          )}

          <button
            onClick={() => setPreview(true)}
            className="mt-4 bg-[#096B68] text-white px-6 py-2 rounded hover:bg-[#129990]"
          >
            Preview Post
          </button>
        </>
      )}

      {/* Preview Mode */}
      {preview && (
        <>
          <h2 className="text-xl font-semibold text-[#096B68]">Preview</h2>
          {postType === "micro" ? (
            <MicroIdeaCard
              content="This is a sample micro idea preview!"
              author="You"
              date="Now"
              tags={["#Example"]}
              wordCount={7}
            />
          ) : (
            <PostCard
              title="Sample Long Post"
              excerpt="This is a markdown post preview content with formatting and structure..."
              author="You"
              date="Now"
              tags={["Preview", "Markdown"]}
            />
          )}
        </>
      )}
    </div>
  );
}