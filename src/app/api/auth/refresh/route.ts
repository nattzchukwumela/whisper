import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { REFRESH_COOKIE, setAuthCookies } from "@/lib/cookies";
import {
  hashRefreshToken,
  signAccessToken,
  generateRefreshTokenString,
} from "@/lib/auth";

export async function POST(req: Request) {
  const refresh =
    (await (req as any).cookies?.get?.(REFRESH_COOKIE)?.value) ??
    req.headers.get("cookie")?.match(/(?:^|;\s*)refresh_token=([^;]+)/)?.[1];

  if (!refresh)
    return NextResponse.json(
      { success: false, error: "No refresh token" },
      { status: 401 },
    );

  const tokenHash = hashRefreshToken(refresh);
  const now = new Date();

  // Look up token
  const tokenRec = await prisma.refreshToken.findUnique({
    where: { tokenHash },
  });
  if (!tokenRec || tokenRec.revoked || tokenRec.expiresAt <= now) {
    // hard fail & clear cookies
    const res = NextResponse.json(
      { success: false, error: "Invalid refresh token" },
      { status: 401 },
    );
    res.cookies.set("access_token", "", {
      httpOnly: true,
      path: "/",
      maxAge: 0,
    });
    res.cookies.set("refresh_token", "", {
      httpOnly: true,
      path: "/",
      maxAge: 0,
    });
    return res;
  }

  // Rotate inside a transaction
  const newRefresh = generateRefreshTokenString();
  const newHash = hashRefreshToken(newRefresh);
  const newExpires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  await prisma.$transaction(async (tx) => {
    const rotated = await tx.refreshToken.update({
      where: { id: tokenRec.id },
      data: { revoked: true, rotatedAt: now },
    });

    await tx.refreshToken.create({
      data: {
        userId: tokenRec.userId,
        tokenHash: newHash,
        expiresAt: newExpires,
        // link rotation chain
        previous: { connect: { id: rotated.id } },
      },
    });
  });

  const access = signAccessToken({ userId: tokenRec.userId }, 15);

  const res = NextResponse.json({ success: true });
  return setAuthCookies(res, {
    access,
    accessMaxAgeSec: 60 * 15,
    refresh: newRefresh,
    refreshMaxAgeSec: 60 * 60 * 24 * 30,
  });
}
