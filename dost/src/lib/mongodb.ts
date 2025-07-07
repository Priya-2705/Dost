//lib/mongodb.ts
import mongoose from 'mongoose';
import { initSuperAdmin } from './initSuperAdmin';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then(async (mongoose) => {
      await initSuperAdmin(); // auto-create superadmin after DB connects
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}