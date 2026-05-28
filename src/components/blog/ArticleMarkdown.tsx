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
        "[&>p:not(:last-child)]:mb-6 [&>p]:opacity-90",
        "[&>ul:not(:last-child)]:mb-6 [&>ol:not(:last-child)]:mb-6",
        "[&>blockquote:not(:last-child)]:mb-6",
        "[&>h4:not(:first-child)]:mt-6",
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
