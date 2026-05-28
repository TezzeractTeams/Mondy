/** Normalize Strapi / CMS markdown before react-markdown. */
export function normalizeCmsMarkdown(markdown: string): string {
  return (
    markdown
      .replace(/\r\n?/g, "\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<strong(?:\s[^>]*)?>([\s\S]*?)<\/strong>/gi, "**$1**")
      .replace(/<b(?:\s[^>]*)?>([\s\S]*?)<\/b>/gi, "**$1**")
      .replace(/<em(?:\s[^>]*)?>([\s\S]*?)<\/em>/gi, "*$1*")
      .replace(/<i(?:\s[^>]*)?>([\s\S]*?)<\/i>/gi, "*$1*")
      .replace(/\\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
  );
}
