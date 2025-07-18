import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Subscription } from '@/models/Subscription';

export async function POST(req: NextRequest) {
  await connectDB();

  const { email } = await req.json();

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  try {
    const existing = await Subscription.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: 'Already subscribed' }, { status: 200 });
    }

    const saved = await Subscription.create({ email });
    return NextResponse.json({ message: 'Subscribed successfully', data: saved }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}