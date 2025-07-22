// src/app/api/posts/[id]/reply/route.ts
import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();

  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { userId } = jwt.verify(token, JWT_SECRET) as { userId: string };
  const { commentId, text } = await req.json();

  if (!text || !commentId) return NextResponse.json({ error: 'Missing data' }, { status: 400 });

  const post = await Post.findById(params.id);
  if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

  const comment = post.comments.id(commentId);
  if (!comment) return NextResponse.json({ error: 'Comment not found' }, { status: 404 });

  comment.replies.push({ userId, text, createdAt: new Date() });
  await post.save();

  return NextResponse.json({ success: true });
}