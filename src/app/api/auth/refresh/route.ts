import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashRefreshToken, signAccessToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { refreshToken } = await req.json();

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Missing refresh token" },
        { status: 400 },
      );
    }

    // Hash before lookup
    const tokenHash = hashRefreshToken(refreshToken);

    const storedToken = await prisma.refreshToken.findUnique({
      where: { tokenHash },
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      return NextResponse.json(
        { error: "Invalid or expired refresh token" },
        { status: 401 },
      );
    }

    // Create new access token (15m)
    const newAccessToken = signAccessToken({ userId: storedToken.userId }, 15);

    return NextResponse.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("Refresh error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
