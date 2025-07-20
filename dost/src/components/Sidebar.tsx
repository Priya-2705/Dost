'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  if (pathname !== '/') return null;

  return (
    <aside className="w-64 bg-white text-black hidden md:flex flex-col pt-10 px-9 shadow-md h-screen">
      <nav className="flex flex-col gap-3 text-gray-700 text-sm">
        <Link href="/" className="hover:text-[#F3507A]">🏡 Home</Link>
        <Link href="/posts" className="hover:text-[#F3507A]">📝 Posts</Link>
        <Link href="/tags" className="hover:text-[#F3507A]">🏷️ Tags</Link>
        <Link href="/faqs" className="hover:text-[#F3507A]">❓ FAQs</Link>
        <Link href="/about" className="hover:text-[#F3507A]">ℹ️ About</Link>
        <Link href="/contact" className="hover:text-[#F3507A]">✉️ Contact</Link>
      </nav>
    </aside>
  );
}