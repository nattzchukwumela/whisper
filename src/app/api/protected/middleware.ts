import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/api/protected"))
    return NextResponse.next();

  const access = req.cookies.get("access_token")?.value;
  if (!access)
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );

  try {
    jwt.verify(access, JWT_SECRET);
    return NextResponse.next();
  } catch {
    return NextResponse.json(
      { success: false, error: "Access token expired" },
      { status: 401 },
    );
  }
}

export const config = {
  matcher: ["/api/protected/:path*"],
};
