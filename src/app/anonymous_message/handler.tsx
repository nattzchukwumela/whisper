import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import UserNotFound from "../component/UniqueLinkPageComponent/UserNotFound";
import AnonymousMessageSender from "../component/UniqueLinkPageComponent/AnonymousMessageSender";

type Props = {
  params: { uniqueLink: string };
};

// 🔹 Dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await prisma.user.findUnique({
    where: { uniqueLink: params.uniqueLink },
    select: { name: true, uniqueLink: true },
  });

  if (!user) {
    return {
      title: "User not found - Whisper",
      description: "This Whisper profile could not be found.",
      openGraph: {
        title: "User not found - Whisper",
        description: "This Whisper profile could not be found.",
        images: ["/og-image.png"], // fallback image
      },
    };
  }

  return {
    title: `${user.name} on Whisper`,
    description: `Send an anonymous message to ${user.name} on Whisper.`,
    openGraph: {
      title: `${user.name} on Whisper`,
      description: `Send an anonymous message to ${user.name} on Whisper.`,
      url: `https://yourdomain.com/${user.uniqueLink}`,
      siteName: "Whisper",
      images: [
        {
          url: "/og-image.png", // can later be replaced with dynamic OG images
          width: 1200,
          height: 630,
          alt: `Whisper profile of ${user.name}`,
        },
      ],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `${user.name} on Whisper`,
      description: `Send an anonymous message to ${user.name} on Whisper.`,
      images: ["/og-image.png"],
    },
  };
}

// 🔹 Page itself
export default async function Page({ params }: Props) {
  const { uniqueLink } = params;

  const user = await prisma.user.findUnique({
    where: { uniqueLink },
    select: {
      id: true,
      name: true,
      uniqueLink: true,
    },
  });

  if (!user) {
    return <UserNotFound />;
  }

  return <AnonymousMessageSender user={user} uniqueLink={uniqueLink} />;
}
