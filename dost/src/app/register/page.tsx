'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    password: '',
    profession: '',
    address: '',
  });

  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isOver18 = (dob: string) => {
    const dobDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();
    const m = today.getMonth() - dobDate.getMonth();
    return age > 18 || (age === 18 && m >= 0 && today.getDate() >= dobDate.getDate());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isOver18(form.dob)) {
      setError('You must be at least 18 years old to register.');
      return;
    }

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Registration failed');
      return;
    }

    router.push('/login');
  };

  return (
    <div className="p-20 bg-[#f1f5f9] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl shadow-xl bg-white border border-[#003366] p-8">
        <h2 className="text-3xl font-extrabold text-center text-[#001B3A] mb-6 tracking-wide">
          Create Account
        </h2>

        {error && (
          <p className="text-sm text-red-500 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <input
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              required
              className="form-input"
            />
            <input
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <input
            name="dob"
            type="date"
            onChange={handleChange}
            required
            className="form-input w-full"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="form-input w-full"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="form-input w-full"
          />
          <input
            name="profession"
            placeholder="Profession"
            onChange={handleChange}
            required
            className="form-input w-full"
          />
          <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
            required
            className="form-input w-full"
          />

          <button
            type="submit"
            className="w-full mt-2 bg-[#F3507A] text-white font-bold py-2 rounded-lg shadow-md hover:bg-[#F0543E] transition"
          >
            Register
          </button>

          <p className="text-sm text-center text-gray-700 mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-[#3AB0E2] hover:underline">
              Login
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