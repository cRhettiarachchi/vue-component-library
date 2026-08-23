<script setup lang="ts">
import { ref, watch } from "vue";
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from "reka-ui";

export interface TabItem {
  /** Text shown on the trigger. */
  label: string;
  /** Value used for `v-model` and to name the matching content slot. */
  value: string;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  /** Horizontal tabs read left-to-right; vertical stacks the list on the side. */
  orientation?: "horizontal" | "vertical";
  /**
   * `automatic` selects a tab as soon as it is focused with the arrow keys,
   * `manual` waits for Enter or Space.
   */
  activationMode?: "automatic" | "manual";
  modelValue?: string;
}

const props = withDefaults(defineProps<TabsProps>(), {
  orientation: "horizontal",
  activationMode: "automatic",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const active = ref(props.modelValue ?? props.items[0]?.value ?? "");

watch(active, (value) => {
  emit("update:modelValue", value);
});
</script>

<template>
  <TabsRoot
    v-model="active"
    class="ui-tabs"
    :orientation="orientation"
    :activation-mode="activationMode"
  >
    <TabsList class="ui-tabs__list" :aria-label="$attrs['aria-label'] as string | undefined">
      <TabsIndicator class="ui-tabs__indicator" />
      <TabsTrigger
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        :disabled="item.disabled"
        class="ui-tabs__trigger"
      >
        {{ item.label }}
      </TabsTrigger>
    </TabsList>
    <TabsContent
      v-for="item in items"
      :key="item.value"
      :value="item.value"
      class="ui-tabs__content"
    >
      <slot :name="item.value" :item="item">
        <slot name="content" :item="item" />
      </slot>
    </TabsContent>
  </TabsRoot>
</template>

<style>
.ui-tabs {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.ui-tabs[data-orientation="vertical"] {
  flex-direction: row;
  gap: 1.25rem;
}

.ui-tabs__list {
  position: relative;
  display: flex;
  gap: 0.25rem;
  border-bottom: 1px solid var(--ui-border);
}

.ui-tabs[data-orientation="vertical"] .ui-tabs__list {
  flex-direction: column;
  border-bottom: none;
  border-right: 1px solid var(--ui-border);
}

.ui-tabs__indicator {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: var(--reka-tabs-indicator-size);
  height: 2px;
  translate: var(--reka-tabs-indicator-position) 0;
  border-radius: 2px 2px 0 0;
  background-color: var(--ui-accent);
  transition:
    translate 180ms ease,
    width 180ms ease;
  will-change: translate, width;
}

.ui-tabs[data-orientation="vertical"] .ui-tabs__indicator {
  top: 0;
  right: -1px;
  bottom: auto;
  left: auto;
  width: 2px;
  height: var(--reka-tabs-indicator-size);
  translate: 0 var(--reka-tabs-indicator-position);
  border-radius: 2px 0 0 2px;
}

.ui-tabs__trigger {
  padding: 0.5rem 0.875rem;
  border: none;
  background: none;
  color: var(--ui-text-muted);
  font: inherit;
  font-size: 0.9375rem;
  line-height: 1.25rem;
  cursor: pointer;
  transition: color 120ms ease;
}

.ui-tabs__trigger:hover:not([data-disabled]) {
  color: var(--ui-text);
}

.ui-tabs__trigger:focus-visible {
  outline: 2px solid var(--ui-focus-ring);
  outline-offset: -2px;
  border-radius: 4px;
}

.ui-tabs__trigger[data-state="active"] {
  color: var(--ui-text);
  font-weight: 500;
}

.ui-tabs__trigger[data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

.ui-tabs__content {
  color: var(--ui-text);
  font-size: 0.9375rem;
  outline: none;
}

.ui-tabs__content:focus-visible {
  outline: 2px solid var(--ui-focus-ring);
  outline-offset: 2px;
  border-radius: 4px;
}
</style>
