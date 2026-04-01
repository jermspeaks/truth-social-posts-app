import { useEffect, useState } from 'react'
import type { Post } from '@/types/post'
import { htmlToText } from '@/lib/sanitize'

const DATA_URL = 'https://ix.cnn.io/data/truth-social/truth_archive.json'

// Module-level cache survives React StrictMode double-mount
let cache: Post[] | null = null
let fetchPromise: Promise<Post[]> | null = null

function fetchPosts(): Promise<Post[]> {
  if (fetchPromise) return fetchPromise
  fetchPromise = fetch(DATA_URL)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.json() as Promise<Post[]>
    })
    .then((posts) => {
      const enriched = posts.map((p) => ({
        ...p,
        _searchText: htmlToText(p.content).toLowerCase(),
      }))
      cache = enriched
      return enriched
    })
  return fetchPromise
}

interface UsePostsResult {
  data: Post[] | null
  loading: boolean
  error: string | null
}

export function usePosts(): UsePostsResult {
  const [data, setData] = useState<Post[] | null>(cache)
  const [loading, setLoading] = useState<boolean>(cache === null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (cache) {
      setData(cache)
      setLoading(false)
      return
    }
    fetchPosts()
      .then((posts) => {
        setData(posts)
        setLoading(false)
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : 'Failed to load posts'
        setError(msg)
        setLoading(false)
      })
  }, [])

  return { data, loading, error }
}
