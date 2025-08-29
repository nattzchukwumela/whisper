// app/layout.tsx

import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Whispers - Anonymous Messaging",
  description: "Speak freely and message anonymously.",
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
