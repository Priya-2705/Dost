// /app/api/superadmin/users/route.ts
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const users = await User.find({}, 'firstName lastName email role'); // only select necessary fields
  return NextResponse.json({ users });
}

export async function PUT(req: NextRequest) {
  await connectDB();
  const { userId, role } = await req.json();

  if (!userId || !role) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const updated = await User.findByIdAndUpdate(userId, { role });
  if (!updated) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }

  const deleted = await User.findByIdAndDelete(userId);
  if (!deleted) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}