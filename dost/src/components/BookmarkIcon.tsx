// components/BookmarkIcon.tsx
"use client";

import React, { useState } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

interface BookmarkIconProps {
  initialState?: boolean;
  onToggle?: (state: boolean) => void;
}

const BookmarkIcon: React.FC<BookmarkIconProps> = ({
  initialState = false,
  onToggle,
}) => {
  const [bookmarked, setBookmarked] = useState(initialState);

  const toggleBookmark = () => {
    const newState = !bookmarked;
    setBookmarked(newState);
    if (onToggle) onToggle(newState);
  };

  return (
    <button
      onClick={toggleBookmark}
      className="p-2 rounded-full hover:bg-[#FFFBDE] transition border border-transparent hover:border-[#90D1CA]"
      title={bookmarked ? "Remove Bookmark" : "Add Bookmark"}
    >
      {bookmarked ? (
        <BsBookmarkFill className="text-[#096B68] text-xl" />
      ) : (
        <BsBookmark className="text-gray-500 text-xl" />
      )}
    </button>
  );
};

export default BookmarkIcon;