"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { mondyBtn } from "@/styles/mondy";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "relative overflow-hidden flex flex-col max-w-[98vw] lg:max-w-[80vw] fixed top-6 md:top-10 inset-x-0 mx-auto z-[5000] transition-all duration-300",
          "rounded-[2rem] md:rounded-full",
          "border border-white/50 ring-1 ring-black/[0.06]",
          "bg-gradient-to-b from-white/80 via-white/50 to-white/35 backdrop-blur-xl backdrop-saturate-150",
          "shadow-[0_8px_40px_-8px_rgb(0_0_0/0.08),0_4px_24px_-4px_rgb(112_143_219/0.14),inset_0_1px_0_0_rgb(255_255_255/0.7)]",
          "before:pointer-events-none before:absolute before:inset-0 before:z-0 before:rounded-[inherit] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.42)_0%,transparent_40%)]",
          isOpen ? "px-6 py-6" : "px-3 md:px-3 py-2",
          className
        )}
      >
        <div className="relative z-10 flex items-center justify-between gap-2 lg:gap-10 w-full">
          {/* Logo Slot */}
          <div className="flex items-center pl-1 md:pl-2 shrink-0">
            <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
              <Image src="/logo.svg" alt="Mondy AI Logo" width={110} height={28} className="h-6 md:h-7 w-auto object-contain" priority />
            </Link>
          </div>

          {/* Navigation Items (Desktop) */}
          <div className="hidden lg:flex items-center gap-12">
            {navItems.map((navItem: any, idx: number) => (
              <Link
                key={`link=${idx}`}
                href={navItem.link}
                className={cn(
                  "relative flex items-center gap-1 text-mondy-ink hover:text-neutral-500 transition-colors font-sans"
                )}
              >
                <span className="text-[18px] font-medium whitespace-nowrap">{navItem.name}</span>
              </Link>
            ))}
          </div>

          {/* Action Button (Desktop) */}
          <div className="hidden lg:flex items-center shrink-0">
            <Link href="/infopage" className={mondyBtn.navDesktop}>
              Join Waitlist
            </Link>
          </div>

          {/* Hamburger Menu Icon (Mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-mondy-ink hover:text-neutral-500 transition-colors"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="relative z-10 lg:hidden flex flex-col gap-6 w-full overflow-hidden"
            >
              <div className="flex flex-col gap-4 pl-1">
                {navItems.map((navItem: any, idx: number) => (
                  <Link
                    key={`mobile-link=${idx}`}
                    href={navItem.link}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center text-mondy-ink text-lg font-medium py-2"
                  >
                    <span>{navItem.name}</span>
                  </Link>
                ))}
              </div>
              <Link href="/infopage" onClick={() => setIsOpen(false)} className={mondyBtn.navMobile}>
                Join Waitlist
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};
