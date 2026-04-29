import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ArticleFigureProps = {
  caption: ReactNode;
  source?: string;
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
};

export function ArticleFigure({
  caption,
  source,
  src,
  alt,
  width = 800,
  height = 480,
  className,
}: ArticleFigureProps) {
  return (
    <figure className={cn("my-8 flex flex-col gap-2", className)}>
      <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-neutral-50 shadow-sm">
        {src ? (
          <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full object-cover" sizes="(max-width: 768px) 100vw, 65ch" />
        ) : (
          <div
            className="flex aspect-[5/3] w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-secondary-50 to-primary-50 px-6 text-center"
            role="img"
            aria-label={alt}
          >
            <span className="text-sm font-medium text-neutral-80">{alt}</span>
            <span className="text-xs text-neutral-70">Illustration placeholder</span>
          </div>
        )}
      </div>
      <figcaption className="text-sm text-neutral-80">
        <span className="block opacity-90">{caption}</span>
        {source ? <span className="mt-1 block text-xs text-neutral-70">Source: {source}</span> : null}
      </figcaption>
    </figure>
  );
}
