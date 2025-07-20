//models/Post.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IPost extends Document {
  userId: Types.ObjectId;
  title: string;
  content: string;
  tags: string[];
  isPublic: boolean;
  createdAt: Date;
  reactions: {
    heart: number;
    clap: number;
    fire: number;
    mindblown: number;
  };
  userReactions: {
    [userId: string]: 'heart' | 'clap' | 'fire' | 'mindblown';
  };
}

const PostSchema = new Schema<IPost>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  isPublic: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  reactions: {
    heart: { type: Number, default: 0 },
    clap: { type: Number, default: 0 },
    fire: { type: Number, default: 0 },
    mindblown: { type: Number, default: 0 },
  },
  userReactions: {
    type: Map,
    of: String,
    default: {},
  },
});

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);