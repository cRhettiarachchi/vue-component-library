<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'reka-ui'

export interface SwitchProps {
  disabled?: boolean
}

defineProps<SwitchProps>()

const modelValue = defineModel<boolean>({ default: false })
</script>

<template>
  <SwitchRoot v-model="modelValue" :disabled="disabled" class="ui-switch">
    <SwitchThumb class="ui-switch__thumb" />
  </SwitchRoot>
</template>

<style>
.ui-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 42px;
  height: 24px;
  padding: 0;
  border: none;
  border-radius: 9999px;
  background-color: var(--ui-control-track);
  cursor: pointer;
  transition: background-color 120ms ease;
}

.ui-switch:focus-visible {
  outline: 2px solid var(--ui-focus-ring);
  outline-offset: 2px;
}

.ui-switch[data-state='checked'] {
  background-color: var(--ui-accent);
}

.ui-switch[data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

.ui-switch__thumb {
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 9999px;
  background-color: var(--ui-accent-contrast);
  transform: translateX(3px);
  transition: transform 120ms ease;
  will-change: transform;
}

.ui-switch__thumb[data-state='checked'] {
  transform: translateX(21px);
}
</style>
