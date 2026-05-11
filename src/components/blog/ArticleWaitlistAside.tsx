import Link from "next/link";
import { cn } from "@/lib/utils";
import { mondyBtn } from "@/styles/mondy";

export function ArticleWaitlistAside({ className }: { className?: string }) {
  return (
    <aside className={cn("hidden lg:block", className)}>
      <div className="lg:sticky lg:top-28">
        <div className="flex flex-col gap-4 rounded-2xl border border-black/[0.06] bg-gradient-to-b from-white/90 to-secondary-50/80 p-5 shadow-sm">
          <div className="flex flex-col gap-1">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-80">Join the waitlist</h2>
            <p className="text-sm font-semibold leading-snug text-mondy-ink">Ship LinkedIn content from your voice</p>
            <p className="text-xs leading-relaxed text-neutral-80">
              Get early access to Mondy—talk for a few minutes and turn it into a week of polished posts.
            </p>
          </div>
          <Link href="/infopage" className={cn(mondyBtn.primaryLg, "block w-full text-center")}>
            Join the waitlist
          </Link>
        </div>
      </div>
    </aside>
  );
}
