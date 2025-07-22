// src/app/register/page.tsx
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
    <div className="flex justify-center items-center pt-35 pb-30">
      <form onSubmit={handleSubmit} className="bg-green-100 p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Create Account</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="grid grid-cols-2 gap-4">
          <input name="firstName" placeholder="First Name" onChange={handleChange} required className="p-2 border rounded" />
          <input name="lastName" placeholder="Last Name" onChange={handleChange} required className="p-2 border rounded" />
        </div>

        <input name="dob" type="date" placeholder='dd-mm-yyyy' onChange={handleChange} required className="w-full mt-4 p-2 border rounded" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="w-full mt-4 p-2 border rounded" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="w-full mt-4 p-2 border rounded" />
        <input name="profession" placeholder="Profession" onChange={handleChange} required className="w-full mt-4 p-2 border rounded" />
        <input name="address" placeholder="Address" onChange={handleChange} required className="w-full mt-4 p-2 border rounded" />

        <button type="submit" className="w-full mt-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Register
        </button>
        <p className="mt-4 text-sm text-center">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
}