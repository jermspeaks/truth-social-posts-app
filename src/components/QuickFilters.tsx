import { Button } from '@/components/ui/button'
import { TERM_RANGES } from '@/lib/dateRanges'
import type { QuickFilter } from '@/types/post'

interface Props {
  active: QuickFilter | null
  onSelect: (filter: QuickFilter) => void
}

const FILTERS: QuickFilter[] = ['first_term', 'post_presidency', 'second_term']

export function QuickFilters({ active, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Quick date filters">
      {FILTERS.map((key) => {
        const range = TERM_RANGES[key]
        const isActive = active === key
        return (
          <Button
            key={key}
            variant={isActive ? 'default' : 'outline'}
            size="sm"
            onClick={() => onSelect(key)}
            aria-pressed={isActive}
            title={range.description}
          >
            {range.label}
            <span className="ml-1.5 text-xs opacity-60">{range.description}</span>
          </Button>
        )
      })}
    </div>
  )
}
