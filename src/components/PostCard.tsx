import { memo, useState } from 'react'
import { format } from 'date-fns'
import type { Post } from '@/types/post'
import { sanitizeHtml } from '@/lib/sanitize'
import { highlightTermInHtml } from '@/lib/highlight'
import { EngagementStats } from './EngagementStats'
import { PostMedia } from './PostMedia'

interface Props {
  post: Post
  searchQuery: string
}

function PostCardInner({ post, searchQuery }: Props) {
  const [expanded, setExpanded] = useState(false)

  const sanitized = sanitizeHtml(post.content)
  const highlighted = searchQuery ? highlightTermInHtml(sanitized, searchQuery) : sanitized

  const date = new Date(post.created_at)
  const dateFormatted = format(date, 'MMM d, yyyy')
  const timeFormatted = format(date, 'h:mm a')

  return (
    <article className="bg-card text-card-foreground border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-primary">T</span>
          </div>
          <div>
            <p className="text-sm font-semibold leading-none">Donald J. Trump</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              <time dateTime={post.created_at} title={`${dateFormatted} at ${timeFormatted}`}>
                {dateFormatted}
              </time>
            </p>
          </div>
        </div>
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
          aria-label="Open on Truth Social"
          title="Open on Truth Social"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      <div
        className={`text-sm leading-relaxed prose prose-sm dark:prose-invert max-w-none prose-a:text-primary prose-a:underline ${!expanded ? 'line-clamp-10' : ''}`}
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />

      {post.content.length > 500 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-1 text-xs text-primary hover:underline focus:outline-none"
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}

      {post.media && post.media.length > 0 && <PostMedia media={post.media} />}

      <EngagementStats post={post} />
    </article>
  )
}

export const PostCard = memo(PostCardInner, (prev, next) => {
  return prev.post.id === next.post.id && prev.searchQuery === next.searchQuery
})
