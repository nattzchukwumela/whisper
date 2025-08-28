import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      uniqueLink: crypto.randomUUID(),
    },
  });

  return NextResponse.json({ success: true, userId: user.id });
}
