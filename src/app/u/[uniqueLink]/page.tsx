import prisma from "@/lib/prisma";
import UserNotFound from "@/app/component/UniqueLinkPageComponent/UserNotFound";
import AnonymousMessageSender from "@/app/component/UniqueLinkPageComponent/AnonymousMessageSender";

export default async function Page({
  params,
}: {
  params: { uniqueLink: string };
}) {
  // Use the 'select' option to explicitly choose which fields to fetch.
  // This is the most efficient and secure way to handle this.
  const user = await prisma.user.findUnique({
    where: { uniqueLink: params.uniqueLink },
    select: {
      id: true,
      name: true,
      uniqueLink: true,
    },
  });

  if (!user) {
    return <UserNotFound />;
  }

  // The 'user' object now only contains 'id', 'name', and 'uniqueLink',
  // which are the fields explicitly requested.
  return <AnonymousMessageSender user={user} uniqueLink={params.uniqueLink} />;
}
