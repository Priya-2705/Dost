// components/Navbar.tsx
"use client";

import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="text-gray-600 body-font bg-white shadow-sm">
      <div className="container mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center justify-between">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center title-font font-medium text-[#096B68]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8 bg-[#129990] text-white p-1 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-2 text-xl font-semibold">Dost</span>
        </Link>

        {/* Nav Links */}
        <nav className="flex gap-6 items-center text-base">
          <Link href="/">Home</Link>
          <Link href="/create">Create Post</Link>
          <Link href="/bookmarks">Bookmarks</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link
            href="/signin"
            className="bg-[#129990] text-white px-4 py-1 rounded hover:bg-[#096B68] text-sm"
          >
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;