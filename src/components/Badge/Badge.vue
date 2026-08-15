<script setup lang="ts">
export interface BadgeProps {
  variant?: "neutral" | "accent";
}

withDefaults(defineProps<BadgeProps>(), {
  variant: "neutral",
});
</script>

<template>
  <span class="ui-badge" :data-variant="variant">
    <slot />
  </span>
</template>

<style>
.ui-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  white-space: nowrap;
}

.ui-badge[data-variant="neutral"] {
  background-color: var(--ui-surface);
  color: var(--ui-text-muted);
}

.ui-badge[data-variant="accent"] {
  background-color: var(--ui-accent);
  color: var(--ui-accent-contrast);
}
</style>
