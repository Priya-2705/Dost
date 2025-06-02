'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function SignupPage() {
  const [form, setForm] = useState({ email: '', password: '', confirm: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("Passwords do not match");
      return;
    }
    console.log('Signup Attempt:', form);
    alert("Signup info submitted (check console)");
  };

  return (
    <section className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="confirm"
          type="password"
          placeholder="Confirm Password"
          value={form.confirm}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Sign Up
        </button>
      </form>
      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </section>
  );
}