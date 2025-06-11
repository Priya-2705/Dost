"use client";

import { useEffect, useState } from "react";
import PostCard from "@/components/PostCard";
import EditPostForm from "@/components/EditPostForm";

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  tags: string[];
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if (res.ok) fetchPosts();
  };

  const handleUpdate = async (updatedPost: Post) => {
    const res = await fetch(`/api/posts/${updatedPost._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPost),
    });
    if (res.ok) {
      setEditingPost(null);
      fetchPosts();
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold text-[#096B68] mb-6">Latest Posts</h1>

      {editingPost && (
        <EditPostForm
          post={editingPost}
          onCancel={() => setEditingPost(null)}
          onSave={handleUpdate}
        />
      )}

      {posts.map((post) => (
      <div key={post._id} className="mb-6">
        <PostCard
          key={post._id}
          _id={post._id}
          title={post.title}
          content={post.content}
          author={post.author}
          date={new Date(post.createdAt).toLocaleDateString()}
          tags={post.tags}
          onDelete={() => handleDelete(post._id)}
          onEdit={() => setEditingPost(post)}
        />
      </div>
    ))}
    </div>
  );
}