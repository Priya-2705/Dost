import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

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

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const userId = await getUserIdFromToken(req);
    let followedUserIds: string[] = [];

    if (userId) {
      const user = await User.findById(userId);
      if (user?.following?.length) {
        followedUserIds = user.following.map((id: any) => id.toString());
      }
    }

    const posts = await Post.find({ isPublic: true })
      .sort({ createdAt: -1 })
      .populate('userId', 'firstName lastName avatar')
      .lean();

    // Sort followed users' posts first
    const sortedPosts = posts.sort((a, b) => {
      const aFollowed = followedUserIds.includes(a.userId._id.toString());
      const bFollowed = followedUserIds.includes(b.userId._id.toString());

      if (aFollowed && !bFollowed) return -1;
      if (!aFollowed && bFollowed) return 1;
      return 0;
    });

    return NextResponse.json({ posts: sortedPosts });
  } catch (error) {
    console.error('Explore posts fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}