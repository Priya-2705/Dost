'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const reactionEmojis = {
  heart: '❤️',
  clap: '👏',
  fire: '🔥',
  mindblown: '🤯',
};

type ReactionType = keyof typeof reactionEmojis;

export default function ReactionsBar({
  postId,
  initialReactions,
}: {
  postId: string;
  initialReactions: Record<ReactionType, number>;
}) {
  const [reactions, setReactions] = useState(initialReactions);
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const total = Object.values(reactions).reduce((sum, n) => sum + n, 0);
  const mostUsed = Object.entries(reactions).reduce(
    (a, b) => (b[1] > a[1] ? b : a),
    ['heart', 0]
  )[0] as ReactionType;

  const handleReaction = async (type: ReactionType) => {
    setShowPicker(false);
    try {
      const res = await fetch(`/api/posts/${postId}/react`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reactionType: type }),
      });

      const data = await res.json();
      if (data.reactions) {
        setReactions(data.reactions);
      }
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  };

  // Close picker on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="mt-8 flex flex-col items-start space-y-3">
      {/* Reaction Pills */}
      <div className="flex gap-4 flex-wrap text-xl text-gray-700">
        {(Object.keys(reactions) as ReactionType[]).map((type) =>
          reactions[type] > 0 ? (
            <motion.span
              key={type}
              layout
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                type === mostUsed
                  ? 'bg-pink-200 text-pink-700 font-semibold'
                  : 'bg-gray-100'
              }`}
            >
              {reactionEmojis[type]} {reactions[type]}
            </motion.span>
          ) : null
        )}
      </div>

      {/* Trigger + Picker */}
      <div
        className="relative"
        ref={pickerRef}
        onMouseEnter={() => setShowPicker(true)}
        onMouseLeave={() => setShowPicker(false)}
        onClick={() => setShowPicker((prev) => !prev)} // also support tap
      >
        <button className="flex items-center gap-2 px-8 py-2 bg-blue-100 rounded-full shadow-sm hover:bg-pink-200 transition">
          <img src="/icons/reaction-trigger.png" alt="React" className="w-8 h-8" />
          <span className="text-pink-600 font-semibold text-lg">{total}</span>
        </button>

        <AnimatePresence>
          {showPicker && (
            <motion.div
              className="absolute z-10 top-12 left-0 bg-white border rounded-xl shadow-xl px-3 py-2 flex gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              {(Object.keys(reactionEmojis) as ReactionType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => handleReaction(type)}
                  className="hover:scale-125 transition-transform text-2xl"
                  title={type}
                >
                  {reactionEmojis[type]}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}