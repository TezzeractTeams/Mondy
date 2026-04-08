import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import "./globals.css";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

const noah = localFont({
  src: [
    { path: "../fonts/noah-regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/noah-bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-noah-stack",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

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
    <html
      lang="en"
      className={`${noah.variable} ${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className="font-noah antialiased !bg-[#f5f3f0] min-h-screen text-mondy-ink tracking-[-0.05em] leading-[1.2]"
      >
        {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
