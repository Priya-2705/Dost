'use client';
import { useEffect, useState } from 'react';

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
      <ul className="space-y-1 text-gray-700">
        {tags.length > 0 ? (
          tags.map((tag, idx) => <li key={idx}>#{tag}</li>)
        ) : (
          <li className="text-gray-400 italic">No tags found.</li>
        )}
      </ul>
    </div>
  );
}