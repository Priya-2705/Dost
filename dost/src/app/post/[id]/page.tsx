import ReactMarkdown from "react-markdown";

const dummyPosts = [
  {
    id: "1",
    title: "Learning Tailwind is a game changer",
    type: "markdown",
    content: `## Why Tailwind?\n\n- No more fighting with class names\n- Design fast, stay consistent\n\n\`\`\`ts\nconst wow = true;\n\`\`\``,
    tags: ["Tailwind", "CSS"],
    reactions: { clap: 10, idea: 3, mindblown: 2 },
  },
  {
    id: "2",
    title: "Dark mode should be default 🔥",
    type: "micro",
    content: "Let’s normalize dark mode as default, not optional. Save eyes, save energy.",
    tags: ["UX", "Design"],
    reactions: { clap: 6, idea: 8, mindblown: 1 },
  },
];

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const post = dummyPosts.find((p) => p.id === params.id);

  if (!post) {
    return <p className="text-red-600">Post not found.</p>;
  }

  return (
    <article className="prose prose-blue max-w-full">
      <h1>{post.title}</h1>
      <div className="flex gap-2 mb-2">
        {post.tags.map((tag) => (
          <span key={tag} className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded">
            #{tag}
          </span>
        ))}
      </div>

      {post.type === "markdown" ? (
        <ReactMarkdown>{post.content}</ReactMarkdown>
      ) : (
        <p className="text-lg">{post.content}</p>
      )}

      {/* Reactions */}
      <div className="mt-6 flex gap-4 text-sm text-gray-600">
        👏 {post.reactions.clap}
        💡 {post.reactions.idea}
        🤯 {post.reactions.mindblown}
      </div>

      {/* Comments Section (UI only) */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        <textarea
          placeholder="Add a comment..."
          className="w-full border p-2 rounded mb-4"
          rows={3}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Post Comment</button>

        <div className="mt-6 space-y-4">
          <div className="border p-2 rounded bg-gray-50">
            <strong>@devgirl</strong>
            <p>I love this take! Tailwind saved me hours.</p>
          </div>
        </div>
      </section>
    </article>
  );
}