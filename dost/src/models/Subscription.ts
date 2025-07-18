import mongoose, { Schema, model, models } from 'mongoose';

const subscriptionSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true });

export const Subscription = models.Subscription || model('Subscription', subscriptionSchema);