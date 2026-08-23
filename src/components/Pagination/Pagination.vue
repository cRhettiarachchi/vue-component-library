<script setup lang="ts">
import { usePagination } from "../../composables";

export interface PaginationProps {
  /** Total number of records being paged through. */
  total: number;
  /** Records per page. */
  perPage?: number;
  /** Pages shown either side of the current one. */
  siblingCount?: number;
  /** Hides the "Showing 1–10 of 240" caption. */
  hideSummary?: boolean;
  /** Word for the records being paged, used in the caption. */
  itemLabel?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<PaginationProps>(), {
  perPage: 10,
  siblingCount: 1,
  itemLabel: "results",
});

const page = defineModel<number>("page", { default: 1 });

const { totalPages, items, itemRange, isFirst, isLast, goTo, next, prev } = usePagination({
  total: () => props.total,
  perPage: () => props.perPage,
  siblingCount: () => props.siblingCount,
  page,
});
</script>

<template>
  <nav class="ui-pagination" role="navigation" aria-label="Pagination">
    <p v-if="!hideSummary" class="ui-pagination__summary" aria-live="polite">
      Showing {{ itemRange.first }}–{{ itemRange.last }} of {{ total }} {{ itemLabel }}
    </p>

    <ul class="ui-pagination__list">
      <li>
        <button
          type="button"
          class="ui-pagination__button"
          aria-label="Go to previous page"
          :disabled="disabled || isFirst"
          @click="prev"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
      </li>

      <li v-for="(item, index) in items" :key="`${item}-${index}`">
        <span v-if="item === 'ellipsis'" class="ui-pagination__ellipsis" aria-hidden="true">…</span>
        <button
          v-else
          type="button"
          class="ui-pagination__button"
          :aria-label="`Go to page ${item}`"
          :aria-current="item === page ? 'page' : undefined"
          :data-active="item === page ? '' : undefined"
          :disabled="disabled"
          @click="goTo(item)"
        >
          {{ item }}
        </button>
      </li>

      <li>
        <button
          type="button"
          class="ui-pagination__button"
          aria-label="Go to next page"
          :disabled="disabled || isLast"
          @click="next"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </li>
    </ul>

    <p class="ui-pagination__status" aria-live="polite">
      Page {{ page }} of {{ totalPages }}
    </p>
  </nav>
</template>

<style>
.ui-pagination {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  color: var(--ui-text);
  font-size: 0.875rem;
}

.ui-pagination__summary,
.ui-pagination__status {
  margin: 0;
  color: var(--ui-text-muted);
}

.ui-pagination__status {
  /* Announced to screen readers; the buttons already carry it visually. */
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.ui-pagination__list {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.ui-pagination__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 2rem;
  padding: 0 0.5rem;
  border: 1px solid transparent;
  border-radius: 6px;
  background: none;
  color: var(--ui-text);
  font: inherit;
  font-size: 0.875rem;
  cursor: pointer;
  transition:
    background-color 120ms ease,
    border-color 120ms ease;
}

.ui-pagination__button:hover:not(:disabled) {
  background-color: var(--ui-surface-hover);
}

.ui-pagination__button:focus-visible {
  outline: 2px solid var(--ui-focus-ring);
  outline-offset: 2px;
}

.ui-pagination__button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ui-pagination__button[data-active] {
  border-color: var(--ui-border);
  background-color: var(--ui-surface-active);
  font-weight: 500;
}

.ui-pagination__ellipsis {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 2rem;
  color: var(--ui-text-muted);
}
</style>
