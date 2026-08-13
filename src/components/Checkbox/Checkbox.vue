<script setup lang="ts">
import { CheckboxRoot, CheckboxIndicator } from "reka-ui";

export interface CheckboxProps {
  disabled?: boolean;
}

defineProps<CheckboxProps>();

const modelValue = defineModel<boolean>({ default: false });
</script>

<template>
  <CheckboxRoot v-model="modelValue" :disabled="disabled" class="ui-checkbox">
    <CheckboxIndicator class="ui-checkbox__indicator">
      <svg
        viewBox="0 0 12 12"
        width="12"
        height="12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 6.5 4.5 9 10 3.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>

<style>
.ui-checkbox {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  padding: 0;
  border: 1px solid var(--ui-border);
  border-radius: 4px;
  background-color: var(--ui-bg);
  cursor: pointer;
  transition: background-color 120ms ease, border-color 120ms ease;
}

.ui-checkbox:hover:not([data-disabled]) {
  border-color: var(--ui-border-hover);
}

.ui-checkbox:focus-visible {
  outline: 2px solid var(--ui-focus-ring);
  outline-offset: 2px;
}

.ui-checkbox[data-state="checked"] {
  border-color: var(--ui-accent);
  background-color: var(--ui-accent);
}

.ui-checkbox[data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

.ui-checkbox__indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ui-accent-contrast);
}
</style>
