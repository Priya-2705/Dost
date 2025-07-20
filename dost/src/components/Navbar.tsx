
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    window.addEventListener('login', () => setIsLoggedIn(true));
    window.addEventListener('logout', () => setIsLoggedIn(false));
    return () => {
      window.removeEventListener('login', () => setIsLoggedIn(true));
      window.removeEventListener('logout', () => setIsLoggedIn(false));
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('logout'));
    router.push('/login');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore', href: '/posts' },
    ...(isLoggedIn ? [{ name: 'Dashboard', href: '/dashboard' }] : []),
    ...(isLoggedIn ? [{ name: 'My Posts', href: '/myposts' }] : []),
  ];

  const linkClasses = (href: string) =>
    `block px-4 py-2 rounded-md transition ${
      pathname === href
        ? 'text-[#3AB0E2] font-semibold'
        : 'text-white hover:text-[#F3507A]'
    }`;

  return (
    <nav className="fixed p-2 top-0 left-0 right-0 z-50 bg-[#001B3A] backdrop-blur shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Dost Logo"
              className="h-15 w-auto object-contain"
            />
            <span className="text-xl font-bold text-white hidden sm:inline">DOST</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={linkClasses(link.href)}>
                {link.name}
              </Link>
            ))}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-[#F0543E] text-white px-4 py-1 rounded hover:bg-[#d9462e] transition"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-white text-[#003366] px-4 py-1 rounded hover:bg-gray-100"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white hover:text-[#3AB0E2]"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-[#001B3A] px-4 pb-4 pt-2 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={linkClasses(link.href)}
            >
              {link.name}
            </Link>
          ))}
          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="w-full text-left text-white hover:text-[#F3507A] px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 text-white hover:text-[#3AB0E2]"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}