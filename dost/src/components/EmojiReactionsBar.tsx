// components/EmojiReactionsBar.tsx
"use client";

import React, { useState } from "react";

interface Reaction {
  emoji: string;
  label: string;
}

const reactions: Reaction[] = [
  { emoji: "👏", label: "Applause" },
  { emoji: "💡", label: "Insight" },
  { emoji: "🤯", label: "Mindblown" },
];

const EmojiReactionsBar: React.FC = () => {
  const [counts, setCounts] = useState<number[]>(reactions.map(() => 0));

  const handleReact = (index: number) => {
    const newCounts = [...counts];
    newCounts[index]++;
    setCounts(newCounts);
  };

  return (
    <div className="flex gap-4 mt-4">
      {reactions.map((reaction, index) => (
        <button
          key={reaction.label}
          onClick={() => handleReact(index)}
          className="flex items-center gap-2 bg-[#FFFBDE] border border-[#90D1CA] text-[#096B68] px-3 py-1 rounded-full text-sm font-medium hover:bg-[#90D1CA] hover:text-white transition"
        >
          <span className="text-lg">{reaction.emoji}</span>
          <span>{counts[index]}</span>
        </button>
      ))}
    </div>
  );
};

export default EmojiReactionsBar;