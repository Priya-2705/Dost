import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import path from 'path';
import { writeFile } from 'fs/promises';

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

  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${file.name}`;
  const filepath = path.join(process.cwd(), 'public', 'uploads', filename);

  await writeFile(filepath, buffer);

  const avatarUrl = `/uploads/${filename}`;
  await User.findByIdAndUpdate(userId, { avatar: avatarUrl }, { new: true });
  console.log('Saved avatar to:', avatarUrl);

  return NextResponse.json({ avatar: avatarUrl });
}