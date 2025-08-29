import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  console.log(username, email, password);
  if (!username || !email || !password) {
    return NextResponse.json(
      { success: false, error: "Missing Required fields" },
      { status: 400 },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name: username,
      email,
      password: hashedPassword,
      uniqueLink: crypto.randomUUID(),
    },
  });

  return NextResponse.json({ success: true, userId: user.id });
}
