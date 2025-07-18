// File: Dost/dost/src/app/posts/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Post {
  _id: string;
  title: string;
  content: string;
  userId: {
    firstName: string;
    lastName: string;
  };
  tags: string[];
  createdAt: string;
}

export default function ExplorePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts/explore');
      const data = await res.json();
      setPosts(data.posts || []);
    };

    fetchPosts();
  }, []);

  const filtered = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Posts</h1>
      
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search posts..."
        className="w-full border px-4 py-2 rounded mb-6"
      />

      {filtered.length === 0 ? (
        <p className="text-gray-500">No posts found.</p>
      ) : (
        <div className="space-y-6">
          {filtered.map(post => (
            <Link href={`/posts/${post._id}`} key={post._id}>
                <div className="bg-white p-6 rounded shadow hover:shadow-lg transition cursor-pointer">
                <h2 className="text-xl font-bold">{post.title}</h2>
                <p className="text-gray-700 mt-2 line-clamp-3">{post.content}</p>
                <div className="text-sm text-gray-500 mt-2">
                    By {post.userId.firstName} {post.userId.lastName} — {new Date(post.createdAt).toLocaleDateString()}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                    <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                        #{tag}
                    </span>
                    ))}
                </div>
                </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}