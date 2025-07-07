'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkToken(); // on mount

    // ✅ Listen to login/logout events
    window.addEventListener('login', checkToken);
    window.addEventListener('logout', checkToken);

    return () => {
      window.removeEventListener('login', checkToken);
      window.removeEventListener('logout', checkToken);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('logout')); // 👈 trigger logout event
    router.push('/login');
  };

  const isHome = pathname === '/';

  return (
    <nav className="h-20 z-50 px-6 py-3 pt-6 fixed top-0 left-0 right-0 backdrop-blur-md bg-teal-900 text-white shadow">

      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-red-300">DOST</Link>
        <div className="space-x-4">
          <Link href="/" className="hover:text-teal-300 pr-10">Home</Link>
          <Link href="/posts" className="hover:text-teal-300 pr-10">Explore</Link>
          {isLoggedIn && (
            <Link href="/dashboard" className="hover:text-teal-300 pr-10">Dashboard</Link>
          )}
          {isLoggedIn && (
            <Link href="/myposts" className="hover:text-teal-300 pr-10">My Posts</Link>
          )}

          {isLoggedIn ? (
            <button onClick={handleLogout} className="bg-red-100 p-2 text-blue-700 hover:text-red-600">Logout</button>
          ) : (
            <Link href="/login" className="bg-red-100 p-2 text-blue-700 hover:text-blue-600">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}