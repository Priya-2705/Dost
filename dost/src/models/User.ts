import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  password: string;
  profession: string;
  address: string;
  avatar?: string;
  role: 'user' | 'superadmin';
  followedTags?: string[];
  hiddenTags?: string[];
}

const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profession: { type: String, required: true },
  address: { type: String, required: true },
  avatar: { type: String, default: '' },
  role: { type: String, enum: ['user', 'superadmin'], default: 'user' },
  followedTags: { type: [String], default: [] },
  hiddenTags: { type: [String], default: [] },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);