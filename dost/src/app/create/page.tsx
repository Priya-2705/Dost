'use client';

import dynamic from 'next/dynamic';
import CreatableSelect from 'react-select/creatable';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

import 'react-markdown-editor-lite/lib/index.css';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });
const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), { ssr: false });

const defaultTagOptions = [
  { value: 'programming', label: '#programming' },
  { value: 'java', label: '#java' },
  { value: 'webdev', label: '#webdev' },
  { value: 'devops', label: '#devops' },
  { value: 'design', label: '#design' },
];

export default function CreatePostPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    content: '',
    tags: [] as { label: string; value: string }[],
    isPublic: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | { name: string; value: any }
  ) => {
    if ('name' in e) {
      setForm((prev) => ({ ...prev, [e.name]: e.value }));
    } else {
      const { name, value, type, checked } = e.target;
      setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
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
        title: form.title,
        content: form.content,
        isPublic: form.isPublic,
        tags: form.tags.map((t) => t.value),
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
    <div className="pt-15 pb-15 bg-blue-50 p-6 flex justify-center">
      <div className="w-[70%] bg-white p-6 rounded-xl shadow">
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
            <MDEditor
              value={form.content}
              onChange={(val = '') => setForm({ ...form, content: val })}
              height={300}
              preview="edit"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Tags</label>
            <CreatableSelect
              isMulti
              options={defaultTagOptions}
              value={form.tags}
              onChange={(value) => handleChange({ name: 'tags', value })}
              placeholder="Add or select tags..."
              className="react-select-container"
              classNamePrefix="react-select"
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

      <style jsx global>{`
        .markdown-preview ul {
          list-style-type: square;
          padding-left: 1.5rem;
        }
        .react-select__multi-value {
          background-color: #e0e7ff;
        }
        .react-select__multi-value__label {
          font-size: 0.875rem;
          color: #1e40af;
        }
        .react-select__control {
          padding: 2px;
        }
      `}</style>
    </div>
  );
}