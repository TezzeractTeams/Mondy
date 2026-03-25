"use client";
import React from "react";
import { motion } from "framer-motion";

type RippleStackProps = {
  count: number;
  sizeStep: number;
  durationBase: number;
  delayPerRing: number;
  ringClassName: string;
  /** Softer vs punchier motion */
  intensity?: "soft" | "medium" | "strong";
  /** Extra delay so stacked instances do not pulse in lockstep */
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
      
      {/* Dynamic Background Ripples */}
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

        {/* Main Device Tray Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white/40 backdrop-blur-2xl rounded-[3rem] border border-white/60 min-h-[600px] flex flex-col overflow-hidden shadow-2xl"
        >
          {/* Black Header Strip */}
          <div className="w-full bg-[#1C1A17] pt-20 pb-40 flex flex-col items-center text-center px-4 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <RippleStack
                count={6}
                sizeStep={200}
                durationBase={0.72}
                delayPerRing={0.05}
                intensity="strong"
                ringClassName="border-[#E17054]/45"
              />
            </div>
            <h2 className="text-white text-5xl md:text-6xl font-extrabold tracking-[-0.06em] leading-[0.9] relative z-10">
              HOW IT <span className="text-[#708FDB]">WORKS</span>
            </h2>
          </div>

          {/* Content Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-8 -mt-20 pb-20 relative z-20">
            {steps.map((step, idx) => {
              const isSecondCard = idx === 1;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  className={`relative bg-white rounded-[2.5rem] border border-white shadow-xl overflow-hidden flex flex-col
                     ${isSecondCard ? 'md:translate-y-12' : 'md:-translate-y-4'}`}
                >
                  {/* Card 2: Image BLEEDS from TOP */}
                  {isSecondCard ? (
                    <>
                      <div className="px-6 w-full h-[280px]">
                        <div className="relative w-full h-full bg-[#F5F3F0] rounded-b-2xl border-x border-b border-black/5 flex items-center justify-center">
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <RippleStack
                              count={5}
                              sizeStep={120}
                              durationBase={0.82}
                              delayPerRing={0.07}
                              intensity="medium"
                              delayShift={idx * 0.09}
                              ringClassName="border-[#E17054]/50"
                            />
                          </div>
                          <span className="relative z-10 text-[10px] text-[#1C1A17]/20 font-bold uppercase tracking-widest text-center px-4">
                            [Screenshot Placeholder]
                          </span>
                        </div>
                      </div>
                      <div className="relative z-10 space-y-4 p-8 flex-grow">
                        <h4 className="text-[#1C1A17] text-2xl font-extrabold tracking-[-0.05em] leading-[1.1]">
                          {idx + 1}. {step.title}
                        </h4>
                        <p className="text-[#1C1A17]/70 text-lg font-medium tracking-[-0.05em] leading-[1.3]">
                          {step.desc}
                        </p>
                      </div>
                    </>
                  ) : (
                    /* Cards 1 & 3: Image BLEEDS from BOTTOM */
                    <>
                      <div className="relative z-10 space-y-4 p-8 flex-grow">
                        <h4 className="text-[#1C1A17] text-2xl font-extrabold tracking-[-0.05em] leading-[1.1]">
                          {idx + 1}. {step.title}
                        </h4>
                        <p className="text-[#1C1A17]/70 text-lg font-medium tracking-[-0.05em] leading-[1.3]">
                          {step.desc}
                        </p>
                      </div>
                      <div className="px-6 w-full h-[280px]">
                        <div className="relative w-full h-full bg-[#F5F3F0] rounded-t-2xl border-x border-t border-black/5 flex items-center justify-center">
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <RippleStack
                              count={5}
                              sizeStep={120}
                              durationBase={0.82}
                              delayPerRing={0.07}
                              intensity="medium"
                              delayShift={idx * 0.09}
                              ringClassName="border-[#E17054]/50"
                            />
                          </div>
                          <span className="relative z-10 text-[10px] text-[#1C1A17]/20 font-bold uppercase tracking-widest text-center px-4">
                            [Screenshot Placeholder]
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