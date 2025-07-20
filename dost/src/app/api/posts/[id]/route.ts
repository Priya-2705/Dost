import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post'; 
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const data = await req.json();

  const updated = await Post.findByIdAndUpdate(params.id, {
    title: data.title,
    content: data.content,
    tags: data.tags,
    isPublic: data.isPublic,
  });

  return NextResponse.json({ success: true });
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const post = await Post.findById(params.id);
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({ reactions: post.reactions || {} });
}