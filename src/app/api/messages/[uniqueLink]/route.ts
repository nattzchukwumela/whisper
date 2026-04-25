import prisma from "@/lib/prisma";
import { EncryptMessageString } from "@/util/aes";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ uniqueLink: string }> },
) {
  const key = process.env.SECRET_KEY!;
  try {
    const { uniqueLink } = await params;
    const { text, category } = await req.json();
    // check for user
    const user = await prisma.user.findUnique({
      where: { uniqueLink: uniqueLink },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, err: "User not found" },
        { status: 404 },
      );
    }

    const crypto = new EncryptMessageString(key);
    // create message
    const message = await prisma.anonymousMessage.create({
      data: {
        receiverId: user.id,
        text: crypto.encrypt(text),
        category,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
      data: message,
    });
  } catch (err) {
    console.error("Error creating message:", err);
    return NextResponse.json(
      { success: false, err: "Something went wrong" },
      { status: 500 },
    );
  }
}
