import type { Post } from '@/types/post'
import { htmlToText } from './sanitize'

function triggerDownload(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function exportAsJson(posts: Post[]) {
  const clean = posts.map(({ _searchText: _, ...rest }) => rest)
  triggerDownload(JSON.stringify(clean, null, 2), 'truth-social-posts.json', 'application/json')
}

export function exportAsCsv(posts: Post[]) {
  const header = 'id,created_at,content,url,replies_count,reblogs_count,favourites_count'
  const rows = posts.map((p) => {
    const text = htmlToText(p.content).replace(/"/g, '""')
    return `"${p.id}","${p.created_at}","${text}","${p.url}",${p.replies_count},${p.reblogs_count},${p.favourites_count}`
  })
  triggerDownload([header, ...rows].join('\n'), 'truth-social-posts.csv', 'text/csv')
}

export function exportAsTxt(posts: Post[]) {
  const blocks = posts.map((p) => {
    const date = new Date(p.created_at).toLocaleString()
    const text = htmlToText(p.content).trim()
    return `[${date}]\n${text}\n${p.url}`
  })
  triggerDownload(blocks.join('\n\n---\n\n'), 'truth-social-posts.txt', 'text/plain')
}
