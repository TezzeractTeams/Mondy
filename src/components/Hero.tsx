"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import HeroWaitlistCard from "@/components/HeroWaitlistCard";
import { DotLottiePlayer } from "@/components/DotLottiePlayer";


const HEADLINE_OFFSET = {
  line1TranslateX: "10px",
  line2TranslateX: "0px",
} as const;


const HERO_PHONE_IMAGE = {
  translateX: "-180px",
  translateY: "50px",
} as const;

const HERO_SURFACE = "#F5F3F0";

const HERO_FLOATING_CARD_SIZES = "(min-width: 1024px) 320px, 90vw";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative box-border h-[100dvh] max-h-[100dvh] w-full shrink-0 overflow-x-hidden overflow-y-clip flex flex-col bg-[#F5F3F0]">

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

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <div className="relative flex h-[min(95vh,1000px)] w-[min(150vw,1500px)] max-w-none shrink-0 origin-center scale-110 items-center justify-center">
          <DotLottiePlayer
            autoplay={!reduceMotion}
            className="h-full w-full"
            layout={{ fit: "contain", align: [0.5, 0.5] }}
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute left-[18vw] top-[34vh] z-[20] hidden lg:block w-[320px]"
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
                className="flex w-full flex-col items-center text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold text-[#1C1A17] tracking-tight md:tracking-[-0.07em] leading-[1.05] md:leading-[0.9] relative z-0 pointer-events-none shrink-0 pt-4 md:pt-14 px-4 md:px-0"
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
                className="relative z-10 w-[142%] md:w-[78%] max-w-[min(98vw,940px)] shrink-0 self-center"
              >
                <div className="mt-8 md:mt-0 sm:md:-mt-8 lg:md:-mt-12 xl:md:-mt-20">
                  <div
                    className="relative will-change-transform"
                    style={{
                      transform: `translate(${HERO_PHONE_IMAGE.translateX}, ${HERO_PHONE_IMAGE.translateY})`,
                    }}
                  >
                    <Image
                      src="/Handmock.webp"
                      alt="Hand holding a smartphone"
                      width={1177}
                      height={1094}
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
          >
            <HeroWaitlistCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}