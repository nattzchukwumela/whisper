import prisma from "@/lib/prisma";
import UserNotFound from "@/app/component/UniqueLinkPageComponent/UserNotFound";
import AnonymousMessageSender from "@/app/component/UniqueLinkPageComponent/AnonymousMessageSender";

export default async function Page({
  params,
}: {
  params: { uniqueLink: string };
}) {
  const user = await prisma.user.findUnique({
    where: { uniqueLink: params.uniqueLink },
  });

  if (!user) {
    return <UserNotFound />;
  }

  // Pass only needed props to the client component
  return <AnonymousMessageSender />;
}
