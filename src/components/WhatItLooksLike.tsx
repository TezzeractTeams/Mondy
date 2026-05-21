"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Pause, Play } from "lucide-react";
import { AudioWaveform } from "@/components/AudioWaveform";
import { cn } from "@/lib/utils";
import { mondyLayout, mondyType } from "@/styles/mondy";

const SAMPLE_AUDIO_SRC = "/voicerecording.mp3";

const TRANSCRIPT_FADE_PX = 116;
const TRANSCRIPT_CONTENT_TOP_INSET = TRANSCRIPT_FADE_PX + 8;
const TRANSCRIPT_MUTED = "#bcb9b2";
const TRANSCRIPT_ACTIVE = "#1c1a17";
const TRANSCRIPT_CURSOR = "#222222";
/** Words styled as the live “interim” tail while audio plays. */
const LIVE_TAIL_WORDS = 10;

const rawTranscript =
  "okay so I just left that founders meetup, like literally just got in the uber, and bro. I met so many people. actual people — not LinkedIn connections, not Twitter mutuals. That's where the opportunities actually are, anyway.";

const transcriptWords = rawTranscript.trim().split(/\s+/);

const linkedInPost = `Why do more people not go to networking events?

I went to a founders meetup tonight and met maybe 20 people I'd never crossed paths with before. Not avatars. Not DMs. Real humans in a room.

You can run a great Zoom call, or a great Twitter Space. But there's something that happens when you're standing there with coffee in hand and the conversation goes somewhere you didn't plan.`;

const xPost = [
  "Went to a founders meetup tonight.",
  "Met ~20 people I'd never run into online.",
  "On the drive home: that's where the signal is.",
  "You can't Zoom your way into every room that matters.",
  "Go to the thing.",
];

const outputs = [
  { platform: "LinkedIn", body: linkedInPost, isList: false as const },
  { platform: "X", body: xPost, isList: true as const },
];

function visibleWordCount(currentTime: number, duration: number, totalWords: number) {
  if (duration <= 0 || totalWords === 0) return 0;
  const progress = Math.min(1, currentTime / duration);
  return Math.min(totalWords, Math.floor(progress * totalWords));
}

function splitTranscriptByProgress(
  words: string[],
  visibleCount: number,
  liveTailWords: number,
) {
  if (visibleCount <= 0) {
    return { committed: "", interim: "" };
  }
  const interimStart = Math.max(0, visibleCount - liveTailWords);
  return {
    committed: words.slice(0, interimStart).join(" "),
    interim: words.slice(interimStart, visibleCount).join(" "),
  };
}

