import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mondy",
  description:
    "Talk for 10 minutes and get a full week of social content—without the writing grind.",
  icons: {
    icon: "/Mondyicon.png",
    apple: "/Mondyicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} font-noah antialiased bg-mondy-surface min-h-screen text-mondy-ink tracking-[-0.05em] leading-[1.2]`}
      >
        {children}
      </body>
    </html>
  );
}
