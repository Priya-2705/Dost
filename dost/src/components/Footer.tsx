'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Mail, Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return toast.error('Enter a valid email');

    setLoading(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to subscribe');

      toast.success(data.message || 'Subscribed!');
      setEmail('');
    } catch (err: any) {
      toast.error(err.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#001B3A] text-white py-14 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
        {/* Logo & Tagline */}
        <div className="space-y-4 text-left">
          <img src="/footer-logo.png" alt="Dost Logo" className="h-20 w-auto" />
          <p className="text-sm text-gray-300 max-w-sm">
            Dost is where developers, designers, and creatives come together to share, learn, and grow through ideas and code.
          </p>
        </div>

        {/* Navigation */}
        <div className="text-left space-y-2">
          <h3 className="text-lg font-semibold text-[#3AB0E2]">Navigation</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:text-[#F3507A]">Home</a></li>
            <li><a href="/posts" className="hover:text-[#F3507A]">Explore</a></li>
            <li><a href="/faqs" className="hover:text-[#F3507A]">FAQs</a></li>
            <li><a href="/about" className="hover:text-[#F3507A]">About</a></li>
            <li><a href="/contact" className="hover:text-[#F3507A]">Contact</a></li>
          </ul>
        </div>

        {/* Connect / Contact */}
        <div className="text-left space-y-2">
          <h3 className="text-lg font-semibold text-[#3AB0E2]">Connect</h3>
          <p className="text-sm text-gray-300 flex items-center gap-2">
            <Mail size={16} /> hello@dost.dev
          </p>
          <p className="text-sm text-gray-300 flex items-center gap-2">
            <Github size={16} /> @dost-dev
          </p>
          <div className="flex gap-4 mt-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3AB0E2] hover:text-[#F3507A]"
            >
              <Github size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3AB0E2] hover:text-[#F3507A]"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3AB0E2] hover:text-[#F3507A]"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="text-left space-y-3">
          <h3 className="text-lg font-semibold text-[#3AB0E2]">Subscribe</h3>
          <p className="text-sm text-gray-300">Stay up to date with new posts and features.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full sm:w-auto flex-1 px-3 py-2 rounded bg-[#003366] text-white border border-[#3AB0E2] focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#F3507A] hover:bg-[#f1436e] text-white px-4 py-2 rounded"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-[#003366] pt-6 text-sm text-gray-400 text-center">
        © {new Date().getFullYear()}{' '}
        <span className="text-[#F0543E] font-semibold">Dost</span> — Built for thinkers & makers.
      </div>
    </footer>
  );
}