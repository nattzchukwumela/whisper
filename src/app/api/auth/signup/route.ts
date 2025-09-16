import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import crypto from "crypto";
import {
  signAccessToken,
  generateRefreshTokenString,
  persistRefreshToken,
} from "@/lib/auth";

function setAuthCookies(
  res: NextResponse,
  tokens: {
    access: string;
    accessMaxAgeSec: number;
    refresh: string;
    refreshMaxAgeSec: number;
  },
) {
  // Access token cookie (short-lived)
  res.cookies.set("access_token", tokens.access, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: tokens.accessMaxAgeSec,
  });

  // Refresh token cookie (long-lived)
  res.cookies.set("refresh_token", tokens.refresh, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: tokens.refreshMaxAgeSec,
  });

  return res;
}

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

  // Issue tokens
  const access = signAccessToken({ userId: user.id }, 15); // 15 min
  const refresh = generateRefreshTokenString(); // opaque string

  // Persist refresh token in DB
  await persistRefreshToken({
    userId: user.id,
    refreshToken: refresh,
    days: 30,
    userAgent: req.headers.get("user-agent"),
    ipAddress: req.headers.get("x-forwarded-for") ?? null,
  });

  // Create response, set cookies, and return
  const res = NextResponse.json({
    success: true,
    message: "Account created & signed in successfully",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });

  return setAuthCookies(res, {
    access,
    accessMaxAgeSec: 60 * 15, // 15 min
    refresh,
    refreshMaxAgeSec: 60 * 60 * 24 * 30, // 30 days
  });
}
