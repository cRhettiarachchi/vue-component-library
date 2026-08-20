<script setup lang="ts">
import { computed, onMounted, watch } from "vue";

export interface PaginationProps {
  /** Total number of items across every page. */
  total: number;
  /** Items rendered per page. */
  perPage?: number;
  /** Pages kept visible on each side of the current page. */
  siblingCount?: number;
  disabled?: boolean;
}

type PaginationItem =
  | { type: "page"; value: number }
  | { type: "ellipsis"; value: number };

const props = withDefaults(defineProps<PaginationProps>(), {
  perPage: 10,
  siblingCount: 1,
});

const { perPage, siblingCount } = props;

const page = defineModel<number>({ default: 1 });

const pageCount = computed(() => Math.ceil(props.total / perPage));

const items = computed<PaginationItem[]>(() => {
  const last = pageCount.value;
  const start = Math.max(1, page.value - siblingCount);
  const end = Math.min(last, page.value + siblingCount);
  const list: PaginationItem[] = [];

  if (start > 1) {
    list.push({ type: "page", value: 1 });
    if (start > 2) {
      list.push({ type: "ellipsis", value: start - 1 });
    }
  }

  for (let i = start; i < end; i++) {
    list.push({ type: "page", value: i });
  }

  if (end < last) {
    if (end < last - 1) {
      list.push({ type: "ellipsis", value: end + 1 });
    }
    list.push({ type: "page", value: last });
  }

  return list;
});

function goTo(target: number) {
  page.value = Math.max(1, target);
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "ArrowLeft") {
    goTo(page.value - 1);
  } else if (event.key === "ArrowRight") {
    goTo(page.value + 1);
  }
}

// Landing on a page that no longer exists after the data set changes is
// confusing, so go back to the beginning whenever the total changes.
watch(
  () => props.total,
  () => {
    page.value = 1;
  },
  { immediate: true },
);

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});
</script>

<template>
  <nav class="ui-pagination" aria-label="Pagination">
    <button
      type="button"
      class="ui-pagination__arrow"
      :disabled="page <= 1"
      @click="goTo(page - 1)"
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

    <ul class="ui-pagination__list">
      <li v-for="(item, index) in items" :key="index">
        <span v-if="item.type === 'ellipsis'" class="ui-pagination__ellipsis">&#8230;</span>
        <button
          v-else
          type="button"
          class="ui-pagination__page"
          :data-active="item.value === page ? '' : undefined"
          :aria-current="item.value === page ? 'page' : undefined"
          :disabled="disabled"
          @click="goTo(item.value)"
        >
          {{ item.value }}
        </button>
      </li>
    </ul>

    <button
      type="button"
      class="ui-pagination__arrow"
      :disabled="page >= pageCount"
      @click="goTo(page + 1)"
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
  </nav>
</template>

<style>
.ui-pagination {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.ui-pagination__list {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.ui-pagination__arrow,
.ui-pagination__page {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 2rem;
  padding: 0 0.5rem;
  border: 1px solid var(--ui-border);
  border-radius: 6px;
  background-color: var(--ui-bg);
  color: var(--ui-text);
  font: inherit;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 120ms ease, border-color 120ms ease;
}

.ui-pagination__arrow:hover:not(:disabled),
.ui-pagination__page:hover:not(:disabled) {
  border-color: var(--ui-border-hover);
  background-color: var(--ui-surface-hover);
}

.ui-pagination__arrow:focus-visible,
.ui-pagination__page:focus-visible {
  outline: 2px solid var(--ui-focus-ring);
  outline-offset: 2px;
}

.ui-pagination__arrow:disabled,
.ui-pagination__page:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ui-pagination__page[data-active] {
  border-color: #0f766e;
  background-color: #0d9488;
  color: #ffffff;
}

.ui-pagination__ellipsis {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 2rem;
  color: var(--ui-text-muted);
  font-size: 0.875rem;
  user-select: none;
}
</style>
