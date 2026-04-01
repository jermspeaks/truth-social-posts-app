import type { Post, SortOption } from '@/types/post'

const comparators: Record<SortOption, (a: Post, b: Post) => number> = {
  newest: (a, b) => b.created_at.localeCompare(a.created_at),
  oldest: (a, b) => a.created_at.localeCompare(b.created_at),
  most_replies: (a, b) => b.replies_count - a.replies_count,
  most_reblogs: (a, b) => b.reblogs_count - a.reblogs_count,
  most_likes: (a, b) => b.favourites_count - a.favourites_count,
}

export function sortPosts(posts: Post[], sort: SortOption): Post[] {
  return [...posts].sort(comparators[sort])
}
