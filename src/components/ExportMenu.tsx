import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type { Post } from '@/types/post'
import { exportAsJson, exportAsCsv, exportAsTxt } from '@/lib/export'

interface Props {
  posts: Post[]
}

export function ExportMenu({ posts }: Props) {
  const count = posts.length

  return (
    <Popover>
      <PopoverTrigger
        className="inline-flex items-center gap-1.5 h-8 rounded-md border border-input bg-background px-3 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
        aria-label="Export posts"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Export {count > 0 ? `(${count.toLocaleString()})` : ''}
      </PopoverTrigger>
      <PopoverContent className="w-48 p-1" align="end">
        <div className="space-y-0.5">
          <button
            onClick={() => exportAsJson(posts)}
            className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Download as JSON
          </button>
          <button
            onClick={() => exportAsCsv(posts)}
            className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Download as CSV
          </button>
          <button
            onClick={() => exportAsTxt(posts)}
            className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Download as TXT
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
