import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/mongodb';
import Post, { IPost } from '@/models/Post';
import User from '@/models/User';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import ReactionsBar from '@/components/ReactionsBar';

interface Props {
  params: { id: string };
}

export default async function PostPage({ params }: Props) {
  await connectDB();

  const post = await Post.findById(params.id).lean();

  if (!post || typeof post !== 'object' || !('isPublic' in post) || !post.isPublic) {
    return notFound();
  }

  const typedPost = post as unknown as IPost;
  const user = await User.findById(typedPost.userId).select('firstName lastName').lean();
  const authorName = user ? `${(user as any).firstName} ${(user as any).lastName}` : 'Unknown';

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/posts"
          className="inline-block mb-4 text-blue-600 hover:underline text-sm"
        >
          ← Back to Explore
        </Link>

        <div className="bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-2">{typedPost.title}</h1>
          <p className="text-sm text-gray-500 mb-4">By {authorName}</p>

          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {typedPost.content}
            </ReactMarkdown>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {typedPost.tags.map((tag: string, i: number) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* 🧠 Reaction Bar */}
          <div className="mt-6">
            <ReactionsBar
              postId={String(typedPost._id)}
              initialReactions={typedPost.reactions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}