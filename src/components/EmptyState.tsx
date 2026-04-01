import { Button } from '@/components/ui/button'

interface Props {
  onClear: () => void
}

export function EmptyState({ onClear }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <svg className="w-12 h-12 text-muted-foreground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="text-base font-semibold mb-1">No posts found</h3>
      <p className="text-sm text-muted-foreground mb-4">
        No posts match your current filters.
      </p>
      <Button variant="outline" size="sm" onClick={onClear}>
        Clear all filters
      </Button>
    </div>
  )
}
