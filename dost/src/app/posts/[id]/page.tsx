import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/mongodb';
import Post, { IPost } from '@/models/Post';
import User from '@/models/User';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface Props {
  params: { id: string };
}

export default async function PostPage({ params }: Props) {
  await connectDB();

  const post = (await Post.findById(params.id).lean()) as unknown as IPost;
  if (!post || !post.isPublic) return notFound();

  const user = await User.findById(post.userId).select('firstName lastName').lean();
  const authorName = user ? `${(user as any).firstName} ${(user as any).lastName}` : 'Unknown';

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        
        {/* 🔙 Back Button */}
        <Link
          href="/posts"
          className="inline-block mb-4 text-blue-600 hover:underline text-sm"
        >
          ← Back to Explore
        </Link>

        {/* 📝 Post Content */}
        <div className="bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
          <p className="text-sm text-gray-500 mb-4">By {authorName}</p>

          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag: string, i: number) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}