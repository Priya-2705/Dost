import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'priyadost';

function getTokenFromHeader(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  return authHeader.split(' ')[1];
}

async function getUserFromToken(req: NextRequest) {
  const token = getTokenFromHeader(req);
  if (!token) return null;

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    return decoded.userId;
  } catch (err) {
    return null;
  }
}

export async function GET(req: NextRequest) {
  await connectDB();
  const userId = await getUserFromToken(req);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await User.findById(userId).select('-password');
  return NextResponse.json({ user });
}

export async function PUT(req: NextRequest) {
  await connectDB();
  const userId = await getUserFromToken(req);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { firstName, lastName, dob, email, profession, address } = body;

  const updated = await User.findByIdAndUpdate(
    userId,
    { firstName, lastName, dob, email, profession, address },
    { new: true }
  ).select('-password');

  return NextResponse.json({ user: updated });
}