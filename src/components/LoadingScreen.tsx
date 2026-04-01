import { Skeleton } from '@/components/ui/skeleton'

export function LoadingScreen() {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Loading posts">
      <p className="text-sm text-muted-foreground">Loading 32,000+ posts...</p>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="border border-border rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="space-y-1.5">
              <Skeleton className="h-3.5 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <div className="flex gap-5 pt-2">
            <Skeleton className="h-3.5 w-12" />
            <Skeleton className="h-3.5 w-12" />
            <Skeleton className="h-3.5 w-12" />
          </div>
        </div>
      ))}
    </div>
  )
}
