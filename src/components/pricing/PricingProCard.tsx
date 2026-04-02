import React from "react";
import { Check, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CARD_RADIUS,
  CARD_SHADOW,
  FEATURED_CTA_CLASS,
  FEATURED_SHELL_GRADIENT,
} from "./pricing-styles";

/**
 * Pro — gradient frame is wider from `md` only.
 * `md:-mt-10` + `md:pt-[45px]`: extra gradient above while inner tops align with side cards.
 * `md:pb-[5px]` matches side cards’ 5px bottom frame.
 */
export function PricingProCard() {
  const topPanelClass = cn(
    "w-full border-b border-mondy-ink/[0.07] bg-white px-5 pb-5 pt-6 sm:px-6 sm:pb-6 sm:pt-7",
    "rounded-t-[calc(2.5rem-5px)] rounded-b-[calc(2.5rem-5px)] md:rounded-t-[calc(2.5rem-10px)] md:rounded-b-[calc(2.5rem-10px)]",
  );

  return (
    <div
      className={cn(
        "relative z-10 flex h-auto min-h-0 justify-center overflow-visible",
        "md:-mt-10 md:h-[min(65vh,720px)] lg:h-[65vh]",
      )}
    >
      <div
        className={cn(
          "relative flex h-full w-full max-w-full flex-col",
          CARD_SHADOW,
          CARD_RADIUS,
          FEATURED_SHELL_GRADIENT,
          "p-[5px]",
          "md:left-1/2 md:w-[calc(100%+10px)] md:max-w-[calc(100%+10px)] md:-translate-x-1/2",
          "md:pl-[10px] md:pr-[10px] md:pb-[10px]",
          "md:pt-[45px]",
        )}
      >
        <div className="pointer-events-none absolute left-1/2 top-2 z-20 -translate-x-1/2 sm:top-2.5 md:top-3">
          <span className="inline-block text-center text-[9px] font-bold uppercase leading-tight tracking-[0.18em] text-white sm:text-[10px] sm:tracking-[0.2em]">
            Best value to price
          </span>
        </div>

        <div
          className={cn(
            "flex min-h-0 flex-1 flex-col overflow-hidden rounded-[calc(2.5rem-5px)] bg-[#F6F8FF] md:rounded-[calc(2.5rem-10px)]",
            "pb-6 sm:pb-7",
          )}
        >
          <div className="flex min-h-0  flex-1 flex-col gap-6">
            <div className={topPanelClass}>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-tight text-mondy-ink/70">
                  <Zap className="size-4 text-mondy-accent" strokeWidth={1.75} />
                  <span>Full weekly run</span>
                </div>
              </div>

              <h3 className="mt-5 font-waffle text-3xl font-medium tracking-tight text-mondy-ink sm:mt-6 sm:text-4xl">
                Pro
              </h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-mondy-ink/50 sm:text-[15px]">
                Everything. All platforms. Full weekly run. Your voice, consistently.
              </p>

              <div className="mt-8 flex flex-col gap-5 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
                <button
                  type="button"
                  className={cn(
                    "shrink-0 rounded-full px-6 py-3 text-sm font-bold transition-all",
                    FEATURED_CTA_CLASS,
                    "hover:scale-[1.02] active:scale-95",
                  )}
                >
                  Get Started
                </button>
                <div className="text-left sm:text-right">
                  <p className="text-2xl font-extrabold tracking-tight text-mondy-ink sm:text-3xl">
                    $49/mo
                  </p>
                  <p className="mt-1 max-w-[220px] text-[11px] font-medium leading-snug text-mondy-ink/45 sm:ml-auto sm:text-right">
                    Billed yearly ($468/yr). $49/mo if billed monthly.
                  </p>
                </div>
              </div>
            </div>

            <ul className="min-h-[200px] flex-1 space-y-3  px-5 pt-1 text-mondy-ink/55 sm:px-6 ">
              <li className="flex gap-3 text-sm font-medium leading-snug ">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-mondy-ink/35"
                  strokeWidth={2}
                />
                <span>Everything in Free trial</span>
              </li>
              <li className="flex gap-3 text-sm font-medium leading-snug ">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-mondy-ink/35"
                  strokeWidth={2}
                />
                <span>Unlimited regenerations</span>
              </li>
              <li className="flex gap-3 text-sm font-medium leading-snug ">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-mondy-ink/35"
                  strokeWidth={2}
                />
                <span>Scheduling</span>
              </li>
              <li className="flex gap-3 text-sm font-medium leading-snug ">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-mondy-ink/35"
                  strokeWidth={2}
                />
                <span>Multiple PRO seats</span>
              </li>
              <li className="flex gap-3 text-sm font-medium leading-snug ">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-mondy-ink/35"
                  strokeWidth={2}
                />
                <span>Priority support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
