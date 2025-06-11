// app/api/test-db/route.ts
import { connectDB } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ message: "✅ Connected to MongoDB successfully!" });
  } catch (error) {
    console.error("❌ DB Connection Error:", error);
    return NextResponse.json({ error: "Failed to connect to MongoDB" }, { status: 500 });
  }
}