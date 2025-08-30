import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  // Required fields
  if (!username || !email || !password) {
    return NextResponse.json(
      { success: false, error: "Missing required fields" },
      { status: 400 },
    );
  }

  // Email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { success: false, error: "Invalid email format" },
      { status: 400 },
    );
  }

  // Uniqueness checks
  const findEmail = await prisma.user.findUnique({ where: { email } });
  if (findEmail) {
    return NextResponse.json(
      { success: false, error: "Email already exists" },
      { status: 400 },
    );
  }

  const findUsername = await prisma.user.findFirst({
    where: { name: username },
  });
  if (findUsername) {
    return NextResponse.json(
      { success: false, error: "Username already exists" },
      { status: 400 },
    );
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      name: username,
      email,
      password: hashedPassword,
      uniqueLink: crypto.randomUUID(),
    },
  });

  return NextResponse.json({ success: true });
}
