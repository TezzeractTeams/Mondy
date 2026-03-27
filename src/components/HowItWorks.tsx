"use client";
import React from "react";
import { motion } from "framer-motion";

type RippleStackProps = {
  count: number;
  sizeStep: number;
  durationBase: number;
  delayPerRing: number;
  ringClassName: string;
  intensity?: "soft" | "medium" | "strong";
  delayShift?: number;
};

function RippleStack({
  count,
  sizeStep,
  durationBase,
  delayPerRing,
  ringClassName,
  intensity = "medium",
  delayShift = 0,
}: RippleStackProps) {
  const presets = {
    soft: {
      scale: [0.96, 1.1, 0.99, 1.06, 0.97],
      opacity: [0.1, 0.3, 0.16, 0.26, 0.1],
      times: [0, 0.2, 0.45, 0.72, 1],
    },
    medium: {
      scale: [0.92, 1.18, 0.96, 1.14, 0.93],
      opacity: [0.14, 0.45, 0.22, 0.38, 0.14],
      times: [0, 0.17, 0.4, 0.66, 1],
    },
    strong: {
      scale: [0.86, 1.24, 0.92, 1.2, 0.88],
      opacity: [0.18, 0.55, 0.28, 0.48, 0.18],
      times: [0, 0.14, 0.36, 0.62, 1],
    },
  };

  const p = presets[intensity];

  return (
    <>
      {Array.from({ length: count }, (_, index) => {
        const i = index + 1;
        const wobble = index % 3 === 1 ? 0.88 : index % 3 === 2 ? 1.08 : 1;
        const duration = (durationBase + index * 0.08) * wobble;
        return (
          <motion.div
            key={i}
            className={`absolute rounded-full border-[1px] will-change-transform ${ringClassName}`}
            style={{
              width: i * sizeStep,
              height: i * sizeStep,
            }}
            initial={false}
            animate={{
              scale: p.scale,
              opacity: p.opacity,
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay: delayShift + index * delayPerRing,
              ease: [0.45, 0.03, 0.52, 0.96],
              times: p.times,
            }}
          />
        );
      })}
    </>
  );
}

export default function HowItWorks() {
  const steps = [
    {
      title: "Hit record",
      desc: "Open the app and speak your mind. A thought, a story, an opinion, whatever's on your mind.",
    },
    {
      title: "Review your transcript",
      desc: "Mondy instantly transcribes your recording. Clean, accurate, and ready to work with.",
    },
    {
      title: "Publish your content",
      desc: "Select how many posts you want to create and where you want to publish. Mondy does the rest.",
    },
  ];

  return (
    <section className="relative w-full bg-[#F5F3F0] py-24 px-6 md:px-12 overflow-hidden font-noah">

      {/* Background Ripples */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <RippleStack
          count={3}
          sizeStep={600}
          durationBase={1.15}
          delayPerRing={0.22}
          intensity="soft"
          ringClassName="border-[#E17054]/40"
        />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[3.5rem] min-h-[800px] flex flex-col overflow-hidden"
        >
          {/* Main Header Area - Increased PB for Taller Cards */}
          <div className="w-full bg-[linear-gradient(120deg,#FFBDAA,#88A3E6)] pt-24 pb-64 md:pb-72 flex flex-col items-center text-center px-4 relative z-0 overflow-hidden rounded-b-[3rem]">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <RippleStack
                count={6}
                sizeStep={220}
                durationBase={0.72}
                delayPerRing={0.05}
                intensity="strong"
                ringClassName="border-[#FFEAE5]/45"
              />
            </div>
            <h2 className="text-white text-5xl md:text-7xl font-extrabold tracking-[-0.06em] leading-[0.9] relative z-10">
              How It <span className="text-[#708FDB]">Works</span>
            </h2>
          </div>

          {/* Cards Grid - Pulled up with -mt-48 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 w-full px-4 sm:px-10 -mt-48 md:-mt-56 pb-24 relative z-20">
            {steps.map((step, idx) => {
              const isSecondCard = idx === 1;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15, duration: 0.8 }}
                  className="relative bg-white rounded-[3rem] border border-white shadow-2xl overflow-hidden flex flex-col"
                >
                  {isSecondCard ? (
                    <>
                      {/* Placeholder TOP BLEED - Height Increased to 420px */}
                      <div className="px-6 w-full h-[350px] md:h-[420px]">
                        <div className="relative w-full h-full bg-[#F5F3F0] rounded-b-[2rem] border-x border-b border-black/5 flex items-center justify-center overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <RippleStack
                              count={5}
                              sizeStep={150}
                              durationBase={0.82}
                              delayPerRing={0.07}
                              intensity="medium"
                              delayShift={idx * 0.09}
                              ringClassName="border-[#E17054]/30"
                            />
                          </div>
                          <span className="relative z-10 text-xs text-[#1C1A17]/25 font-bold uppercase tracking-[0.2em] text-center px-4">
                            [App Screenshot]
                          </span>
                        </div>
                      </div>
                      <div className="relative z-10 p-10 flex-grow">
                        <h4 className="text-[#1C1A17] text-2xl font-extrabold tracking-[-0.05em] leading-[1.1] mb-4">
                          {idx + 1}. {step.title}
                        </h4>
                        <p className="text-[#1C1A17]/70 text-lg font-medium tracking-[-0.05em] leading-[1.4]">
                          {step.desc}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative z-10 p-10 flex-grow">
                        <h4 className="text-[#1C1A17] text-2xl font-extrabold tracking-[-0.05em] leading-[1.1] mb-4">
                          {idx + 1}. {step.title}
                        </h4>
                        <p className="text-[#1C1A17]/70 text-lg font-medium tracking-[-0.05em] leading-[1.4]">
                          {step.desc}
                        </p>
                      </div>
                      {/* Placeholder BOTTOM BLEED - Height Increased to 420px */}
                      <div className="px-6 w-full h-[350px] md:h-[420px]">
                        <div className="relative w-full h-full bg-[#F5F3F0] rounded-t-[2rem] border-x border-t border-black/5 flex items-center justify-center overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <RippleStack
                              count={5}
                              sizeStep={150}
                              durationBase={0.82}
                              delayPerRing={0.07}
                              intensity="medium"
                              delayShift={idx * 0.09}
                              ringClassName="border-[#E17054]/30"
                            />
                          </div>
                          <span className="relative z-10 text-xs text-[#1C1A17]/25 font-bold uppercase tracking-[0.2em] text-center px-4">
                            [App Screenshot]
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}