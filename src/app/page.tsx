import Hero from "@/components/Hero";
import ProblemStatement from "@/components/ProblemStatement";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Waitlist from "@/components/Waitlist";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <main className="flex w-full min-h-0 flex-col items-center">
      <Hero />
      <ProblemStatement />
      <HowItWorks />
      <Pricing />
      <Waitlist />
      <FAQ />
    </main>
  );
}
