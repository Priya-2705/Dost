import mongoose, { Schema, model, models } from 'mongoose';

const quoteSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: 'Unknown',
    },
  },
  { timestamps: true }
);

const Quote = models.Quote || model('Quote', quoteSchema);
export default Quote;