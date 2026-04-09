"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import HeroWaitlistCard from "@/components/HeroWaitlistCard";
import { NeomorphicRippleBackground } from "@/components/NeomorphicRippleBackground";
import { cn } from "@/lib/utils";
import { mondy, mondyHero, mondyLayout } from "@/styles/mondy";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const { activePreset, presetWidths, presetSizes } = mondyHero.floatingCards;
  const floatingCardWidthClass = presetWidths[activePreset];
  const floatingCardSizes = presetSizes[activePreset];

  return (
    <section className="relative box-border h-[100dvh] max-h-[100dvh] min-h-0 w-full shrink-0 overflow-x-hidden overflow-y-clip flex flex-col bg-mondy-surface">

      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `linear-gradient(
            to top,
            ${mondy.surface} 0%,
            ${mondy.surface} 12%,
            rgba(245, 243, 240, 0.88) 28%,
            rgba(245, 243, 240, 0.35) 48%,
            rgba(245, 243, 240, 0) 72%
          )`,
        }}
      />

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute -left-[10%] top-[8%] h-[min(420px,55vw)] w-[min(420px,55vw)] rounded-full bg-primary-70/45 blur-3xl" />
          <div className="absolute right-[-5%] top-[35%] h-[min(380px,50vw)] w-[min(380px,50vw)] rounded-full bg-secondary-70/40 blur-3xl" />
          <div className="absolute bottom-[5%] left-[30%] h-[min(360px,45vw)] w-[min(360px,45vw)] rounded-full bg-mondy-coral/20 blur-3xl" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <NeomorphicRippleBackground surfaceColor={mondy.surface} />
        </div>
      </div>

      {/* Decorative postcards — smaller on sm/md; peeks from edges so copy stays readable */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "pointer-events-none absolute z-[30] hidden sm:block -left-[8%] sm:left-[max(-1rem,calc(50vw-22rem))] md:left-[max(0.5rem,calc(50vw-26rem))] lg:left-[12vw] top-[32vh] sm:top-[36vh] md:top-[38vh] lg:top-[40vh] opacity-80 sm:opacity-90 lg:opacity-100",
          floatingCardWidthClass,
        )}
        aria-hidden
      >
        <motion.div
          className="origin-center -rotate-[6deg] relative w-full overflow-visible"
          animate={reduceMotion ? { y: 0 } : { y: [0, -15, 0] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative isolate w-full rounded-2xl shadow-[0_12px_40px_-14px_rgba(28,26,23,0.5)] sm:rounded-[24px]">
            <div className="relative isolate flex aspect-[1132/1520] w-full items-center justify-center overflow-hidden rounded-2xl sm:rounded-[28px] lg:rounded-[32px]">
              <div
                className="pointer-events-none absolute inset-0 z-0 border-2 border-white/60 bg-white/10"
                style={{ backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
                aria-hidden
              />
              <Image
                src="/micheal2.png"
                alt="Social post preview"
                fill
                className="z-10 object-contain"
                sizes={floatingCardSizes}
                quality={92}
              />
            </div>
          </div>
        </motion.div>
        
      </motion.div>
      

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.85, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "pointer-events-none absolute z-[30] hidden sm:block -right-[8%] sm:right-[max(-1rem,calc(50vw-22rem))] md:right-[max(0.5rem,calc(50vw-26rem))] lg:right-[16vw] top-[38vh] sm:top-[42vh] md:top-[44vh] lg:top-[46vh] opacity-80 sm:opacity-90 lg:opacity-100",
          floatingCardWidthClass,
        )}
        aria-hidden
      >
        <motion.div
          className="origin-center rotate-[6deg] relative w-full overflow-visible"
          animate={reduceMotion ? { y: 0 } : { y: [0, -20, 0] }}
          transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
        >
          <div className="relative isolate w-full rounded-2xl shadow-[0_12px_40px_-14px_rgba(28,26,23,0.5)] sm:rounded-[24px]">
            <div className="relative isolate flex aspect-[566/568] w-full items-center justify-center overflow-hidden rounded-2xl sm:rounded-[28px] lg:rounded-[32px]">
              <div
                className="pointer-events-none absolute inset-0 z-0 border-2 border-white/60 bg-white/10"
                style={{ backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
                aria-hidden
              />
              <Image
                src="/bruce2.png"
                alt="Social post preview"
                fill
                className="z-10 object-contain"
                sizes={floatingCardSizes}
                quality={92}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className={cn(mondyLayout.contentMax, "relative z-10 flex min-h-0 flex-1 flex-col px-6 md:px-12 pt-14 sm:pt-12 md:pt-8 pb-6 md:pb-8")}>
        <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-4 lg:items-stretch lg:justify-items-center">
          <div className="order-1 flex min-h-0 w-full flex-1 flex-col lg:col-span-12 lg:mx-auto lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
            <div className="relative flex min-h-0 w-full flex-1 flex-col items-center isolate px-1 text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex w-full flex-col items-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-mondy-ink tracking-tight md:tracking-[-0.07em] leading-[1.05] md:leading-[0.9] relative z-0 pointer-events-none shrink-0 pt-2 sm:pt-4 md:pt-14 px-4 md:px-0"
              >
                <div className="flex flex-col items-center">
                  {/* Mobile: 3 lines (“Talk for” / “10 minutes.” / tagline); md+: first phrase on one line */}
                  <span className="flex w-full max-w-none shrink-0 flex-col items-center pt-15  text-center will-change-transform md:inline-flex md:flex-row md:items-baseline md:gap-x-1.5 md:pt-10 md:whitespace-nowrap lg:w-max lg:text-left xl:text-center  tracking-[-0.06em]">
                    <span className="block md:inline">Talk for 2 minutes</span>
                    {/* <span className="block md:inline">10 minutes.</span> */}
                  </span>
                  <span className="sm:mt-2 w-full max-w-none shrink-0 text-center will-change-transform md:mt-4 lg:mt-0 lg:w-max lg:whitespace-nowrap lg:text-left xl:text-center tracking-[-0.06em]">
                  Every platform, covered.
                  </span>
                </div>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className={mondyHero.handImage.frame}
              >
                <div className={mondyHero.handImage.stack}>
                  <div className={mondyHero.handImage.nudge}>
                    <Image
                      src="/Handmock.webp"
                      alt="Hand holding a smartphone"
                      width={1177}
                      height={1094}
                      className={mondyHero.handImage.img}
                      priority
                    />
                    <div
                      className="pointer-events-none absolute inset-0 z-[1]"
                      style={{
                        background: `linear-gradient(
                          to top,
                          ${mondy.surface} 0%,
                          ${mondy.surface} 22%,
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

        {/* Product Hunt badge — re-enable when live on PH
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
              <span className="text-[10px] font-bold text-mondy-product-hunt uppercase tracking-widest">Featured on</span>
              <span className="text-xl font-bold text-mondy-ink tracking-tight">Product Hunt</span>
            </div>
          </motion.div>
        </div>
        */}

        {/* Mobile / tablet: centered in viewport; lg+: bottom-centered strip */}
        <div className="pointer-events-auto absolute left-1/2 top-9/10 sm:top-[58%] z-20 w-full max-w-[min(98vw,600px)] -translate-x-1/2 -translate-y-1/2 px-4 md:top-[85%] md:bottom-6 lg:translate-y-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mx-auto "
          >
            <HeroWaitlistCard className="w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}