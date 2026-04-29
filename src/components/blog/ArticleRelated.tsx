import Link from "next/link";
import { cn } from "@/lib/utils";

export type RelatedPost = {
  href: string;
  title: string;
  meta: string;
  tags?: string[];
};

type ArticleRelatedProps = {
  title?: string;
  posts: RelatedPost[];
  className?: string;
};

export function ArticleRelated({ title = "Recommended for you", posts, className }: ArticleRelatedProps) {
  return (
    <section className={cn("mt-14 w-full max-w-prose", className)} aria-labelledby="related-heading">
      <h2 id="related-heading" className="mb-4 text-xl font-bold tracking-tight text-mondy-ink">
        {title}
      </h2>
      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <li key={post.href}>
            <Link
              href={post.href}
              className="group block rounded-2xl border border-black/[0.06] bg-white/70 p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              {post.tags?.length ? (
                <p className="mb-2 text-xs font-medium text-neutral-90">{post.tags.join(" · ")}</p>
              ) : null}
              <span className="block text-lg font-semibold text-mondy-ink group-hover:text-mondy-accent-deep group-hover:underline underline-offset-2">
                {post.title}
              </span>
              <span className="mt-2 block text-sm text-neutral-80">{post.meta}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
