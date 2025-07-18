import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';

export async function GET(req: NextRequest) {
  await connectDB();

  const tag = req.nextUrl.searchParams.get('tag');
  if (!tag) {
    return NextResponse.json({ error: 'Tag is required' }, { status: 400 });
  }

  const posts = await Post.find({
    tags: tag,
    isPublic: true,
  }).sort({ createdAt: -1 });

  return NextResponse.json({ posts });
}