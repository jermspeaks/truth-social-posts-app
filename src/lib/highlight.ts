/**
 * Wraps occurrences of `term` in `<mark>` tags within sanitized HTML.
 * Runs after DOMPurify so it only operates on safe content.
 */
export function highlightTermInHtml(html: string, term: string): string {
  if (!term.trim()) return html
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  return html.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 rounded-sm px-0.5">$1</mark>')
}
