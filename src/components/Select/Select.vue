<script setup lang="ts">
import { computed } from "vue";
import {
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectViewport,
} from "reka-ui";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  /** Allows selecting several options; v-model becomes an array. */
  multiple?: boolean;
}

const props = withDefaults(defineProps<SelectProps>(), {
  placeholder: "Select an option",
});

const modelValue = defineModel<string | string[]>();

const displayLabel = computed(() => {
  const value = modelValue.value;
  const selected = Array.isArray(value) ? value : value != null ? [value] : [];
  return selected
    .map((v) => props.options.find((option) => option.value === v)?.label ?? v)
    .join(", ");
});
</script>

<template>
  <SelectRoot v-model="modelValue" :multiple="multiple" :disabled="disabled">
    <SelectTrigger class="ui-select-trigger">
      <span
        class="ui-select-trigger__value"
        :data-placeholder="displayLabel ? undefined : ''"
      >
        {{ displayLabel || placeholder }}
      </span>
      <SelectIcon class="ui-select-trigger__icon">
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
          <path d="m6 9 6 6 6-6" />
        </svg>
      </SelectIcon>
    </SelectTrigger>
    <SelectPortal>
      <SelectContent class="ui-select-content" position="popper" :side-offset="4">
        <SelectViewport class="ui-select-viewport">
          <SelectItem
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            :disabled="option.disabled"
            class="ui-select-item"
          >
            <SelectItemText>{{ option.label }}</SelectItemText>
            <SelectItemIndicator class="ui-select-item__indicator">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </SelectItemIndicator>
          </SelectItem>
        </SelectViewport>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>

<style>
.ui-select-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  min-width: 12rem;
  max-width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--ui-border);
  border-radius: 6px;
  background-color: var(--ui-bg);
  color: var(--ui-text);
  font: inherit;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: border-color 120ms ease;
}

.ui-select-trigger:hover:not([data-disabled]) {
  border-color: var(--ui-border-hover);
}

.ui-select-trigger:focus-visible {
  outline: 2px solid var(--ui-focus-ring);
  outline-offset: 2px;
}

.ui-select-trigger[data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

.ui-select-trigger__value {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ui-select-trigger__value[data-placeholder] {
  color: var(--ui-text-muted);
}

.ui-select-trigger__icon {
  display: inline-flex;
  flex-shrink: 0;
  color: var(--ui-text-muted);
}

.ui-select-content {
  z-index: 50;
  min-width: var(--reka-select-trigger-width);
  max-height: var(--reka-select-content-available-height);
  border: 1px solid var(--ui-border);
  border-radius: 6px;
  background-color: var(--ui-bg);
  box-shadow: var(--ui-shadow);
  overflow: hidden;
}

.ui-select-viewport {
  padding: 0.25rem;
}

.ui-select-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.375rem 0.625rem;
  border-radius: 4px;
  color: var(--ui-text);
  font-size: 0.9375rem;
  cursor: default;
  user-select: none;
  outline: none;
}

.ui-select-item[data-highlighted] {
  background-color: var(--ui-surface-active);
}

.ui-select-item[data-disabled] {
  color: var(--ui-text-muted);
  opacity: 0.5;
}

.ui-select-item__indicator {
  display: inline-flex;
  color: var(--ui-accent);
}
</style>
