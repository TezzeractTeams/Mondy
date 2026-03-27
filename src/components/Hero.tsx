"use client";
import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Headline horizontal tuning (any CSS length: rem, vw, %, px).
 * Line 1: negative = further left, positive = right.
 * Line 2: negative = left, positive = further right.
 */
const HEADLINE_OFFSET = {
  line1TranslateX: "0px",
  line2TranslateX: "0px",
} as const;

/**
 * Hand mockup position inside its column (CSS lengths).
 * Does not affect the Framer fade/slide-in — only the resting layout.
 */
const HERO_PHONE_IMAGE = {
  translateX: "0px",
  translateY: "0px",
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

/**
 * Floating Test.png cards — pick one: "sm" | "md" | "lg".
 * (Class strings are spelled out so Tailwind can see them.)
 */
const HERO_FLOATING_CARD_SIZE: "sm" | "md" | "lg" = "lg";

const HERO_FLOATING_CARD = {
  sm: {
    widthClass: "w-[clamp(96px,22vw,168px)] lg:w-[min(15vw,200px)]",
    sizes: "(min-width: 1024px) 200px, 168px",
    floatPx: { left: 7, right: 8 },
    enterX: 20,
  },
  md: {
    widthClass: "w-[clamp(128px,28vw,220px)] lg:w-[min(19vw,280px)]",
    sizes: "(min-width: 1024px) 280px, 220px",
    floatPx: { left: 9, right: 10 },
    enterX: 24,
  },
  lg: {
    widthClass: "w-[clamp(160px,38vw,300px)] lg:w-[min(25vw,380px)]",
    sizes: "(min-width: 1024px) 380px, 300px",
    floatPx: { left: 11, right: 13 },
    enterX: 28,
  },
} as const;

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const floatCard = HERO_FLOATING_CARD[HERO_FLOATING_CARD_SIZE];

  return (
    <section className="relative box-border h-[100dvh] max-h-[100dvh] w-full shrink-0 overflow-x-hidden overflow-y-clip flex flex-col bg-[#F5F3F0]">

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

      <div className="relative flex min-h-0 flex-1 flex-col w-full max-w-[1440px] mx-auto px-6 md:px-12 pt-20 pb-6 md:pb-8">

        <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-4 lg:items-stretch lg:justify-items-center">

          {/* Headline centered; phone mockup pinned to bottom of hero */}
          <div className="order-1 flex min-h-0 w-full flex-1 flex-col lg:col-span-12 lg:mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
            <div className="relative flex min-h-0 w-full flex-1 flex-col items-center isolate px-1 text-center">

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex w-full flex-col items-center text-5xl md:text-7xl lg:text-[100px] font-extrabold text-[#1C1A17] tracking-[-0.05em] leading-[0.95] relative z-0 pointer-events-none shrink-0 pt-10"
              >
                <div className="flex flex-col items-center ">
                <span
                  className="w-max pt-10 max-w-none shrink-0 whitespace-nowrap text-center"
                  style={{ transform: `translateX(${HEADLINE_OFFSET.line1TranslateX})` }}
                >
                  Talk for 10 minutes.
                </span>
                <span
                  className="mt-1 w-max max-w-none shrink-0 whitespace-nowrap text-center md:mt-2"
                  style={{ transform: `translateX(${HEADLINE_OFFSET.line2TranslateX})` }}
                >
                  A full week of content, done.
                </span>
                </div>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative z-10 mt-auto w-[170%] max-w-[min(98vw,720px)] shrink-0 self-center sm:max-w-[800px] md:max-w-[920px] lg:max-w-[min(98vw,1040px)] xl:max-w-[min(100vw,1180px)]"
              >
                <div className="-mt-12 sm:-mt-16 md:-mt-20">
                  <div
                    className="will-change-transform"
                    style={{
                      transform: `translate(${HERO_PHONE_IMAGE.translateX}, ${HERO_PHONE_IMAGE.translateY})`,
                    }}
                  >
                    <Image
                      src="/handmockphone.png"
                      alt="Hand holding a smartphone"
                      width={2000}
                      height={1288}
                      className="w-full h-auto object-contain object-bottom drop-shadow-[0_40px_80px_-15px_rgba(0,0,0,0.25)]"
                      priority
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating post cards — after main column so they paint above; z-30 + inline zIndex */}
      <motion.div
        initial={{ opacity: 0, x: -floatCard.enterX }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ zIndex: 30 }}
        className={`pointer-events-none absolute left-[max(0.5rem,3vw)] top-[min(26vh,200px)] z-30 hidden md:block lg:left-[max(1rem,5vw)] lg:top-[15vh] transform-gpu ${floatCard.widthClass}`}
        aria-hidden
      >
        <motion.div
          className="origin-center -rotate-[6deg]"
          animate={
            reduceMotion ? { y: 0 } : { y: [0, -floatCard.floatPx.left, 0] }
          }
          transition={{
            duration: 5.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/Test.png"
            alt=""
            width={323}
            height={377}
            className="h-auto w-full drop-shadow-[0_24px_50px_-14px_rgba(0,0,0,0.2)]"
            sizes={floatCard.sizes}
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: floatCard.enterX }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.85, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
        style={{ zIndex: 30 }}
        className={`pointer-events-none absolute right-[max(0.5rem,3vw)] top-[min(32vh,240px)] z-30 hidden md:block lg:right-[max(1rem,5vw)] lg:top-[34vh] transform-gpu ${floatCard.widthClass}`}
        aria-hidden
      >
        <motion.div
          className="origin-center rotate-[6deg]"
          animate={
            reduceMotion ? { y: 0 } : { y: [0, -floatCard.floatPx.right, 0] }
          }
          transition={{
            duration: 6.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.9,
          }}
        >
          <Image
            src="/Test.png"
            alt=""
            width={323}
            height={377}
            className="h-auto w-full drop-shadow-[0_24px_50px_-14px_rgba(0,0,0,0.2)]"
            sizes={floatCard.sizes}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}