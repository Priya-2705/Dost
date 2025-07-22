// app/tags/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface TagData {
  tag: string;
  count: number;
}

export default function TagsPage() {
  const [tags, setTags] = useState<TagData[]>([]);
  const [followedTags, setFollowedTags] = useState<string[]>([]);
  const [hiddenTags, setHiddenTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    fetchTags();
    fetchUserTags();
  }, []);

  const fetchTags = async () => {
    try {
      const res = await fetch('/api/tags');
      const data = await res.json();
      setTags(data.tags || []);
    } catch (err) {
      toast.error('Failed to load tags');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserTags = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFollowedTags(data.user.followedTags || []);
      setHiddenTags(data.user.hiddenTags || []);
    } catch {
      toast.error('Could not load user tags');
    }
  };

  const updateTag = async (tag: string, action: 'follow' | 'unfollow' | 'hide' | 'unhide') => {
    if (!token) return toast.error('Login required');

    try {
      const res = await fetch('/api/user/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ tag, action }),
      });

      const data = await res.json();
      if (!res.ok) return toast.error(data.error || 'Failed');

      toast.success(data.message || 'Updated');

      // Update local state
      if (action === 'follow') setFollowedTags([...followedTags, tag]);
      if (action === 'unfollow') setFollowedTags(followedTags.filter((t) => t !== tag));
      if (action === 'hide') setHiddenTags([...hiddenTags, tag]);
      if (action === 'unhide') setHiddenTags(hiddenTags.filter((t) => t !== tag));
    } catch (err) {
      toast.error('Error updating tag');
    }
  };

  if (loading) return <div className="p-10">Loading tags...</div>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Explore Tags</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tags.map(({ tag, count }) => {
          const isFollowed = followedTags.includes(tag);
          const isHidden = hiddenTags.includes(tag);

          return (
            <div key={tag} className="p-4 bg-white shadow rounded border">
              <div className="flex justify-between items-center">
                <Link href={`/tags/${tag}`}>
                  <span className="text-blue-600 font-semibold text-lg hover:underline cursor-pointer">
                    #{tag}
                  </span>
                </Link>
                <span className="text-gray-500 text-sm">{count} posts</span>
              </div>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => updateTag(tag, isFollowed ? 'unfollow' : 'follow')}
                  className={`px-3 py-1 rounded text-sm ${
                    isFollowed ? 'bg-gray-300 text-gray-800' : 'bg-blue-600 text-white'
                  }`}
                >
                  {isFollowed ? 'Unfollow' : 'Follow'}
                </button>
                <button
                  onClick={() => updateTag(tag, isHidden ? 'unhide' : 'hide')}
                  className={`px-3 py-1 rounded text-sm ${
                    isHidden ? 'bg-yellow-300 text-gray-900' : 'bg-red-600 text-white'
                  }`}
                >
                  {isHidden ? 'Unhide' : 'Hide'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}