import Hero from "@/components/Hero";
import ProblemStatement from "@/components/ProblemStatement";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Hero />
      <ProblemStatement />
    </main>
  );
}
