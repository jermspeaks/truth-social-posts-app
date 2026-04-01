import { useMemo } from 'react'
import type { Post } from '@/types/post'
import { sortPosts } from '@/lib/sortFns'
import type { useUrlFilters } from './useUrlFilters'

type Filters = ReturnType<typeof useUrlFilters>['filters']

export function useFilteredPosts(posts: Post[] | null, filters: Filters) {
  return useMemo(() => {
    if (!posts) return { filtered: [], total: 0 }

    const { q, sort, from, to } = filters

    const queryLower = q.toLowerCase()
    const fromTime = from ? new Date(from).getTime() : null
    const toTime = to ? new Date(to + 'T23:59:59').getTime() : null

    let result = posts

    if (queryLower) {
      result = result.filter((p) => p._searchText?.includes(queryLower))
    }

    if (fromTime !== null || toTime !== null) {
      result = result.filter((p) => {
        const t = new Date(p.created_at).getTime()
        if (fromTime !== null && t < fromTime) return false
        if (toTime !== null && t > toTime) return false
        return true
      })
    }

    return { filtered: sortPosts(result, sort), total: posts.length }
  }, [posts, filters])
}
