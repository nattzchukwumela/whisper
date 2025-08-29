// src/lib/cookies.ts
import { NextResponse } from "next/server";

const isProd = process.env.NODE_ENV === "production";

export const ACCESS_COOKIE = "access_token";
export const REFRESH_COOKIE = "refresh_token";

export function setAuthCookies(
  res: NextResponse,
  tokens: {
    access: string;
    accessMaxAgeSec: number;
    refresh: string;
    refreshMaxAgeSec: number;
  },
) {
  res.cookies.set(ACCESS_COOKIE, tokens.access, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: tokens.accessMaxAgeSec,
  });
  res.cookies.set(REFRESH_COOKIE, tokens.refresh, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: tokens.refreshMaxAgeSec,
  });
  return res;
}

export function clearAuthCookies(res: NextResponse) {
  res.cookies.set(ACCESS_COOKIE, "", {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  res.cookies.set(REFRESH_COOKIE, "", {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
