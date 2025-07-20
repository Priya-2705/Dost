'use client';

import Sidebar from '@/components/Sidebar';
import { Quote } from 'lucide-react';
import Link from 'next/link';
import QuoteOfTheDay from '@/components/QuoteOfTheDay';
import LatestTags from '@/components/LatestTags';
import PostFeed from '@/components/PostFeed';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-black flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content + Right Column */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Center Main Content */}
        <main className="flex-1 px-6 py-8">
          {/* Hero Section */}
          <section
            className="relative w-full min-h-[22vh] bg-cover bg-center rounded-xl overflow-hidden flex flex-col justify-center items-center text-center px-4 py-8 sm:py-12"
            style={{ backgroundImage: "url('/uploads/dost-bg.jpg')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#001B3A]/40 to-[#003366]/100 z-0" />

            <div className="relative z-10 max-w-2xl w-full animate-fade-in-up">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-md">
                Your ideas belong here.
              </h1>
              <p className="mt-2 text-sm text-sky-200">
                Share what you know. Learn what you don’t. Build with the community.
              </p>

              {/* Search Bar */}
              <div className="mt-4 flex justify-center">
                <input
                  type="text"
                  placeholder="Search posts, people, tags..."
                  className="w-full max-w-md px-4 py-2 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 shadow focus:outline-none focus:ring-2 focus:ring-skyBlue text-sm"
                />
              </div>

              {/* CTA Buttons */}
              <div className="mt-4 flex justify-center gap-3 flex-wrap">
                <Link href="/create">
                  <button className="bg-[#F3507A] hover:bg-[#e6476f] text-white px-4 py-2 rounded-md text-sm font-medium transition shadow-sm">
                    🔥 Create Post
                  </button>
                </Link>
                <Link href="/tags">
                  <button className="bg-white text-[#003366] hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition shadow-sm">
                    📚 Explore Tags
                  </button>
                </Link>
              </div>
            </div>
          </section>

          {/* Feed */}
          <PostFeed />
        </main>

        {/* Right Column */}
        <aside className="hidden lg:block w-80 p-6 pt-8 space-y-6">
          {/* 🧠 Quote of the Day */}
          <QuoteOfTheDay />

          {/* 🏷️ Latest Tags */}
          <LatestTags />

          {/* 🔥 Trending Posts */}
          <div className="bg-[#f0f4f8] p-4 rounded-lg shadow-sm border-l-4 border-[#F0543E] text-sm">
            <h3 className="text-[#003366] font-semibold mb-2">🔥 Trending Posts</h3>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li><Link href="/posts/post-1" className="hover:underline">Why Tailwind is Still Underrated</Link></li>
              <li><Link href="/posts/post-2" className="hover:underline">10x Your Dev Logs with Markdown</Link></li>
              <li><Link href="/posts/post-3" className="hover:underline">React vs Signals — Deep Dive</Link></li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}