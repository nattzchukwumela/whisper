// app/layout.tsx
import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Whisper - Private Social Media",
  description:
    "Whisper is a secure, anonymous platform to share your thoughts and feelings.",
  metadataBase: new URL("https://whisper-lemon.vercel.app"),

  openGraph: {
    title: "Whisper - Private Social Media",
    description: "Express yourself anonymously in a calm, safe space.",
    url: "/", // Can be relative now due to metadataBase
    siteName: "Whisper",
    images: [
      {
        url: "/og-image.png", // Can be relative now
        width: 1200,
        height: 630,
        alt: "Whisper Social Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Whisper - Private Social Media",
    description: "A calm, anonymous space to share thoughts.",
    images: ["/og-image.png"], // Can be relative now
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
