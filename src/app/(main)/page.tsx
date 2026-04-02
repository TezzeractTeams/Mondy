import Hero from "@/components/Hero";
import ProblemStatement from "@/components/ProblemStatement";
import HowItWorks from "@/components/HowItWorks";
import PricingSection from "@/components/PricingSection";
import Waitlist from "@/components/Waitlist";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

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
