// src/app/api/faqs/route.ts
import { connectDB } from "@/lib/mongodb";
import { Faq } from "@/models/Faq";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const faqs = await Faq.find().sort({ createdAt: -1 });
  return NextResponse.json(faqs);
}

export async function POST(req: Request) {
  await connectDB();
  const { question, answer } = await req.json();
  const faq = await Faq.create({ question, answer });
  return NextResponse.json(faq, { status: 201 });
}