import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

type ReactionType = 'heart' | 'clap' | 'fire' | 'mindblown';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const { reactionType }: { reactionType: ReactionType } = await req.json();
  const token = await getToken({ req });

  if (!token || typeof token.id !== 'string') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = token.id;

  const post = await Post.findById(params.id);
  if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

  // Ensure fields exist
  post.reactions ||= { heart: 0, clap: 0, fire: 0, mindblown: 0 };
  post.userReactions ||= new Map<string, string>();

  const previous = post.userReactions.get(userId);

  if (previous && previous !== reactionType) {
    post.reactions[previous] = Math.max(0, post.reactions[previous] - 1);
    post.reactions[reactionType] += 1;
    post.userReactions.set(userId, reactionType);
  } else if (!previous) {
    post.reactions[reactionType] += 1;
    post.userReactions.set(userId, reactionType);
  } else {
    // same reaction clicked again — do nothing
    return NextResponse.json({
      reactions: post.reactions,
      userReaction: previous,
    });
  }

  await post.save();

  return NextResponse.json({
    reactions: post.reactions,
    userReaction: post.userReactions.get(userId),
  });
}