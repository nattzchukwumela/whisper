import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const cutOff = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours
  const deleted = await prisma.anonymousMessage.deleteMany({
    where: {
      createdAt: {
        lt: cutOff,
      },
    },
  });

  return NextResponse.json({
    success: true,
    deletedCount: deleted.count,
  });
}
