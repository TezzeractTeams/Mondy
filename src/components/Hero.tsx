"use client";
import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Headline horizontal tuning (any CSS length: rem, vw, %, px).
 * Uses translateX so shifts are visible and predictable (margins on full-width blocks + text-align are easy to get wrong).
 * Line 1: negative = further left, positive = right.
 * Line 2: negative = left, positive = further right.
 */
const HEADLINE_OFFSET = {
  line1TranslateX: "-80px",
  line2TranslateX: "80px",
} as const;

/** Section fill — ripples use the same color so shadows read as layered discs. */
const HERO_SURFACE = "#F5F3F0";

/** Largest first (painted back); soft shadow bottom-right (light from top-left). */
const NEOMORPHIC_RIPPLES: { size: string }[] = [
  { size: "min(130vw, 1240px)" },
  { size: "min(102vw, 980px)" },
  { size: "min(78vw, 720px)" },
  { size: "min(52vw, 460px)" },
];

const NEOMORPHIC_SHADOW =
  "10px 14px 56px rgba(255, 223, 223, 0.63), 4px 8px 32px rgba(255, 230, 230, 0.03)";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen min-h-[100dvh] w-full overflow-x-hidden flex flex-col bg-[#F5F3F0]">

      {/* Neomorphic ripples — clip so headline nudges stay contained */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <div className="relative size-0">
          {NEOMORPHIC_RIPPLES.map(({ size }, index) => (
            <motion.div
              key={index}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
              initial={{ scale: 1, opacity: 1 }}
              animate={
                reduceMotion
                  ? { scale: 1, opacity: 1 }
                  : {
                      scale: [1, 1.048, 1],
                      opacity: [1, 0.84, 1],
                    }
              }
              transition={{
                duration: 2.05 - index * 0.18,
                repeat: Infinity,
                repeatType: "loop",
                times: [0, 0.26, 1],
                ease: ["circOut", [0.25, 0.8, 0.35, 1]],
                delay: index * 0.1,
              }}
              style={{
                width: size,
                height: size,
                backgroundColor: HERO_SURFACE,
                boxShadow: NEOMORPHIC_SHADOW,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col min-h-0 w-full max-w-[1440px] mx-auto px-6 md:px-12 pt-20 pb-6 md:pb-8">

        <div className="grid flex-1 min-h-0 grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-4 lg:items-stretch">

          {/* Left — above center image when it bleeds past the column */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start lg:justify-end order-2 lg:order-1 relative z-20 lg:min-h-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/40 backdrop-blur-xl p-6 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.03)] border border-white/50 max-w-[240px]"
            >
              <div className="w-12 h-12 bg-[#E17054]/10 rounded-2xl flex items-center justify-center mb-4 text-[#E17054]">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
              <p className="text-sm md:text-base font-semibold text-[#1C1A17] tracking-[-0.05em] leading-[1.2]">
                The ultimate content hack is here.
              </p>
            </motion.div>
          </div>

          {/* Center — headline behind phone; phone pinned to bottom of hero */}
          <div className="lg:col-span-6 flex flex-col min-h-[min(72vh,calc(100dvh-10rem))] lg:min-h-0 lg:h-full order-1 lg:order-2">
            <div className="relative flex flex-1 min-h-0 w-full isolate flex-col items-stretch text-center px-1">

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full min-w-0 self-stretch text-5xl md:text-7xl lg:text-[100px] font-extrabold text-[#1C1A17] tracking-[-0.05em] leading-[0.95] relative z-0 pointer-events-none shrink-0 pt-10"
              >
                <span
                  className="block w-full text-left will-change-transform"
                  style={{ transform: `translateX(${HEADLINE_OFFSET.line1TranslateX})` }}
                >
                  Talk for 10 minutes.
                </span>
                <span
                  className="mt-1 block w-full text-right md:mt-2 will-change-transform"
                  style={{ transform: `translateX(${HEADLINE_OFFSET.line2TranslateX})` }}
                >
                  A full week of content, done.
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative z-10 -mt-20 w-[150%] max-w-[min(98vw,720px)] sm:max-w-[800px] md:max-w-[920px] lg:max-w-[min(98vw,1040px)] xl:max-w-[min(98vw,1180px)] 2xl:max-w-[1280px] md:-mb-4 self-center"
              >
                <Image
                  src="/handmockphone.png"
                  alt="Hand holding a smartphone"
                  width={2000}
                  height={1288}
                  className="w-full h-auto object-contain object-bottom drop-shadow-[0_40px_80px_-15px_rgba(0,0,0,0.25)]"
                  priority
                />
              </motion.div>
            </div>
          </div>

          {/* Right — above center image when it bleeds past the column */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-end lg:justify-end order-3 mt-10 lg:mt-0 relative z-20 lg:min-h-0">
            <div className="lg:col-span-3 flex flex-col items-end order-3 mt-10 lg:mt-0">
              <div className="flex flex-col items-end text-right max-w-[300px]">

                {/* Profile card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-20 h-20 bg-white rounded-3xl mb-8 overflow-hidden shadow-sm border border-black/5"
                >
                  <div className="w-full h-full bg-gradient-to-br from-[#E17054]/20 to-transparent flex items-end justify-center">
                    <div className="w-14 h-14 bg-[#E17054]/40 rounded-full translate-y-4" />
                  </div>
                </motion.div>

                {/* Body text */}
                <p className="text-lg text-[#1C1A17]/80 font-medium tracking-[-0.05em] leading-[1.2] mb-4">
                  Drop a voice memo. Mondy writes content in your voice; platform by platform, post by post.
                </p>

                {/* Buttons aligned with body text */}
                <div className="flex flex-row gap-3 w-full justify-end">
                  <button className="bg-[#708FDB] text-white px-5 py-3 rounded-full text-sm font-bold shadow-md shadow-[#708FDB]/10 hover:brightness-110 transition-all active:scale-95 whitespace-nowrap">
                    App Store
                  </button>
                  <button className="bg-white/50 backdrop-blur-sm text-[#1C1A17] border border-black/10 px-5 py-3 rounded-full text-sm font-bold hover:bg-white transition-all active:scale-95 whitespace-nowrap">
                    Google Play
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}