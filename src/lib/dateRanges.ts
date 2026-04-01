import type { QuickFilter } from '@/types/post'

export interface TermRange {
  from: string
  to: string | null
  label: string
  description: string
}

export const TERM_RANGES: Record<QuickFilter, TermRange> = {
  post_presidency: {
    from: '2021-01-20',
    to: '2025-01-20',
    label: 'Post-Presidency',
    description: 'Jan 2021 – Jan 2025',
  },
  second_term: {
    from: '2025-01-20',
    to: null,
    label: 'Second Term',
    description: 'Jan 2025 – present',
  },
}
