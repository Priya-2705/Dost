// src/app/api/team/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Team from '@/models/Team';

export async function GET() {
  try {
    await connectDB();
    const team = await Team.find({});
    return NextResponse.json(team);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch team' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, role, location, avatar } = await req.json();

    if (!name || !role || !location || !avatar) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await connectDB();
    const newMember = await Team.create({ name, role, location, avatar });
    return NextResponse.json(newMember, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to add team member' }, { status: 500 });
  }
}