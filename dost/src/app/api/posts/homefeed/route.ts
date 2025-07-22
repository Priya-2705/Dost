import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret';

export async function GET(req: NextRequest) {
  await connectDB();

  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    const currentUser = await User.findById(decoded.userId).lean() as unknown as {
        following: string[];
        followedTags: string[];
        hiddenTags: string[];
    };

    if (!currentUser) return NextResponse.json({ posts: [] });

    const followedUserIds = currentUser.following || [];
    const followedTags = currentUser.followedTags || [];
    const hiddenTags = currentUser.hiddenTags || [];

    const posts = await Post.find({
      isPublic: true,
      $or: [
        { userId: { $in: followedUserIds } },
        { tags: { $in: followedTags } }
      ],
      tags: { $not: { $in: hiddenTags } }
    })
    .populate('userId', 'firstName lastName avatar')
    .sort({ createdAt: -1 });

    return NextResponse.json({ posts });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
  }
}