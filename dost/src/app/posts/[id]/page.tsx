import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/mongodb';
import Post, { IPost } from '@/models/Post';
import User from '@/models/User';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Image from 'next/image';
import FollowButton from '@/components/FollowButton';
import CommentSectionWrapper from '@/components/CommentSectionWrapper';

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

  const user = await User.findById(typedPost.userId)
    .select('firstName lastName avatar')
    .lean() as { firstName: string; lastName: string; avatar?: string } | null;

  const authorName = user ? `${user.firstName} ${user.lastName}` : 'Unknown';
  const authorAvatar = user?.avatar || '/default-avatar.png';

  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 px-4">
      <div className="max-w-4xl mx-auto">

        <article className="bg-white rounded-xl shadow-xl border border-gray-200 p-6 sm:p-10">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#001B3A] mb-4 leading-tight">
            {typedPost.title}
          </h1>

          {/* Author section */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Image
                src={authorAvatar}
                alt="Author Avatar"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-md"
              />
              <div className="text-sm text-gray-600">
                <p className="font-semibold text-[#003366]">{authorName}</p>
                <p>{new Date(typedPost.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div>
              <FollowButton targetUserId={typedPost.userId.toString()} />
            </div>
          </div>

          {/* Markdown content */}
          <div className="prose prose-sky max-w-none prose-img:rounded-lg prose-pre:bg-gray-900 prose-code:text-sm prose-code:px-2 prose-code:py-1 break-words prose-pre:whitespace-pre-wrap prose-pre:break-words prose-code:break-words">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {typedPost.content}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          {typedPost.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {typedPost.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </div>

      {/* Comment section with matching width */}
      <div className="max-w-4xl mx-auto mt-10">
        <CommentSectionWrapper postId={params.id} />
      </div>
    </div>
  );
}