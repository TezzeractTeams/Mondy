"use client";

import { Suspense, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { mondyBtn } from "@/styles/mondy";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const easeOut = [0.16, 1, 0.3, 1] as const;

function JoinWaitlistForm({ initialEmail }: { initialEmail: string }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(initialEmail);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage("You're on the list. We'll be in touch soon.");
      setFirstName("");
      setLastName("");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Check your connection and try again.");
    }
  };

  const submitting = status === "loading";
  const done = status === "success";
  const reduceMotion = useReducedMotion();

  const { containerVariants, itemVariants } = useMemo(() => {
    const off = !!reduceMotion;
    return {
      containerVariants: {
        hidden: {},
        show: {
          transition: {
            staggerChildren: off ? 0 : 0.08,
            delayChildren: off ? 0 : 0.06,
          },
        },
      },
      itemVariants: {
        hidden: { opacity: off ? 1 : 0, y: off ? 0 : 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: off ? 0 : 0.5, ease: easeOut },
        },
      },
    };
  }, [reduceMotion]);

  return (
    <div className="flex min-h-dvh w-full flex-1 flex-col bg-white md:flex-row">
      {/* Form column — full width on mobile, half on md+ */}
      <div className="relative flex w-full flex-1 items-center justify-center p-8 md:w-1/2 md:p-16 lg:p-24">
        <motion.div
          className="flex w-full max-w-md flex-col gap-8"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          {/* Header area with Logo and Badge */}
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            {/* Mondy Logo */}
            <Link href="/" className="flex h-8 items-center">
              <Image
                src="/logo.svg"
                alt="Mondy AI Logo"
                width={110}
                height={28}
                className="h-7 w-auto object-contain"
                priority
              />
            </Link>
            
            {/* Coming soon chip */}
            <span className="px-3 py-1 rounded-full bg-mondy-accent/10 text-mondy-accent text-sm font-semibold tracking-wide">
              Coming soon!
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-mondy-ink">
            Be the first to use Mondy            </h1>
            <p className="text-mondy-ink/60 text-lg leading-relaxed">
            We're getting close! Join the waitlist today  and get early access when we go live.            </p>
          </motion.div>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="mt-4 flex flex-col gap-6"
          >
            {/* Name fields row */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="firstName" className="text-sm font-semibold text-mondy-ink">
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  disabled={submitting || done}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 text-mondy-ink focus:border-mondy-accent focus:ring-1 focus:ring-mondy-accent outline-none transition-all disabled:opacity-50 disabled:pointer-events-none"
                  required
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="lastName" className="text-sm font-semibold text-mondy-ink">
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  disabled={submitting || done}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 text-mondy-ink focus:border-mondy-accent focus:ring-1 focus:ring-mondy-accent outline-none transition-all disabled:opacity-50 disabled:pointer-events-none"
                  required
                />
              </div>
            </div>

            {/* Email field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold text-mondy-ink">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={submitting || done}
                className="w-full px-4 py-3 rounded-xl border border-black/10 text-mondy-ink focus:border-mondy-accent focus:ring-1 focus:ring-mondy-accent outline-none transition-all disabled:opacity-50 disabled:pointer-events-none"
                required
              />
            </div>

            {message ? (
              <p
                role="status"
                className={cn(
                  "text-sm font-medium",
                  status === "error" ? "text-red-600" : "text-mondy-accent",
                )}
              >
                {message}
              </p>
            ) : null}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting || done}
              className={cn(
                mondyBtn.primaryLg,
                "w-full mt-2 flex justify-center items-center disabled:opacity-50 disabled:pointer-events-none",
              )}
            >
              {submitting ? "Joining…" : done ? "You're in" : "Join waitlist"}
            </button>
          </motion.form>
        </motion.div>
      </div>

      {/* Visual column — full-bleed image; below form on mobile, right pane on md+ */}
      <motion.div
        className="relative min-h-[min(52dvh,560px)] w-full flex-1 overflow-hidden border-t border-black/5 bg-mondy-surface md:min-h-dvh md:w-1/2 md:border-l md:border-t-0"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.55,
          delay: reduceMotion ? 0 : 0.14,
          ease: easeOut,
        }}
      >
        <Image
          src="/Mondy Waitlist Image.png"
          alt="Mondy AI app on a smartphone — voice interface preview"
          fill
          className="object-cover object-[80%_center]"
          sizes="(max-width: 767px) 100vw, 50vw"
          priority
        />
      </motion.div>
    </div>
  );
}

function JoinWaitlistFormWithParams() {
  const searchParams = useSearchParams();
  const raw = searchParams.get("email");
  const initialEmail =
    raw && raw.trim().length > 0 ? decodeURIComponent(raw.trim()) : "";
  return <JoinWaitlistForm initialEmail={initialEmail} />;
}

export default function JoinWaitlist() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh w-full flex-1 items-center justify-center bg-white text-mondy-ink/40">
          Loading…
        </div>
      }
    >
      <JoinWaitlistFormWithParams />
    </Suspense>
  );
}
