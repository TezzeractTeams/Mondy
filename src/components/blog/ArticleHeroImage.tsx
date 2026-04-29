import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ArticleHeroImageProps = {
  src: string;
  alt: string;
  caption?: ReactNode;
  className?: string;
  priority?: boolean;
};

export function ArticleHeroImage({ src, alt, caption, className, priority = true }: ArticleHeroImageProps) {
  return (
    <figure className={cn("w-full overflow-hidden rounded-2xl border border-black/[0.06] bg-neutral-50 shadow-sm", className)}>
      <div className="relative aspect-[21/9] w-full min-h-[160px] max-h-[min(52vh,420px)] md:aspect-[2.4/1] md:max-h-[min(56vh,480px)]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 1152px) 100vw, 1152px"
          className="object-cover object-center"
        />
      </div>
      {caption ? (
        <figcaption className="border-t border-black/[0.06] bg-white/60 px-4 py-2.5 text-center text-xs text-neutral-80 md:text-sm">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
