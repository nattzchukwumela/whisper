import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import {
  signAccessToken,
  generateRefreshTokenString,
  persistRefreshToken,
} from "@/lib/auth";

// utility to set cookies
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
  const { identifier, password } = await req.json();

  if (!identifier || !password) {
    return NextResponse.json(
      { success: false, error: "Email and password are required" },
      { status: 400 },
    );
  }

  // lookup user by email
  const user = await prisma.user.findUnique({ where: { email: identifier } });
  if (!user) {
    return NextResponse.json(
      { success: false, error: "Invalid credentials" },
      { status: 401 },
    );
  }

  // verify password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return NextResponse.json(
      { success: false, error: "Invalid credentials" },
      { status: 401 },
    );
  }

  // issue tokens
  const access = signAccessToken({ userId: user.id }, 15); // 15 min
  const refresh = generateRefreshTokenString(); // opaque string

  // persist refresh token in DB
  await persistRefreshToken({
    userId: user.id,
    refreshToken: refresh,
    days: 30,
    userAgent: req.headers.get("user-agent"),
    ipAddress: req.headers.get("x-forwarded-for") ?? null,
  });

  // create response & set cookies
  const res = NextResponse.json({ success: true });
  return setAuthCookies(res, {
    access,
    accessMaxAgeSec: 60 * 15, // 15 min
    refresh,
    refreshMaxAgeSec: 60 * 60 * 24 * 30, // 30 days
  });
}
