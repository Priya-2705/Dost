// components/TagBadge.tsx
import React from "react";

interface TagBadgeProps {
  label: string;
  onClick?: () => void;
  selected?: boolean;
}

const TagBadge: React.FC<TagBadgeProps> = ({ label, onClick, selected = false }) => {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1 rounded-full font-semibold border transition 
        ${
          selected
            ? "bg-[#096B68] text-white border-[#096B68]"
            : "bg-[#FFFBDE] text-[#096B68] border-[#90D1CA] hover:bg-[#90D1CA] hover:text-white"
        }`}
    >
      #{label}
    </button>
  );
};

export default TagBadge;