import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { signAccessToken, hashRefreshToken } from "@/lib/auth";
import { setAuthCookies } from "@/lib/cookies";

export async function POST(req: Request) {
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) {
    return NextResponse.json(
      { success: false, error: "No cookies" },
      { status: 401 },
    );
  }

  // Parse cookies manually
  const cookies = Object.fromEntries(
    cookieHeader.split(";").map((c) => {
      const [key, ...v] = c.trim().split("=");
      return [key, decodeURIComponent(v.join("="))];
    }),
  );

  const refreshToken = cookies["refresh_token"];
  if (!refreshToken) {
    return NextResponse.json(
      { success: false, error: "Missing refresh token" },
      { status: 401 },
    );
  }

  try {
    // hash the raw token to compare against DB
    const tokenHash = hashRefreshToken(refreshToken);

    // find stored refresh token
    const storedToken = await prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!storedToken || !storedToken.user) {
      return NextResponse.json(
        { success: false, error: "Invalid refresh token" },
        { status: 401 },
      );
    }

    // check expiration or revocation
    if (storedToken.expiresAt < new Date() || storedToken.revoked) {
      return NextResponse.json(
        { success: false, error: "Refresh token expired" },
        { status: 401 },
      );
    }

    // issue new access token (15 mins)
    const access = signAccessToken({ userId: storedToken.userId }, 15);

    // reuse existing refresh token
    const res = NextResponse.json({ success: true });
    return setAuthCookies(res, {
      access,
      accessMaxAgeSec: 60 * 15, // 15 minutes
      refresh: refreshToken, // reuse the same refresh token string
      refreshMaxAgeSec: 60 * 60 * 24 * 30, // 30 days
    });
  } catch (err) {
    console.error("Refresh failed:", err);
    return NextResponse.json(
      { success: false, error: "Failed to refresh" },
      { status: 500 },
    );
  }
}
