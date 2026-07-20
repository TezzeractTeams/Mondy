import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import {
  SOCIAL_PREVIEW_HEIGHT,
  SOCIAL_PREVIEW_PATH,
  SOCIAL_PREVIEW_WIDTH,
} from "@/lib/socialPreviewImage";

const LAST_UPDATED =
  process.env.NEXT_PUBLIC_PRIVACY_LAST_UPDATED ?? "July 17, 2026";

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
                Welcome to Mondy.ai (&quot;Mondy&quot;, &quot;we&quot;,
                &quot;our&quot;, or &quot;us&quot;). Mondy is developed and
                operated by [Your Full Name], an independent developer based in
                [Country].
              </p>
              <p className="opacity-80">
                We are committed to protecting your privacy and handling your
                personal information responsibly. This Privacy Policy explains
                how we collect, use, disclose, store, and protect your
                information when you use our website, mobile applications, and
                related services (collectively, the &quot;Services&quot;).
              </p>
              <p className="opacity-80">
                By using Mondy, you agree to the collection and use of
                information in accordance with this Privacy Policy.
              </p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold tracking-tight">
                2. Information We Collect
              </h2>
              <p className="opacity-80">
                We collect only the information necessary to provide, maintain,
                improve, and secure our Services.
              </p>

              <h3 className="text-xl font-semibold tracking-tight">
                Personal Information
              </h3>
              <p className="opacity-80">
                When you create an account or communicate with us, we may
                collect:
              </p>
              <ul className="list-disc list-inside opacity-80 pl-2 flex flex-col gap-2">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Mailing address (where applicable)</li>
                <li>Profile information you choose to provide</li>
              </ul>

              <h3 className="text-xl font-semibold tracking-tight">
                Voice Recordings and Transcripts
              </h3>
              <p className="opacity-80">
                If you use Mondy&apos;s voice features, we may collect and
                store:
              </p>
              <ul className="list-disc list-inside opacity-80 pl-2 flex flex-col gap-2">
                <li>Voice recordings</li>
                <li>Voice transcripts</li>
                <li>AI prompts and generated outputs</li>
              </ul>
              <p className="opacity-80">
                These are used to provide transcription, AI-assisted content
                generation, and related functionality.
              </p>
              <p className="opacity-80">
                Where practical, voice recordings, transcripts, and AI content
                are stored separately from your account&apos;s personally
                identifiable information and associated using internal
                identifiers rather than direct personal identifiers.
              </p>

              <h3 className="text-xl font-semibold tracking-tight">
                User Content
              </h3>
              <p className="opacity-80">
                We collect content you create or upload, including:
              </p>
              <ul className="list-disc list-inside opacity-80 pl-2 flex flex-col gap-2">
                <li>Posts</li>
                <li>Drafts</li>
                <li>Captions</li>
                <li>Images</li>
                <li>Videos</li>
                <li>Scheduled content</li>
                <li>Other media submitted through the Service</li>
              </ul>

              <h3 className="text-xl font-semibold tracking-tight">
                Connected Platform Information
              </h3>
              <p className="opacity-80">
                When you connect third-party platforms such as Facebook or
                Threads, we collect:
              </p>
              <ul className="list-disc list-inside opacity-80 pl-2 flex flex-col gap-2">
                <li>Secure authorization (OAuth) tokens</li>
                <li>Account identifiers</li>
                <li>Display names</li>
                <li>
                  Basic account metadata required to operate the Service
                </li>
              </ul>

              <h3 className="text-xl font-semibold tracking-tight">
                Device and Usage Information
              </h3>
              <p className="opacity-80">
                We may automatically collect technical information including:
              </p>
              <ul className="list-disc list-inside opacity-80 pl-2 flex flex-col gap-2">
                <li>Device type</li>
                <li>Operating system</li>
                <li>App version</li>
                <li>Language preferences</li>
                <li>IP address</li>
                <li>Diagnostic information</li>
                <li>Crash reports</li>
                <li>Performance data</li>
                <li>Feature usage information</li>
              </ul>
              <p className="opacity-80">
                This information helps us improve reliability, security, and
                performance.
              </p>

              <h3 className="text-xl font-semibold tracking-tight">
                Payment Information
              </h3>
              <p className="opacity-80">
                Payments are securely processed by our third-party payment
                providers. Mondy does not store your payment card information
                on its own servers.
              </p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold tracking-tight">
                3. How We Use Your Information
              </h2>
              <p className="opacity-80">We use your information to:</p>
              <ul className="list-disc list-inside opacity-80 pl-2 flex flex-col gap-2">
                <li>Create and manage your account</li>
                <li>Authenticate your identity</li>
                <li>
                  Publish and manage content on connected social media
                  platforms
                </li>
                <li>Generate AI-assisted content</li>
                <li>Transcribe voice recordings</li>
                <li>Provide customer support</li>
                <li>
                  Improve the quality, accuracy, reliability, and performance of
                  Mondy&apos;s Services and AI capabilities
                </li>
                <li>Detect fraud, abuse, and unauthorized access</li>
                <li>Maintain security and platform integrity</li>
                <li>Comply with applicable legal obligations</li>
              </ul>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold tracking-tight">
                4. AI Processing and Service Improvement
              </h2>
              <p className="opacity-80">
                Mondy uses artificial intelligence to generate content, process
                voice recordings, and provide intelligent recommendations.
              </p>
              <p className="opacity-80">
                To improve the quality, accuracy, reliability, and performance
                of our Services, we may use voice recordings, transcripts,
                prompts, generated content, and other user-submitted content for
                research, testing, quality assurance, and machine learning.
              </p>
              <p className="opacity-80">
                Where practical, this information is processed in a
                de-identified or pseudonymized form and separated from directly
                identifying personal information.
              </p>
              <p className="opacity-80">
                We do not sell your voice recordings, transcripts, or AI
                inputs.
              </p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold tracking-tight">
                5. Data Sharing and Third Parties
              </h2>
              <p className="opacity-80">
                We do not sell your personal information.
              </p>
              <p className="opacity-80">
                We use trusted third-party service providers to operate and
                improve Mondy. Depending on the features you use, these
                providers may process limited information on our behalf.
              </p>
              <ul className="list-disc list-inside opacity-80 pl-2 flex flex-col gap-2">
                <li>
                  <strong>Cloud Hosting:</strong> Google Cloud Platform (GCP) –
                  Secure hosting, storage, networking, and infrastructure.
                </li>
                <li>
                  <strong>Artificial Intelligence &amp; Language Models:</strong>{" "}
                  Google Gemini, Anthropic Claude, OpenAI ChatGPT, and xAI Grok
                  – Used to generate, transform, summarize, and enhance content
                  based on your inputs.
                </li>
                <li>
                  <strong>Authentication:</strong> Clerk and OAuth providers –
                  Used to securely authenticate users and manage account access.
                </li>
                <li>
                  <strong>Payment Processing:</strong> RevenueCat – Used to
                  manage subscriptions, purchases, and billing. Payment
                  information is processed by Apple, Google, and RevenueCat;
                  Mondy does not store your payment card details.
                </li>
                <li>
                  <strong>Speech-to-Text / Transcription:</strong> AssemblyAI,
                  Google Speech-to-Text, and Deepgram – Used to transcribe voice
                  recordings into text for processing.
                </li>
                <li>
                  <strong>Analytics:</strong> Mixpanel, Google Analytics, and
                  Firebase Analytics – Used to understand app performance,
                  feature usage, diagnose issues, and improve the user
                  experience.
                </li>
              </ul>
              <p className="opacity-80">
                These providers only receive the information necessary to
                perform the services we request and are contractually or legally
                required to protect your data.
              </p>
              <p className="opacity-80">
                We also share information with social media platforms only when
                you explicitly authorize Mondy to publish or manage content on
                your behalf.
              </p>
              <p className="opacity-80">
                We may disclose information where required by applicable law or
                to protect the safety, rights, or property of Mondy, our users,
                or others.
              </p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold tracking-tight">
                6. Cookies and Tracking Technologies
              </h2>
              <p className="opacity-80">
                Our website uses a small first-party cookie (
                <code className="text-sm bg-black/5 px-1.5 py-0.5 rounded">
                  mondy_cookie_consent
                </code>
                ) to remember your cookie preferences.
              </p>
              <p className="opacity-80">
                This cookie does not track you across other websites.
              </p>
              <p className="opacity-80">
                Mondy does not use cross-app or cross-site tracking for
                advertising purposes without obtaining your permission through
                Apple&apos;s App Tracking Transparency (ATT) framework where
                required.
              </p>
            </section>

            <section
              id="data-deletion"
              className="flex flex-col gap-4 scroll-mt-32"
            >
              <h2 className="text-2xl font-bold tracking-tight">
                7. Data Retention and Account Deletion
              </h2>
              <p className="opacity-80">
                We retain your information only for as long as necessary to:
              </p>
              <ul className="list-disc list-inside opacity-80 pl-2 flex flex-col gap-2">
                <li>Provide the Services</li>
                <li>Improve and maintain our platform</li>
                <li>Resolve disputes</li>
                <li>Enforce our agreements</li>
                <li>Comply with applicable legal obligations</li>
              </ul>

              <h3 className="text-xl font-semibold tracking-tight">
                Disconnect Connected Platforms
              </h3>
              <p className="opacity-80">Within the App, navigate to:</p>
              <p className="opacity-80">
                <strong>Settings → Connected Accounts</strong>
              </p>
              <p className="opacity-80">
                Disconnecting a platform immediately revokes and deletes the
                stored authorization tokens associated with that platform from
                our active systems.
              </p>

              <h3 className="text-xl font-semibold tracking-tight">
                Delete Your Account
              </h3>
              <p className="opacity-80">
                You may permanently delete your Mondy account directly within
                the iOS application:
              </p>
              <p className="opacity-80">
                <strong>Profile → Edit Profile → Delete Account</strong>
              </p>
              <p className="opacity-80">
                Alternatively, you may submit a deletion request by emailing:{" "}
                <a
                  href="mailto:support@mondy.ai"
                  className="text-blue-600 hover:underline"
                >
                  support@mondy.ai
                </a>
              </p>

              <h3 className="text-xl font-semibold tracking-tight">
                After Deletion
              </h3>
              <p className="opacity-80">When you delete your account:</p>
              <ul className="list-disc list-inside opacity-80 pl-2 flex flex-col gap-2">
                <li>
                  Personal information is removed from our active systems.
                </li>
                <li>
                  Connected platform authorization tokens are revoked and
                  deleted.
                </li>
                <li>
                  Voice recordings, transcripts, posts, drafts, and uploaded
                  content are removed from our active systems.
                </li>
                <li>
                  Secure backups are permanently deleted within 30 days.
                </li>
              </ul>
              <p className="opacity-80">
                Certain information may be retained where required by law,
                including records necessary for fraud prevention, dispute
                resolution, tax, accounting, or regulatory compliance.
              </p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold tracking-tight">
                8. International Data Transfers
              </h2>
              <p className="opacity-80">
                Your information may be processed and stored in countries other
                than your own.
              </p>
              <p className="opacity-80">
                Where required by applicable law, we implement appropriate
                safeguards to protect personal information during international
                transfers.
              </p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold tracking-tight">9. Security</h2>
              <p className="opacity-80">
                We implement appropriate technical and organizational safeguards
                to protect your information, including:
              </p>
              <ul className="list-disc list-inside opacity-80 pl-2 flex flex-col gap-2">
                <li>Encrypted data transmission (TLS/HTTPS)</li>
                <li>Secure storage of authorization credentials</li>
                <li>Access controls and authentication</li>
                <li>
                  Continuous monitoring and security practices designed to
                  protect against unauthorized access, disclosure, alteration,
                  or destruction of data
                </li>
              </ul>
              <p className="opacity-80">
                While no method of transmission or storage is completely secure,
                we continually work to protect your information using
                industry-standard practices.
              </p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold tracking-tight">
                10. Your Privacy Rights
              </h2>
              <p className="opacity-80">
                Depending on your location, you may have rights including:
              </p>
              <ul className="list-disc list-inside opacity-80 pl-2 flex flex-col gap-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Withdraw consent where applicable</li>
                <li>
                  Object to or restrict certain processing activities
                </li>
                <li>
                  Request a copy of your personal data where required by law
                </li>
              </ul>
              <p className="opacity-80">
                To exercise your rights, contact:{" "}
                <a
                  href="mailto:support@mondy.ai"
                  className="text-blue-600 hover:underline"
                >
                  support@mondy.ai
                </a>
              </p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold tracking-tight">
                11. Children&apos;s Privacy
              </h2>
              <p className="opacity-80">
                Mondy is not intended for children under the age of 13, or the
                minimum legal age required in your jurisdiction.
              </p>
              <p className="opacity-80">
                We do not knowingly collect personal information from children.
                If we become aware that such information has been collected, we
                will promptly delete it.
              </p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold tracking-tight">
                12. Changes to this Privacy Policy
              </h2>
              <p className="opacity-80">
                We may update this Privacy Policy from time to time.
              </p>
              <p className="opacity-80">
                When we make material changes, we will update the &quot;Last
                updated&quot; date and, where appropriate, notify you through
                the App or by other reasonable means.
              </p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold tracking-tight">
                13. Contact Us
              </h2>
              <p className="opacity-80">
                If you have questions about this Privacy Policy or wish to
                exercise your privacy rights, please contact us:
              </p>
              <ul className="list-none opacity-80 pl-0 flex flex-col gap-2">
                <li>
                  <strong>Mondy.ai</strong>
                </li>
                <li>
                  Email:{" "}
                  <a
                    href="mailto:hello@mondy.ai"
                    className="text-blue-600 hover:underline"
                  >
                    hello@mondy.ai
                  </a>
                </li>
                <li>
                  Website:{" "}
                  <a
                    href="https://mondy.ai"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://mondy.ai
                  </a>
                </li>
              </ul>
              <p className="opacity-80">
                You can also{" "}
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
