import { connectDB } from "@/app/lib/db";
import { Post as PostModel } from "@/models/Post";

interface Params {
  params: { id: string };
}

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  tags: string[];
}

export default async function SinglePostPage({ params }: Params) {
  await connectDB();
  const post = (await PostModel.findById(params.id).lean()) as Post | null;

  if (!post) return <div className="text-center mt-20 text-red-500">Post not found.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold text-[#096B68]">{post.title}</h1>
      <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
      <div className="flex flex-wrap gap-2 pt-4">
        {post.tags.map((tag, i) => (
          <span
            key={i}
            className="bg-[#129990] text-white text-xs px-3 py-1 rounded-full font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>
      <div className="text-sm text-gray-500 pt-2">
        By <span className="text-[#096B68]">{post.author}</span> on{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}