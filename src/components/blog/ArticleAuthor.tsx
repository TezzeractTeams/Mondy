import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ArticleAuthorProps = {
  name: string;
  bio: ReactNode;
  avatarSrc?: string;
  avatarAlt?: string;
  className?: string;
};

export function ArticleAuthor({ name, bio, avatarSrc, avatarAlt = "", className }: ArticleAuthorProps) {
  return (
    <section
      className={cn(
        "mt-12 flex w-full max-w-prose flex-col gap-4 rounded-2xl border border-black/[0.06] bg-white/70 p-6 shadow-sm sm:flex-row sm:items-start",
        className,
      )}
    >
      {avatarSrc ? (
        <div className="relative size-20 shrink-0 overflow-hidden rounded-full border border-black/[0.06] bg-neutral-50">
          <Image src={avatarSrc} alt={avatarAlt || name} width={160} height={160} className="size-full object-cover" />
        </div>
      ) : (
        <div
          className="flex size-20 shrink-0 items-center justify-center rounded-full border border-black/[0.06] bg-secondary-60 text-xl font-bold text-mondy-ink"
          aria-hidden
        >
          {name
            .split(" ")
            .map((p) => p[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </div>
      )}
      <div className="min-w-0 flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-80">About the author</p>
        <p className="text-lg font-bold text-mondy-ink">{name}</p>
        <div className="text-base leading-relaxed text-mondy-ink opacity-90">{bio}</div>
      </div>
    </section>
  );
}
