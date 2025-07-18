import { connectDB } from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const messages = await Contact.find().sort({ createdAt: -1 });
  return NextResponse.json({ messages });
}

export async function PUT(req: NextRequest) {
  await connectDB();
  const { id, status } = await req.json();
  const updated = await Contact.findByIdAndUpdate(id, { status }, { new: true });
  return NextResponse.json({ message: 'Status updated', updated });
}

export async function DELETE(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  await Contact.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Deleted successfully' });
}