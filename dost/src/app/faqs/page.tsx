'use client';

import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

interface Faq {
  _id?: string;
  question: string;
  answer: string;
}

interface UserToken {
  role: string;
}

export default function FaqPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [formData, setFormData] = useState<Faq>({ question: '', answer: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [role, setRole] = useState<string>('user');
  const [searchQuery, setSearchQuery] = useState('');

  // Decode role from localStorage token
  const getUserRole = () => {
    const token = localStorage.getItem('token');
    if (!token) return 'user';
    try {
      const decoded = jwtDecode<UserToken>(token);
      return decoded.role;
    } catch {
      return 'user';
    }
  };

  const fetchFaqs = async () => {
    const res = await fetch('/api/faqs');
    const data = await res.json();
    setFaqs(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/faqs/${editingId}` : '/api/faqs';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setFormData({ question: '', answer: '' });
      setEditingId(null);
      fetchFaqs();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this FAQ?')) return;
    const res = await fetch(`/api/faqs/${id}`, { method: 'DELETE' });
    if (res.ok) fetchFaqs();
  };

  const startEdit = (faq: Faq) => {
    setFormData({ question: faq.question, answer: faq.answer });
    setEditingId(faq._id || null);
  };

  const filteredFaqs = faqs.filter(faq =>
  faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
  faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
);

  useEffect(() => {
    fetchFaqs();
    setRole(getUserRole());
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold text-[#096B68]">
        {role === 'superadmin' ? 'Manage FAQs' : 'Frequently Asked Questions'}
      </h1>

      <input
        type="text"
        placeholder="Search FAQs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-2 border border-[#90D1CA] rounded focus:outline-none focus:ring-2 focus:ring-[#096B68] mb-4"
      />

      {/* ✅ Superadmin Only: FAQ Form */}
      {role === 'superadmin' && (
        <form onSubmit={handleSubmit} className="space-y-4 bg-[#FFFBDE] p-6 rounded-xl border border-[#90D1CA]">
          <input
            type="text"
            placeholder="Question"
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            className="w-full border border-[#90D1CA] p-3 rounded"
            required
          />
          <textarea
            placeholder="Answer"
            value={formData.answer}
            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
            className="w-full border border-[#90D1CA] p-3 rounded"
            rows={4}
            required
          />
          <button
            type="submit"
            className="bg-[#096B68] text-white px-6 py-2 rounded hover:bg-[#129990]"
          >
            {editingId ? 'Update FAQ' : 'Add FAQ'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({ question: '', answer: '' });
              }}
              className="ml-4 text-sm text-red-500 underline"
            >
              Cancel
            </button>
          )}
        </form>
      )}

      {/* ✅ FAQ List (Visible to All) */}
      <div className="space-y-4">
        {filteredFaqs.map((faq) => (
          <div
            key={faq._id}
            className="bg-white border border-[#90D1CA] p-4 rounded shadow flex justify-between items-start"
          >
            <div>
              <h2 className="font-semibold text-[#096B68]">{faq.question}</h2>
              <p className="text-gray-700 mt-1">{faq.answer}</p>
            </div>

            {/* ✅ Superadmin Only: Edit/Delete */}
            {role === 'superadmin' && (
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(faq)}
                  className="text-sm bg-[#90D1CA] text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(faq._id!)}
                  className="text-sm bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}