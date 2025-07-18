'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Post {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  isPublic: boolean;
  createdAt: string;
}

export default function MyPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter((post) =>
  post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  post.content.toLowerCase().includes(searchQuery.toLowerCase())
);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('/api/posts/mine', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) toast.error(data.error);
        else setPosts(data.posts);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Failed to load posts');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-10">Loading posts...</div>;

  const handleDelete = async (postId: string) => {
  const confirm = window.confirm('Are you sure you want to delete this post?');
  if (!confirm) return;

  const token = localStorage.getItem('token');
  const res = await fetch(`/api/posts/delete/${postId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) {
    toast.error(data.error || 'Failed to delete');
  } else {
    toast.success('Post deleted');
    setPosts((prev) => prev.filter((p) => p._id !== postId));
  }
};

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Posts</h1>
        <input
          type="text"
          placeholder="Search your posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
        />
        {filteredPosts.length === 0 ? (
          <p className="text-gray-600">You haven’t created any posts yet.</p>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
            <div key={post._id} className="bg-white p-4 rounded shadow hover:shadow-md transition">
              <div className="flex justify-between items-start">
                <div
                  onClick={() => window.location.href = `/posts/${post._id}`}
                  className="cursor-pointer"
                >
                  <h2 className="text-lg font-semibold hover:text-blue-600">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">{post.content.slice(0, 100)}...</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {post.tags.map((tag, i) => (
                      <span key={i} className="bg-gray-200 text-xs px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 ml-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${post.isPublic ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                    {post.isPublic ? 'Public' : 'Private'}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/posts/edit/${post._id}`)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}
      </div>
    </div>
  );
}