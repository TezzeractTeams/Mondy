import type { Metadata } from "next";
import {
  SOCIAL_PREVIEW_HEIGHT,
  SOCIAL_PREVIEW_PATH,
  SOCIAL_PREVIEW_WIDTH,
} from "@/lib/socialPreviewImage";

const waitlistDescription =
  "Join the Mondy waitlist for early access—turn your voice into a week of social content.";

export const metadata: Metadata = {
  title: "Waitlist",
  description: waitlistDescription,
  openGraph: {
    url: "/infopage",
    title: "Waitlist | Mondy",
    description: waitlistDescription,
    images: [
      {
        url: SOCIAL_PREVIEW_PATH,
        width: SOCIAL_PREVIEW_WIDTH,
        height: SOCIAL_PREVIEW_HEIGHT,
        alt: "Mondy preview image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Waitlist | Mondy",
    description: waitlistDescription,
    images: {
      url: SOCIAL_PREVIEW_PATH,
      alt: "Mondy preview image",
    },
  },
};

export default function InfopageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-dvh w-full flex-col bg-white">{children}</div>
  );
}
