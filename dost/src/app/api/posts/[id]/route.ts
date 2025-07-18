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