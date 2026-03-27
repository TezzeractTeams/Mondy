"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import SocialPostCard from "./SocialPostCard";
import { Play } from "lucide-react";

/**
* Headline horizontal tuning (any CSS length: rem, vw, %, px).
*/
const HEADLINE_OFFSET = {
  line1TranslateX: "0px",
  line2TranslateX: "0px",
} as const;

/**
* Hand mockup position inside its column (CSS lengths).
*/
const HERO_PHONE_IMAGE = {
  translateX: "0px",
  translateY: "0px",
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

/**
* Floating Test.png cards — pick one: "sm" | "md" | "lg".
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

      {/* --- ADDED: BOTTOM-TO-TOP FADE GRADIENT --- */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `linear-gradient(to top, ${HERO_SURFACE} 0%, ${HERO_SURFACE} 15%, rgba(245, 243, 240, 0) 60%)`
        }}
      />
      {/* --- UPDATED: DARKER BOTTOM GRADIENT FADE --- */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          // Fades from a darker tint (#E8E5E1) at the bottom to transparent
          background: `linear-gradient(to top, #E8E5E1 0%, #E8E5E1 10%, rgba(245, 243, 240, 0) 65%)`
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
        className="pointer-events-none absolute left-[16vw] top-[44vh] z-[20] hidden lg:block w-[320px]"
        aria-hidden
      >
        <motion.div
          className="origin-center -rotate-[6deg]"
          animate={reduceMotion ? { y: 0 } : { y: [0, -15, 0] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <SocialPostCard
            name="Lisa Hendricks"
            role="Content Creator | Freelance Photographer | Public Speaker"
            content="Startup culture is 24/7 hustle, aesthetic offices, and overnight success. 🚙✨"
            avatarUrl="/hero-pic.png"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.85, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute right-[4vw] top-[46vh] z-[20] hidden lg:block w-[320px]"
        aria-hidden
      >
        <motion.div
          className="origin-center rotate-[6deg]"
          animate={reduceMotion ? { y: 0 } : { y: [0, -20, 0] }}
          transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
        >
          <SocialPostCard
            name="Lisa Hendricks"
            role="Content Creator | Freelance Photographer | Public Speaker"
            content="Startup culture is 24/7 hustle, aesthetic offices, and overnight success. 🚙✨"
            avatarUrl="/hero-pic.png"
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
                className="flex w-full flex-col items-center text-4xl sm:text-5xl md:text-6xl lg:text-[105px] font-extrabold text-[#1C1A17] tracking-tight md:tracking-[-0.07em] leading-[1.05] md:leading-[0.9] relative z-0 pointer-events-none shrink-0 pt-4 md:pt-14 px-4 md:px-0"
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
                className="relative z-10 mt-12 md:mt-auto w-[120%] md:w-[40%] max-w-[min(98vw,750px)] shrink-0 self-center"
              >
                <div className="mt-8 md:mt-0 sm:md:-mt-8 lg:md:-mt-12 xl:md:-mt-20">
                  <div
                    className="will-change-transform"
                    style={{
                      transform: `translate(${HERO_PHONE_IMAGE.translateX}, ${HERO_PHONE_IMAGE.translateY})`,
                    }}
                  >
                    <Image
                      src="/image4.png"
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

        {/* Bottom Badges */}
        <div className="absolute bottom-10 left-12 z-20 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="bg-white/80 backdrop-blur-md rounded-3xl p-4 flex items-center gap-4 border border-white shadow-lg"
          >
            <div className="w-12 h-12 bg-[#FF6154] rounded-full flex items-center justify-center text-white font-bold text-2xl">P</div>
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
            className="bg-black text-white rounded-2xl px-6 py-4 flex items-center gap-4 border border-white/10 shadow-2xl"
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <svg viewBox="0 0 384 512" className="w-full h-full fill-current">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Coming Soon to</span>
              <span className="text-xl font-bold tracking-tight">App Store</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}