export default function WhatItLooksLike() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const userScrolledUpRef = useRef(false);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const visibleCount = visibleWordCount(currentTime, duration, transcriptWords.length);
  const { committed, interim } = splitTranscriptByProgress(
    transcriptWords,
    visibleCount,
    LIVE_TAIL_WORDS,
  );
  const showCursor =
    playing || (hasStarted && visibleCount > 0 && visibleCount < transcriptWords.length);

  const togglePlayback = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;

    if (el.paused) {
      if (el.ended || (el.duration > 0 && el.currentTime >= el.duration - 0.05)) {
        el.currentTime = 0;
        setCurrentTime(0);
        userScrolledUpRef.current = false;
      }
      setHasStarted(true);
      void el.play().catch(() => setPlaying(false));
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  }, []);

  const onTimeUpdate = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    setCurrentTime(el.currentTime);

    if (!userScrolledUpRef.current && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  const onLoadedMetadata = useCallback(() => {
    const el = audioRef.current;
    if (el && Number.isFinite(el.duration)) {
      setDuration(el.duration);
    }
  }, []);

  const onEnded = useCallback(() => {
    const el = audioRef.current;
    setPlaying(false);
    if (el && Number.isFinite(el.duration)) {
      setCurrentTime(el.duration);
    }
  }, []);

  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    userScrolledUpRef.current = distanceFromBottom > 40;
  }, []);

  useEffect(() => {
    if (userScrolledUpRef.current || !scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [visibleCount]);

  return (
    <section
      aria-labelledby="what-it-looks-like-heading"
      className="relative w-full py-20 md:py-24"
    >
      <div className={cn(mondyLayout.contentMax, "max-w-6xl px-6")}>
        <motion.div
          className="mb-14 text-center md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 id="what-it-looks-like-heading" className={mondyType.sectionHeading}>
            What it actually <span className="text-mondy-accent">looks like</span>
          </h2>
          <p className={cn(mondyType.sectionLead, "mx-auto mt-4 max-w-xl")}>
            From a voice note to a social post
          </p>
        </motion.div>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-8 xl:gap-12">
          <motion.div
            className={cn("flex min-w-0 flex-1 flex-col gap-5", "font-sf-pro")}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-extrabold tracking-[-0.04em] text-mondy-ink md:text-xl">
              What you recorded
            </h3>

            <div
              className={cn(
                "w-full overflow-hidden rounded-2xl bg-mondy-accent-deep text-white",
                "shadow-lg shadow-mondy-accent-deep/25",
              )}
            >
              <button
                type="button"
                onClick={togglePlayback}
                className={cn(
                  "flex w-full items-center justify-between gap-4 px-5 pb-2 pt-4 text-left",
                  "transition hover:brightness-105",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mondy-accent",
                )}
                aria-pressed={playing}
                aria-label={playing ? "Pause sample recording" : "Play sample recording"}
              >
                <span className="text-sm font-bold tracking-tight md:text-[15px]">
                  Listen to actual recording
                </span>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/20">
                  {playing ? (
                    <Pause className="h-5 w-5" aria-hidden />
                  ) : (
                    <Play className="h-5 w-5 translate-x-0.5" aria-hidden />
                  )}
                </span>
              </button>
              <div className="px-5 pb-5 pt-1">
                <AudioWaveform
                  audioRef={audioRef}
                  src={SAMPLE_AUDIO_SRC}
                  playing={playing}
                  currentTime={currentTime}
                  duration={duration}
                />
              </div>
            </div>

            <audio
              ref={audioRef}
              src={SAMPLE_AUDIO_SRC}
              preload="metadata"
              onTimeUpdate={onTimeUpdate}
              onLoadedMetadata={onLoadedMetadata}
              onEnded={onEnded}
            />

            <motion.div
              className={cn(
                "relative flex min-h-[280px] flex-1 flex-col overflow-hidden rounded-[1.75rem]",
                "border border-neutral-200/90 bg-white shadow-[0_1px_0_rgb(0_0_0_/0.04),0_12px_40px_-18px_rgb(0_0_0_/0.08)]",
              )}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              viewport={{ once: true }}
            >
              <div className="relative min-h-0 flex-1">
                <motion.div
                  ref={scrollRef}
                  className={cn(
                    "max-h-[min(380px,52vh)] min-h-[220px] overflow-y-auto overscroll-y-contain",
                    "px-5 pb-12 pt-[var(--tx-top)] md:px-8",
                    "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
                  )}
                  style={
                    {
                      "--tx-top": `${TRANSCRIPT_CONTENT_TOP_INSET}px`,
                    } as React.CSSProperties
                  }
                  role="region"
                  aria-label="Live voice transcript"
                  aria-live="polite"
                  onScroll={onScroll}
                >
                  <p
                    className={cn(
                      "font-medium antialiased break-words",
                      "text-[clamp(17px,2.35vw,24px)] leading-[clamp(24px,3.25vw,34px)]",
                    )}
                  >
                    {visibleCount === 0 ? (
                      playing ? (
                        <span
                          className="inline-block animate-pulse font-normal"
                          style={{ color: TRANSCRIPT_CURSOR }}
                          aria-hidden
                        >
                          |
                        </span>
                      ) : null
                    ) : committed ? (
                      <>
                        <span className="font-normal" style={{ color: TRANSCRIPT_MUTED }}>
                          {committed}{" "}
                        </span>
                        {interim ? (
                          <span className="font-semibold" style={{ color: TRANSCRIPT_ACTIVE }}>
                            {interim}
                          </span>
                        ) : null}
                        {showCursor ? (
                          <span
                            className="ms-px inline-block animate-pulse font-normal"
                            style={{ color: TRANSCRIPT_CURSOR }}
                            aria-hidden
                          >
                            |
                          </span>
                        ) : null}
                      </>
                    ) : (
                      <>
                        <span className="font-semibold" style={{ color: TRANSCRIPT_ACTIVE }}>
                          {interim}
                        </span>
                        {showCursor ? (
                          <span
                            className="ms-px inline-block animate-pulse font-normal"
                            style={{ color: TRANSCRIPT_CURSOR }}
                            aria-hidden
                          >
                            |
                          </span>
                        ) : null}
                      </>
                    )}
                  </p>
                </motion.div>

                <div
                  className="pointer-events-none absolute inset-x-0 top-0 z-10"
                  style={{
                    height: TRANSCRIPT_FADE_PX,
                    background:
                      "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 66%, rgba(255,255,255,0) 100%)",
                  }}
                  aria-hidden
                />
                <motion.div
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
                  style={{
                    height: TRANSCRIPT_FADE_PX,
                    background:
                      "linear-gradient(0deg, #ffffff 0%, rgba(255,255,255,0.75) 55%, rgba(255,255,255,0) 100%)",
                  }}
                  aria-hidden
                />
              </div>
            </motion.div>
          </motion.div>

          <div
            className="hidden shrink-0 items-center justify-center self-center lg:flex"
            aria-hidden
          >
            <motion.div
              className="flex h-14 w-14 items-center justify-center rounded-full bg-mondy-accent/15 text-mondy-accent-deep"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              viewport={{ once: true }}
            >
              <ArrowRight className="h-7 w-7" strokeWidth={2.25} />
            </motion.div>
          </div>

          <div
            className="flex shrink-0 justify-center py-1 text-mondy-accent-deep lg:hidden"
            aria-hidden
          >
            <motion.div
              className="flex h-12 w-12 items-center justify-center rounded-full bg-mondy-accent/15"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              viewport={{ once: true }}
            >
              <ArrowDown className="h-6 w-6" strokeWidth={2.25} />
            </motion.div>
          </div>

          <motion.div
            className="flex min-w-0 flex-1 flex-col gap-5 lg:max-w-none"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            viewport={{ once: true }}
          >
            <h3 className="font-noah text-lg font-extrabold tracking-[-0.04em] text-mondy-ink md:text-xl">
              What Mondy made for
            </h3>

            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-2 lg:gap-5 lg:overflow-visible lg:pb-0">
              {outputs.map((item) => (
                <article
                  key={item.platform}
                  className={cn(
                    "w-[min(100%,320px)] shrink-0 snap-start rounded-[1.75rem]",
                    "border border-neutral-200/90 bg-white p-6 shadow-[0_1px_0_rgb(0_0_0_/0.04),0_12px_40px_-18px_rgb(0_0_0_/0.06)] md:p-7",
                    "lg:w-auto lg:min-h-[320px] lg:shrink",
                  )}
                >
                  <h4 className="font-noah text-base font-semibold tracking-tight text-mondy-accent md:text-lg">
                    {item.platform}
                  </h4>
                  {item.isList ? (
                    <ul className="mt-4 space-y-3 font-noah text-[15px] font-normal leading-[1.45] text-mondy-ink/75 md:text-base md:leading-relaxed">
                      {(item.body as string[]).map((line) => (
                        <li key={line} className="list-none">
                          {line}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="mt-4 space-y-4 font-noah text-[15px] font-normal leading-[1.5] text-mondy-ink/75 md:text-base">
                      {(item.body as string).split("\n\n").map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
