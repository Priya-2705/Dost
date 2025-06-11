import { connectDB } from "@/app/lib/db";
import { Post } from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const posts = await Post.find().sort({ createdAt: -1 });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const newPost = await Post.create(body);
  return NextResponse.json(newPost, { status: 201 });
}