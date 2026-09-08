"use client";

import { useMemo, useRef, useState } from "react";
import { Check, Copy, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { mondyBtn } from "@/styles/mondy";
import {
  DEFAULT_HEADLINE,
  DEFAULT_HEADLINE_INPUT,
  HEADLINE_MAX,
  HEADLINE_PROFILE_OPTIONS,
  type HeadlineProfile,
} from "@/lib/linkedinHeadline";
import LinkedInHeadlinePreviews from "./LinkedInHeadlinePreviews";

const inputClass =
  "w-full rounded-2xl border border-black/[0.06] bg-mondy-surface px-4 py-2.5 text-sm font-medium tracking-tight text-mondy-ink outline-none placeholder:text-mondy-ink/30 focus:border-mondy-accent/50 focus:ring-2 focus:ring-mondy-accent/20";

async function copyText(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}

export default function LinkedInHeadlineGenerator() {
  const [whatYouDo, setWhatYouDo] = useState(DEFAULT_HEADLINE_INPUT.whatYouDo);
  const [whoYouHelp, setWhoYouHelp] = useState(DEFAULT_HEADLINE_INPUT.whoYouHelp);
  const [whatYouWant, setWhatYouWant] = useState(DEFAULT_HEADLINE_INPUT.whatYouWant);
  const [profile, setProfile] = useState<HeadlineProfile>(DEFAULT_HEADLINE_INPUT.profile);
  const [headline, setHeadline] = useState(DEFAULT_HEADLINE);
  const [copied, setCopied] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);
  const doneTimerRef = useRef<number | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);

  const count = headline.length;
  const overLimit = count > HEADLINE_MAX;
  const nearLimit = count >= HEADLINE_MAX - 15;
  const canGenerate = useMemo(() => {
    if (profile === "jobseeker") {
      return Boolean(whatYouWant.trim() || whoYouHelp.trim() || whatYouDo.trim());
    }
    return Boolean(whoYouHelp.trim() || whatYouDo.trim());
  }, [profile, whatYouDo, whoYouHelp, whatYouWant]);

  const onGenerate = async () => {
    if (!canGenerate) {
      setFormError("Fill in at least what you do, or who you help.");
      return;
    }
    setFormError(null);
    setDone(false);
    if (doneTimerRef.current) window.clearTimeout(doneTimerRef.current);
    setGenerating(true);
    try {
      const response = await fetch("/api/linkedin-headline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          whatYouDo,
          whoYouHelp,
          whatYouWant,
          profile,
        }),
      });
      const payload = (await response.json()) as { headline?: string; error?: string };
      if (!response.ok) {
        setFormError(payload.error ?? "Couldn’t write that headline. Try again.");
        return;
      }
      if (!payload.headline) {
        setFormError("Couldn’t write that headline. Try again.");
        return;
      }
      setHeadline(payload.headline);
      setDone(true);
      doneTimerRef.current = window.setTimeout(() => setDone(false), 1600);
      window.requestAnimationFrame(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    } catch {
      setFormError("Couldn’t write that headline. Check your connection and try again.");
    } finally {
      setGenerating(false);
    }
  };

  const onCopy = async () => {
    const value = headline.trim();
    if (!value) return;
    const ok = await copyText(value);
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
      <section className="flex flex-col gap-5 rounded-[2rem] border border-black/[0.05] bg-white p-5 shadow-[0_20px_50px_-20px_rgba(28,26,23,0.14)] md:p-7">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="headline-what-you-do" className="text-[11px] font-bold uppercase tracking-wider text-mondy-ink/40">
            What you do
          </label>
          <textarea
            id="headline-what-you-do"
            value={whatYouDo}
            onChange={(e) => setWhatYouDo(e.target.value)}
            placeholder="The service or product, named the way buyers say it"
            rows={2}
            className={cn(inputClass, "mondy-scrollbar resize-y leading-relaxed")}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="headline-who-you-help" className="text-[11px] font-bold uppercase tracking-wider text-mondy-ink/40">
            Who you help, and what changes
          </label>
          <textarea
            id="headline-who-you-help"
            value={whoYouHelp}
            onChange={(e) => setWhoYouHelp(e.target.value)}
            placeholder="Who you take on, and what is different after they work with you"
            rows={2}
            className={cn(inputClass, "mondy-scrollbar resize-y leading-relaxed")}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="headline-what-you-want" className="text-[11px] font-bold uppercase tracking-wider text-mondy-ink/40">
            What you want from LinkedIn
          </label>
          <textarea
            id="headline-what-you-want"
            value={whatYouWant}
            onChange={(e) => setWhatYouWant(e.target.value)}
            placeholder="The people or result you want LinkedIn to bring in"
            rows={2}
            className={cn(inputClass, "mondy-scrollbar resize-y leading-relaxed")}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-mondy-ink/40">Profile</p>
          <div className="flex flex-wrap gap-1.5">
            {HEADLINE_PROFILE_OPTIONS.map((option) => {
              const active = profile === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setProfile(option.id)}
                  aria-pressed={active}
                  className={cn(
                    "inline-flex items-center rounded-full border px-3 py-1.5 text-[13px] font-bold tracking-tight transition-colors",
                    active
                      ? "border-mondy-accent bg-mondy-accent text-white"
                      : "border-black/[0.06] bg-mondy-surface text-mondy-ink hover:border-mondy-accent/40 hover:bg-secondary-50",
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {formError ? (
          <p className="text-xs font-medium tracking-tight text-mondy-coral">{formError}</p>
        ) : null}

        <button
          type="button"
          onClick={() => void onGenerate()}
          disabled={generating}
          className={cn(
            mondyBtn.primaryLg,
            "inline-flex w-full items-center justify-center gap-2 sm:w-auto",
            generating && "pointer-events-none opacity-70",
            done && "!bg-emerald-600 shadow-emerald-600/25 hover:!brightness-110",
          )}
        >
          {generating ? (
            <Loader2 className="size-4 animate-spin" />
          ) : done ? (
            <Check className="size-4" strokeWidth={2.5} />
          ) : null}
          {generating ? "Writing" : done ? "Done" : "Write my headline"}
        </button>

        <div
          ref={resultRef}
          id="generated-headline"
          className={cn(
            "flex flex-col gap-3 rounded-[1.75rem] border p-4 transition-[border-color,box-shadow,background-color] duration-500 md:p-5",
            done
              ? "border-mondy-accent bg-mondy-accent/15 ring-4 ring-mondy-accent/30"
              : "border-mondy-accent/40 bg-mondy-accent/10",
          )}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-col gap-0.5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-mondy-accent-deep">
                Your headline
              </p>
              <p
                className={cn(
                  "text-sm font-semibold tracking-tight",
                  overLimit ? "text-mondy-coral" : nearLimit ? "text-mondy-ink/70" : "text-mondy-ink/50",
                )}
              >
                {count} / {HEADLINE_MAX} characters
              </p>
            </div>
            <button
              type="button"
              onClick={() => void onCopy()}
              disabled={!headline.trim()}
              className={cn(
                mondyBtn.primaryLg,
                "inline-flex items-center gap-2 !px-5 !py-2.5 !text-sm",
                !headline.trim() && "pointer-events-none opacity-40",
              )}
            >
              {copied ? <Check className="size-4" strokeWidth={2.5} /> : <Copy className="size-4" />}
              {copied ? "Copied" : "Copy the headline"}
            </button>
          </div>
          <textarea
            value={headline}
            onChange={(e) => setHeadline(e.target.value.slice(0, HEADLINE_MAX))}
            maxLength={HEADLINE_MAX}
            rows={4}
            aria-label="Your generated LinkedIn headline"
            placeholder="Your headline will land here."
            className={cn(
              inputClass,
              "mondy-scrollbar min-h-[6.5rem] resize-y bg-white text-base font-semibold leading-relaxed",
              done ? "border-mondy-accent ring-2 ring-mondy-accent/25" : "border-mondy-accent/20",
            )}
          />
          <p className="text-xs font-medium tracking-tight text-mondy-ink/45">
            Edit the line after it writes. The first ~70 characters are what search, comments, and
            invitations show.
          </p>
        </div>
      </section>

      <aside className="flex flex-col gap-4 rounded-[2rem] border border-black/[0.05] bg-white p-5 shadow-[0_20px_50px_-20px_rgba(28,26,23,0.14)] md:p-7 lg:sticky lg:top-24">
        <h2 className="text-lg font-extrabold tracking-[-0.04em] text-mondy-ink">Where it gets cut</h2>
        <LinkedInHeadlinePreviews headline={headline} />
      </aside>
    </div>
  );
}
