type FaqItem = { question: string; answer: string };

type ArticleFAQProps = {
  id?: string;
  title: string;
  items: FaqItem[];
};

export function ArticleFAQ({ id, title, items }: ArticleFAQProps) {
  return (
    <section id={id} className="mt-12 flex w-full max-w-prose flex-col gap-4 scroll-mt-28">
      <h2 className="text-2xl font-bold tracking-tight text-mondy-ink">{title}</h2>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-xl border border-black/[0.08] bg-white/70 px-4 py-1 shadow-sm open:pb-3"
          >
            <summary className="cursor-pointer list-none py-3 font-semibold text-mondy-ink outline-none marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-3">
                <span>{item.question}</span>
                <span className="shrink-0 text-neutral-70 transition-transform group-open:rotate-180" aria-hidden>
                  ▼
                </span>
              </span>
            </summary>
            <p className="border-t border-black/[0.06] pt-3 text-base leading-relaxed text-mondy-ink opacity-90">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
