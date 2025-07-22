'use client';

import { useEffect, useRef, useState } from 'react';
import AllPosts from '@/components/AllPosts';
import Link from 'next/link';
import UserPreviewModal from '@/components/UserPreviewModal';

interface Post {
  _id: string;
  title: string;
  content: string;
  userId: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  tags: string[];
  createdAt: string;
}

export default function ExplorePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts/explore');
        const data = await res.json();
        setPosts(data.posts || []);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Handle clicks outside dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const query = search.toLowerCase();

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query) ||
    post.content.toLowerCase().includes(query)
  );

  const matchedTags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).filter((tag) => tag.toLowerCase().includes(query));

  const matchedPeople = Array.from(
    new Set(posts.map((post) => `${post.userId.firstName} ${post.userId.lastName}`))
  ).filter((name) => name.toLowerCase().includes(query));

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 relative">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore</h1>

      <div className="relative" ref={wrapperRef}>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowDropdown(e.target.value.length > 0);
          }}
          onFocus={() => setShowDropdown(search.length > 0)}
          placeholder="Search posts, tags, or people..."
          className="w-full border px-4 py-2 rounded mb-2"
        />

        {showDropdown && (
          <div className="absolute z-10 w-full bg-white shadow-lg rounded border max-h-64 overflow-y-auto">
            {/* Posts */}
            {filteredPosts.length > 0 && (
              <div className="px-4 py-2 border-b font-semibold text-[#001B3A]">Posts</div>
            )}
            {filteredPosts.map((post) => (
              <Link
                key={post._id}
                href={`/posts/${post._id}`}
                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {post.title}
              </Link>
            ))}

            {/* Tags */}
            {matchedTags.length > 0 && (
              <div className="px-4 py-2 border-b font-semibold text-[#001B3A] mt-2">Tags</div>
            )}
            {matchedTags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                #{tag}
              </Link>
            ))}

            {/* People */}
            {matchedPeople.length > 0 && (
              <div className="px-4 py-2 border-b font-semibold text-[#001B3A] mt-2">People</div>
            )}
            {matchedPeople.map((person) => {
              const matchedUser = posts.find(
                (p) => `${p.userId.firstName} ${p.userId.lastName}` === person
              );

              return matchedUser ? (
                <div
                  key={person}
                  onClick={() => {
                    setSelectedUserId((matchedUser as any).userId._id);
                    setShowDropdown(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {person}
                </div>
              ) : null;
            })}
          </div>
        )}
      </div>

      <div className="mt-6">
        {loading ? (
          <p className="text-center">Loading posts...</p>
        ) : (
          <AllPosts posts={posts} />
        )}
      </div>
      {selectedUserId && (
        <UserPreviewModal
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
    </div>
  );
}