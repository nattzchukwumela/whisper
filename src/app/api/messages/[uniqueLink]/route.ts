import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { uniqueLink: string } },
) {
  try {
    const { text, category } = await req.json();
    console.log(params.uniqueLink);
    // check for user
    const user = await prisma.user.findUnique({
      where: { uniqueLink: params.uniqueLink },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, err: "User not found" },
        { status: 404 },
      );
    }

    // create message
    const message = await prisma.anonymousMessage.create({
      data: {
        receiverId: user.id,
        text,
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
