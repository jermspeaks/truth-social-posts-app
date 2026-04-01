import { useCallback } from 'react'
import { usePosts } from '@/hooks/usePosts'
import { useUrlFilters } from '@/hooks/useUrlFilters'
import { useFilteredPosts } from '@/hooks/useFilteredPosts'
import { FilterBar } from '@/components/FilterBar'
import { QuickFilters } from '@/components/QuickFilters'
import { PostFeed } from '@/components/PostFeed'
import { ResultsCount } from '@/components/ResultsCount'
import { ExportMenu } from '@/components/ExportMenu'
import { LoadingScreen } from '@/components/LoadingScreen'
import { EmptyState } from '@/components/EmptyState'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ScrollToTop } from '@/components/ScrollToTop'
import type { SortOption } from '@/types/post'

function App() {
  const { data, loading, error } = usePosts()
  const { filters, setFilters, setQuickFilter, clearFilters, isFiltered } = useUrlFilters()
  const { filtered, total } = useFilteredPosts(data, filters)

  const handleSearch = useCallback(
    (q: string) => { void setFilters({ q }) },
    [setFilters]
  )
  const handleSort = useCallback(
    (sort: SortOption) => { void setFilters({ sort }) },
    [setFilters]
  )
  const handleFrom = useCallback(
    (from: string) => { void setFilters({ from, quick: null }) },
    [setFilters]
  )
  const handleTo = useCallback(
    (to: string) => { void setFilters({ to, quick: null }) },
    [setFilters]
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg tracking-tight">Truth Archive</span>
            <span className="text-xs text-muted-foreground hidden sm:inline">Trump on Truth Social</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-4 space-y-3">
        {/* Filters */}
        <div className="space-y-2">
          <FilterBar
            q={filters.q}
            sort={filters.sort}
            from={filters.from}
            to={filters.to}
            isFiltered={isFiltered}
            onSearch={handleSearch}
            onSort={handleSort}
            onFrom={handleFrom}
            onTo={handleTo}
            onClear={clearFilters}
          />
          <QuickFilters
            active={filters.quick}
            onSelect={setQuickFilter}
          />
        </div>

        {/* Results bar */}
        {!loading && !error && (
          <div className="flex items-center justify-between gap-2">
            <ResultsCount count={filtered.length} total={total} />
            {filtered.length > 0 && <ExportMenu posts={filtered} />}
          </div>
        )}

        {/* Content */}
        {loading && <LoadingScreen />}

        {error && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            <p className="font-medium">Failed to load posts</p>
            <p className="mt-1 text-xs opacity-80">{error}</p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <EmptyState onClear={clearFilters} />
        )}

        {!loading && !error && filtered.length > 0 && (
          <PostFeed posts={filtered} searchQuery={filters.q} />
        )}
      </main>

      <ScrollToTop />
    </div>
  )
}

export default App
