// File: src/app/api/user/unfollow/route.ts

import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret';

export async function POST(req: NextRequest) {
  await connectDB();
  const { unfollowUserId } = await req.json();
  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const currentUserId = decoded.userId;

    const currentUser = await User.findById(currentUserId);
    const unfollowUser = await User.findById(unfollowUserId);

    if (!currentUser || !unfollowUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    currentUser.following = currentUser.following.filter((id: any) => id.toString() !== unfollowUserId);
    unfollowUser.followers = unfollowUser.followers.filter((id: any) => id.toString() !== currentUserId);

    await currentUser.save();
    await unfollowUser.save();

    return NextResponse.json({ message: 'Unfollowed successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
  }
}