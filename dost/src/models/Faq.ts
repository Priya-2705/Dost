// models/Faq.ts
import mongoose, { Schema, model, models } from "mongoose";

const faqSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

export const Faq = models.Faq || model("Faq", faqSchema);