import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const { reactionType } = await req.json();

  const validReactions = ['heart', 'clap', 'fire', 'mindblown'];
  if (!validReactions.includes(reactionType)) {
    return NextResponse.json({ error: 'Invalid reaction type' }, { status: 400 });
  }

  const updated = await Post.findByIdAndUpdate(
    params.id,
    { $inc: { [`reactions.${reactionType}`]: 1 } },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json({ reactions: updated.reactions });
}