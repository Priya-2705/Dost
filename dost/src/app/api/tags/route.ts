import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const tagAggregation = await Post.aggregate([
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $project: { tag: "$_id", count: 1, _id: 0 } }
    ]);

    return NextResponse.json({ tags: tagAggregation });
  } catch (err) {
    console.error("Tag fetch error:", err);
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
}