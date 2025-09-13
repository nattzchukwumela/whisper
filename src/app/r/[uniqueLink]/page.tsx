import prisma from "@/lib/prisma";
import UserNotFound from "../../component/UniqueLinkPageComponent/UserNotFound";
import { WhispersMessagesPage } from "./handler";

export default async function Page({
  params,
}: {
  params: Promise<{ uniqueLink: string }>;
}) {
  // Await the params before using its properties
  const { uniqueLink } = await params;
  console.log(uniqueLink);
  // Use the 'select' option to explicitly choose which fields to fetch.
  // This is the most efficient and secure way to handle this.
  let user = null;
  try {
    user = await prisma.user.findUnique({
      where: { uniqueLink },
      select: {
        id: true,
        name: true,
        uniqueLink: true,
      },
    });
  } catch (error) {
    console.error("Prisma error:", error);
    return <UserNotFound />;
  }

  if (!user) {
    return <UserNotFound />;
  }

  // The 'user' object now only contains 'id', 'name', and 'uniqueLink',
  // which are the fields explicitly needed.
  return <WhispersMessagesPage user={user} uniqueLink={uniqueLink} />;
}
