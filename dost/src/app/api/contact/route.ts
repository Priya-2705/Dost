// dost/src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const contact = new Contact({ name, email, message, status: 'Pending' });
    await contact.save();

    return NextResponse.json({ message: 'Message received successfully!' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}