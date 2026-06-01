import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import ProblemStatement from "@/components/ProblemStatement";

const HowItWorks = dynamic(() => import("@/components/HowItWorks"), {
  ssr: true,
  loading: () => null,
});

const PricingSection = dynamic(() => import("@/components/PricingSection"), {
  ssr: true,
  loading: () => null,
});

const Waitlist = dynamic(() => import("@/components/Waitlist"), {
  ssr: true,
  loading: () => null,
});

const FAQ = dynamic(() => import("@/components/FAQ"), {
  ssr: true,
  loading: () => null,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: true,
  loading: () => null,
});

export default function Home() {
  return (
    <>
      <main className="flex w-full min-h-0 flex-col items-center">
        <Hero />
        <ProblemStatement />
        <HowItWorks />
        <PricingSection />
        <Waitlist />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
