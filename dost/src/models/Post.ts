// models/Post.ts
import mongoose, { Schema, models } from "mongoose";

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, default: "Anonymous" },
    tags: [String],
  },
  { timestamps: true }
);

export const Post = models.Post || mongoose.model("Post", PostSchema);