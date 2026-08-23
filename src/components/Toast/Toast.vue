<script setup lang="ts">
import type { ToastVariant } from "../../composables";

export interface ToastProps {
  title: string;
  description?: string;
  variant?: ToastVariant;
}

withDefaults(defineProps<ToastProps>(), {
  variant: "info",
});

defineEmits<{
  dismiss: [];
}>();
</script>

<template>
  <div class="ui-toast" :data-variant="variant" role="status">
    <span class="ui-toast__accent" aria-hidden="true" />
    <div class="ui-toast__body">
      <p class="ui-toast__title">{{ title }}</p>
      <p v-if="description" class="ui-toast__description">{{ description }}</p>
    </div>
    <button
      type="button"
      class="ui-toast__close"
      aria-label="Dismiss notification"
      @click="$emit('dismiss')"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        aria-hidden="true"
      >
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<style>
.ui-toast {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  width: 20rem;
  max-width: calc(100vw - 2rem);
  padding: 0.75rem 0.75rem 0.75rem 0.875rem;
  overflow: hidden;
  border: 1px solid var(--ui-border);
  border-radius: 8px;
  background-color: var(--ui-bg);
  color: var(--ui-text);
  box-shadow: var(--ui-shadow-card);
}

.ui-toast__accent {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 3px;
  background-color: var(--ui-accent);
}

.ui-toast[data-variant="success"] .ui-toast__accent {
  background-color: var(--ui-accent);
}

.ui-toast[data-variant="warning"] .ui-toast__accent {
  background-color: var(--ui-warning);
}

.ui-toast[data-variant="error"] .ui-toast__accent {
  background-color: var(--ui-danger);
}

.ui-toast__body {
  flex: 1;
  min-width: 0;
}

.ui-toast__title {
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.25rem;
}

.ui-toast__description {
  margin: 0.125rem 0 0;
  color: var(--ui-text-muted);
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.ui-toast__close {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  border: none;
  border-radius: 4px;
  background: none;
  color: var(--ui-text-muted);
  cursor: pointer;
  transition: background-color 120ms ease;
}

.ui-toast__close:hover {
  background-color: var(--ui-surface-hover);
  color: var(--ui-text);
}

.ui-toast__close:focus-visible {
  outline: 2px solid var(--ui-focus-ring);
  outline-offset: 2px;
}
</style>
