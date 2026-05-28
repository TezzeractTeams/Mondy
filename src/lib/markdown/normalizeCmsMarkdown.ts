/** Normalize Strapi / CMS markdown before react-markdown. */
export function normalizeCmsMarkdown(markdown: string): string {
  return markdown
    .replace(/\r\n?/g, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n");
}
