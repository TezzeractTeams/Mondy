import Link from "next/link";
import type { ReactNode } from "react";
import { IconBrandApple, IconBrandGooglePlay } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const iosHref = process.env.NEXT_PUBLIC_MONDY_IOS_URL?.trim() || "/infopage";
const androidHref = process.env.NEXT_PUBLIC_MONDY_ANDROID_URL?.trim() || "/infopage";

function StoreLink({
  href,
  label,
  sub,
  icon,
}: {
  href: string;
  label: string;
  sub: string;
  icon: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-xl border border-black/[0.08] bg-white/90 px-3 py-2.5",
        "text-left shadow-sm transition-colors hover:border-mondy-accent/40 hover:bg-white",
      )}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary-50 text-mondy-accent-deep [&_svg]:size-[22px]">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold text-mondy-ink">{label}</span>
        <span className="block text-[11px] text-neutral-80">{sub}</span>
      </span>
    </Link>
  );
}

export function ArticleDownloadMondy({ className }: { className?: string }) {
  return (
    <aside className={cn("hidden lg:block", className)}>
      <div className="lg:sticky lg:top-28">
        <div className="flex flex-col gap-4 rounded-2xl border border-black/[0.06] bg-gradient-to-b from-white/90 to-secondary-50/80 p-5 shadow-sm">
          <div className="flex flex-col gap-1">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-80">Download Mondy</h2>
            <p className="text-sm font-semibold leading-snug text-mondy-ink">Ship LinkedIn content from your voice</p>
            <p className="text-xs leading-relaxed text-neutral-80">
              Grab the app on iOS or Android—or join the waitlist for early access while we roll out stores.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <StoreLink
              href={iosHref}
              label="App Store"
              sub="iPhone & iPad"
              icon={<IconBrandApple stroke={1.25} aria-hidden />}
            />
            <StoreLink
              href={androidHref}
              label="Google Play"
              sub="Android"
              icon={<IconBrandGooglePlay stroke={1.25} aria-hidden />}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
