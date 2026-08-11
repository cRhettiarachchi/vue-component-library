<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'reka-ui'

export interface ButtonProps extends PrimitiveProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button',
  variant: 'primary',
  size: 'md',
})
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    class="ui-button"
    :data-variant="variant"
    :data-size="size"
    :disabled="disabled || undefined"
  >
    <slot />
  </Primitive>
</template>

<style>
.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 1px solid transparent;
  border-radius: 6px;
  font: inherit;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 120ms ease, border-color 120ms ease;
}

.ui-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ui-button:focus-visible {
  outline: 2px solid var(--ui-focus-ring);
  outline-offset: 2px;
}

.ui-button[data-size='sm'] {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
}

.ui-button[data-size='md'] {
  padding: 0.5rem 1rem;
  font-size: 0.9375rem;
}

.ui-button[data-size='lg'] {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.ui-button[data-variant='primary'] {
  background-color: var(--ui-accent);
  color: var(--ui-accent-contrast);
}

.ui-button[data-variant='primary']:hover:not(:disabled) {
  background-color: var(--ui-accent-hover);
}

.ui-button[data-variant='secondary'] {
  background-color: transparent;
  border-color: var(--ui-border);
  color: var(--ui-text);
}

.ui-button[data-variant='secondary']:hover:not(:disabled) {
  border-color: var(--ui-border-hover);
  background-color: var(--ui-surface-hover);
}

.ui-button[data-variant='ghost'] {
  background-color: transparent;
  color: var(--ui-text);
}

.ui-button[data-variant='ghost']:hover:not(:disabled) {
  background-color: var(--ui-surface-hover);
}
</style>
