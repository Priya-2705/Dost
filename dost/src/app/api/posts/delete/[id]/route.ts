import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'priyadost';

function getTokenFromHeader(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;
  return authHeader.split(' ')[1];
}

async function getUserIdFromToken(req: NextRequest) {
  const token = getTokenFromHeader(req);
  if (!token) return null;
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    return decoded.userId;
  } catch {
    return null;
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const userId = await getUserIdFromToken(req);
  const postId = params.id;

  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const post = await Post.findById(postId);
  if (!post || post.userId.toString() !== userId) {
    return NextResponse.json({ error: 'Not allowed' }, { status: 403 });
  }

  await Post.findByIdAndDelete(postId);
  return NextResponse.json({ message: 'Post deleted' });
}