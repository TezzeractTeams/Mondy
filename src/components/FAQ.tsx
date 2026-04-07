"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { mondyLayout, mondyType } from "@/styles/mondy";

const faqData = [
  {
    question: "Will it actually sound like me, or will it sound like AI?",
    answer: "That' s the right question to ask. Most AI content tools sound like AI because they start from a blank prompt. Mondy starts from YOUR voice. Your phrasing, your specific examples, your actual reasoning. We ' re not generating ideas for you. We ' re translating what you already said into a format your audience can read. Here ’ s a suggestion- Try Mondy for yourself. Send the draft Mondy generates to someone who knows how you write and see if they can tell we wrote it. Because that' s the only benchmark that matters."
  },
  {
    question: "I've tried tools like this before. Why is this different?",
    answer: "You probably tried something that required you to write first, then helped you write better. Mondy removes the writing entirely. You talk (the way you 'd explain something to a friend) and we handle the rest. And we ’ ve pre-trained Mondy to remember the best writing styles that works for each platform. So all you need to do is just speak."
  },
  {
    question: "Does Mondy learn my tone/voice overtime?",
    answer: "Yes. The first set of posts will be good. By the fourth or fifth, it' s noticeably more calibrated. Mondy will remember your cadence, your recurring themes, the way you tend to open a thought. It will even pays attention to the exact way a post looks when you approve it."
  },
  // {
  //   question: "How does this replace a traditional ghostwriter workflow?",
  //   answer: "Traditional ghostwriting requires hours of interviews and constant back-and-forth. Mondy removes the friction. You provide the 'seed'—a voice memo, a rough note, or a link—and Mondy generates a full weekly run of content in seconds, ready for your final 1% polish. It's your voice, without the wait."
  // },
  // {
  //   question: "Is my data and voice profile secure?",
  //   answer: "Security is built into our core. Your voice profile and training data are encrypted and isolated to your account. We never use your unique content to train models for other users, ensuring your intellectual property and personal brand remain exclusively yours."
  // },
  // {
  //   question: "Can I manage multiple founder voices?",
  //   answer: "Yes. Our Enterprise plan is designed specifically for agencies and operators. You can maintain distinct, high-fidelity voice profiles for multiple founders, allowing you to run content for an entire roster with consistent quality and native platform expertise."
  // }aa
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative sm:w-[80%] max-w-full shrink-0 mx-auto bg-mondy-surface pb-20 px-6 md:px-12 overflow-hidden font-noah"
    >
      <div className={cn(mondyLayout.contentMax, "grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 items-start")}>

        {/* Left Column: Sticky Header & Support Card */}
        <div className="md:sticky  space-y-8">
          <div className="space-y-4">
            <h2 className={mondyType.sectionHeading}>
              Frequently  Asked <span className="text-mondy-coral">Questions</span>
            </h2>
          </div>

          {/* Support Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2rem] p-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-white/60 space-y-6"
          >
            <div className="space-y-3">
              <h3 className="text-mondy-ink text-2xl font-extrabold tracking-[-0.05em]">Still have a questions?</h3>
              <p className="text-mondy-ink/50 text-base font-medium tracking-[-0.05em] leading-[1.3]">
                Can't find the answer to your question? Send us an email and we'll get back to you as soon as possible!
              </p>
            </div>
            <button type="button" className="px-6 py-3 bg-mondy-coral text-white rounded-full text-base font-bold tracking-[-0.03em] transition-all hover:brightness-110 hover:scale-[1.02] active:scale-95 shadow-xl shadow-mondy-coral/20">
              Send email
            </button>
          </motion.div>
        </div>

        {/* Right Column: Accordion List */}
        <div className="space-y-6">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-[2rem] overflow-hidden border transition-all duration-300 ${openIndex === index ? "border-mondy-coral/30 shadow-[0_20px_50px_rgba(225,112,84,0.1)]" : "border-black/[0.03] shadow-sm"
                }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-4"
              >
                <span className={`text-lg md:text-xl font-bold tracking-[-0.05em] transition-colors ${openIndex === index ? "text-mondy-coral" : "text-mondy-ink"
                  }`}>
                  {item.question}
                </span>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === index ? "bg-mondy-coral text-white rotate-180" : "bg-black/[0.03] text-mondy-ink"
                  }`}>
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M7 10l5 5 5-5H7z" />
                  </svg>
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-6 pb-8 md:px-8 md:pb-10 text-mondy-ink/60 text-base md:text-lg font-medium tracking-tight leading-relaxed max-w-[90%]">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
