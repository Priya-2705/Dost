'use client';
import { useState } from "react";
import { Post } from "@/components/PostCard";
import PostCard from "@/components/PostCard";

const dummyUserPosts: Post[] = [
  {
    id: "1",
    title: "Learning Tailwind is a game changer",
    type: "markdown",
    tags: ["Tailwind", "CSS"],
    reactions: { clap: 10, idea: 3, mindblown: 2 },
    status: "published",
  },
  {
    id: "2",
    title: "Feature idea: AI-assisted blog draft generator",
    type: "micro",
    tags: ["AI", "Writing"],
    reactions: { clap: 5, idea: 7, mindblown: 1 },
    status: "draft",
  },
  {
    id: "3",
    title: "Best VSCode extensions for frontend devs",
    type: "markdown",
    tags: ["VSCode", "Tools"],
    reactions: { clap: 20, idea: 6, mindblown: 4 },
    status: "bookmarked",
  },
];

type PostStatus = "published" | "draft" | "bookmarked";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<PostStatus>("published");

  const filteredPosts = dummyUserPosts.filter((post) => post.status === activeTab);

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">Your Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {["published", "draft", "bookmarked"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as PostStatus)}
            className={`capitalize px-4 py-2 rounded ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Post List */}
      <div className="grid gap-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className="relative">
              <PostCard post={post} />
              <div className="absolute top-2 right-2 flex gap-2">
                <button className="text-sm text-blue-600 hover:underline">Edit</button>
                <button className="text-sm text-red-600 hover:underline">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No posts in this section.</p>
        )}
      </div>
    </section>
  );
}