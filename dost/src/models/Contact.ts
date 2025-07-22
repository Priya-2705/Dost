// Dost/dost/src/models/Contact.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  status: 'Pending' | 'Responded';
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Responded'],
      default: 'Pending',
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);