import { parseAsString, parseAsStringEnum, useQueryStates } from 'nuqs'
import type { QuickFilter, SortOption } from '@/types/post'
import { TERM_RANGES } from '@/lib/dateRanges'

const sortOptions: SortOption[] = ['newest', 'oldest', 'most_replies', 'most_reblogs', 'most_likes']
const quickFilterOptions: QuickFilter[] = ['first_term', 'post_presidency', 'second_term']

export function useUrlFilters() {
  const [filters, setFilters] = useQueryStates({
    q: parseAsString.withDefault(''),
    sort: parseAsStringEnum<SortOption>(sortOptions).withDefault('newest'),
    from: parseAsString.withDefault(''),
    to: parseAsString.withDefault(''),
    quick: parseAsStringEnum<QuickFilter>(quickFilterOptions),
  })

  const isFiltered =
    filters.q !== '' ||
    filters.sort !== 'newest' ||
    filters.from !== '' ||
    filters.to !== '' ||
    filters.quick !== null

  function setQuickFilter(quick: QuickFilter) {
    const range = TERM_RANGES[quick]
    void setFilters({
      quick,
      from: range.from,
      to: range.to ?? '',
    })
  }

  function clearFilters() {
    void setFilters({ q: '', sort: 'newest', from: '', to: '', quick: null })
  }

  return { filters, setFilters, setQuickFilter, clearFilters, isFiltered }
}
