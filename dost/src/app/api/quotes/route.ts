// app/api/quotes/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Quote from '@/models/Quote';

export async function GET() {
  await connectDB();

  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
    (1000 * 60 * 60 * 24)
  );

  const quotes = await Quote.find();
  if (quotes.length === 0) {
    return NextResponse.json({ quote: null }, { status: 404 });
  }

  const quote = quotes[dayOfYear % quotes.length];
  return NextResponse.json({ quote });
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const newQuote = await Quote.create(body);
  return NextResponse.json(newQuote, { status: 201 });
}