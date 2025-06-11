"use client";

import { useState } from "react";
import PostCard from "@/components/PostCard";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [preview, setPreview] = useState(false);

  const handleSubmit = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
        author: "You", // replace with user data later
        tags: tags.split(",").map((tag) => tag.trim()),
      }),
    });

    if (res.ok) {
      alert("✅ Post created!");
      setTitle("");
      setContent("");
      setTags("");
      setPreview(false);
    } else {
      alert("❌ Failed to create post.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-2xl font-bold text-[#096B68]">Create a Post</h1>

      {!preview ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post Title"
            className="w-full p-3 border border-[#90D1CA] rounded-md text-lg font-semibold text-[#096B68] placeholder-gray-400"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            placeholder="Write your post content..."
            className="w-full border border-[#90D1CA] p-4 rounded text-gray-700 font-mono"
          />

          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (comma separated)"
            className="w-full p-2 border border-[#90D1CA] rounded-md text-sm text-gray-600"
          />

          <button
            onClick={() => setPreview(true)}
            className="mt-4 bg-[#096B68] text-white px-6 py-2 rounded hover:bg-[#129990]"
          >
            Preview Post
          </button>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold text-[#096B68]">Preview</h2>
          <PostCard
            title={title}
            content={content}
            author="You"
            date="Now"
            tags={tags.split(",").map((tag) => tag.trim())}
          />
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleSubmit}
              className="bg-[#129990] text-white px-6 py-2 rounded hover:bg-[#096B68]"
            >
              Submit Post
            </button>
            <button
              onClick={() => setPreview(false)}
              className="text-sm text-gray-500 hover:underline"
            >
              Go Back to Edit
            </button>
          </div>
        </>
      )}
    </div>
  );
}