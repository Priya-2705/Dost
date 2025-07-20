'use client';
import { useEffect, useState } from 'react';

export default function QuoteOfTheDay() {
  const [quote, setQuote] = useState<{ text: string; author: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuote() {
      try {
        const res = await fetch('/api/quotes');
        if (res.ok) {
          const data = await res.json();
          setQuote(data.quote); // ✅ fix: access .quote
        } else {
          console.error('Failed to fetch quote');
        }
      } catch (error) {
        console.error('Error fetching quote:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuote();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow text-sm border-l-4 border-pink-300">
      <h3 className="text-[#003366] font-semibold mb-2">🧠 Quote of the Day</h3>

      {loading ? (
        <p className="text-gray-400 italic">Loading a great quote...</p>
      ) : quote ? (
        <>
          <p className="italic text-gray-700">“{quote.text}”</p>
          <p className="text-right text-gray-500 mt-2">— {quote.author}</p>
        </>
      ) : (
        <p className="text-red-400 italic">No quote available today.</p>
      )}
    </div>
  );
}