import { connectDB } from "@/app/lib/db";
import { Post } from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const post = await Post.findById(params.id);
  return NextResponse.json(post);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const data = await req.json();
  const updated = await Post.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  await Post.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Post deleted" });
}