"use client";

import { Suspense, useState } from "react";
import { cn } from "@/lib/utils";
import { mondyBtn } from "@/styles/mondy";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

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

  return (
    <div className="flex min-h-dvh w-full flex-1 flex-col bg-white md:flex-row">
      {/* Left Column: Form Section */}
      <div className="relative flex w-full flex-1 items-center justify-center p-8 md:w-1/2 md:p-16 lg:p-24">
        <div className="max-w-md w-full flex flex-col gap-8">
          
          {/* Header area with Logo and Badge */}
          <div className="flex items-center gap-4">
            {/* Mondy Logo */}
            <div className="flex items-center h-8">
              <Image 
                src="/logo.svg" 
                alt="Mondy AI Logo" 
                width={110} 
                height={28} 
                className="h-7 w-auto object-contain" 
                priority 
              />
            </div>
            
            {/* Coming soon chip */}
            <span className="px-3 py-1 rounded-full bg-mondy-accent/10 text-mondy-accent text-sm font-semibold tracking-wide">
              Coming soon!
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-mondy-ink">
              Get early access!
            </h1>
            <p className="text-mondy-ink/60 text-lg leading-relaxed">
              Be one of the first to create a profile and claim a premium username.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4">
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
          </form>

        </div>
      </div>

      {/* Right Column: Image Placeholder */}
      <div className="hidden min-h-dvh w-full flex-1 flex-col items-center justify-center border-l border-black/5 bg-mondy-surface p-8 md:flex md:w-1/2 md:p-12">
        {/* The Placeholder Container */}
        <div className="w-16 h-16 border-4 border-dashed border-current rounded-full flex items-center justify-center">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="black">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
      </div>
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
