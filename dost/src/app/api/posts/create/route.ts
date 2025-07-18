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

export async function POST(req: NextRequest) {
  await connectDB();
  const userId = await getUserIdFromToken(req);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { title, content, tags, isPublic } = body;

  if (!title || !content) {
    return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
  }

  const post = await Post.create({
    userId,
    title,
    content,
    tags: tags || [],
    isPublic: isPublic ?? true,
  });

  return NextResponse.json({ message: 'Post created successfully', post });
}