// src/app/api/user/tags/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
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

export async function POST(req: NextRequest) {
  await connectDB();
  const userId = await getUserIdFromToken(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { action, tag } = body;

  if (!tag || !['follow', 'unfollow', 'hide', 'unhide'].includes(action)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const user = await User.findById(userId);
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  // 💥 Ensure these fields always exist
  if (!user.followedTags) user.followedTags = [];
  if (!user.hiddenTags) user.hiddenTags = [];

  switch (action) {
    case 'follow':
      if (!user.followedTags.includes(tag)) user.followedTags.push(tag);
      user.hiddenTags = user.hiddenTags.filter((t: string) => t !== tag);
      break;
    case 'unfollow':
      user.followedTags = user.followedTags.filter((t: string) => t !== tag);
      break;
    case 'hide':
      if (!user.hiddenTags.includes(tag)) user.hiddenTags.push(tag);
      user.followedTags = user.followedTags.filter((t: string) => t !== tag);
      break;
    case 'unhide':
      user.hiddenTags = user.hiddenTags.filter((t: string) => t !== tag);
      break;
  }

  await user.save();

  return NextResponse.json({ message: `${action}ed tag '${tag}' successfully` });
}