import type { Post } from '@/types/post'

const DATA_URL = 'https://ix.cnn.io/data/truth-social/truth_archive.json'

// Regex-based HTML stripper — no DOM needed in a Worker context
function htmlToText(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

self.onmessage = async () => {
  try {
    const res = await fetch(DATA_URL)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const posts: Post[] = await res.json()

    const enriched = posts.map((p) => ({
      ...p,
      _searchText: htmlToText(p.content).toLowerCase(),
    }))

    self.postMessage({ type: 'done', posts: enriched })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to load posts'
    self.postMessage({ type: 'error', message })
  }
}
