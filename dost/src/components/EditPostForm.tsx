// components/EditPostForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditPostForm({ post }: { post: any }) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [tags, setTags] = useState(post.tags.join(', '));
  const [isPublic, setIsPublic] = useState(post.isPublic);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`/api/posts/${post._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content,
        tags: tags.split(',').map((tag: string) => tag.trim()),
        isPublic,
        }),
    });

    router.push('/myposts');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        className="w-full border p-2"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border p-2 h-40"
        placeholder="Post Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="text"
        className="w-full border p-2"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        Public Post
      </label>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Save Changes
      </button>
    </form>
  );
}