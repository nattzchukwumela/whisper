// app/layout.tsx

import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
