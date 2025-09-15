// app/layout.tsx

import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Whisper - Private Social Media",
  description:
    "Whisper is a secure, anonymous platform to share your thoughts and feelings.",
  openGraph: {
    title: "Whisper - Private Social Media",
    description: "Express yourself anonymously in a calm, safe space.",
    url: "https://whisper-lemon.vercel.app",
    siteName: "Whisper",
    images: [
      {
        url: "/og-image.png", // ✅ This pulls from /public/og-image.png
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
    images: ["/og-image.png"], // ✅ Works fine from public/
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* The 'inter.className' applies the font, and the body tag is ready for our styles */}
      <body>{children}</body>
    </html>
  );
}
