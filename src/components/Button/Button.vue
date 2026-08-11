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
  outline: 2px solid #4f46e5;
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
  background-color: #4f46e5;
  color: #ffffff;
}

.ui-button[data-variant='primary']:hover:not(:disabled) {
  background-color: #4338ca;
}

.ui-button[data-variant='secondary'] {
  background-color: transparent;
  border-color: #d1d5db;
  color: #111827;
}

.ui-button[data-variant='secondary']:hover:not(:disabled) {
  background-color: #f3f4f6;
}

.ui-button[data-variant='ghost'] {
  background-color: transparent;
  color: #111827;
}

.ui-button[data-variant='ghost']:hover:not(:disabled) {
  background-color: #f3f4f6;
}
</style>
