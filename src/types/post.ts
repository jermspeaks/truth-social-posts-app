export interface Post {
  id: string
  created_at: string
  content: string
  url: string
  media: string[]
  replies_count: number
  reblogs_count: number
  favourites_count: number
  _searchText?: string
}

export type SortOption =
  | 'newest'
  | 'oldest'
  | 'most_replies'
  | 'most_reblogs'
  | 'most_likes'

export type QuickFilter = 'post_presidency' | 'second_term'

export const SORT_LABELS: Record<SortOption, string> = {
  newest: 'Newest first',
  oldest: 'Oldest first',
  most_replies: 'Most replies',
  most_reblogs: 'Most reblogs',
  most_likes: 'Most likes',
}
