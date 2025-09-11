import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ uniqueLink: string }> },
) {
  try {
    const { uniqueLink } = await params;

    if (!uniqueLink) {
      return NextResponse.json(
        { success: false, message: "Invalid link or No link attached" },
        { status: 400 },
      );
    }

    // Find the user via uniqueLink
    const user = await prisma.user.findUnique({
      where: { uniqueLink },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User does not exist" },
        { status: 404 },
      );
    }

    // Fetch all anonymous messages tied to this user
    const messages = await prisma.anonymousMessage.findMany({
      where: { receiverId: user.id },
      orderBy: { createdAt: "desc" }, // optional: newest first
    });

    if (messages.length === 0) {
      return NextResponse.json(
        { success: false, message: "No messages found or No messages" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Messages retrieved",
        data: messages,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Something went wrong:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
