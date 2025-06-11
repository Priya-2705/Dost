"use client";

import { useState } from "react";

interface EditPostFormProps {
  post: {
    _id: string;
    title: string;
    content: string;
    tags: string[];
  };
  onCancel: () => void;
  onSave: (updatedPost: any) => void;
}

const EditPostForm: React.FC<EditPostFormProps> = ({ post, onCancel, onSave }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [tags, setTags] = useState(post.tags.join(", "));

  return (
    <div className="bg-white border border-[#90D1CA] p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold text-[#096B68]">Edit Post</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />

      <textarea
        rows={6}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded font-mono"
      />

      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Comma-separated tags"
        className="w-full p-2 border border-gray-300 rounded"
      />

      <div className="flex gap-4 justify-end">
        <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
        <button
          onClick={() =>
            onSave({
              _id: post._id,
              title,
              content,
              tags: tags.split(",").map((t) => t.trim()),
            //   author: post.author,
            })
          }
          className="px-4 py-2 bg-[#096B68] text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditPostForm;