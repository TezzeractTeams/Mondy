import Link from "next/link";

export type BreadcrumbItem = { label: string; href?: string };

type ArticleBreadcrumbProps = {
  items: BreadcrumbItem[];
};

export function ArticleBreadcrumb({ items }: ArticleBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="w-full">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-neutral-80">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 ? <span className="text-neutral-70 select-none">/</span> : null}
            {item.href ? (
              <Link href={item.href} className="hover:text-mondy-ink transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-mondy-ink font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
