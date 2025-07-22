import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IComment {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  text: string;
  createdAt: Date;
  replies: IComment[];
}

export interface IPost extends Document {
  userId: Types.ObjectId;
  title: string;
  content: string;
  tags: string[];
  isPublic: boolean;
  createdAt: Date;
  comments: IComment[];
}

const CommentSchema = new Schema<IComment>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  replies: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }]
});

const PostSchema = new Schema<IPost>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  isPublic: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  comments: [CommentSchema]
});

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);