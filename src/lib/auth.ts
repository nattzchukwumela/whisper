import jwt from "jsonwebtoken";
import crypto from "crypto";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;

// Access token: short-lived (e.g., 15m)
export function signAccessToken(payload: object, minutes = 15) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: `${minutes}m` });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as {
    userId: number;
    iat: number;
    exp: number;
  };
}

// Create a random refresh token string
export function generateRefreshTokenString(bytes = 64) {
  return crypto.randomBytes(bytes).toString("hex");
}

// Hash refresh token string before saving (SHA-256)
export function hashRefreshToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

// Persist refresh token (opaque) to DB
export async function persistRefreshToken(params: {
  userId: number;
  refreshToken: string;
  days?: number;
  userAgent?: string | null;
  ipAddress?: string | null;
}) {
  const { userId, refreshToken, days = 30, userAgent, ipAddress } = params;
  const tokenHash = hashRefreshToken(refreshToken);
  const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

  const rec = await prisma.refreshToken.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
      userAgent: userAgent ?? undefined,
      ipAddress: ipAddress ?? undefined,
    },
  });

  return rec;
}
