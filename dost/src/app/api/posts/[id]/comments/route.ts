// src/app/api/posts/[id]/comments/route.ts
import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();

  const post = await Post.findById(params.id)
    .populate('comments.userId', 'firstName lastName avatar')
    .populate('comments.replies.userId', 'firstName lastName avatar');

  if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

  return NextResponse.json({ comments: post.comments });
}