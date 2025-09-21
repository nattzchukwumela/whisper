import prisma from "@/lib/prisma";
import { EncryptMessageString } from "@/util/aes";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ uniqueLink: string }> },
) {
  const key = process.env.SECRET_KEY!;
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

    const crypto = new EncryptMessageString(key);

    // Fetch all anonymous messages tied to this user
    const messagesData = await prisma.anonymousMessage.findMany({
      where: { receiverId: user.id },
      orderBy: { createdAt: "desc" },
    });

    if (messagesData.length === 0) {
      return NextResponse.json(
        { success: false, message: "No messages found or No messages" },
        { status: 404 },
      );
    }

    // ✅ Decrypt messages here
    const decryptedMessages = messagesData.map((msg) => ({
      ...msg,
      text: crypto.decrypt(msg.text),
    }));

    return NextResponse.json(
      {
        success: true,
        message: "Messages retrieved",
        messageData: decryptedMessages, // ✅ actual array
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
