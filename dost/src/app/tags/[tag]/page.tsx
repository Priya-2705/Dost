'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Post {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}

export default function TagDetailPage() {
  const { tag } = useParams() as { tag: string };
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/posts/by-tag?tag=${tag}`, { cache: 'no-store' });

        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        setPosts(data.posts || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [tag]);

  if (loading) return <p className="text-gray-500">Loading posts for #{tag}...</p>;

  return (
    <section className="min-h-screen bg-[#f8fafc] px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#003366] mb-6 border-b pb-2 border-blue-200">
          Posts tagged with <span className="text-[#F0543E]">#{tag}</span>
        </h1>

        {posts.length === 0 ? (
          <p className="text-gray-400 italic text-center mt-20">No posts found for this tag.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post, index) => (
              <div key={post._id} className="space-y-4">
                <Link href={`/posts/${post._id}`}>
                  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 cursor-pointer">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <Image
                        src={post.userId.avatar || '/default-avatar.png'}
                        alt="User avatar"
                        width={40}
                        height={40}
                        className="rounded-full object-cover aspect-square border shadow-sm"
                      />
                      <div className="text-sm text-gray-600">
                        <span className="font-medium text-gray-800">
                          {post.userId.firstName} {post.userId.lastName}
                        </span>{' '}
                        • {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg sm:text-xl font-semibold text-[#001B3A] mb-2 hover:underline">
                      {post.title}
                    </h3>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed line-clamp-3">
                      {post.content}
                    </p>

                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {post.tags.map((t) => (
                        <Link
                          key={t}
                          href={`/tags/${t}`}
                          className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium hover:bg-blue-200"
                        >
                          #{t}
                        </Link>
                      ))}
                    </div>
                  </div>
                </Link>
                {index < posts.length - 1 && <hr className="border-gray-200" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}