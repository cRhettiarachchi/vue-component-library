<script setup lang="ts">
export interface InputProps {
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

withDefaults(defineProps<InputProps>(), {
  size: "md",
});

const modelValue = defineModel<string>({ default: "" });
</script>

<template>
  <input
    v-model="modelValue"
    class="ui-input"
    :data-size="size"
    :disabled="disabled"
  />
</template>

<style>
.ui-input {
  border: 1px solid var(--ui-border);
  border-radius: 6px;
  background-color: var(--ui-bg);
  color: var(--ui-text);
  font: inherit;
  transition: border-color 120ms ease;
}

.ui-input::placeholder {
  color: var(--ui-text-muted);
}

.ui-input:hover:not(:disabled) {
  border-color: var(--ui-border-hover);
}

.ui-input:focus-visible {
  outline: 2px solid var(--ui-focus-ring);
  outline-offset: 2px;
}

.ui-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: var(--ui-surface);
}

.ui-input[data-size="sm"] {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.ui-input[data-size="md"] {
  padding: 0.5rem 0.75rem;
  font-size: 0.9375rem;
}

.ui-input[data-size="lg"] {
  padding: 0.75rem 1rem;
  font-size: 1rem;
}
</style>
