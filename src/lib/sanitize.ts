import DOMPurify from 'dompurify'

const ALLOWED_TAGS = ['a', 'b', 'strong', 'i', 'em', 'br', 'p', 'span', 'u', 'mark']
const ALLOWED_ATTR = ['href', 'target', 'rel', 'class']

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ADD_ATTR: ['target'],
    FORCE_BODY: false,
  })
}

export function htmlToText(html: string): string {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent ?? ''
}
