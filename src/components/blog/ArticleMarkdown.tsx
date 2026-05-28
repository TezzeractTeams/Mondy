import { cn } from "@/lib/utils";
import { normalizeCmsMarkdown } from "@/lib/markdown/normalizeCmsMarkdown";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

type ArticleMarkdownProps = {
  markdown: string;
  className?: string;
};

export function ArticleMarkdown({ markdown, className }: ArticleMarkdownProps) {
  const normalized = normalizeCmsMarkdown(markdown);
  if (!normalized.trim()) return null;
  return (
    <div
      className={cn(
        "[&>p:not(:last-child)]:mb-4 [&>p]:opacity-90",
        "[&_strong]:font-bold [&_b]:font-bold",
        "[&>ul:not(:last-child)]:mb-4 [&>ol:not(:last-child)]:mb-4",
        "[&>blockquote:not(:last-child)]:mb-4",
        "[&>h4:not(:first-child)]:mt-4",
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkBreaks]}
        components={{
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {normalized}
      </ReactMarkdown>
    </div>
  );
}
