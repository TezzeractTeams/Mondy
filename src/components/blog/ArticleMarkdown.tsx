import ReactMarkdown from "react-markdown";

type ArticleMarkdownProps = {
  markdown: string;
  className?: string;
};

export function ArticleMarkdown({ markdown, className }: ArticleMarkdownProps) {
  if (!markdown.trim()) return null;
  return (
    <div className={className}>
      <ReactMarkdown
        components={{
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
