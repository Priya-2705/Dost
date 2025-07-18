import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find({ isPublic: true })
      .sort({ createdAt: -1 })
      .populate('userId', 'firstName lastName avatar');

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Explore posts fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}