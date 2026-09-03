"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  TEXT_STYLES,
  TEXT_STYLE_LABELS,
  applyStyle,
  toPlain,
  type TextStyle,
} from "@/lib/unicodeTextStyles";

type StylePreviewGridProps = {
  text: string;
};

async function copyText(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}

export default function StylePreviewGrid({ text }: StylePreviewGridProps) {
  const [copied, setCopied] = useState<TextStyle | null>(null);
  const plain = toPlain(text);
  const empty = plain.trim() === "";

  const onCopy = async (style: TextStyle, value: string) => {
    if (!value.trim()) return;
    const ok = await copyText(value);
    if (!ok) return;
    setCopied(style);
    window.setTimeout(() => setCopied((current) => (current === style ? null : current)), 1600);
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold tracking-[-0.05em] text-mondy-ink md:text-3xl">
          Style previews
        </h2>
        <p className="text-base font-medium tracking-tight text-mondy-ink/55">
          Copy the whole post in one Unicode style. Use the editor above to mix styles on individual
          words.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {TEXT_STYLES.map((style) => {
          const styled = empty ? "" : applyStyle(plain, style);
          const isCopied = copied === style;
          return (
            <div
              key={style}
              className="flex flex-col gap-3 rounded-[1.5rem] border border-black/[0.05] bg-white p-5 shadow-[0_12px_32px_-16px_rgba(28,26,23,0.12)]"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-bold tracking-tight text-mondy-ink">
                  {TEXT_STYLE_LABELS[style]}
                </h3>
                <button
                  type="button"
                  onClick={() => onCopy(style, styled)}
                  disabled={empty}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold tracking-tight transition-all",
                    empty
                      ? "cursor-not-allowed bg-black/5 text-mondy-ink/30"
                      : isCopied
                        ? "bg-mondy-accent text-white"
                        : "bg-secondary-50 text-mondy-accent hover:bg-secondary-60",
                  )}
                >
                  {isCopied ? <Check className="size-3.5" strokeWidth={2.5} /> : <Copy className="size-3.5" />}
                  {isCopied ? "Copied" : "Copy"}
                </button>
              </div>
              <p
                className={cn(
                  "min-h-[4.5rem] whitespace-pre-wrap break-words text-[15px] leading-relaxed text-mondy-ink",
                  empty && "text-mondy-ink/30",
                )}
              >
                {empty ? "Type something to preview" : styled}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
