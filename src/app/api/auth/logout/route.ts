import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { REFRESH_COOKIE, clearAuthCookies } from "@/lib/cookies";
import { hashRefreshToken } from "@/lib/auth";

export async function POST(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader.match(/(?:^|;\s*)refresh_token=([^;]+)/);
  const refresh = match?.[1];

  if (refresh) {
    const tokenHash = hashRefreshToken(refresh);
    await prisma.refreshToken.updateMany({
      where: { tokenHash, revoked: false },
      data: { revoked: true, rotatedAt: new Date() },
    });
  }

  const res = NextResponse.json({ success: true });
  return clearAuthCookies(res);
}
