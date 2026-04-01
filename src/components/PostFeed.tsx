import { useRef } from 'react'
import { useWindowVirtualizer } from '@tanstack/react-virtual'
import type { Post } from '@/types/post'
import { PostCard } from './PostCard'

interface Props {
  posts: Post[]
  searchQuery: string
}

export function PostFeed({ posts, searchQuery }: Props) {
  const listRef = useRef<HTMLDivElement>(null)

  const virtualizer = useWindowVirtualizer({
    count: posts.length,
    estimateSize: () => 240,
    overscan: 4,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  })

  const items = virtualizer.getVirtualItems()

  return (
    <div ref={listRef} role="feed" aria-label="Truth Social posts">
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${(items[0]?.start ?? 0) - virtualizer.options.scrollMargin}px)`,
          }}
        >
          {items.map((item) => {
            const post = posts[item.index]
            return (
              <div
                key={post.id}
                data-index={item.index}
                ref={virtualizer.measureElement}
                className="pb-3"
              >
                <PostCard post={post} searchQuery={searchQuery} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
