import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import GoogleAnalyticsConsent from "@/components/GoogleAnalyticsConsent";
import {
  SOCIAL_PREVIEW_HEIGHT,
  SOCIAL_PREVIEW_PATH,
  SOCIAL_PREVIEW_WIDTH,
} from "@/lib/socialPreviewImage";
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

/** Used for absolute Open Graph / Twitter URLs. Set in production, e.g. https://yourdomain.com */
function getMetadataBase(): URL {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    let normalized = fromEnv.endsWith("/") ? fromEnv.slice(0, -1) : fromEnv;
    // Crawlers (e.g. X Card) fetch absolute og/twitter image URLs; apex → www avoids an extra hop.
    if (/^https?:\/\/mondy\.ai$/i.test(normalized)) {
      normalized = "https://www.mondy.ai";
    }
    return new URL(`${normalized}/`);
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }
  return new URL("http://localhost:3000");
}

const defaultDescription =
  "Talk for 10 minutes and get a full week of social content—without the writing grind.";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: "Mondy",
    template: "%s | Mondy",
  },
  description: defaultDescription,
  icons: {
    icon: "/Mondyicon.png",
    apple: "/Mondyicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Mondy",
    title: "Mondy",
    description: defaultDescription,
    images: [
      {
        url: SOCIAL_PREVIEW_PATH,
        width: SOCIAL_PREVIEW_WIDTH,
        height: SOCIAL_PREVIEW_HEIGHT,
        alt: "Mondy — turn your voice into a week of social content",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mondy",
    description: defaultDescription,
    images: {
      url: SOCIAL_PREVIEW_PATH,
      alt: "Mondy — turn your voice into a week of social content",
    },
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
        <GoogleAnalyticsConsent />
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
