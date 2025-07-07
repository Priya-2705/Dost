// src/app/api/faqs/[id]/route.ts
import { connectDB } from "@/lib/mongodb";
import { Faq } from "@/models/Faq";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function PUT(req: Request, { params }: Params) {
  await connectDB();
  const { question, answer } = await req.json();
  const updated = await Faq.findByIdAndUpdate(
    params.id,
    { question, answer },
    { new: true }
  );
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: Params) {
  await connectDB();
  await Faq.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}