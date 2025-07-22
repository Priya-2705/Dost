// File: src/app/api/user/follow/route.ts

import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret';

export async function POST(req: NextRequest) {
  await connectDB();
  const { followUserId } = await req.json();
  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const currentUserId = decoded.userId;

    if (currentUserId === followUserId) {
      return NextResponse.json({ error: "You can't follow yourself." }, { status: 400 });
    }

    const currentUser = await User.findById(currentUserId);
    const followUser = await User.findById(followUserId);

    if (!currentUser || !followUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (!currentUser.following.includes(followUserId)) {
      currentUser.following.push(followUserId);
      followUser.followers.push(currentUserId);
      await currentUser.save();
      await followUser.save();
    }

    return NextResponse.json({ message: 'Followed successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
  }
}