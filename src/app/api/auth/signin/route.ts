import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import {
  signAccessToken,
  generateRefreshTokenString,
  persistRefreshToken,
} from "@/lib/auth";
import { setAuthCookies } from "@/lib/cookies";

export async function POST(req: Request) {
  const { identifier, password } = await req.json();

  if (!identifier || !password) {
    return NextResponse.json(
      { success: false, error: "Email and password are required" },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({ where: { email: identifier } });
  if (!user)
    return NextResponse.json(
      { success: false, error: "Invalid credentials" },
      { status: 401 },
    );

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid)
    return NextResponse.json(
      { success: false, error: "Invalid credentials" },
      { status: 401 },
    );

  const access = signAccessToken({ userId: user.id }, 15); // 15 minutes
  const refresh = generateRefreshTokenString(); // opaque string
  await persistRefreshToken({
    userId: user.id,
    refreshToken: refresh,
    days: 30,
    userAgent: req.headers.get("user-agent"),
    ipAddress: req.headers.get("x-forwarded-for") ?? null,
  });

  const res = NextResponse.json({ success: true });
  return setAuthCookies(res, {
    access,
    accessMaxAgeSec: 60 * 15,
    refresh,
    refreshMaxAgeSec: 60 * 60 * 24 * 30,
  });
}
