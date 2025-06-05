// components/MicroIdeaCard.tsx
import React from "react";

interface MicroIdeaCardProps {
  content: string;
  author: string;
  date: string;
  tags: string[];
  wordCount: number;
}

const MicroIdeaCard: React.FC<MicroIdeaCardProps> = ({
  content,
  author,
  date,
  tags,
  wordCount,
}) => {
  return (
    <div className="bg-white border-l-4 border-[#129990] shadow-sm hover:shadow-md transition duration-300 rounded-lg p-5 space-y-3">
      
      {/* Content */}
      <p className="text-gray-800 text-base leading-relaxed">
        {content}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-[#90D1CA] text-[#096B68] text-xs px-2 py-0.5 rounded-full font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-sm text-gray-600 border-t pt-3">
        <span>By <span className="text-[#096B68] font-semibold">{author}</span></span>
        <div className="flex items-center gap-2">
          <span>{date}</span>
          <span className="bg-[#FFFBDE] text-[#129990] px-2 py-0.5 rounded-full text-xs">
            {wordCount} words
          </span>
        </div>
      </div>
    </div>
  );
};

export default MicroIdeaCard;