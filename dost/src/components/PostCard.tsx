// components/PostCard.tsx
import React from "react";

interface PostCardProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  tags: string[];
}

const PostCard: React.FC<PostCardProps> = ({ title, excerpt, author, date, tags }) => {
  return (
    <div className="bg-[#FFFBDE] shadow-md hover:shadow-lg transition duration-300 rounded-xl p-6 border border-[#90D1CA]">
      
      {/* Title */}
      <h2 className="text-2xl font-semibold text-[#096B68] mb-2">{title}</h2>

      {/* Excerpt */}
      <p className="text-gray-700 mb-4">{excerpt}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="text-sm bg-[#129990] text-white px-2 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>By <span className="font-medium text-[#096B68]">{author}</span></span>
        <span>{date}</span>
      </div>
    </div>
  );
};

export default PostCard;