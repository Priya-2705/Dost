import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Team from '@/models/Team';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { name, role, location, avatar } = await req.json();
    if (!name || !role || !location || !avatar) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await connectDB();
    const updated = await Team.findByIdAndUpdate(id, { name, role, location, avatar }, { new: true });

    if (!updated) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update member' }, { status: 500 });
  }
}