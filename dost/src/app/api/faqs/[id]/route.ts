// src/app/api/faqs/[id]/route.ts
import { connectDB } from "@/lib/mongodb";
import { Faq } from "@/models/Faq";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  await connectDB();
  const { question, answer } = await req.json();

  const updated = await Faq.findByIdAndUpdate(
    context.params.id,
    { question, answer },
    { new: true }
  );

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  await connectDB();
  await Faq.findByIdAndDelete(context.params.id);
  return NextResponse.json({ success: true });
}