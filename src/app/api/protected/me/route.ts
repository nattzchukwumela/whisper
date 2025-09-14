import { NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = Object.fromEntries(
    cookieHeader.split(";").map((c) => {
      const [k, ...v] = c.trim().split("=");
      return [k, decodeURIComponent(v.join("="))];
    }),
  );

  const accessToken = cookies["access_token"];
  if (!accessToken) {
    return NextResponse.json(
      { success: false, error: "No access token found" },
      { status: 401 },
    );
  }

  try {
    const payload = verifyAccessToken(accessToken);

    // fetch user details from Prisma
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        name: true,
        uniqueLink: true,
        _count: {
          select: {
            messages: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, user });
  } catch (err) {
    console.error("Access token invalid:", err);
    return NextResponse.json(
      { success: false, error: "Invalid or expired access token" },
      { status: 401 },
    );
  }
}
