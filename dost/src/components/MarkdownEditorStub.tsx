// components/MarkdownEditorStub.tsx
"use client";

import React, { useState } from "react";
import { BsTypeBold, BsCode, BsLink } from "react-icons/bs";
import { PiTextHOneBold } from "react-icons/pi"; // ✅ replacement for H1

const MarkdownEditorStub: React.FC = () => {
  const [content, setContent] = useState("");

  return (
    <div className="bg-[#FFFBDE] border border-[#90D1CA] rounded-xl p-6 shadow-sm space-y-4">
      
      {/* Toolbar */}
      <div className="flex gap-4 text-[#096B68]">
        <button title="Heading"><PiTextHOneBold className="text-xl" /></button>
        <button title="Bold"><BsTypeBold className="text-xl" /></button>
        <button title="Code Block"><BsCode className="text-xl" /></button>
        <button title="Link"><BsLink className="text-xl" /></button>
      </div>

      {/* Title Input */}
      <input
        type="text"
        placeholder="Post Title"
        className="w-full p-3 border border-[#90D1CA] rounded-md text-lg font-semibold text-[#096B68] placeholder-gray-400"
      />

      {/* Markdown Text Area */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        placeholder="Write your markdown here..."
        className="w-full p-4 border border-[#90D1CA] rounded-md bg-white text-gray-800 placeholder-gray-500 font-mono"
      />
    </div>
  );
};

export default MarkdownEditorStub;