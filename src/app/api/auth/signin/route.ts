import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.NEXTAUTH_SECRET!;

export async function POST(req: Request) {
  const { identifier, password } = await req.json();

  if (!identifier || !password) {
    console.log(identifier, password);
    return NextResponse.json(
      { success: false, error: "Email and password are required" },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: identifier },
  });

  if (!user)
    return NextResponse.json(
      { success: false, error: "User not found or Invalid credentials" },
      { status: 401 },
    );

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid)
    return NextResponse.json(
      { success: false, error: "Invalid credentials" },
      { status: 401 },
    );

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
  const res = NextResponse.json({ success: true });
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  return res;
}
