"use client";

import PostCard from "@/components/PostCard";
import MicroIdeaCard from "@/components/MicroIdeaCard";
import TagBadge from "@/components/TagBadge";
import { useState } from "react";
import EmojiReactionsBar from "@/components/EmojiReactionsBar";
import MarkdownEditorStub from "@/components/MarkdownEditorStub";

export default function HomePage() {
  const tags = ["React", "DevOps", "Design", "Testing"];
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#FFFBDE]">
      
      {/* Hero Section */}
      <section className="text-center pt-10 pb-6">
        <h1 className="text-4xl font-bold text-[#096B68] mb-2">Welcome to Dost</h1>
        <p className="text-lg text-gray-700">
          Dev + Post — Hybrid blogging for developers & creators.
        </p>
      </section>

      {/* Tag Filters */}
      <div className="flex gap-2 flex-wrap justify-center px-4 mb-6">
        {tags.map((tag) => (
          <TagBadge
            key={tag}
            label={tag}
            selected={tag === selectedTag}
            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
          />
        ))}
      </div>

      {/* Long Post Example */}
      <div className="px-4 max-w-3xl mx-auto space-y-6">
        <PostCard
          title="Getting Started with Next.js + TypeScript"
          excerpt="Learn how to set up a powerful development environment with Next.js and TypeScript in just a few steps..."
          author="Capstone"
          date="June 4, 2025"
          tags={["NextJS", "TypeScript", "Guide"]}
        />
      </div>

      {/* Micro Idea Example */}
      <div className="px-4 max-w-2xl mx-auto mt-8 space-y-6">
        <MicroIdeaCard
          content="What if we use AI to generate boilerplate for unit tests? Would save hours in large codebases."
          author="Capstone"
          date="June 4, 2025"
          tags={["AI", "Testing", "Ideas"]}
          wordCount={19}
        />
      </div>
      <div className="max-w-xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold text-[#096B68]">Sample Post</h1>
        <p className="text-gray-700">
          Imagine a blogging platform that supports both long-form tutorials and quick 200-word idea posts. That’s Dost.
        </p>

        {/* Reactions */}
        <EmojiReactionsBar />
      </div>
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-xl font-semibold text-[#096B68] mb-4">Comments</h2>
        <CommentThread comments={sampleComments} />
      </div>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-[#096B68] mb-6">Write a Blog Post</h1>
        <MarkdownEditorStub />
      </div>
    </div>
  );
}

import CommentThread from "@/components/CommentThread";

const sampleComments = [
  {
    id: 1,
    author: "Priya",
    content: "Great post! Here's a fix:\n```console.log('Hello Dost')```",
    date: "June 4, 2025",
    replies: [
      {
        id: 2,
        author: "Sai",
        content: "Thanks! #AppreciateThat",
        date: "June 4, 2025",
      },
    ],
  },
  {
    id: 3,
    author: "Harshini",
    content: "Would love a post on #MicroPosts design patterns!",
    date: "June 4, 2025",
  },
];