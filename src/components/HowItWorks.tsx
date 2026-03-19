"use client";
import React from "react";
import { motion } from "framer-motion";

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
        {[1, 2, 3].map((index) => (
          <motion.div
            key={index}
            initial={{ scale: 1, opacity: 0 }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: index * 2.5,
              ease: "easeInOut",
            }}
            style={{ width: `${index * 600}px`, height: `${index * 600}px` }}
            className="absolute border-[1px] border-[#E17054]/40 rounded-full"
          />
        ))}
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
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 1, opacity: 0.1 }}
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    delay: index * 0.8,
                    ease: "easeInOut",
                  }}
                  style={{ width: `${index * 200}px`, height: `${index * 200}px` }}
                  className="absolute border-[1px] border-[#E17054]/40 rounded-full"
                />
              ))}
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
                            {[1, 2, 3, 4, 5].map((i) => (
                              <motion.div 
                                key={i} 
                                initial={{ scale: 1, opacity: 0.1 }}
                                animate={{
                                  scale: [1, 1.3, 1],
                                  opacity: [0.15, 0.4, 0.15],
                                }}
                                transition={{
                                  duration: 7,
                                  repeat: Infinity,
                                  delay: i * 1,
                                  ease: "easeInOut",
                                }}
                                style={{ width: `${i * 120}px`, height: `${i * 120}px` }} 
                                className="absolute border-[1px] border-[#E17054]/50 rounded-full" 
                              />
                            ))}
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
                            {[1, 2, 3, 4, 5].map((i) => (
                              <motion.div 
                                key={i} 
                                initial={{ scale: 1, opacity: 0.1 }}
                                animate={{
                                  scale: [1, 1.3, 1],
                                  opacity: [0.15, 0.4, 0.15],
                                }}
                                transition={{
                                  duration: 7,
                                  repeat: Infinity,
                                  delay: i * 1,
                                  ease: "easeInOut",
                                }}
                                style={{ width: `${i * 120}px`, height: `${i * 120}px` }} 
                                className="absolute border-[1px] border-[#E17054]/50 rounded-full" 
                              />
                            ))}
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