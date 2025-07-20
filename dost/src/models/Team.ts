import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  role: string;
  location: string;
  avatar: string;
}

const TeamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  location: { type: String, required: true },
  avatar: { type: String, required: true },
});

export default mongoose.models.Team || mongoose.model<ITeam>('Team', TeamSchema);