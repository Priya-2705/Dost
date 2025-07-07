import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await connectDB();
  const { firstName, lastName, dob, email, password, profession, address } = await req.json();

  const existingUser = await User.findOne({ email });
  if (existingUser) return NextResponse.json({ error: 'Email already exists' }, { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    dob,
    email,
    password: hashedPassword,
    profession,
    address,
    role: 'user',
  });

  return NextResponse.json({ message: 'User registered successfully', user });
}