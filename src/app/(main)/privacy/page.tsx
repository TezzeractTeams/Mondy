import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import {
  SOCIAL_PREVIEW_HEIGHT,
  SOCIAL_PREVIEW_PATH,
  SOCIAL_PREVIEW_WIDTH,
} from "@/lib/socialPreviewImage";

const LAST_UPDATED =
  process.env.NEXT_PUBLIC_PRIVACY_LAST_UPDATED ?? "April 2, 2026";

const privacyDescription =
  "How Mondy collects, uses, and protects your personal information.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: privacyDescription,
  openGraph: {
    url: "/privacy",
    title: "Privacy Policy | Mondy",
    description: privacyDescription,
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
    title: "Privacy Policy | Mondy",
    description: privacyDescription,
    images: {
      url: SOCIAL_PREVIEW_PATH,
      alt: "Mondy preview image",
    },
  },
};

export default function PrivacyPolicy() {
  return (
    <>
      <main className="min-h-screen w-full bg-mondy-surface flex flex-col items-center pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-3xl w-full flex flex-col gap-10">
          {/* Header Section */}
          <div className="flex flex-col gap-4 border-b border-black/5 pb-10">
            <div className="inline-block px-3 py-1 rounded-full bg-black/5 text-xs font-semibold tracking-wider uppercase w-max mb-2">
              Legal
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-mondy-ink">
              Privacy Policy
            </h1>
            <p className="text-black/60 font-medium">
              Last updated: {LAST_UPDATED}
            </p>
          </div>

          {/* Content Section */}
          <div className="w-full text-mondy-ink flex flex-col gap-10 leading-relaxed text-lg">
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold tracking-tight">
                1. Introduction
              </h2>
              <p className="opacity-80">
                Welcome to Mondy.ai (&quot;The Curated Sanctuary&quot;). We are
                committed to protecting your personal information and your right
                to privacy. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you visit our
                website and use our services.
              </p>
              <p className="opacity-80">
                Please read this privacy notice carefully as it will help you
                understand what we do with the information that we collect.
              </p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold tracking-tight">
                2. Information We Collect
              </h2>
              <p className="opacity-80">
                We collect personal information that you voluntarily provide to
                us when you register on the website, express an interest in
                obtaining information about us or our products and services, or
                otherwise when you contact us.
              </p>
              <ul className="list-disc list-inside opacity-80 pl-2 flex flex-col gap-2">
                <li>
                  <strong>Personal Info Provided by You:</strong> Names, phone
                  numbers, email addresses, mailing addresses, and similar
                  content.
                </li>
                <li>
                  <strong>Payment Data:</strong> All payment data is stored by
                  our payment processor and you should review its privacy
                  policies and contact the payment processor directly to respond
                  to your questions.
                </li>
              </ul>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold tracking-tight">
                3. How We Use Your Information
              </h2>
              <p className="opacity-80">
                We use personal information collected via our website for a
                variety of business purposes described below. We process your
                personal information for these purposes in reliance on our
                legitimate business interests, in order to enter into or perform
                a contract with you, with your consent, and/or for compliance
                with our legal obligations.
              </p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold tracking-tight">4. Cookies</h2>
              <p className="opacity-80">
                We use a small first-party cookie (
                <code className="text-sm bg-black/5 px-1.5 py-0.5 rounded">
                  mondy_cookie_consent
                </code>
                ) to remember your cookie choices (for example, essential-only
                versus accepting optional cookies). This cookie does not track
                you across other sites. You can change your mind by clearing
                site data for this domain; the cookie banner will appear again
                on your next visit.
              </p>
            </section>

            <section
              id="data-deletion"
              className="flex flex-col gap-4 scroll-mt-32"
            >
              <h2 className="text-2xl font-bold tracking-tight">
                5. Data Deletion
              </h2>
              <p className="opacity-80">
                If you connect Facebook or Threads to Mondy, we store data
                needed to provide the service. This section explains what we
                keep and how you can delete it.
              </p>

              <h3 className="text-xl font-semibold tracking-tight">
                What data Mondy stores
              </h3>
              <ul className="list-disc list-inside opacity-80 pl-2 flex flex-col gap-2">
                <li>
                  <strong>Connection tokens:</strong> OAuth tokens for
                  Facebook and Threads so Mondy can publish and manage content
                  on your behalf.
                </li>
                <li>
                  <strong>Posts and drafts:</strong> Content you create or
                  schedule through Mondy, including captions and media
                  associated with your connected accounts.
                </li>
                <li>
                  <strong>Account information:</strong> Your Mondy account
                  details (such as email and profile information) and basic
                  metadata from connected social accounts (for example,
                  account IDs and display names).
                </li>
              </ul>

              <h3 className="text-xl font-semibold tracking-tight">
                How to delete your data
              </h3>
              <p className="opacity-80">
                You can remove platform-specific data in the app or request
                full account deletion by email.
              </p>
              <ul className="list-disc list-inside opacity-80 pl-2 flex flex-col gap-2">
                <li>
                  <strong>In the app:</strong> Go to{" "}
                  <strong>Settings → Connected accounts</strong> and disconnect
                  Facebook or Threads. Disconnecting a platform removes the
                  stored connection tokens for that platform from our systems.
                </li>
                <li>
                  <strong>By email:</strong> Send a deletion request to{" "}
                  <a
                    href="mailto:support@mondy.ai"
                    className="text-blue-600 hover:underline"
                  >
                    support@mondy.ai
                  </a>{" "}
                  from the email address associated with your Mondy account.
                  Include your account email and whether you want to delete
                  data for a specific platform or your entire Mondy account.
                </li>
              </ul>

              <h3 className="text-xl font-semibold tracking-tight">
                Response timeframe
              </h3>
              <p className="opacity-80">
                In-app disconnects take effect immediately for connection
                tokens. Email requests are processed within{" "}
                <strong>30 days</strong> of receipt. We may contact you to
                confirm your identity before completing deletion.
              </p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold tracking-tight">6. Contact Us</h2>
              <p className="opacity-80">
                If you have questions or comments about this notice, you may{" "}
                <Link
                  href="/infopage"
                  className="text-blue-600 hover:underline"
                >
                  contact us through our site
                </Link>
                . For security vulnerability reports, see our{" "}
                <Link
                  href="/.well-known/security.txt"
                  className="text-blue-600 hover:underline"
                >
                  security.txt
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
