import Link from "next/link";
import { cn } from "@/lib/utils";
import { mondyBtn } from "@/styles/mondy";

/** Mondy waitlist promo block shown at the end of long-form articles. */
export function ArticleEndCta() {
  return (
    <div className="not-prose my-10 rounded-2xl border border-mondy-accent/25 bg-gradient-to-br from-secondary-50 to-primary-50 p-6 md:p-8">
      <h3 className="text-xl font-bold text-mondy-ink">Turn voice into a week of LinkedIn content</h3>
      <p className="mt-2 text-base leading-relaxed text-mondy-ink opacity-90">
        Mondy helps you talk for ten minutes and ship polished posts—without the blank-page grind. Join the waitlist to
        get early access.
      </p>
      <Link
        href="/infopage"
        className={cn(
          mondyBtn.primaryLg,
          "mt-4 inline-flex items-center justify-center !text-white !no-underline hover:!text-white hover:!no-underline",
        )}
      >
        Join Waitlist
      </Link>
    </div>
  );
}
