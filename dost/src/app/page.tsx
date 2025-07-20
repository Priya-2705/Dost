'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

export default function HomePage() {
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

  const topPost = filtered[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001B3A] to-[#003366] text-white">
      {/* Top Story */}
      {topPost && (
        <section className="relative px-6 py-16 text-center">
          <h2 className="text-sm uppercase tracking-wide text-sky-300 mb-3">Top Story</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white max-w-4xl mx-auto">
            {topPost.title}
          </h1>
          <p className="text-blue-200 mt-4 max-w-2xl mx-auto line-clamp-3">{topPost.content}</p>
          <Link
            href={`/posts/${topPost._id}`}
            className="mt-6 inline-block bg-[#F3507A] px-6 py-2 rounded text-white font-semibold hover:bg-[#F0543E] transition"
          >
            Continue Reading →
          </Link>
        </section>
      )}

      {/* Search */}
      <div className="max-w-4xl mx-auto px-4 mt-10">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-lg text-black focus:outline-none focus:ring-2 ring-sky-400 mb-10"
        />
      </div>

      {/* Post Grid */}
      <section className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
        {filtered.slice(1).map(post => (
          <Link href={`/posts/${post._id}`} key={post._id}>
            <div className="bg-white text-black p-5 rounded-xl shadow hover:shadow-xl transition border border-gray-100 hover:border-sky-300">
              <h3 className="text-lg font-bold mb-2 text-[#003366]">{post.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-3">{post.content}</p>
              <div className="mt-3 text-xs text-gray-500">
                By {post.userId.firstName} {post.userId.lastName} — {new Date(post.createdAt).toLocaleDateString()}
              </div>
              <div className="flex flex-wrap mt-3 gap-1">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}