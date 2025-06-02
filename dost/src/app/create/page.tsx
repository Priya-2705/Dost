'use client';
import { useState } from "react";
import ReactMarkdown from "react-markdown";

type PostType = "markdown" | "micro";

export default function CreatePostPage() {
  const [postType, setPostType] = useState<PostType>("markdown");
  const [isPublic, setIsPublic] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = form.tags.split(',').map((tag) => tag.trim()).filter(Boolean);

    const newPost = {
      title: form.title,
      content: form.content,
      tags: tagsArray,
      type: postType,
      isPublic,
    };

    console.log("📦 Submitted Post:", newPost);
    alert("Post submitted (logged in console)!");
  };

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">Create a New Post</h1>

      {/* Post type toggle */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setPostType("markdown")}
          className={`px-4 py-2 rounded ${
            postType === "markdown" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          Markdown Post
        </button>
        <button
          onClick={() => setPostType("micro")}
          className={`px-4 py-2 rounded ${
            postType === "micro" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          Micro Idea
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {postType === "markdown" && (
          <>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            {/* Preview toggle */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setPreviewMode((prev) => !prev)}
                className="text-sm text-blue-600 hover:underline"
              >
                {previewMode ? "Switch to Write" : "Switch to Preview"}
              </button>
            </div>

            {/* Write or Preview */}
            {previewMode ? (
              <div className="border p-4 rounded bg-gray-50 prose max-w-full">
                <ReactMarkdown>{form.content}</ReactMarkdown>
              </div>
            ) : (
              <textarea
                name="content"
                placeholder="Write your blog in Markdown..."
                rows={10}
                value={form.content}
                onChange={handleChange}
                className="w-full border p-2 rounded font-mono"
              />
            )}
          </>
        )}

        {postType === "micro" && (
          <textarea
            name="content"
            placeholder="Share a quick idea (max 200 words)..."
            rows={5}
            value={form.content}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        )}

        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated: React,Design)"
          value={form.tags}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            id="public-toggle"
          />
          <label htmlFor="public-toggle" className="text-sm text-gray-600">
            Make this post public
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post
        </button>
      </form>
    </section>
  );
}