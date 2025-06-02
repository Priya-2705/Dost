export default function TagFilter({ tags }: { tags: string[] }) {
  return (
    <div className="flex gap-2 flex-wrap mb-4">
      {tags.map((tag) => (
        <button
          key={tag}
          className="px-3 py-1 bg-gray-100 text-sm rounded hover:bg-blue-100 text-gray-700"
        >
          #{tag}
        </button>
      ))}
    </div>
  );
}