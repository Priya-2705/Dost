import { notFound } from 'next/navigation';
import Link from 'next/link';

interface Post {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  isPublic: boolean;
  createdAt: string;
}

export default async function TagDetailPage({ params }: { params: { tag: string } }) {
  const { tag } = params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/posts/by-tag?tag=${tag}`, {
    cache: 'no-store',
    });

  if (!res.ok) return notFound();

  const data = await res.json();
  const posts: Post[] = data.posts;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Posts tagged with #{tag}</h1>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts found for this tag.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post._id} className="p-4 bg-white shadow rounded border">
              <Link href={`/posts/${post._id}`}>
                <h2 className="text-xl font-semibold text-blue-700 hover:underline cursor-pointer">
                  {post.title}
                </h2>
              </Link>
              <p className="text-sm text-gray-600 mt-1">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-800 mt-2 line-clamp-3">{post.content.slice(0, 150)}...</p>
              <div className="mt-2 text-sm text-gray-500">
                Tags:{' '}
                {post.tags.map((t) => (
                  <Link
                    key={t}
                    href={`/tags/${t}`}
                    className="inline-block mr-2 text-blue-500 hover:underline"
                  >
                    #{t}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}