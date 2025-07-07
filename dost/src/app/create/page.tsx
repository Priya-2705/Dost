'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CreatePostPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    content: '',
    tags: '',
    isPublic: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value, type } = e.target;

  if (type === 'checkbox') {
    const checkbox = e.target as HTMLInputElement;
    setForm({ ...form, [name]: checkbox.checked });
  } else {
    setForm({ ...form, [name]: value });
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) return toast.error('You must be logged in.');

    const res = await fetch('/api/posts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      toast.error(data.error || 'Failed to create post');
    } else {
      toast.success('Post created!');
      router.push('/myposts');
    }
  };

  return (
    <div className="pt-30 pb-30 bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-semibold mb-6 text-center">Create New Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Content</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={6}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Tags (comma separated)</label>
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="e.g. React, DevOps"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isPublic"
              checked={form.isPublic}
              onChange={handleChange}
            />
            <label className="text-sm">Make this post public</label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Publish Post
          </button>
        </form>
      </div>
    </div>
  );
}