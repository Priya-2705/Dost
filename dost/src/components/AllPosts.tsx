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
    avatar?: string;
  };
  tags: string[];
  createdAt: string;
}

// Accept posts via props
export default function AllPosts({ posts }: { posts: Post[] }) {
  return (
    <section className="mt-10">
      {posts.length === 0 ? (
        <p className="text-gray-400 italic">No posts found.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post, index) => (
            <div key={post._id} className="space-y-4">
              <Link href={`/posts/${post._id}`}>
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 cursor-pointer">
                  {/* Author and Avatar Row */}
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

                  {/* Post Title and Content */}
                  <h3 className="text-lg sm:text-xl font-semibold text-[#001B3A] mb-2 hover:underline">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed line-clamp-3">
                    {post.content}
                  </p>

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>

              {/* Divider except after last post */}
              {index < posts.length - 1 && <hr className="border-gray-200" />}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}