import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import {
  SOCIAL_PREVIEW_HEIGHT,
  SOCIAL_PREVIEW_PATH,
  SOCIAL_PREVIEW_WIDTH,
} from "@/lib/socialPreviewImage";
import "./globals.css";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim() ?? "";
const gtmScript =
  gtmId.length > 0
    ? `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(gtmId)});`
    : "";

const noah = localFont({
  src: [
    { path: "../fonts/noah-regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/noah-bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-noah-stack",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
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
      className={noah.variable}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className="font-noah antialiased !bg-[#f5f3f0] min-h-screen text-mondy-ink tracking-[-0.05em] leading-[1.2]"
      >
        {gtmScript ? (
          <Script
            id="google-tag-manager"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{ __html: gtmScript }}
          />
        ) : null}
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
