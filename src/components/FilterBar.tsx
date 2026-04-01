import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { SortOption } from '@/types/post'
import { SORT_LABELS } from '@/types/post'

interface Props {
  q: string
  sort: SortOption
  from: string
  to: string
  isFiltered: boolean
  onSearch: (q: string) => void
  onSort: (sort: SortOption) => void
  onFrom: (from: string) => void
  onTo: (to: string) => void
  onClear: () => void
}

const SORT_OPTIONS: SortOption[] = ['newest', 'oldest', 'most_replies', 'most_reblogs', 'most_likes']

export function FilterBar({ q, sort, from, to, isFiltered, onSearch, onSort, onFrom, onTo, onClear }: Props) {
  const [localQ, setLocalQ] = useState(q)

  // Sync external q changes (e.g., clear all)
  useEffect(() => {
    setLocalQ(q)
  }, [q])

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(localQ)
    }, 150)
    return () => clearTimeout(timer)
  }, [localQ, onSearch])

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="relative flex-1">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <Input
          value={localQ}
          onChange={(e) => setLocalQ(e.target.value)}
          placeholder="Search posts..."
          className="pl-9"
          aria-label="Search posts"
        />
      </div>

      <Select value={sort} onValueChange={(v) => onSort(v as SortOption)}>
        <SelectTrigger className="w-full md:w-44" aria-label="Sort order">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((opt) => (
            <SelectItem key={opt} value={opt}>{SORT_LABELS[opt]}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex gap-2">
        <div className="flex items-center gap-1">
          <label htmlFor="filter-from" className="text-xs text-muted-foreground whitespace-nowrap">From</label>
          <input
            id="filter-from"
            type="date"
            value={from}
            onChange={(e) => onFrom(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            aria-label="From date"
          />
        </div>
        <div className="flex items-center gap-1">
          <label htmlFor="filter-to" className="text-xs text-muted-foreground whitespace-nowrap">To</label>
          <input
            id="filter-to"
            type="date"
            value={to}
            onChange={(e) => onTo(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            aria-label="To date"
          />
        </div>

        {isFiltered && (
          <Button variant="ghost" size="sm" onClick={onClear} aria-label="Clear all filters" className="shrink-0">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear
          </Button>
        )}
      </div>
    </div>
  )
}
