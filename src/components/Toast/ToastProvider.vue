<script setup lang="ts">
import { useToast } from "../../composables";
import Toast from "./Toast.vue";

export interface ToastProviderProps {
  /** Corner the stack grows from. */
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

withDefaults(defineProps<ToastProviderProps>(), {
  position: "bottom-right",
});

const { toasts, dismiss } = useToast();
</script>

<template>
  <Teleport to="body">
    <ol
      class="ui-toast-viewport"
      :data-position="position"
      aria-live="polite"
      aria-atomic="false"
      aria-label="Notifications"
    >
      <li v-for="item in toasts" :key="item.id" class="ui-toast-viewport__item">
        <Toast
          :title="item.title"
          :description="item.description"
          :variant="item.variant"
          @dismiss="dismiss(item.id)"
        />
      </li>
    </ol>
  </Teleport>
</template>

<style>
.ui-toast-viewport {
  /* Above page content, below the modal layer's own scrim. */
  position: fixed;
  z-index: 40;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 100vw;
  margin: 0;
  padding: 1rem;
  list-style: none;
  pointer-events: none;
}

.ui-toast-viewport__item {
  pointer-events: auto;
}

.ui-toast-viewport[data-position="top-right"] {
  top: 0;
  right: 0;
}

.ui-toast-viewport[data-position="top-left"] {
  top: 0;
  left: 0;
}

.ui-toast-viewport[data-position="bottom-right"] {
  right: 0;
  bottom: 0;
  flex-direction: column-reverse;
}

.ui-toast-viewport[data-position="bottom-left"] {
  bottom: 0;
  left: 0;
  flex-direction: column-reverse;
}
</style>
