'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  // Only show sidebar on homepage
  if (pathname !== '/') return null;

  return (
    <aside className="w-64 bg-white border-r hidden md:flex flex-col p-6 pt-16">
      <nav className="flex flex-col gap-3 text-gray-700">
        <Link href="/" className="hover:text-blue-600 pb-2">🏡 Home</Link>
        <Link href="/posts" className="hover:text-blue-600 pb-2">📝 Posts</Link>
        <Link href="/tags" className="hover:text-blue-600 pb-2">🏷️ Tags</Link>
        <Link href="/faqs" className="hover:text-blue-600 pb-2">❓ FAQs</Link>
        <Link href="/about" className="hover:text-blue-600 pb-2">ℹ️ About</Link>
        <Link href="/contact" className="hover:text-blue-600 pb-2">✉️ Contact</Link>
      </nav>
    </aside>
  );
}