'use client';

import Sidebar from '@/components/Sidebar';
import QuoteOfTheDay from '@/components/QuoteOfTheDay';
import LatestTags from '@/components/LatestTags';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import HomeFeed from '@/components/HomeFeed';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<{
    posts: { _id: string; title: string }[];
    users: { _id: string; firstName: string; lastName: string }[];
    tags: string[];
  } | null>(null);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (search.trim() === '') {
        setResults(null);
        return;
      }

      const res = await fetch(`/api/search?q=${encodeURIComponent(search.trim())}`);
      const data = await res.json();
      setResults(data);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-black w-full">
      <div className="max-w-8xl mx-auto flex gap-6 px-4 py-8">

        {/* Left Sidebar */}
        <aside className="hidden md:block w-60">
          <div className="bg-[#f0f4f8] p-4 rounded-lg shadow-sm border-l-4 border-[#003366] text-sm h-full min-h-screen">
            <Sidebar />
          </div>
        </aside>

        {/* Center Main Feed */}
        <main className="flex-[5] min-w-0">
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

              {/* CTA Buttons */}
              <div className="mt-4 flex justify-center gap-3 flex-wrap">
                <Link href="/create">
                  <button className="bg-[#F3507A] hover:bg-[#e6476f] text-white px-4 py-2 rounded-md text-sm font-medium transition shadow-sm">
                    🔥 Create Post
                  </button>
                </Link>
                <Link href="/posts">
                  <button className="bg-white text-[#003366] hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition shadow-sm">
                    📚 Explore Posts
                  </button>
                </Link>
              </div>
            </div>
          </section>

          {/* Feed */}
          <div className="mt-10">
            <HomeFeed />
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden lg:block w-64 space-y-6 pt-2">
          <div className="sticky top-4 space-y-6">
            <QuoteOfTheDay />
            <LatestTags />
            <div className="bg-[#f0f4f8] p-4 rounded-lg shadow-sm border-l-4 border-[#F0543E] text-sm">
              <h3 className="text-[#003366] font-semibold mb-2">🔥 Trending Posts</h3>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                <li><Link href="/posts/post-1" className="hover:underline">Why Tailwind is Still Underrated</Link></li>
                <li><Link href="/posts/post-2" className="hover:underline">10x Your Dev Logs with Markdown</Link></li>
                <li><Link href="/posts/post-3" className="hover:underline">React vs Signals — Deep Dive</Link></li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}