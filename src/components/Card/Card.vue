<script setup lang="ts">
export interface CardProps {
  title?: string;
  subtitle?: string;
}

defineProps<CardProps>();
</script>

<template>
  <div class="ui-card">
    <div v-if="$slots.media" class="ui-card__media">
      <slot name="media" />
    </div>
    <div class="ui-card__body">
      <slot>
        <p v-if="title" class="ui-card__title">{{ title }}</p>
        <p v-if="subtitle" class="ui-card__subtitle">{{ subtitle }}</p>
      </slot>
    </div>
  </div>
</template>

<style>
/* Fluid: fills its container (full-width on mobile), shrinks below the
   260px design minimum rather than overflowing narrow viewports. */
.ui-card {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: min(260px, 100%);
  max-width: 100%;
  padding: 8px 12px 8px 8px;
  border-radius: 8px;
  background-color: var(--ui-bg);
  box-shadow: var(--ui-shadow-card);
}

.ui-card__media {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 6px;
  background-color: var(--ui-surface);
  overflow: hidden;
}

.ui-card__body {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
}

.ui-card__title {
  margin: 0;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  color: var(--ui-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ui-card__subtitle {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: var(--ui-text-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
