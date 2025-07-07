import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import { notFound } from 'next/navigation';
import EditPostForm from '@/components/EditPostForm';

interface Props {
  params: { id: string };
}

export default async function EditPostPage({ params }: Props) {
  await connectDB();
  const post = await Post.findById(params.id).lean();

  if (!post) return notFound();

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">Edit Post</h1>
      <EditPostForm post={post} />
    </div>
  );
}