import { computed, ref, toValue, type ComputedRef, type MaybeRefOrGetter, type Ref } from 'vue'

/** A page number, or a gap standing in for the pages that were left out. */
export type PaginationItem = number | 'ellipsis'

export interface PaginationOptions {
  /** Total number of records being paged through. */
  total: MaybeRefOrGetter<number>
  /** Records per page. Defaults to 10. */
  perPage?: MaybeRefOrGetter<number>
  /** How many pages to show either side of the current one. Defaults to 1. */
  siblingCount?: MaybeRefOrGetter<number>
  /**
   * Page ref owned by the caller, for components that need the page in their
   * own state. When omitted the composable keeps an internal ref.
   */
  page?: Ref<number>
}

export interface UsePaginationReturn {
  page: Ref<number>
  totalPages: ComputedRef<number>
  /** Page buttons to render, first and last page always included. */
  items: ComputedRef<PaginationItem[]>
  /** 1-based index of the first and last record on the current page. */
  itemRange: ComputedRef<{ first: number; last: number }>
  isFirst: ComputedRef<boolean>
  isLast: ComputedRef<boolean>
  goTo: (page: number) => void
  next: () => void
  prev: () => void
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Builds the elided page list, e.g. `1 … 7 8 9 … 42`.
 *
 * The first and last page are always rendered so the ends of the range stay
 * reachable in one click, and runs of skipped pages collapse into a gap.
 */
function buildItems(current: number, lastPage: number, siblings: number): PaginationItem[] {
  if (lastPage <= 1) return [1]

  const start = Math.max(2, current - siblings)
  const end = Math.min(lastPage, current + siblings)

  const items: PaginationItem[] = [1]

  if (start > 2) items.push('ellipsis')
  for (let page = start; page <= end; page += 1) items.push(page)
  if (end < lastPage - 1) items.push('ellipsis')

  items.push(lastPage)

  return items
}

/**
 * Headless pagination state: page bounds, the elided page list, and the
 * record range to caption the table with.
 *
 * ```ts
 * const { page, items, next } = usePagination({ total: () => rows.length })
 * ```
 */
export function usePagination(options: PaginationOptions): UsePaginationReturn {
  const { total, perPage = 10, siblingCount = 1, page: externalPage } = options

  const page = externalPage ?? ref(1)

  const totalPages = computed(() => {
    const size = Math.max(1, toValue(perPage))
    return Math.max(1, Math.ceil(toValue(total) / size))
  })

  const items = computed(() =>
    buildItems(clamp(page.value, 1, totalPages.value), totalPages.value, toValue(siblingCount)),
  )

  const itemRange = computed(() => {
    const size = Math.max(1, toValue(perPage))
    const current = clamp(page.value, 1, totalPages.value)

    return {
      first: (current - 1) * size + 1,
      last: current * size,
    }
  })

  const isFirst = computed(() => page.value <= 1)
  const isLast = computed(() => page.value >= totalPages.value)

  function goTo(target: number) {
    page.value = clamp(Math.trunc(target), 1, totalPages.value)
  }

  return {
    page,
    totalPages,
    items,
    itemRange,
    isFirst,
    isLast,
    goTo,
    next: () => goTo(page.value + 1),
    prev: () => goTo(page.value - 1),
  }
}
