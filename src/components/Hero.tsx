"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
/**
* Headline horizontal tuning (any CSS length: rem, vw, %, px).
*/
const HEADLINE_OFFSET = {
  line1TranslateX: "10px",
  line2TranslateX: "0px",
} as const;

/**
* Hand mockup position inside its column (CSS lengths).
*/
const HERO_PHONE_IMAGE = {
  translateX: "-100px",
  translateY: "-70px",
} as const;

/** Section fill — ripples use the same color so shadows read as layered discs. */
const HERO_SURFACE = "#F5F3F0";

/** Largest first (painted back); soft shadow bottom-right (light from top-left). */
const NEOMORPHIC_RIPPLES: { size: string; mobileSize: string }[] = [
  { size: "min(130vw, 1240px)", mobileSize: "130vw" },
  { size: "min(102vw, 980px)", mobileSize: "100vw" },
  { size: "min(78vw, 720px)", mobileSize: "75vw" },
  { size: "min(52vw, 460px)", mobileSize: "50vw" },
];

const NEOMORPHIC_SHADOW =
  "10px 14px 56px rgba(255, 180, 160, 0.4), 4px 8px 32px rgba(255, 200, 180, 0.1)";

/** Matches floating card wrappers (`w-[320px]`); used so Next.js serves sharp srcset (incl. retina). */
const HERO_FLOATING_CARD_SIZES = "(min-width: 1024px) 320px, 90vw";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative box-border h-[100dvh] max-h-[100dvh] w-full shrink-0 overflow-x-hidden overflow-y-clip flex flex-col bg-[#F5F3F0]">

      {/* Bottom anchors to page bg; fades upward so ripples read in the upper hero */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `linear-gradient(
            to top,
            ${HERO_SURFACE} 0%,
            ${HERO_SURFACE} 12%,
            rgba(245, 243, 240, 0.88) 28%,
            rgba(245, 243, 240, 0.35) 48%,
            rgba(245, 243, 240, 0) 72%
          )`,
        }}
      />

      {/* Neomorphic ripples — z-0 sits behind the gradient overlay */}
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
                    scale: [1, 1.1, 1],
                    opacity: [1, 0.62, 1],
                  }
              }
              transition={{
                duration: 1.72 - index * 0.22,
                repeat: Infinity,
                repeatType: "loop",
                times: [0, 0.24, 1],
                ease: ["circIn", [0.15, 0.55, 0.2, 1]],
                delay: index * 0.12,
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

      {/* Floating social cards */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute left-[16vw] top-[30vh] z-[20] hidden lg:block w-[320px]"
        aria-hidden
      >
        <motion.div
          className="origin-center -rotate-[6deg]"
          animate={reduceMotion ? { y: 0 } : { y: [0, -15, 0] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/PostCard.png"
            alt="Social post preview"
            width={1380}
            height={1596}
            className="h-auto w-full rounded-[32px]"
            sizes={HERO_FLOATING_CARD_SIZES}
            quality={92}
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.85, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute right-[16vw] top-[46vh] z-[20] hidden lg:block w-[320px]"
        aria-hidden
      >
        <motion.div
          className="origin-center rotate-[6deg]"
          animate={reduceMotion ? { y: 0 } : { y: [0, -20, 0] }}
          transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
        >
          <Image
            src="/Test.png"
            alt="Social post preview"
            width={323}
            height={377}
            className="h-auto w-full"
            sizes={HERO_FLOATING_CARD_SIZES}
            quality={92}
          />
        </motion.div>
      </motion.div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col w-full max-w-[1440px] mx-auto px-6 md:px-12 pt-20 pb-6 md:pb-8">
        <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-4 lg:items-stretch lg:justify-items-center">
          <div className="order-1 flex min-h-0 w-full flex-1 flex-col lg:col-span-12 lg:mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
            <div className="relative flex min-h-0 w-full flex-1 flex-col items-center isolate px-1 text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex w-full flex-col items-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#1C1A17] tracking-tight md:tracking-[-0.07em] leading-[1.05] md:leading-[0.9] relative z-0 pointer-events-none shrink-0 pt-4 md:pt-14 px-4 md:px-0"
              >
                <div className="flex flex-col items-center ">
                  <span className="w-full lg:w-max pt-6 md:pt-10 max-w-none shrink-0 lg:whitespace-nowrap text-center lg:text-left xl:text-center will-change-transform">
                    Talk for 10 minutes.
                  </span>
                  <span className="mt-2 md:mt-4 lg:mt-0 w-full lg:w-max max-w-none shrink-0 lg:whitespace-nowrap text-center lg:text-left xl:text-center will-change-transform">
                    A full week of content, done.
                  </span>
                </div>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative z-10  w-[128%] md:w-[50%] max-w-[min(98vw,820px)] shrink-0 self-center"
              >
                <div className="mt-8 md:mt-0 sm:md:-mt-8 lg:md:-mt-12 xl:md:-mt-20">
                  <div
                    className="relative will-change-transform"
                    style={{
                      transform: `translate(${HERO_PHONE_IMAGE.translateX}, ${HERO_PHONE_IMAGE.translateY})`,
                    }}
                  >
                    <Image
                      src="/image4.png"
                      alt="Hand holding a smartphone"
                      width={2000}
                      height={1288}
                      className="relative z-0 w-full h-auto object-contain object-bottom drop-shadow-[0_40px_80px_-15px_rgba(0,0,0,0.25)]"
                      priority
                    />
                    <div
                      className="pointer-events-none absolute inset-0 z-[1]"
                      style={{
                        background: `linear-gradient(
                          to top,
                          ${HERO_SURFACE} 0%,
                          ${HERO_SURFACE} 22%,
                          rgba(245, 243, 240, 0.55) 44%,
                          rgba(245, 243, 240, 0.12) 62%,
                          rgba(245, 243, 240, 0) 78%
                        )`,
                      }}
                      aria-hidden
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Badges */}
        <div className="absolute bottom-10 left-12 z-20 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="bg-white/20 backdrop-blur-lg rounded-2xl px-4 py-3 flex items-center gap-4 border border-white shadow-lg"
          >
            <div className="relative h-10 w-10 shrink-0">
              <Image
                src="/producthunt.svg"
                alt=""
                width={56}
                height={53}
                className="h-full w-full object-contain"
                aria-hidden
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#FF6154] uppercase tracking-widest">Featured on</span>
              <span className="text-xl font-bold text-[#1C1A17] tracking-tight">Product Hunt</span>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 right-12 z-20 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="bg-black text-white rounded-2xl px-4 py-3 flex items-center gap-4 border border-white/10 shadow-2xl"
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <svg viewBox="0 0 384 512" className="w-full h-full fill-current">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-white/50  ">Coming Soon to</span>
              <span className="text-xl font-bold tracking-tight">App Store</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}