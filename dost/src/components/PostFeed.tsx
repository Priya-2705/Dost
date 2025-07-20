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

export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/posts/explore');
        const data = await res.json();
        setPosts(data.posts || []);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-[#003366] mb-4">📰 Recent Posts</h2>

      {loading ? (
        <p className="text-gray-500">Loading feed...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-400 italic">No posts found.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Link href={`/posts/${post._id}`} key={post._id}>
              <div className="bg-white p-6 rounded shadow hover:shadow-lg transition cursor-pointer">
                <h3 className="text-xl font-bold text-[#001B3A] hover:underline">{post.title}</h3>
                <p className="text-gray-700 mt-2 line-clamp-3">{post.content}</p>
                <div className="text-sm text-gray-500 mt-2">
                  By {post.userId.firstName} {post.userId.lastName} —{' '}
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}