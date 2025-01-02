import type { Metadata } from "next";
import { Oxanium } from "next/font/google";
import "./globals.css";

const ox = Oxanium({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ox.className} dark antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
