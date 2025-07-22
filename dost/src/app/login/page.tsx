'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Something went wrong');
      return;
    }

    localStorage.setItem('token', data.token);
    window.dispatchEvent(new Event('login'));
    router.push('/dashboard');
  };

  return (
    <div className="p-20 bg-[#f1f5f9] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl shadow-xl bg-white border border-[#003366] p-8">
        <h2 className="text-3xl font-extrabold text-center text-[#001B3A] mb-6 tracking-wide">
          Login to Dost
        </h2>

        {error && (
          <p className="text-sm text-red-500 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="form-input w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="form-input w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full mt-2 bg-[#F3507A] text-white font-bold py-2 rounded-lg shadow-md hover:bg-[#F0543E] transition"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-700 mt-4">
            Don&apos;t have an account?{' '}
            <a href="/register" className="text-[#3AB0E2] hover:underline">
              Register
            </a>
          </p>
        </form>
      </div>

      <style jsx>{`
        .form-input {
          padding: 0.6rem 0.75rem;
          border: 1.5px solid #cbd5e1;
          border-radius: 0.5rem;
          font-size: 0.95rem;
          outline: none;
          transition: border 0.2s, box-shadow 0.2s;
        }
        .form-input:focus {
          border-color: #3AB0E2;
          box-shadow: 0 0 0 2px rgba(58, 176, 226, 0.3);
        }
      `}</style>
    </div>
  );
}