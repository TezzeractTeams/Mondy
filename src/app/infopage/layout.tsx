import type { Metadata } from "next";

const waitlistDescription =
  "Join the Mondy waitlist for early access—turn your voice into a week of social content.";

export const metadata: Metadata = {
  title: "Waitlist",
  description: waitlistDescription,
  openGraph: {
    url: "/infopage",
    title: "Waitlist | Mondy",
    description: waitlistDescription,
  },
  twitter: {
    title: "Waitlist | Mondy",
    description: waitlistDescription,
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
