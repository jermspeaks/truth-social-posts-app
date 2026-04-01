import { useEffect, useState } from 'react'
import type { Post } from '@/types/post'

// Module-level cache survives React StrictMode double-mount
let cache: Post[] | null = null

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

    const worker = new Worker(
      new URL('../workers/posts.worker.ts', import.meta.url),
      { type: 'module' }
    )

    worker.onmessage = (e: MessageEvent<{ type: 'done'; posts: Post[] } | { type: 'error'; message: string }>) => {
      if (e.data.type === 'done') {
        cache = e.data.posts
        setData(e.data.posts)
      } else {
        setError(e.data.message)
      }
      setLoading(false)
      worker.terminate()
    }

    worker.onerror = (e) => {
      setError(e.message ?? 'Worker error')
      setLoading(false)
      worker.terminate()
    }

    worker.postMessage('fetch')

    return () => worker.terminate()
  }, [])

  return { data, loading, error }
}
