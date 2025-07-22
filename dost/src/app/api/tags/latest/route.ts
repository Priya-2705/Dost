// app/api/tags/latest/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';

export const dynamic = 'force-dynamic';

export async function GET() {
  await connectDB();

  // Get all tags from posts
  const posts = await Post.find({}, { tags: 1, _id: 0 });

  // Flatten and deduplicate tags
  const allTags = posts.flatMap((post) => post.tags);
  const uniqueTags = [...new Set(allTags)];

  // Return the latest 5 tags
  const latestTags = uniqueTags.slice(-5).reverse(); // reverse to show newest first

  return NextResponse.json({ tags: latestTags });
}