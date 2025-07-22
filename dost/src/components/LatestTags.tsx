'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LatestTags() {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    async function fetchTags() {
      const res = await fetch('/api/tags/latest');
      if (res.ok) {
        const data = await res.json();
        setTags(data.tags);
      }
    }

    fetchTags();
  }, []);

  return (
    <div className="bg-[#f0f4f8] p-4 rounded-lg shadow-sm border-l-4 border-[#3AB0E2] text-sm">
      <h3 className="text-[#003366] font-semibold mb-2">🏷️ Latest Tags</h3>
      {tags.length > 0 ? (
        <ul className="space-y-2">
          {tags.map((tag, idx) => (
            <li key={idx}>
              <Link
                href={`/tags/${tag}`}
                className="inline-block bg-sky-100 text-sky-800 hover:bg-sky-200 px-3 py-1 rounded-full text-xs font-medium transition"
              >
                #{tag}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 italic">No tags found.</p>
      )}
    </div>
  );
}