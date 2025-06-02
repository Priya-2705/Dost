import Link from "next/link";

export type Post = {
  id: string;
  title: string;
  type: "markdown" | "micro";
  tags: string[];
  reactions: {
    clap: number;
    idea: number;
    mindblown: number;
  };
  status?: "published" | "draft" | "bookmarked";
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/post/${post.id}`} className="block">
      <div className="border p-4 rounded shadow hover:shadow-md transition cursor-pointer bg-white">
        <div className="text-sm text-gray-500 mb-1">
          {post.type === "micro" ? "💬 Micro Idea" : "📘 Blog Post"}
        </div>
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <div className="flex gap-2 mb-2 flex-wrap">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex gap-4 text-gray-600 text-sm">
          👏 {post.reactions.clap} | 💡 {post.reactions.idea} | 🤯 {post.reactions.mindblown}
        </div>
      </div>
    </Link>
  );
}