import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import User from '@/models/User';
import Post from '@/models/Post';

export async function GET() {
  await connectDB();

  const userCount = await User.countDocuments();

  const commentCount = await Post.aggregate([
    {
      $project: {
        commentCount: { $size: { $ifNull: ['$comments', []] } }
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$commentCount' }
      }
    }
  ]);

  const tagData = await Post.distinct('tags');
  const tagCount = tagData.length;

  return NextResponse.json({
    userCount,
    commentCount: commentCount[0]?.total || 0,
    tagCount
  });
}